<?php

namespace Database\Seeders;

use App\Models\PengumumanPpdb;
use Illuminate\Database\Seeder;

class PengumumanPpdbSeeder extends Seeder
{
    public function run(): void
    {
        PengumumanPpdb::create([
            'judul' => 'Informasi PPDB Tahun Ajaran 2026/2027',
            'isi' => 'Penerimaan Peserta Didik Baru tahun ajaran 2026/2027 telah dibuka. Silakan melakukan pendaftaran secara online melalui website resmi sekolah.',
            'tanggal_publish' => now(),
            'status' => 'published',
        ]);
    }
}
