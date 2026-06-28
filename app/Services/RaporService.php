<?php

namespace App\Services;

use App\Models\RaporSiswa;
use App\Models\RaporNilai;
use App\Models\RaporMapel;
use App\Models\RaporKelas;
use App\Models\AuditLog;
use Illuminate\Support\Facades\DB;

class RaporService
{
    /**
     * Assign siswa ke kelas untuk satu semester.
     */
    public function assignSiswaToKelas(int $kelasId, array $siswaIds, string $semester, string $tahunAjaran): int
    {
        $kelas = RaporKelas::findOrFail($kelasId);
        $assigned = 0;

        DB::transaction(function () use ($kelasId, $siswaIds, $semester, $tahunAjaran, &$assigned) {
            foreach ($siswaIds as $siswaId) {
                $exists = RaporSiswa::where('siswa_id', $siswaId)
                    ->where('semester', $semester)
                    ->where('tahun_ajaran', $tahunAjaran)
                    ->exists();

                if ($exists) {
                    continue;
                }

                RaporSiswa::create([
                    'siswa_id' => $siswaId,
                    'rapor_kelas_id' => $kelasId,
                    'semester' => $semester,
                    'tahun_ajaran' => $tahunAjaran,
                ]);

                $assigned++;
            }
        });

        return $assigned;
    }

    /**
     * Input atau update nilai untuk satu mapel pada rapor siswa tertentu.
     */
    public function inputNilai(int $raporSiswaId, int $raporMapelId, array $nilaiData): RaporNilai
    {
        $raporSiswa = RaporSiswa::findOrFail($raporSiswaId);
        $mapel = RaporMapel::findOrFail($raporMapelId);

        $nilaiPengetahuan = $nilaiData['nilai_pengetahuan'] ?? null;
        $nilaiKeterampilan = $nilaiData['nilai_keterampilan'] ?? null;

        $nilaiAkhir = $this->kalkulasiNilaiAkhir($nilaiPengetahuan, $nilaiKeterampilan);

        $data = [
            'nilai_pengetahuan' => $nilaiPengetahuan,
            'predikat_pengetahuan' => $nilaiData['predikat_pengetahuan'] ?? $this->konversiPredikat($nilaiPengetahuan),
            'nilai_keterampilan' => $nilaiKeterampilan,
            'predikat_keterampilan' => $nilaiData['predikat_keterampilan'] ?? $this->konversiPredikat($nilaiKeterampilan),
            'nilai_akhir' => $nilaiAkhir,
        ];

        return RaporNilai::updateOrCreate(
            [
                'rapor_siswa_id' => $raporSiswaId,
                'rapor_mapel_id' => $raporMapelId,
            ],
            $data
        );
    }

    /**
     * Hitung nilai akhir rata-rata dari pengetahuan dan keterampilan.
     */
    public function kalkulasiNilaiAkhir(?float $nilaiPengetahuan, ?float $nilaiKeterampilan): ?float
    {
        if ($nilaiPengetahuan === null && $nilaiKeterampilan === null) {
            return null;
        }

        $p = $nilaiPengetahuan ?? 0;
        $k = $nilaiKeterampilan ?? 0;
        $count = ($nilaiPengetahuan !== null ? 1 : 0) + ($nilaiKeterampilan !== null ? 1 : 0);

        return round(($p + $k) / $count, 2);
    }

    /**
     * Konversi angka ke predikat huruf (A, B, C, D, E).
     */
    public function konversiPredikat(?float $nilai): ?string
    {
        if ($nilai === null) {
            return null;
        }

        return match (true) {
            $nilai >= 92 => 'A',
            $nilai >= 83 => 'B',
            $nilai >= 75 => 'C',
            $nilai >= 60 => 'D',
            default => 'E',
        };
    }

    /**
     * Generate deskripsi otomatis berdasarkan nilai.
     */
    public function generateDeskripsiOtomatis(string $jenis, ?float $nilai, string $namaMapel, int $kkm): string
    {
        $label = $jenis === 'pengetahuan' ? 'pemahaman' : 'keterampilan';

        if ($nilai === null) {
            return "Nilai {$label} {$namaMapel} belum diisi.";
        }

        if ($nilai >= 92) {
            return "Sangat baik dalam {$label} {$namaMapel}. Mampu menguasai materi secara mendalam dan konsisten.";
        }

        if ($nilai >= $kkm) {
            return "Baik dalam {$label} {$namaMapel}. Sudah mencapai Kriteria Ketuntasan Minimal (KKM).";
        }

        return "Perlu ditingkatkan dalam {$label} {$namaMapel}. Masih di bawah KKM, perlu bimbingan lebih lanjut.";
    }

