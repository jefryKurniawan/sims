<?php

namespace App\Services;

use App\Models\SpmbApplicant;
use App\Models\SpmbConfig;
use App\Models\SpmbRanking;
use App\Models\Berita;
use App\Models\AuditLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SpmbRankingService
{
    public function __construct(
        private SpmbScoringService $scoringService
    ) {}

    public function prosesScoringDanRanking(int $configId): array
    {
        $config = SpmbConfig::findOrFail($configId);

        if (!$config->aktif) {
            throw new \RuntimeException('Konfigurasi SPMB tidak aktif.');
        }

        $applicants = SpmbApplicant::with(['nilaiAkademik', 'tka', 'prestasi', 'afirmasi'])
            ->where('status_pendaftaran', 'verifikasi_berkas')
            ->get();

        if ($applicants->isEmpty()) {
            return ['processed' => 0, 'lulus' => 0];
        }

        $processed = 0;
        $lulus = 0;

        DB::transaction(function () use ($applicants, $config, &$processed, &$lulus) {
            SpmbRanking::whereIn('spmb_applicant_id', $applicants->pluck('id'))->delete();

            $allRankings = [];

            foreach ($applicants as $applicant) {
                $skor = $this->scoringService->hitungSkorTotal($applicant->id);
                $jalur = $this->scoringService->tentukanJalurSeleksi($applicant);

                $allRankings[] = [
                    'spmb_applicant_id' => $applicant->id,
                    'jalur_seleksi' => $jalur,
                    'skor_nilai_rapor' => $skor['skor_nilai_rapor'],
                    'skor_tka' => $skor['skor_tka'],
                    'skor_prestasi' => $skor['skor_prestasi'],
                    'skor_afirmasi' => $skor['skor_afirmasi'],
                    'skor_total' => $skor['skor_total'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                $processed++;
            }

            SpmbRanking::insert($allRankings);

            $jalurKuota = [
                'reguler' => $config->kuota_reguler,
                'afirmasi' => $config->kuota_afirmasi,
                'prestasi_akademik' => $config->kuota_prestasi,
                'prestasi_non_akademik' => $config->kuota_prestasi,
            ];

            foreach ($jalurKuota as $jalur => $kuota) {
                $rankings = SpmbRanking::where('jalur_seleksi', $jalur)
                    ->orderBy('skor_total', 'desc')
                    ->get();

                $urutan = 1;
                $terisi = 0;

                foreach ($rankings as $ranking) {
                    $isLulus = $terisi < $kuota && $ranking->skor_total > 0;

                    $ranking->update([
                        'ranking' => $urutan,
                        'lulus_seleksi' => $isLulus,
                    ]);

                    if ($isLulus) {
                        $terisi++;
                        $lulus++;
                    }

                    SpmbApplicant::where('id', $ranking->spmb_applicant_id)->update([
                        'status_pendaftaran' => $lulus ? 'lulus_seleksi' : 'ditolak',
                    ]);

                    $urutan++;
                }
            }
        });

        return [
            'processed' => $processed,
            'lulus' => $lulus,
        ];
    }

    public function getRankingByJalur(?string $jalur = null)
    {
        $query = SpmbRanking::with('applicant')
            ->orderBy('jalur_seleksi')
            ->orderBy('ranking');

        if ($jalur) {
            $query->where('jalur_seleksi', $jalur);
        }

        return $query->paginate(50);
    }

    public function getRankingByApplicant(int $applicantId): ?SpmbRanking
    {
        return SpmbRanking::with('applicant')
            ->where('spmb_applicant_id', $applicantId)
            ->first();
    }

    public function generateBeritaPengumuman(int $configId): void
    {
        $config = SpmbConfig::findOrFail($configId);

        $totalLulus = SpmbRanking::where('lulus_seleksi', true)->count();
        $totalPendaftar = SpmbApplicant::whereIn('status_pendaftaran', [
            'lulus_seleksi', 'ditolak'
        ])->count();

        if ($totalLulus > 0) {
            $title = "Pengumuman SPMB {$config->tahun_ajaran} – {$totalLulus} Siswa Lulus";
            $content = "Seleksi Penerimaan Murid Baru tahun ajaran {$config->tahun_ajaran} telah selesai. Sebanyak {$totalLulus} dari {$totalPendaftar} pendaftar dinyatakan lulus seleksi.";

            Berita::create([
                'title' => $title,
                'slug' => Str::slug($title) . '-' . Str::random(4),
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
}
