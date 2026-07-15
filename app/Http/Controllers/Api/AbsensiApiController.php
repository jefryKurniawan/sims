<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Absensi;
use App\Models\AbsensiGuru;
use App\Models\Siswa;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AbsensiApiController extends Controller
{
    // GPS check-in for siswa
    public function checkin(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric|between:-90,90',
            'lng' => 'required|numeric|between:-180,180',
        ]);

        $user = $request->user();

        // Check if user is siswa (has siswa relation)
        $siswa = $user->siswa ?? Siswa::where('user_id', $user->id)->first();
        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terhubung ke data siswa',
            ], 403);
        }

        $kelasAktif = $siswa->kelasAktif;
        if (!$kelasAktif) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa belum memiliki kelas aktif',
            ], 400);
        }

        $tanggal = now()->toDateString();
        $jamMasuk = now()->format('H:i');

        // Check if already checked in today
        $existing = Absensi::where('siswa_id', $siswa->id)
            ->where('tanggal', $tanggal)
            ->first();

        if ($existing && $existing->jam_masuk) {
            return response()->json([
                'success' => false,
                'message' => 'Anda sudah absen masuk hari ini',
                'data' => $existing,
            ], 409);
        }

        // Calculate distance from school
        $sekolahLat = config('settings.absensi_gps_radius_km', 0.1) ? setting('sekolah_latitude', -6.123456) : null;
        $sekolahLng = setting('sekolah_longitude', 106.123456);
        $radiusKm = (float) setting('absensi_gps_radius_km', 0.1);

        $inRadius = $this->isInRadius(
            $request->lat,
            $request->lng,
            $sekolahLat,
            $sekolahLng,
            $radiusKm
        );

        // Determine status
        $batasMasuk = setting('absensi_jam_masuk', '07:00');
        $statusMasuk = 'hadir';

        if (!$inRadius) {
            $statusMasuk = 'alpa'; // Outside radius = alpa
        } elseif ($jamMasuk > $batasMasuk) {
            $statusMasuk = 'terlambat';
        }

        $absensi = Absensi::updateOrCreate(
            ['siswa_id' => $siswa->id, 'tanggal' => $tanggal],
            [
                'kelas_id' => $kelasAktif->kelas_id,
                'jam_masuk' => $jamMasuk,
                'status_masuk' => $statusMasuk,
                'metode' => 'gps',
                'lat' => $request->lat,
                'lng' => $request->lng,
                'dicatat_oleh' => $user->id,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Absen masuk berhasil',
            'data' => [
                'status' => $statusMasuk,
                'jam_masuk' => $jamMasuk,
                'in_radius' => $inRadius,
                'distance_km' => $inRadius ? round($this->haversine($request->lat, $request->lng, $sekolahLat, $sekolahLng), 3) : null,
            ],
        ]);
    }

    // GPS check-out for siswa
    public function checkout(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric|between:-90,90',
            'lng' => 'required|numeric|between:-180,180',
        ]);

        $user = $request->user();
        $siswa = $user->siswa ?? Siswa::where('user_id', $user->id)->first();

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terhubung ke data siswa',
            ], 403);
        }

        $tanggal = now()->toDateString();
        $jamPulang = now()->format('H:i');

        $absensi = Absensi::where('siswa_id', $siswa->id)
            ->where('tanggal', $tanggal)
            ->first();

        if (!$absensi) {
            return response()->json([
                'success' => false,
                'message' => 'Belum absen masuk hari ini',
            ], 400);
        }

        if ($absensi->jam_pulang) {
            return response()->json([
                'success' => false,
                'message' => 'Sudah absen pulang',
                'data' => $absensi,
            ], 409);
        }

        $batasPulang = setting('absensi_jam_pulang', '14:00');
        $statusPulang = 'hadir';
        if ($jamPulang < $batasPulang) {
            $statusPulang = 'pulang_cepat';
        }

        $absensi->update([
            'jam_pulang' => $jamPulang,
            'status_pulang' => $statusPulang,
            'metode' => 'gps',
            'lat' => $request->lat,
            'lng' => $request->lng,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Absen pulang berhasil',
            'data' => [
                'status' => $statusPulang,
                'jam_pulang' => $jamPulang,
            ],
        ]);
    }

    // Get current status for siswa
    public function status(Request $request)
    {
        $user = $request->user();
        $siswa = $user->siswa ?? Siswa::where('user_id', $user->id)->first();

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terhubung ke data siswa',
            ], 403);
        }

        $tanggal = $request->get('tanggal', now()->toDateString());
        $absensi = Absensi::where('siswa_id', $siswa->id)
            ->where('tanggal', $tanggal)
            ->first();

        return response()->json([
            'success' => true,
            'data' => $absensi ? [
                'tanggal' => $tanggal,
                'jam_masuk' => $absensi->jam_masuk?->format('H:i'),
                'jam_pulang' => $absensi->jam_pulang?->format('H:i'),
                'status_masuk' => $absensi->status_masuk,
                'status_pulang' => $absensi->status_pulang,
                'metode' => $absensi->metode,
            ] : [
                'tanggal' => $tanggal,
                'jam_masuk' => null,
                'jam_pulang' => null,
                'status_masuk' => 'alpa',
                'status_pulang' => 'alpa',
                'metode' => null,
            ],
        ]);
    }

    // GPS check-in for guru
    public function guruCheckin(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric|between:-90,90',
            'lng' => 'required|numeric|between:-180,180',
        ]);

        $user = $request->user();
        $guru = $user->guru ?? Guru::where('user_id', $user->id)->first();

        if (!$guru) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terhubung ke data guru',
            ], 403);
        }

        $tanggal = now()->toDateString();
        $jamMasuk = now()->format('H:i');

        $existing = AbsensiGuru::where('guru_id', $guru->id)
            ->where('tanggal', $tanggal)
            ->first();

        if ($existing && $existing->jam_masuk) {
            return response()->json([
                'success' => false,
                'message' => 'Anda sudah absen masuk hari ini',
                'data' => $existing,
            ], 409);
        }

        $batasMasuk = setting('absensi_jam_masuk_guru', '07:00');
        $status = $jamMasuk > $batasMasuk ? 'terlambat' : 'hadir';

        $absensi = AbsensiGuru::updateOrCreate(
            ['guru_id' => $guru->id, 'tanggal' => $tanggal],
            [
                'jam_masuk' => $jamMasuk,
                'status' => $status,
                'metode' => 'gps',
                'lat' => $request->lat,
                'lng' => $request->lng,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Absen masuk guru berhasil',
            'data' => ['status' => $status, 'jam_masuk' => $jamMasuk],
        ]);
    }

    // GPS check-out for guru
    public function guruCheckout(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric|between:-90,90',
            'lng' => 'required|numeric|between:-180,180',
        ]);

        $user = $request->user();
        $guru = $user->guru ?? Guru::where('user_id', $user->id)->first();

        if (!$guru) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terhubung ke data guru',
            ], 403);
        }

        $tanggal = now()->toDateString();
        $jamPulang = now()->format('H:i');

        $absensi = AbsensiGuru::where('guru_id', $guru->id)
            ->where('tanggal', $tanggal)
            ->first();

        if (!$absensi) {
            return response()->json([
                'success' => false,
                'message' => 'Belum absen masuk hari ini',
            ], 400);
        }

        if ($absensi->jam_pulang) {
            return response()->json([
                'success' => false,
                'message' => 'Sudah absen pulang',
            ], 409);
        }

        $absensi->update([
            'jam_pulang' => $jamPulang,
            'metode' => 'gps',
            'lat' => $request->lat,
            'lng' => $request->lng,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Absen pulang guru berhasil',
            'data' => ['jam_pulang' => $jamPulang],
        ]);
    }

    // Guru status
    public function guruStatus(Request $request)
    {
        $user = $request->user();
        $guru = $user->guru ?? Guru::where('user_id', $user->id)->first();

        if (!$guru) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terhubung ke data guru',
            ], 403);
        }

        $tanggal = $request->get('tanggal', now()->toDateString());
        $absensi = AbsensiGuru::where('guru_id', $guru->id)
            ->where('tanggal', $tanggal)
            ->first();

        return response()->json([
            'success' => true,
            'data' => $absensi ? [
                'tanggal' => $tanggal,
                'jam_masuk' => $absensi->jam_masuk?->format('H:i'),
                'jam_pulang' => $absensi->jam_pulang?->format('H:i'),
                'status' => $absensi->status,
                'metode' => $absensi->metode,
            ] : [
                'tanggal' => $tanggal,
                'jam_masuk' => null,
                'jam_pulang' => null,
                'status' => 'alpa',
                'metode' => null,
            ],
        ]);
    }

    private function isInRadius(float $lat1, float $lng1, float $lat2, float $lng2, float $radiusKm): bool
    {
        return $this->haversine($lat1, $lng1, $lat2, $lng2) <= $radiusKm;
    }

    private function haversine(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $earthRadius = 6371; // km
        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);
        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
            sin($dLng / 2) * sin($dLng / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        return $earthRadius * $c;
    }
}