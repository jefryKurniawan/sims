<?php

namespace Database\Seeders;

use App\Models\Gelombang;
use Illuminate\Database\Seeder;

class GelombangSeeder extends Seeder
{
    public function run(): void
    {
        Gelombang::create([
            'nama' => 'Gelombang 1',
            'tanggal_mulai' => now()->subMonth(),
            'tanggal_selesai' => now()->addMonth(),
            'kuota' => 100,
            'biaya_pendaftaran' => 150000,
            'is_active' => true,
        ]);

        Gelombang::create([
            'nama' => 'Gelombang 2',
            'tanggal_mulai' => now()->addMonth(),
            'tanggal_selesai' => now()->addMonths(2),
            'kuota' => 80,
            'biaya_pendaftaran' => 200000,
            'is_active' => true,
        ]);
    }
}
