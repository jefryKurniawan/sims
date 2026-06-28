<?php

namespace App\Services;

use App\Models\CalonSiswa;
use App\Models\Gelombang;
use App\Models\PengumumanPpdb;
use App\Models\AuditLog;
use App\Models\Siswa;
use App\Models\User;
use App\Models\Berita;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PpdbService
{
    /**
     * Daftarkan calon siswa baru.
     */
    public function register(array $data): CalonSiswa
    {
        $gelombang = Gelombang::findOrFail($data['gelombang_id']);

        if ($this->kuotaPenuh($gelombang)) {
            throw new \RuntimeException("Kuota gelombang {$gelombang->nama} sudah penuh.");
        }

        $data['status'] = 'submitted';
        $data['tanggal_daftar'] = now();
        $data['biaya_pendaftaran'] = $gelombang->biaya_pendaftaran;

        $calonSiswa = CalonSiswa::create($data);

        return $calonSiswa;
    }

    /**
     * Verifikasi pendaftaran dan upload bukti bayar.
     */
    public function verify(int $id, ?string $buktiBayarPath = null): CalonSiswa
    {
        $calonSiswa = CalonSiswa::findOrFail($id);

        if ($calonSiswa->status !== 'submitted') {
            throw new \RuntimeException('Hanya pendaftar dengan status submitted yang bisa diverifikasi.');
        }

        $updateData = ['status' => 'verified'];

        if ($buktiBayarPath) {
            $updateData['bukti_bayar'] = $buktiBayarPath;
        }

        $calonSiswa->update($updateData);

        return $calonSiswa->fresh();
    }

    /**
     * Proses seleksi untuk satu gelombang.
     */
    public function prosesSeleksi(int $gelombangId, ?int $jurusanId = null): array
    {
        $gelombang = Gelombang::findOrFail($gelombangId);

        $query = CalonSiswa::where('gelombang_id', $gelombangId)
            ->where('status', 'verified');

        if ($jurusanId) {
            $query->where('jurusan_id', $jurusanId);
        }

        $pendaftar = $query->orderBy('nilai_akhir', 'desc')->get();

        if ($pendaftar->isEmpty()) {
            return ['processed' => 0, 'lulus' => 0, 'tidak_lulus' => 0];
        }

        $lulus = 0;
        $tidakLulus = 0;

        DB::transaction(function () use ($pendaftar, $gelombang, &$lulus, &$tidakLulus) {
            $ranking = 1;

            foreach ($pendaftar as $calon) {
                if ($calon->nilai_akhir === null) {
                    continue;
                }

                $decided = false;

                if ($ranking <= $gelombang->kuota && $calon->nilai_akhir >= 60) {
                    $calon->update([
                        'status' => 'lulus',
                        'keputusan' => 'diterima',
                        'catatan_admin' => $calon->catatan_admin
                            ? $calon->catatan_admin . "\nLulus seleksi (ranking {$ranking})"
                            : "Lulus seleksi (ranking {$ranking})",
                    ]);
                    $this->syncToSiswa($calon);
                    $lulus++;
                    $decided = true;
                }

                if (!$decided && $calon->status === 'verified') {
                    $calon->update([
                        'status' => 'tidak_lulus',
                        'keputusan' => 'ditolak',
                        'catatan_admin' => $calon->catatan_admin
                            ? $calon->catatan_admin . "\nTidak lulus seleksi"
                            : 'Tidak lulus seleksi',
                    ]);
                    $tidakLulus++;
                }

                $ranking++;
            }
        });

        return [
            'processed' => $pendaftar->count(),
            'lulus' => $lulus,
            'tidak_lulus' => $tidakLulus,
        ];
    }

    /**
     * Auto-sync calon siswa lulus ke tabel Siswa dan buat akun User (role: ortu).
     */
    public function syncToSiswa(CalonSiswa $calonSiswa): ?Siswa
    {
        if ($calonSiswa->status !== 'lulus') {
            return null;
        }

        $exists = Siswa::where('nisn', $calonSiswa->nisn)->first();
        if ($exists) {
            return $exists;
        }

        return DB::transaction(function () use ($calonSiswa) {
            $defaultPassword = Str::random(10);

            $user = User::create([
                'name' => $calonSiswa->nama_ortu,
                'email' => $calonSiswa->email ?? $calonSiswa->nisn . '@sekolah.sch.id',
                'password' => Hash::make($defaultPassword),
            ]);

            $user->assignRole('ortu');

            $siswa = Siswa::create([
                'nisn' => $calonSiswa->nisn,
                'nama_lengkap' => $calonSiswa->nama_lengkap,
                'tempat_lahir' => $calonSiswa->tempat_lahir,
                'tanggal_lahir' => $calonSiswa->tanggal_lahir,
                'jenis_kelamin' => $calonSiswa->jenis_kelamin,
                'alamat' => $calonSiswa->alamat,
                'no_hp' => $calonSiswa->no_hp,
                'email' => $calonSiswa->email,
                'nama_ortu' => $calonSiswa->nama_ortu,
                'no_hp_ortu' => $calonSiswa->no_hp_ortu,
                'asal_sekolah' => $calonSiswa->asal_sekolah,
                'user_id' => $user->id,
                'tanggal_masuk' => now(),
                'status' => 'aktif',
                'jurusan_id' => $calonSiswa->jurusan_id,
            ]);

            AuditLog::log(
                $siswa,
                'created',
                null,
                $siswa->toArray(),
                "Auto-sync dari PPDB: {$calonSiswa->nama_lengkap} lulus seleksi"
            );

            $this->generateBeritaPengumuman($calonSiswa);

            return $siswa;
        });
    }

    /**
     * Buat berita otomatis saat ada siswa lulus.
     */
    public function generateBeritaPengumuman(CalonSiswa $calonSiswa): void
    {
        $countLulus = CalonSiswa::where('gelombang_id', $calonSiswa->gelombang_id)
            ->where('status', 'lulus')
            ->count();

        if ($countLulus > 0) {
            $gelombang = $calonSiswa->gelombang;
            $title = "Pengumuman PPDB {$gelombang?->nama} – {$countLulus} Siswa Lulus";
            $content = "Seleksi Penerimaan Peserta Didik Baru gelombang {$gelombang?->nama} telah selesai. Sebanyak {$countLulus} siswa dinyatakan lulus dan berhak mendaftar ulang.";

            Berita::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'content' => $content,
                'kategori_id' => 1,
                'thumbnail' => '',
                'is_active' => '1',
                'created_by' => 1,
                'sumber' => 'ppdb',
                'status' => 'published',
            ]);
        }
    }

    /**
     * Cek apakah kuota gelombang sudah penuh.
     */
    public function kuotaPenuh(Gelombang $gelombang): bool
    {
        if ($gelombang->kuota <= 0) {
            return false;
        }

        $terdaftar = CalonSiswa::where('gelombang_id', $gelombang->id)
            ->whereIn('status', ['verified', 'lulus'])
            ->count();

        return $terdaftar >= $gelombang->kuota;
    }

    /**
     * Statistik PPDB.
     */
    public function getStatistik(?int $gelombangId = null): array
    {
        $query = CalonSiswa::query();

        if ($gelombangId) {
            $query->where('gelombang_id', $gelombangId);
        }

        $total = (clone $query)->count();
        $submitted = (clone $query)->where('status', 'submitted')->count();
        $verified = (clone $query)->where('status', 'verified')->count();
        $lulus = (clone $query)->where('status', 'lulus')->count();
        $tidakLulus = (clone $query)->where('status', 'tidak_lulus')->count();

        $perJurusan = CalonSiswa::select('jurusan_id', DB::raw('count(*) as total'))
            ->when($gelombangId, fn($q) => $q->where('gelombang_id', $gelombangId))
            ->groupBy('jurusan_id')
            ->with('jurusan')
            ->get()
            ->map(fn($item) => [
                'jurusan' => $item->jurusan?->nama ?? 'Tanpa Jurusan',
                'total' => $item->total,
            ]);

        return [
            'total' => $total,
            'submitted' => $submitted,
            'verified' => $verified,
            'lulus' => $lulus,
            'tidak_lulus' => $tidakLulus,
            'per_jurusan' => $perJurusan,
        ];
    }

    /**
     * Input nilai rapor & wawancara, hitung nilai akhir.
     */
    public function inputNilai(int $id, float $nilaiRapot, float $nilaiWawancara, ?\DateTime $tanggalWawancara = null): CalonSiswa
    {
        $calonSiswa = CalonSiswa::findOrFail($id);

        $nilaiAkhir = ($nilaiRapot * 0.4) + ($nilaiWawancara * 0.6);

        $calonSiswa->update([
            'nilai_rapot' => $nilaiRapot,
            'nilai_wawancara' => $nilaiWawancara,
            'nilai_akhir' => round($nilaiAkhir, 2),
            'tanggal_wawancara' => $tanggalWawancara ?? now(),
        ]);

        return $calonSiswa->fresh();
    }

    /**
     * Publikasikan pengumuman hasil seleksi.
     */
    public function publishPengumuman(int $gelombangId): PengumumanPpdb
    {
        $gelombang = Gelombang::findOrFail($gelombangId);

        $statistik = $this->getStatistik($gelombangId);

        $judul = "Pengumuman Hasil Seleksi PPDB Gelombang {$gelombang->nama}";

        $isi = "Pengumuman hasil seleksi PPDB gelombang {$gelombang->nama}.\n\n";
        $isi .= "Total pendaftar: {$statistik['total']}\n";
        $isi .= "Diverifikasi: {$statistik['verified']}\n";
        $isi .= "Lulus: {$statistik['lulus']}\n";
        $isi .= "Tidak lulus: {$statistik['tidak_lulus']}\n";

        return PengumumanPpdb::create([
            'judul' => $judul,
            'isi' => $isi,
            'tanggal_publish' => now(),
            'status' => 'published',
        ]);
    }

    /**
     * Laporan pendaftar per periode.
     */
    public function getLaporan(array $filters = []): array
    {
        $query = CalonSiswa::query()
            ->with(['jurusan', 'gelombang']);

        if (!empty($filters['tanggal_mulai'])) {
            $query->whereDate('created_at', '>=', $filters['tanggal_mulai']);
        }

        if (!empty($filters['tanggal_selesai'])) {
            $query->whereDate('created_at', '<=', $filters['tanggal_selesai']);
        }

        if (!empty($filters['gelombang_id'])) {
            $query->where('gelombang_id', $filters['gelombang_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderBy('created_at', 'desc')->get()->toArray();
    }
}
