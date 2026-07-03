<?php

namespace Database\Seeders;

use App\Models\Siswa;
use App\Models\SppTagihan;
use Illuminate\Database\Seeder;

class SppTagihanSeeder extends Seeder
{
    public function run(): void
    {
        $siswa = Siswa::all();

        if ($siswa->isEmpty()) {
            $this->command->warn('Tidak ada data siswa. Jalankan SiswaSeeder terlebih dahulu.');
            return;
        }

        $months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];

        foreach ($siswa as $s) {
            // Generate tagihan for last 3 months
            foreach (range(0, 3) as $i) {
                $date = now()->subMonths($i);
                $status = $i === 0 ? 'belum_lunas' : fake()->randomElement(['lunas', 'belum_lunas']);

                SppTagihan::create([
                    'siswa_id' => $s->id,
                    'nominal' => 300000,
                    'status' => $status,
                    'tanggal_jatuh_tempo' => $date->format('Y-m') . '-10',
                    'keterangan' => 'SPP Bulan ' . $months[$date->month - 1] . ' ' . $date->year,
                ]);
            }
        }

        $this->command->info('Seeder SPP Tagihan berhasil: ' . SppTagihan::count() . ' tagihan dibuat.');
    }
}
