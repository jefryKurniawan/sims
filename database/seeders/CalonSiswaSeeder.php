<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CalonSiswa;
use Carbon\Carbon;

class CalonSiswaSeeder extends Seeder
{
    public function run(): void
    {
        // Delete existing data first
        CalonSiswa::truncate();

        $calonSiswas = [
            [
                'nisn' => '0012345678',
                'nama_lengkap' => 'Ahmad Fauzi',
                'tempat_lahir' => 'Jakarta',
                'tanggal_lahir' => '2008-05-15',
                'jenis_kelamin' => 'L',
                'alamat' => 'Jl. Merdeka No. 123, Jakarta Selatan',
                'no_hp' => '081234567890',
                'email' => 'ahmad.fauzi@email.com',
                'nama_ortu' => 'Budi Santoso',
                'no_hp_ortu' => '081234567891',
                'asal_sekolah' => 'SMP Negeri 1 Jakarta',
                'prestasi' => 'Juara 1 Olimpiade Matematika Tingkat Kota',
                'status' => 'pendaftaran',
                'tanggal_daftar' => Carbon::now(),
                'biaya_pendaftaran' => 500000,
                'keputusan' => 'belum',
            ],
            [
                'nisn' => '0012345679',
                'nama_lengkap' => 'Siti Nurhaliza',
                'tempat_lahir' => 'Bandung',
                'tanggal_lahir' => '2008-08-20',
                'jenis_kelamin' => 'P',
                'alamat' => 'Jl. Asia Afrika No. 456, Bandung',
                'no_hp' => '082345678901',
                'email' => 'siti.nurhaliza@email.com',
                'nama_ortu' => 'Dewi Lestari',
                'no_hp_ortu' => '082345678902',
                'asal_sekolah' => 'SMP Negeri 5 Bandung',
                'prestasi' => 'Juara 2 Lomba Karya Ilmiah Tingkat Provinsi',
                'status' => 'seleksi',
                'tanggal_daftar' => Carbon::now()->subDays(5),
                'biaya_pendaftaran' => 500000,
                'keputusan' => 'belum',
            ],
            [
                'nisn' => '0012345680',
                'nama_lengkap' => 'Rizky Pratama',
                'tempat_lahir' => 'Surabaya',
                'tanggal_lahir' => '2008-03-10',
                'jenis_kelamin' => 'L',
                'alamat' => 'Jl. Tegal Arbeel No. 789, Surabaya',
                'no_hp' => '083456789012',
                'email' => 'rizky.pratama@email.com',
                'nama_ortu' => 'Agus Setiawan',
                'no_hp_ortu' => '083456789013',
                'asal_sekolah' => 'SMP Kristen Surabaya',
                'prestasi' => null,
                'status' => 'lulus',
                'tanggal_daftar' => Carbon::now()->subDays(10),
                'biaya_pendaftaran' => 500000,
                'keputusan' => 'diterima',
                'catatan' => 'Siap mendaftar ulang',
            ],
            [
                'nisn' => '0012345681',
                'nama_lengkap' => 'Dewi Sartika',
                'tempat_lahir' => 'Yogyakarta',
                'tanggal_lahir' => '2008-12-05',
                'jenis_kelamin' => 'P',
                'alamat' => 'Jl. Malioboro No. 321, Yogyakarta',
                'no_hp' => '084567890123',
                'email' => 'dewi.sartika@email.com',
                'nama_ortu' => 'Sri Mulyani',
                'no_hp_ortu' => '084567890124',
                'asal_sekolah' => 'SMP Negeri 3 Yogyakarta',
                'prestasi' => 'Juara 1 Lomba Menyanyi Tingkat Kabupaten',
                'status' => 'lulus',
                'tanggal_daftar' => Carbon::now()->subDays(7),
                'biaya_pendaftaran' => 500000,
                'keputusan' => 'diterima',
            ],
            [
                'nisn' => '0012345682',
                'nama_lengkap' => 'Eko Wijaya',
                'tempat_lahir' => 'Medan',
                'tanggal_lahir' => '2008-07-25',
                'jenis_kelamin' => 'L',
                'alamat' => 'Jl. Gatot Subroto No. 654, Medan',
                'no_hp' => '085678901234',
                'email' => 'eko.wijaya@email.com',
                'nama_ortu' => 'Hendra Gunawan',
                'no_hp_ortu' => '085678901235',
                'asal_sekolah' => 'SMP Negeri 2 Medan',
                'prestasi' => null,
                'status' => 'tidak_lulus',
                'tanggal_daftar' => Carbon::now()->subDays(15),
                'biaya_pendaftaran' => 500000,
                'keputusan' => 'ditolak',
                'catatan' => 'Tidak memenuhi syarat akademik',
            ],
        ];

        foreach ($calonSiswas as $calonSiswa) {
            CalonSiswa::create($calonSiswa);
        }
    }
}