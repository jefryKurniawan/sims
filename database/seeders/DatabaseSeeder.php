<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            AddRoleSeeder::class,
            UserSeeder::class,
            IndoBankSeeder::class,
            SettingSeeder::class,
            MenuItemsSeeder::class,
            KategoriBeritaSeeder::class,
            BeritaSeeder::class,
            GuruSeeder::class,
            GelombangSeeder::class,
            PengumumanPpdbSeeder::class,
            AlumniSeeder::class,
            TracerStudySeeder::class,
            DonationSeeder::class,
            SiswaSeeder::class,
            DispensasiSeeder::class,
            SpmbApplicantSeeder::class,
            SpmbAfirmasiSeeder::class,
            SpmbPrestasiSeeder::class,
            SpmbNilaiAkademikSeeder::class,
            SpmbTkaSeeder::class,
            SpmbConfigSeeder::class,
            SpmbRankingSeeder::class,
            ForumThreadSeeder::class,
            ForumReplySeeder::class,
        ]);
    }
}