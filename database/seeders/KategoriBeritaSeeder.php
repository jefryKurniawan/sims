<?php

namespace Database\Seeders;

use App\Models\KategoriBerita;
use Illuminate\Database\Seeder;

class KategoriBeritaSeeder extends Seeder
{
    public function run()
    {
        $kategori = [
            ['nama' => 'Prestasi Sekolah', 'is_active' => '0'],
            ['nama' => 'Kegiatan Siswa', 'is_active' => '0'],
            ['nama' => 'Pengumuman', 'is_active' => '0'],
            ['nama' => 'Informasi Akademik', 'is_active' => '0'],
            ['nama' => 'Berita Umum', 'is_active' => '0'],
        ];

        foreach ($kategori as $item) {
            KategoriBerita::firstOrCreate(['nama' => $item['nama']], $item);
        }
    }
}