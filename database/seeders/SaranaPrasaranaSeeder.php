<?php

namespace Database\Seeders;

use App\Models\SaranaPrasarana;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SaranaPrasaranaSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $categories = ['ruangan', 'laboratorium', 'perpustakaan', 'olahraga', 'ibadah', 'sanitasi', 'teknologi', 'lainnya'];
        $conditions = ['baik', 'rusak_ringan', 'rusak_berat'];

        for ($i = 0; $i < 30; $i++) {
            SaranaPrasarana::create([
                'nama' => $faker->word . ' ' . $faker->word,
                'kategori' => $faker->randomElement($categories),
                'deskripsi' => $faker->sentence,
                'lokasi' => $faker->address,
                'kapasitas' => $faker->numberBetween(10, 200),
                'kondisi' => $faker->randomElement($conditions),
                'foto' => $faker->optional()->imageUrl(640, 480, 'facility', true),
                'tahun_pengadaan' => $faker->year,
                'sumber_dana' => $faker->randomElement(['APBD', 'BOS', 'Donasi', 'CSR']),
            ]);
        }

        $this->command->info('Sarana Prasarana seeder completed: 30 items created.');
    }
}