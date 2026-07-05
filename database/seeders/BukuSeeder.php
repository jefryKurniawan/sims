<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class BukuSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $jumlah = 75; // between 50-100

        for ($i = 0; $i < $jumlah; $i++) {
            DB::table('perpustakaan_buku')->insert([
                'judul' => $faker->sentence(4),
                'penulis' => $faker->name,
                'penerbit' => $faker->optional()->company,
                'tahun_terbit' => $faker->optional()->year,
                'isbn' => $faker->optional()->isbn13,
                'kategori' => $faker->randomElement(['Fiksi', 'Non-Fiksi', 'Sains', 'Sastra']),
                'deskripsi' => $faker->paragraph,
                'jumlah_halaman' => $faker->optional()->numberBetween(50, 500),
                'jumalah_stok' => $faker->numberBetween(0, 30),
                'lokasi_rak' => $faker->bothify('??-##'),
                'file_cover' => $faker->optional()->imageUrl(300, 400, 'books', true),
                'tersedia' => $faker->boolean(80),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info("Buku seeder completed: {$jumlah} buku created.");
    }
}