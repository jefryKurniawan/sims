<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Kurikulum — enable dengan uncomment baris dibawah
        // $this->call(KurikulumSeeder::class);

        $this->call([
            RoleSeeder::class,           // Main roles: Admin, Guru, Staf, Murid, Orang Tua, Alumni, Guest
            AddRoleSeeder::class,        // Additional roles: Perpustakaan, PPDB
            BlogRolePermissionSeeder::class,
            TUSeeder::class,
            UserSeeder::class,           // Must run before seeders that need users
            IndoBankSeeder::class,
            SettingSeeder::class,
            MenuItemsSeeder::class,
            SuratMasukSeeder::class,
            SuratKeluarSeeder::class,
            ArsipAkreditasiSeeder::class,
            KategoriBeritaSeeder::class,
            BeritaSeeder::class,
            GuruSeeder::class,
            KelasSeeder::class,
            SiswaSeeder::class,
            SiswaKelasSeeder::class,
            BukuIndukDataSeeder::class,
            GelombangSeeder::class,
            PengumumanPpdbSeeder::class,
            AlumniSeeder::class,
            TracerStudySeeder::class,
            PopulateNisSeeder::class,
            SaranaPrasaranaSeeder::class,
            DispensasiSeeder::class,
            BukuSeeder::class,
            PrestasiSeeder::class,
            KonselingSeeder::class,
            EventSeeder::class,
            SpmbApplicantSeeder::class,
            SpmbAfirmasiSeeder::class,
            SpmbPrestasiSeeder::class,
            SpmbNilaiAkademikSeeder::class,
            SpmbTkaSeeder::class,
            SpmbConfigSeeder::class,
            SpmbRankingSeeder::class,
            ForumThreadSeeder::class,
            ForumReplySeeder::class,
            FooterSeeder::class,
            MuridSeeder::class,
            SppTagihanSeeder::class,
            MbgSeeder::class,
        ]);
    }
}
