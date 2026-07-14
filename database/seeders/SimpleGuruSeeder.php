<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SimpleGuruSeeder extends Seeder
{
    public function run(): void
    {
        $count = DB::table('guru')->count();
        if ($count > 0) {
            $this->command->info('Tabel guru sudah ada data.');
            return;
        }

        $gurus = [
            ['nama_lengkap' => 'Ahmad Fauzi, S.Pd.', 'nuptk' => '6543210001', 'jenis_kelamin' => 'L', 'tempat_lahir' => 'Jakarta', 'tanggal_lahir' => '1985-05-15', 'agama' => 'Islam', 'alamat' => 'Jl. Merdeka 10, Jakarta', 'no_telp' => '081234567890', 'email' => 'ahmad@sekolah.sch.id', 'jenis' => 'Guru', 'bidang_studi' => 'Matematika', 'jabatan' => 'Guru Mapel', 'status_kepegawaian' => 'Tetap Yayasan', 'tanggal_masuk' => '2015-07-01'],
            ['nama_lengkap' => 'Siti Nurhaliza, S.Pd.', 'nuptk' => '6543210002', 'jenis_kelamin' => 'P', 'tempat_lahir' => 'Bandung', 'tanggal_lahir' => '1988-08-22', 'agama' => 'Islam', 'alamat' => 'Jl. Sudirman 45, Bandung', 'no_telp' => '082345678901', 'email' => 'siti@sekolah.sch.id', 'jenis' => 'Guru', 'bidang_studi' => 'Bahasa Indonesia', 'jabatan' => 'Guru Mapel', 'status_kepegawaian' => 'Tetap Yayasan', 'tanggal_masuk' => '2016-01-15'],
            ['nama_lengkap' => 'Dewi Lestari, S.Si.', 'nuptk' => '6543210003', 'jenis_kelamin' => 'P', 'tempat_lahir' => 'Surabaya', 'tanggal_lahir' => '1990-03-10', 'agama' => 'Islam', 'alamat' => 'Jl. Ahmad Yani 78, Surabaya', 'no_telp' => '083456789012', 'email' => 'dewi@sekolah.sch.id', 'jenis' => 'Guru', 'bidang_studi' => 'Fisika', 'jabatan' => 'Guru Mapel', 'status_kepegawaian' => 'Tetap Yayasan', 'tanggal_masuk' => '2017-07-01'],
            ['nama_lengkap' => 'Muhammad Rizki, S.Kom.', 'nuptk' => '6543210004', 'jenis_kelamin' => 'L', 'tempat_lahir' => 'Yogyakarta', 'tanggal_lahir' => '1992-11-05', 'agama' => 'Islam', 'alamat' => 'Jl. Malioboro 12, Yogyakarta', 'no_telp' => '084567890123', 'email' => 'rizki@sekolah.sch.id', 'jenis' => 'Guru', 'bidang_studi' => 'TIK', 'jabatan' => 'Guru Mapel', 'status_kepegawaian' => 'Tetap Yayasan', 'tanggal_masuk' => '2018-01-15'],
            ['nama_lengkap' => 'Rina Wati, S.Pd.', 'nuptk' => '6543210005', 'jenis_kelamin' => 'P', 'tempat_lahir' => 'Medan', 'tanggal_lahir' => '1987-07-20', 'agama' => 'Kristen', 'alamat' => 'Jl. Diponegoro 33, Medan', 'no_telp' => '085678901234', 'email' => 'rina@sekolah.sch.id', 'jenis' => 'Guru', 'bidang_studi' => 'Bahasa Inggris', 'jabatan' => 'Guru Mapel', 'status_kepegawaian' => 'Tetap Yayasan', 'tanggal_masuk' => '2016-07-01'],
            ['nama_lengkap' => 'Budi Santoso', 'nuptk' => '6543210006', 'jenis_kelamin' => 'L', 'tempat_lahir' => 'Semarang', 'tanggal_lahir' => '1991-04-12', 'agama' => 'Islam', 'alamat' => 'Jl. Pandanaran 20, Semarang', 'no_telp' => '086789012345', 'email' => 'budi@sekolah.sch.id', 'jenis' => 'Tenaga Kependidikan', 'bidang_studi' => null, 'jabatan' => 'Staff TU', 'status_kepegawaian' => 'Kontrak', 'tanggal_masuk' => '2019-01-15'],
            ['nama_lengkap' => 'Anita Sari, S.E.', 'nuptk' => '6543210007', 'jenis_kelamin' => 'P', 'tempat_lahir' => 'Palembang', 'tanggal_lahir' => '1993-09-08', 'agama' => 'Islam', 'alamat' => 'Jl. Jend. Sudirman 100, Palembang', 'no_telp' => '087890123456', 'email' => 'anita@sekolah.sch.id', 'jenis' => 'Tenaga Kependidikan', 'bidang_studi' => null, 'jabatan' => 'Bendahara', 'status_kepegawaian' => 'Tetap Yayasan', 'tanggal_masuk' => '2018-07-01'],
            ['nama_lengkap' => 'Joko Widodo, S.Or.', 'nuptk' => '6543210008', 'jenis_kelamin' => 'L', 'tempat_lahir' => 'Solo', 'tanggal_lahir' => '1989-06-21', 'agama' => 'Islam', 'alamat' => 'Jl. Slamet Riyadi 55, Solo', 'no_telp' => '088901234567', 'email' => 'joko@sekolah.sch.id', 'jenis' => 'Guru', 'bidang_studi' => 'Penjas', 'jabatan' => 'Guru Mapel', 'status_kepegawaian' => 'Tetap Yayasan', 'tanggal_masuk' => '2017-01-15'],
        ];

        foreach ($gurus as $guru) {
            DB::table('guru')->insert($guru);
        }

        $this->command->info('Berhasil menambahkan ' . count($gurus) . ' data GTK.');
    }
}
