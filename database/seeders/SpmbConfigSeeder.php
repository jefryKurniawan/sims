<?php

namespace Database\Seeders;

use App\Models\SpmbConfig;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory as Faker;

class SpmbConfigSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $tahun = date('Y') . '/' . (date('Y') + 1);

        SpmbConfig::create([
            'tahun_ajaran' => $tahun,
            'kuota_total' => 120,
            'kuota_reguler' => 60,
            'kuota_afirmasi' => 30,
            'kuota_prestasi' => 30,
            'biaya_pendaftaran' => 150000,
            'uang_pendaftaran' => 500000,
            'tanggal_buka' => Carbon::parse('2025-07-01'),
            'tanggal_tutup' => Carbon::parse('2025-08-15'),
            'tanggal_pengumuman' => Carbon::parse('2025-09-01'),
            'tanggal_daftar_ulang' => Carbon::parse('2025-09-10'),
            'aktif' => true,
        ]);
    }
}