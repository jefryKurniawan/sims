<?php

namespace Database\Seeders;

use App\Models\SpmbRanking;
use App\Models\SpmbApplicant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SpmbRankingSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $applicants = SpmbApplicant::all();

        foreach ($applicants as $applicant) {
            // generate random scores
            $skor_nilai_rapor = $faker->randomFloat(2, 0, 40);
            $skor_tka = $faker->randomFloat(2, 0, 40);
            $skor_prestasi = $faker->randomFloat(2, 0, 15);
            $skor_afirmasi = $faker->randomFloat(2, 0, 5);
            $skor_total = $skor_nilai_rapor + $skor_tka + $skor_prestasi + $skor_afirmasi;

            // Determine jalur based on highest component (simplified)
            $components = [
                'nilai_rapor' => $skor_nilai_rapor,
                'tka' => $skor_tka,
                'prestasi' => $skor_prestasi,
                'afirmasi' => $skor_afirmasi,
            ];
            arsort($components);
            $topKey = key($components);
            $jalur = match ($topKey) {
                'nilai_rapor', 'tka' => 'reguler',
                'prestasi' => 'prestasi_akademik',
                'afirmasi' => 'afirmasi',
                default => 'reguler',
            };

            SpmbRanking::create([
                'spmb_applicant_id' => $applicant->id,
                'skor_nilai_rapor' => $skor_nilai_rapor,
                'skor_tka' => $skor_tka,
                'skor_prestasi' => $skor_prestasi,
                'skor_afirmasi' => $skor_afirmasi,
                'skor_total' => $skor_total,
                'ranking' => null,
                'jalur_seleksi' => $jalur,
                'lulus_seleksi' => $skor_total >= 60,
            ]);
        }

        // Assign rankings based on total score descending
        $rankings = SpmbRanking::orderByDesc('skor_total')->get();
        $rank = 1;
        foreach ($rankings as $ranking) {
            $ranking->update(['ranking' => $rank++]);
        }
    }
}