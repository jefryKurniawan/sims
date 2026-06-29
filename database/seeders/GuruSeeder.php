<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;
use App\Models\Guru;
use App\Models\User;
use App\Models\UsersDetail;
use Carbon\Carbon;

class GuruSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Guru::truncate();
        User::where('role', 'Guru')->delete();
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
                'nama_lengkap' => 'Eka Fitriani, S.Pd.',
                'nuptk' => '123456789015',
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
        ];

        foreach ($gurus as $guru) {
            // Create in Guru table
            $guruRecord = Guru::create($guru);

            // Also create User + UsersDetail for frontend display
            $usernameSlug = \Illuminate\Support\Str::slug($guru['nama_lengkap']);
            $user = User::create([
                'name' => $guru['nama_lengkap'],
                'username' => $usernameSlug,
                'email' => $guru['email'],
                'password' => Hash::make('password'),
                'role' => 'Guru',
                'status' => 'Aktif',
            ]);

            UsersDetail::create([
                'user_id' => $user->id,
                'role' => 'Guru',
                'mengajar' => $guru['bidang_studi'],
                'nip' => $guru['nuptk'],
                'email' => $guru['email'],
                'is_active' => 1,
            ]);
        }
    }
}
