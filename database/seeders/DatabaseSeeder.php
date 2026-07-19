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
        $this->call([
            RoleSeeder::class,
            AddRoleSeeder::class,
            BlogRolePermissionSeeder::class,
            TUSeeder::class,
            SuratMasukSeeder::class,
            SuratKeluarSeeder::class,
            ArsipAkreditasiSeeder::class,
            UserSeeder::class,
            IndoBankSeeder::class,
            SettingSeeder::class,
            MenuItemsSeeder::class,
            KategoriBeritaSeeder::class,
            BeritaSeeder::class,
            GuruSeeder::class,
            KelasSeeder::class, // added
            SiswaSeeder::class,
            SiswaKelasSeeder::class, // added
            BukuIndukDataSeeder::class, // buku induk digital sample data
            GelombangSeeder::class,
            PengumumanPpdbSeeder::class,
            AlumniSeeder::class,
            TracerStudySeeder::class,
            PopulateNisSeeder::class, // populate NIS for existing siswa
            SaranaPrasaranaSeeder::class, // added
            DispensasiSeeder::class,
            BukuSeeder::class, // added (perpustakaan buku)
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
        ]);
    }
}
