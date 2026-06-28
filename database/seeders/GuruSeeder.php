<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Guru;
use Carbon\Carbon;

class GuruSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Guru::truncate();
        Schema::enableForeignKeyConstraints();

        $gurus = [
            [
                'nama_lengkap' => 'Dr. Hj. Aminah, S.Pd., M.Pd.',
                'nuptk' => '123456789011',
                'jenis_kelamin' => 'P',
                'tempat_lahir' => 'Jakarta',
                'tanggal_lahir' => '1980-03-15',
                'agama' => 'Islam',
                'alamat' => 'Jl. Pendidikan No. 10, Jakarta Selatan',
                'no_telp' => '081234567890',
                'email' => 'aminah@sekolah.sch.id',
                'jenis' => 'Guru',
                'bidang_studi' => 'Matematika',
                'jabatan' => 'Kepala Sekolah',
                'status_kepegawaian' => 'Tetap Yayasan',
                'tanggal_masuk' => '2010-07-01',
            ],
            [
                'nama_lengkap' => 'Budi Santoso, S.Pd.',
                'nuptk' => '123456789012',
                'jenis_kelamin' => 'L',
                'tempat_lahir' => 'Bandung',
                'tanggal_lahir' => '1985-08-22',
                'agama' => 'Islam',
                'alamat' => 'Jl. Merdeka No. 45, Bandung',
                'no_telp' => '082345678901',
                'email' => 'budi@sekolah.sch.id',
                'jenis' => 'Guru',
                'bidang_studi' => 'Bahasa Indonesia',
                'jabatan' => 'Waka Kurikulum',
                'status_kepegawaian' => 'Tetap Yayasan',
                'tanggal_masuk' => '2012-01-15',
            ],
            [
                'nama_lengkap' => 'Catherine Dewi, S.Si.',
                'nuptk' => '123456789013',
                'jenis_kelamin' => 'P',
                'tempat_lahir' => 'Surabaya',
                'tanggal_lahir' => '1990-11-03',
                'agama' => 'Kristen',
                'alamat' => 'Jl. Raya No. 78, Surabaya',
                'no_telp' => '083456789012',
                'email' => 'catherine@sekolah.sch.id',
                'jenis' => 'Guru',
                'bidang_studi' => 'IPA',
                'jabatan' => 'Guru Kelas',
                'status_kepegawaian' => 'Kontrak',
                'tanggal_masuk' => '2019-07-15',
            ],
            [
                'nama_lengkap' => 'Dwi Prasetyo',
                'nuptk' => null,
                'jenis_kelamin' => 'L',
                'tempat_lahir' => 'Yogyakarta',
                'tanggal_lahir' => '1995-05-18',
                'agama' => 'Islam',
                'alamat' => 'Jl. Pahlawan No. 12, Yogyakarta',
                'no_telp' => '084567890123',
                'email' => 'dwi@sekolah.sch.id',
                'jenis' => 'Tenaga Kependidikan',
                'bidang_studi' => null,
                'jabatan' => 'Staff Tata Usaha',
                'status_kepegawaian' => 'Tetap Yayasan',
                'tanggal_masuk' => '2018-03-01',
            ],
            [
                'nama_lengkap' => 'Eka Fitriani, S.Pd.',
                'nuptk' => '123456789014',
                'jenis_kelamin' => 'P',
                'tempat_lahir' => 'Medan',
                'tanggal_lahir' => '1992-09-27',
                'agama' => 'Islam',
                'alamat' => 'Jl. Sejahtera No. 33, Medan',
                'no_telp' => '085678901234',
                'email' => 'eka@sekolah.sch.id',
                'jenis' => 'Guru',
                'bidang_studi' => 'Bahasa Inggris',
                'jabatan' => 'Waka Kesiswaan',
                'status_kepegawaian' => 'Kontrak',
                'tanggal_masuk' => '2020-07-15',
            ],
            [
                'nama_lengkap' => 'Fajar Nugraha, S.Kom.',
                'nuptk' => null,
                'jenis_kelamin' => 'L',
                'tempat_lahir' => 'Semarang',
                'tanggal_lahir' => '1998-01-10',
                'agama' => 'Islam',
                'alamat' => 'Jl. Baru No. 5, Semarang',
                'no_telp' => '086789012345',
                'email' => 'fajar@sekolah.sch.id',
                'jenis' => 'Tenaga Kependidikan',
                'bidang_studi' => null,
                'jabatan' => 'Staff IT',
                'status_kepegawaian' => 'Kontrak',
                'tanggal_masuk' => '2021-08-01',
            ],
            [
                'nama_lengkap' => 'Gita Permata Sari, S.Ag.',
                'nuptk' => '123456789015',
                'jenis_kelamin' => 'P',
                'tempat_lahir' => 'Makassar',
                'tanggal_lahir' => '1988-12-05',
                'agama' => 'Islam',
                'alamat' => 'Jl. Indah No. 7, Makassar',
                'no_telp' => '087890123456',
                'email' => 'gita@sekolah.sch.id',
                'jenis' => 'Guru',
                'bidang_studi' => 'Pendidikan Agama Islam',
                'jabatan' => 'Guru PAI',
                'status_kepegawaian' => 'Tetap Yayasan',
                'tanggal_masuk' => '2015-07-15',
            ],
            [
                'nama_lengkap' => 'Hendra Gunawan',
                'nuptk' => null,
                'jenis_kelamin' => 'L',
                'tempat_lahir' => 'Palembang',
                'tanggal_lahir' => '1993-06-20',
                'agama' => 'Islam',
                'alamat' => 'Jl. Damai No. 21, Palembang',
                'no_telp' => '088901234567',
                'email' => 'hendra@sekolah.sch.id',
                'jenis' => 'Tenaga Kependidikan',
                'bidang_studi' => null,
                'jabatan' => 'Staff Perpustakaan',
                'status_kepegawaian' => 'Honorer',
                'tanggal_masuk' => '2022-01-10',
            ],
        ];

        foreach ($gurus as $guru) {
            Guru::create($guru);
        }
    }
}
