<?php

namespace Database\Seeders;

use App\Models\TracerStudy;
use App\Models\Alumni;
use Illuminate\Database\Seeder;

class TracerStudySeeder extends Seeder
{
    public function run(): void
    {
        $alumni = Alumni::all();
        if ($alumni->isEmpty()) {
            $this->command->info('No alumni found, skipping tracer seed.');
            return;
        }

        foreach ($alumni as $index => $alumniRecord) {
            TracerStudy::create([
                'alumni_id' => $alumniRecord->id,
                'nama_lengkap' => $alumniRecord->user->name ?? fake()->name(),
                'jenjang_pendidikan' => fake()->randomElement(['S1', 'S2', 'D3', 'SMA']),
                'nama_instansi' => fake()->company(),
                'bidang_studi' => fake()->word(),
                'tahun_lulus' => $alumniRecord->tahun_lulus,
                'status' => fake()->randomElement(['kuliah', 'bekerja', 'wirausaha', 'tidak_bekerja']),
                'alamat' => $alumniRecord->alamat,
                'no_telp' => $alumniRecord->no_telp,
                'linkedin' => $alumniRecord->linkedin,
            ]);
        }
    }
}