    /**
     * Generate otomatis deskripsi untuk semua mapel pada satu rapor siswa.
     */
    public function generateSemuaDeskripsi(int $raporSiswaId): int
    {
        $raporSiswa = RaporSiswa::with(['raporNilai.raporMapel'])->findOrFail($raporSiswaId);
        $generated = 0;

        DB::transaction(function () use ($raporSiswa, &$generated) {
            foreach ($raporSiswa->raporNilai as $nilai) {
                $mapel = $nilai->raporMapel;
                if (!$mapel) {
                    continue;
                }

                $deskripsiPengetahuan = $this->generateDeskripsiOtomatis(
                    'pengetahuan',
                    $nilai->nilai_pengetahuan,
                    $mapel->nama_mapel,
                    $mapel->kkm
                );

                $deskripsiKeterampilan = $this->generateDeskripsiOtomatis(
                    'keterampilan',
                    $nilai->nilai_keterampilan,
                    $mapel->nama_mapel,
                    $mapel->kkm
                );

                $raporSiswa->raporDeskripsi()->updateOrCreate(
                    ['rapor_mapel_id' => $mapel->id],
                    [
                        'deskripsi_pengetahuan' => $deskripsiPengetahuan,
                        'deskripsi_keterampilan' => $deskripsiKeterampilan,
                    ]
                );

                $generated++;
            }
        });

        return $generated;
    }

    /**
     * Ambil rapor lengkap siswa (nilai, deskripsi, ekskul, catatan).
     */
    public function getRaporSiswa(int $raporSiswaId): ?RaporSiswa
    {
        return RaporSiswa::with([
            'siswa',
            'raporKelas.jurusan',
            'raporNilai.raporMapel',
            'raporDeskripsi.raporMapel',
            'raporEkstrakurikuler',
            'raporCatatan',
        ])->findOrFail($raporSiswaId);
    }

    /**
     * Ambil daftar siswa dalam satu kelas.
     */
    public function getSiswaByKelas(int $kelasId, string $semester, string $tahunAjaran)
    {
        return RaporSiswa::with('siswa')
            ->where('rapor_kelas_id', $kelasId)
            ->where('semester', $semester)
            ->where('tahun_ajaran', $tahunAjaran)
            ->get();
    }

    /**
     * Statistik nilai per kelas.
     */
    public function getStatistikKelas(int $kelasId, string $semester, string $tahunAjaran): array
    {
        $raporSiswaIds = RaporSiswa::where('rapor_kelas_id', $kelasId)
            ->where('semester', $semester)
            ->where('tahun_ajaran', $tahunAjaran)
            ->pluck('id');

        if ($raporSiswaIds->isEmpty()) {
            return [
                'total_siswa' => 0,
                'rata_rata' => 0,
                'tertinggi' => 0,
                'terendah' => 0,
                'lulus_kkm' => 0,
                'tidak_lulus_kkm' => 0,
            ];
        }

        $rataRata = RaporNilai::whereIn('rapor_siswa_id', $raporSiswaIds)
            ->whereNotNull('nilai_akhir')
            ->avg('nilai_akhir');

        $tertinggi = RaporNilai::whereIn('rapor_siswa_id', $raporSiswaIds)
            ->whereNotNull('nilai_akhir')
            ->max('nilai_akhir');

        $terendah = RaporNilai::whereIn('rapor_siswa_id', $raporSiswaIds)
            ->whereNotNull('nilai_akhir')
            ->min('nilai_akhir');

        $lulusKkm = RaporSiswa::whereIn('id', $raporSiswaIds)
            ->whereHas('raporNilai', function ($q) {
                $q->whereNotNull('nilai_akhir')
                  ->where('nilai_akhir', '>=', 70);
            })->count();

        $tidakLulusKkm = $raporSiswaIds->count() - $lulusKkm;

        return [
            'total_siswa' => $raporSiswaIds->count(),
            'rata_rata' => round($rataRata ?? 0, 2),
            'tertinggi' => round($tertinggi ?? 0, 2),
            'terendah' => round($terendah ?? 0, 2),
            'lulus_kkm' => $lulusKkm,
            'tidak_lulus_kkm' => $tidakLulusKkm,
        ];
    }
}
