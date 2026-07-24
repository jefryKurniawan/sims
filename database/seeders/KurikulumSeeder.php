<?php

namespace Database\Seeders;

use App\Models\Kurikulum;
use App\Models\RaporKelas;
use App\Models\RaporMapel;
use App\Models\KurikulumMapel;
use App\Models\Skbm;
use Illuminate\Database\Seeder;

class KurikulumSeeder extends Seeder
{
    public function run(): void
    {
        // Step 1: Seed prerequisite rapor_kelas
        $kelas10 = RaporKelas::firstOrCreate(
            ['nama_kelas' => 'X-A', 'tingkat' => '10', 'tahun_ajaran' => '2024/2025'],
            ['jurusan_id' => null]
        );
        $kelas11 = RaporKelas::firstOrCreate(
            ['nama_kelas' => 'XI-A', 'tingkat' => '11', 'tahun_ajaran' => '2024/2025'],
            ['jurusan_id' => null]
        );
        $kelas12 = RaporKelas::firstOrCreate(
            ['nama_kelas' => 'XII-A', 'tingkat' => '12', 'tahun_ajaran' => '2024/2025'],
            ['jurusan_id' => null]
        );

        // Step 2: Seed prerequisite rapor_mapel
        $mapelPai = RaporMapel::firstOrCreate(
            ['nama_mapel' => 'Pendidikan Agama Islam', 'rapor_kelas_id' => $kelas10->id],
            ['kkm' => 75, 'kelompok' => 'A']
        );
        $mapelPkn = RaporMapel::firstOrCreate(
            ['nama_mapel' => 'Pendidikan Pancasila', 'rapor_kelas_id' => $kelas10->id],
            ['kkm' => 75, 'kelompok' => 'A']
        );
        $mapelBIndo = RaporMapel::firstOrCreate(
            ['nama_mapel' => 'Bahasa Indonesia', 'rapor_kelas_id' => $kelas10->id],
            ['kkm' => 75, 'kelompok' => 'A']
        );

        // Step 3: Seed kurikulum
        $kurikulum = Kurikulum::create([
            'nama' => 'Kurikulum Merdeka 2024',
            'aktif' => true,
            'keterangan' => 'Kurikulum Merdeka untuk kelas X, XI, XII',
        ]);

        $mapelData = [
            ['mapel' => $mapelPai, 'fase' => 'E', 'jam_mengajar_mingguan' => 4, 'semester' => 1],
            ['mapel' => $mapelPkn, 'fase' => 'E', 'jam_mengajar_mingguan' => 4, 'semester' => 1],
            ['mapel' => $mapelBIndo, 'fase' => 'E', 'jam_mengajar_mingguan' => 3, 'semester' => 2],
        ];

        foreach ($mapelData as $i => $m) {
            $mapel = KurikulumMapel::create([
                'kurikulum_id' => $kurikulum->id,
                'rapor_mapel_id' => $m['mapel']->id,
                'fase' => $m['fase'],
                'jam_mengajar_mingguan' => $m['jam_mengajar_mingguan'],
                'semester' => $m['semester'],
            ]);

            Skbm::create([
                'kurikulum_id' => $kurikulum->id,
                'rapor_mapel_id' => $m['mapel']->id,
                'fase' => $m['fase'],
                'kode_kd' => 'KD.' . ($i + 1) . '.' . ($i + 1),
                'deskripsi_kd' => 'Kompetensi Dasar ' . ($i + 1) . ' Fase ' . $m['fase'],
            ]);
        }

        Kurikulum::create([
            'nama' => 'Kurikulum 2013',
            'aktif' => false,
            'keterangan' => 'Kurikulum 2013 (non-aktif, masa transisi)',
        ]);

        $this->command->info('✅ Kurikulum seeded: 2 kurikulum, 3 rapor_kelas, 3 rapor_mapel, 3 kurikulum_mapel, 3 skbm');
    }
}
