<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\KategoriBerita;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class BeritaSeeder extends Seeder
{
    public function run()
    {
        $kategoriIds = KategoriBerita::pluck('id')->toArray();
        $userIds = User::pluck('id')->toArray();

        if (empty($kategoriIds) || empty($userIds)) {
            return;
        }

        $faker = Faker::create('id_ID');

        $beritas = [
            'Siswa Berhasil Meraih Juara Olimpiade Sains Nasional',
            'Kegiatan Bakti Sosial di Desa Binaan Sekolah',
            'Pengumuman Kelulusan Tahun Ajaran 2025/2026',
            'Workshop Pengembangan Diri untuk Siswa Kelas XII',
            'Kunjungan Industri ke Perusahaan Teknologi Terkemuka',
            'Lomba Kreativitas Antar Kelas Meriahkan HUT Sekolah',
            'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027',
            'Tim Futsal Sekolah Juara Turnamen Antar Sekolah',
            'Pelatihan Guru tentang Metode Pembelajaran Inovatif',
            'Perpustakaan Sekolah Luncurkan Program Digital Reading',
        ];

        foreach ($beritas as $title) {
            $slug = Str::slug($title);
            Berita::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $title,
                    'content' => implode("\n\n", $faker->paragraphs(6)),
                    'kategori_id' => $kategoriIds[array_rand($kategoriIds)],
                    'thumbnail' => 'default.jpg',
                    'is_active' => $faker->boolean ? '1' : '0',
                    'created_by' => $userIds[array_rand($userIds)],
                ]
            );
        }
    }
}