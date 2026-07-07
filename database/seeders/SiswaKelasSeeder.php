<?php

namespace Database\Seeders;

use App\Models\Siswa;
use App\Models\Kelas;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class SiswaKelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all siswa and kelas
        $siswa = Siswa::all();
        $kelas = Kelas::all();

        if ($siswa->isEmpty() || $kelas->isEmpty()) {
            $this->command->info('No siswa or kelas found. Skipping SiswaKelasSeeder.');
            return;
        }

        // We'll assign each siswa to a random kelas (could be same kelas for many siswa)
        // To spread out, we can shuffle kelas and assign in round-robin.
        $kelasList = $kelas->shuffle()->values()->all();
        $kelasCount = count($kelasList);

        $data = [];
        foreach ($siswa as $index => $siswaItem) {
            $kelasItem = $kelasList[$index % $kelasCount];
            $data[] = [
                'siswa_id' => $siswaItem->id,
                'kelas_id' => $kelasItem->id,
                'status' => 'aktif',
                'tanggal_masuk_kelas' => $siswaItem->tanggal_masuk ?: Carbon::now()->toDateString(),
                'tanggal_keluar_kelas' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        // Truncate table to avoid duplicate entries when seeder is run multiple times
        DB::table('siswa_kelas')->truncate();

        // Insert in chunks to avoid memory issues
        foreach (array_chunk($data, 500) as $chunk) {
            DB::table('siswa_kelas')->insert($chunk);
        }

        $this->command->info('SiswaKelas seeder completed: ' . count($data) . ' records created.');
    }
}