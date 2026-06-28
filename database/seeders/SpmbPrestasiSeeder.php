<?php

namespace Database\Seeders;

use App\Models\SpmbPrestasi;
use App\Models\SpmbApplicant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SpmbPrestasiSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $applicants = SpmbApplicant::all();

        foreach ($applicants as $applicant) {
            // 40% chance to have prestasi
            if ($faker->boolean(40)) {
                $jenis = $faker->randomElement(['akademik', 'non_akademik']);
                $tingkat = $faker->randomElement(['sekolah', 'kecamatan', 'kabupaten_kota', 'provinsi', 'nasional', 'internasional']);
                $penghargaan = $faker->randomElement(['juara_1', 'juara_2', 'juara_3', 'finalis', 'pesertadidik_berprestasi']);

                SpmbPrestasi::create([
                    'spmb_applicant_id' => $applicant->id,
                    'jenis_prestasi' => $jenis,
                    'nama_prestasi' => $faker->sentence(4),
                    'jenis_lomba' => $jenis === 'akademik' ? $faker->randomElement(['Olimpiade Matematika', 'Olimpiade Fisika', 'Debat', 'Essay']) : $faker->randomElement(['Futsal', 'Basket', 'Tari', 'Musik']),
                    'tingkat_prestasi' => $tingkat,
                    'peringkat' => $faker->numberBetween(1, 5),
                    'jenis_penghargaan' => $penghargaan,
                    'tanggal_prestasi' => $faker->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
                    'penyelenggara' => $faker->company,
                    'keterangan' => $faker->sentence,
                    'bukti_file_path' => $faker->optional()->url,
                ]);
            }
        }
    }
}