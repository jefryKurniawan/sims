<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Setting;
use App\Models\Siswa;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AbsensiController extends Controller
{
    public function checkin()
    {
        $user = Auth::user();
        $settings = Setting::first();

        if (!$user->siswa_id) {
            return redirect()->route('dashboard')->with('error', 'Akun ini tidak terhubung ke data siswa.');
        }

        $todayCheckin = Absensi::where('siswa_id', $user->siswa_id)
            ->whereDate('tanggal', Carbon::today())
            ->first();

        if ($todayCheckin) {
            return redirect()->route('absensi.status')
                ->with('info', 'Anda sudah absen masuk hari ini.');
        }

        return Inertia::render('Absensi/Checkin', [
            'auth' => ['user' => $user],
            'settings' => [
                'absensi_gps_radius_km' => $settings?->absensi_gps_radius_km ?? 0.1,
                'sekolah_latitude' => $settings?->sekolah_latitude ?? -6.123456,
                'sekolah_longitude' => $settings?->sekolah_longitude ?? 106.123456,
                'absensi_jam_masuk' => $settings?->absensi_jam_masuk ?? '07:00',
                'absensi_jam_pulang' => $settings?->absensi_jam_pulang ?? '14:00',
            ],
        ]);
    }

    public function checkout()
    {
        $user = Auth::user();
        $settings = Setting::first();

        if (!$user->siswa_id) {
            return redirect()->route('dashboard')->with('error', 'Akun ini tidak terhubung ke data siswa.');
        }

        $todayCheckin = Absensi::where('siswa_id', $user->siswa_id)
            ->whereDate('tanggal', Carbon::today())
            ->first();

        if (!$todayCheckin) {
            return redirect()->route('absensi.checkin')
                ->with('warning', 'Anda belum absen masuk hari ini. Silakan absen masuk terlebih dahulu.');
        }

        if ($todayCheckin->jam_pulang) {
            return redirect()->route('absensi.status')
                ->with('info', 'Anda sudah absen pulang hari ini.');
        }

        return Inertia::render('Absensi/Checkout', [
            'auth' => ['user' => $user],
            'settings' => [
                'absensi_gps_radius_km' => $settings?->absensi_gps_radius_km ?? 0.1,
                'sekolah_latitude' => $settings?->sekolah_latitude ?? -6.123456,
                'sekolah_longitude' => $settings?->sekolah_longitude ?? 106.123456,
                'absensi_jam_masuk' => $settings?->absensi_jam_masuk ?? '07:00',
                'absensi_jam_pulang' => $settings?->absensi_jam_pulang ?? '14:00',
            ],
            'todayCheckin' => $todayCheckin ? [
                'jam_masuk' => $todayCheckin->jam_masuk,
                'jam_pulang' => $todayCheckin->jam_pulang,
                'status_masuk' => $todayCheckin->status_masuk,
                'status_pulang' => $todayCheckin->status_pulang,
                'metode' => $todayCheckin->metode,
                'keterangan' => $todayCheckin->keterangan,
                'lat' => $todayCheckin->lat,
                'lng' => $todayCheckin->lng,
            ] : null,
        ]);
    }

    public function status()
    {
        $user = Auth::user();
        $settings = Setting::first();

        if (!$user->siswa_id) {
            return redirect()->route('dashboard');
        }

        $todayCheckin = Absensi::where('siswa_id', $user->siswa_id)
            ->whereDate('tanggal', Carbon::today())
            ->first();

        $now = Carbon::now();
        $jamMasuk = $settings?->absensi_jam_masuk ?? '07:00';
        $jamPulang = $settings?->absensi_jam_pulang ?? '14:00';

        $canCheckin = !$todayCheckin;
        $canCheckout = $todayCheckin && !$todayCheckin->jam_pulang && $now->format('H:i') >= $jamPulang;

        return Inertia::render('Absensi/Status', [
            'auth' => ['user' => $user],
            'settings' => [
                'absensi_gps_radius_km' => $settings?->absensi_gps_radius_km ?? 0.1,
                'sekolah_latitude' => $settings?->sekolah_latitude ?? -6.123456,
                'sekolah_longitude' => $settings?->sekolah_longitude ?? 106.123456,
                'absensi_jam_masuk' => $jamMasuk,
                'absensi_jam_pulang' => $jamPulang,
            ],
            'todayCheckin' => $todayCheckin ? [
                'jam_masuk' => $todayCheckin->jam_masuk,
                'jam_pulang' => $todayCheckin->jam_pulang,
                'status_masuk' => $todayCheckin->status_masuk,
                'status_pulang' => $todayCheckin->status_pulang,
                'metode' => $todayCheckin->metode,
                'keterangan' => $todayCheckin->keterangan,
                'lat' => $todayCheckin->lat,
                'lng' => $todayCheckin->lng,
            ] : null,
            'canCheckin' => $canCheckin,
            'canCheckout' => $canCheckout,
        ]);
    }
}