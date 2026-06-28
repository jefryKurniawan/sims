<?php

namespace Database\Seeders;

use App\Models\SpmbTka;
use App\Models\SpmbApplicant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SpmbTkaSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $applicants = SpmbApplicant::all();

        foreach ($applicants as $applicant) {
            // 60% chance of having TKA record
            if ($faker->boolean(60)) {
                $nilaiMat = $faker->randomFloat(2, 0, 100);
                $nilaiIPA = $faker->randomFloat(2, 0, 100);
                $nilaiIPS = $faker->randomFloat(2, 0, 100);
                $nilaiBahasaIndo = $faker->randomFloat(2, 0, 100);
                $nilaiBahasaIng = $faker->randomFloat(2, 0, 100);
                $nilaiIQ = $faker->randomFloat(2, 80, 140);
                $nilaiTotal = ($nilaiMat + $nilaiIPA + $nilaiIPS + $nilaiBahasaIndo + $nilaiBahasaIng + $nilaiIQ) / 6;

                SpmbTka::create([
                    'spmb_applicant_id' => $applicant->id,
                    'tanggal_tes' => $faker->dateTimeBetween('-60 days', 'now')->format('Y-m-d'),
                    'nilai_matematika' => $nilaiMat,
                    'nilai_ipa' => $nilaiIPA,
                    'nilai_ips' => $nilaiIPS,
                    'nilai_bahasa_indonesia' => $nilaiBahasaIndo,
                    'nilai_bahasa_inggris' => $nilaiBahasaIng,
                    'nilai_iq' => $nilaiIQ,
                    'nilai_total' => $nilaiTotal,
                    'ruangan' => $faker->optional()->lexify('???'),
                    'peserta_nomor' => $faker->unique()->bothify('######'),
                ]);
            }
        }
    }
}