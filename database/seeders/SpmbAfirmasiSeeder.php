<?php

namespace Database\Seeders;

use App\Models\SpmbAfirmasi;
use App\Models\SpmbApplicant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SpmbAfirmasiSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $applicants = SpmbApplicant::all();

        foreach ($applicants as $applicant) {
            if ($faker->boolean(30)) { // 30% have afirmasi
                SpmbAfirmasi::create([
                    'spmb_applicant_id' => $applicant->id,
                    'jenis_afirmasi' => $faker->randomElement(['kip', 'pkh', 'kjp_plus', 'yayasan', 'kemiskinan']),
                    'nomor_kartu' => $faker->bothify('??#########'),
                    'nama_penerima_kartu' => $faker->name,
                    'penghasilan_ortu_per_bulan' => $faker->numberBetween(1000000, 5000000),
                    'keterangan' => $faker->sentence,
                    'bukti_file_path' => $faker->optional()->url,
                    'terverifikasi' => $faker->boolean(70),
                ]);
            }
        }
    }
}