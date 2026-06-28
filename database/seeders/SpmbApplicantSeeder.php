<?php

namespace Database\Seeders;

use App\Models\SpmbApplicant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Faker\Factory as Faker;

class SpmbApplicantSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        // Create 30 applicants
        for ($i = 0; $i < 30; $i++) {
            $tanggalLahir = $faker->dateTimeBetween('-20 years', '-10 years');
            $tanggalNow = now();

            $applicant = SpmbApplicant::create([
                'nomor_registrasi' => 'SPMB' . strtoupper(Str::random(6)) . sprintf('%04d', $i+1),
                'nama_lengkap' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'nisn' => $faker->unique()->numerify('##########'), // 10 digits
                'nik' => $faker->unique()->numerify('################'), // 16 digits
                'no_kk' => $faker->optional()->numerify('################'),
                'no_hp' => $faker->phoneNumber,
                'alamat' => $faker->address,
                'asal_sekolah' => $faker->company,
                // Orang tua
                'nama_ayah' => $faker->name,
                'nik_ayah' => $faker->optional()->numerify('################'),
                'no_hp_ayah' => $faker->phoneNumber,
                'pekerjaan_ayah' => $faker->jobTitle,
                'nama_ibu' => $faker->name,
                'nik_ibu' => $faker->optional()->numerify('################'),
                'no_hp_ibu' => $faker->phoneNumber,
                'pekerjaan_ibu' => $faker->jobTitle,
                'nama_wali' => $faker->optional()->name,
                'no_hp_wali' => $faker->optional()->phoneNumber,
                // Alamat lengkap
                'alamat_jalan' => $faker->streetAddress,
                'rt' => $faker->regexify('[0-9]{1,3}'),
                'rw' => $faker->regexify('[0-9]{1,3}'),
                'nama_dusun' => $faker->optional()->city,
                'desa_kelurahan' => $faker->city,
                'kecamatan' => $faker->city,
                'kode_pos' => $faker->postcode,
                // Info tambahan
                'jenis_kelamin' => $faker->randomElement(['L', 'P']),
                'tanggal_lahir' => $tanggalLahir,
                'tempat_lahir' => $faker->city,
                'agama' => $faker->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
                // Status fields
                'status' => $faker->randomElement(['draft', 'submitted', 'verified']),
                'status_pendaftaran' => $faker->randomElement(['draft', 'submitted', 'verifikasi_berkas', 'lulus_seleksi', 'daftar_ulang', 'diterima', 'ditolak']),
                'submitted_at' => $faker->optional()->dateTimeBetween('-30 days', '-5 days'),
                'verified_at' => $faker->optional()->dateTimeBetween('-5 days', 'now'),
            ]);

            // Optionally set submitted_at / verified_at based on status
            if ($applicant->status === 'submitted' || $applicant->status === 'verified') {
                $applicant->submitted_at = $faker->dateTimeBetween('-60 days', '-10 days');
                $applicant->save();
            }
            if ($applicant->status === 'verified') {
                $applicant->verified_at = $faker->dateTimeBetween('-30 days', '-5 days');
                $applicant->save();
            }
        }
    }
}