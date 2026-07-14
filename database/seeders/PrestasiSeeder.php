<?php

namespace Database\Seeders;

use App\Models\Prestasi;
use App\Models\Siswa;
use Illuminate\Database\Seeder;

class PrestasiSeeder extends Seeder
{
    public function run(): void
    {
        $siswaIds = Siswa::pluck('id')->toArray();

        if (empty($siswaIds)) {
            $this->command->warn('Tidak ada data siswa. Jalankan SiswaSeeder terlebih dahulu.');
            return;
        }

        $records = [
            ['siswa_id' => null, 'jenis' => 'akademik', 'prestasi' => 'Juara 1 Olimpiade Matematika Nasional',      'tingkat' => 'Nasional',     'tanggal' => '2025-09-15', 'keterangan' => 'Diselenggarakan oleh Kemdikbud'],
            ['siswa_id' => null, 'jenis' => 'akademik', 'prestasi' => 'Juara 2 Kompetisi Sains Terpadu Provinsi',     'tingkat' => 'Provinsi',     'tanggal' => '2025-10-20', 'keterangan' => null],
            ['siswa_id' => null, 'jenis' => 'akademik', 'prestasi' => 'Medali Emas OSN Fisika Tingkat Kota',          'tingkat' => 'Kota',         'tanggal' => '2025-08-05', 'keterangan' => 'OSN tingkat kota/kabupaten'],
            ['siswa_id' => null, 'jenis' => 'nonakademik', 'prestasi' => 'Juara 1 Lomba Pidato Bahasa Inggris',      'tingkat' => 'Provinsi',     'tanggal' => '2025-11-10', 'keterangan' => 'FLS2N cabang pidato'],
            ['siswa_id' => null, 'jenis' => 'nonakademik', 'prestasi' => 'Juara 3 FLS2N Tari Tradisional Nasional',   'tingkat' => 'Nasional',     'tanggal' => '2025-12-01', 'keterangan' => 'Tari Saman Aceh'],
            ['siswa_id' => null, 'jenis' => 'nonakademik', 'prestasi' => 'Best Speaker Debate Competition',          'tingkat' => 'Internasional','tanggal' => '2026-01-22', 'keterangan' => 'ASEAN Youth Debate'],
            ['siswa_id' => null, 'jenis' => 'akademik', 'prestasi' => 'Juara Harapan 1 KSN Ekonomi',                 'tingkat' => 'Nasional',     'tanggal' => '2025-07-30', 'keterangan' => null],
            ['siswa_id' => null, 'jenis' => 'nonakademik', 'prestasi' => 'Juara 1 Basket Putri Antar-SMA Se-Jawa',   'tingkat' => 'Provinsi',     'tanggal' => '2025-12-18', 'keterangan' => 'Turnamen DBL'],
            ['siswa_id' => null, 'jenis' => 'akademik', 'prestasi' => 'Gold Medal International Math Olympiad',      'tingkat' => 'Internasional','tanggal' => '2026-03-05', 'keterangan' => 'IMO Singapura'],
            ['siswa_id' => null, 'jenis' => 'nonakademik', 'prestasi' => 'Juara Umum Pramuka Penggalang Tingkat Kota','tingkat' => 'Kota',         'tanggal' => '2025-09-28', 'keterangan' => 'Jambore Ranting'],
            ['siswa_id' => null, 'jenis' => 'nonakademik', 'prestasi' => 'Gold Medal Karate Kumite -55kg',           'tingkat' => 'Nasional',     'tanggal' => '2026-02-14', 'keterangan' => 'Kejuaraan Nasional FORKI'],
            ['siswa_id' => null, 'jenis' => 'akademik', 'prestasi' => 'Finalis Lomba Karya Tulis Ilmiah Remaja',     'tingkat' => 'Nasional',     'tanggal' => '2026-04-10', 'keterangan' => 'LIPI'],
        ];

        $shuffledIds = $siswaIds;
        shuffle($shuffledIds);

        foreach ($records as $i => $record) {
            $record['siswa_id'] = $shuffledIds[$i % count($shuffledIds)];
            Prestasi::create($record);
        }

        $this->command->info('PrestasiSeeder: ' . count($records) . ' prestasi berhasil dibuat.');
    }
}
