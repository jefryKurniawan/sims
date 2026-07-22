<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\MbgSpecialCondition;

class MbgSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Tambah Role PPH jika belum ada
        Role::firstOrCreate(['name' => 'PPH', 'guard_name' => 'web']);

        // 2. Seed kondisi khusus default
        $conditions = [
            ['nama' => 'Alergi Kacang Tanah', 'kategori' => 'alergi', 'deskripsi' => 'Alergi terhadap kacang tanah dan produk turunannya'],
            ['nama' => 'Alergi Susu Sapi (Laktosa)', 'kategori' => 'intoleransi', 'deskripsi' => 'Intoleransi laktosa, tidak bisa minum susu sapi'],
            ['nama' => 'Alergi Telur', 'kategori' => 'alergi', 'deskripsi' => 'Alergi terhadap putih/kuning telur'],
            ['nama' => 'Alergi Ikan', 'kategori' => 'alergi', 'deskripsi' => 'Alergi terhadap ikan dan seafood'],
            ['nama' => 'Alergi Udang', 'kategori' => 'alergi', 'deskripsi' => 'Alergi terhadap udang dan krustasea'],
            ['nama' => 'Alergi Gluten (Celiac)', 'kategori' => 'intoleransi', 'deskripsi' => 'Intoleransi gluten, tidak bisa mengonsumsi tepung terigu'],
            ['nama' => 'Vegetarian', 'kategori' => 'vegetarian', 'deskripsi' => 'Tidak mengonsumsi daging/ikan/hewani'],
            ['nama' => 'Vegan', 'kategori' => 'vegetarian', 'deskripsi' => 'Tidak mengonsumsi seluruh produk hewani'],
            ['nama' => 'Pantangan Daging Sapi', 'kategori' => 'pantangan', 'deskripsi' => 'Tidak mengonsumsi daging sapi karena alasan agama/kepercayaan'],
            ['nama' => 'Diabetes', 'kategori' => 'pantangan', 'deskripsi' => 'Pantangan gula berlebih'],
        ];

        foreach ($conditions as $cond) {
            MbgSpecialCondition::firstOrCreate(
                ['nama' => $cond['nama']],
                $cond
            );
        }

        // 3. Seed menu MBG (sample menu for a week)
        $menus = [
            ['tanggal' => now()->startOfWeek(), 'menu' => 'Nasi, Ayam Goreng, Sayur Sop, Pisang, Susu'],
            ['tanggal' => now()->startOfWeek()->addDay(), 'menu' => 'Nasi, Ikan Bumbu Kuning, Tumis Kangkung, Jeruk, Air Putih'],
            ['tanggal' => now()->startOfWeek()->addDays(2), 'menu' => 'Nasi, Telur Balado, Sayur Bayam, Apel, Susu'],
            ['tanggal' => now()->startOfWeek()->addDays(3), 'menu' => 'Nasi, Rendang Sapi, Urap Sayur, Pisang, Air Putih'],
            ['tanggal' => now()->startOfWeek()->addDays(4), 'menu' => 'Nasi Goreng, Sosis Ayam, Lalapan, Semangka, Susu'],
        ];

        foreach ($menus as $menu) {
            \App\Models\MbgMealMenu::firstOrCreate(
                ['tanggal' => $menu['tanggal']->toDateString()],
                $menu
            );
        }

        $this->command->info('MBG Seeder: Role PPH, kondisi khusus, dan menu sample berhasil dibuat.');
    }
}
