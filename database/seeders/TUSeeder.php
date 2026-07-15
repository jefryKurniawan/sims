<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class TUSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Buat role TU jika belum ada
        $tuRole = Role::firstOrCreate([
            'name' => 'TU',
            'guard_name' => 'web'
        ]);
        $this->command->info('Role TU created/exists.');

        // Permissions untuk Surat Masuk
        $suratMasukPerms = [
            'surat-masuk.view',
            'surat-masuk.create',
            'surat-masuk.edit',
            'surat-masuk.delete',
            'surat-masuk.disposisi',
            'surat-masuk.arsipkan',
        ];

        // Permissions untuk Surat Keluar
        $suratKeluarPerms = [
            'surat-keluar.view',
            'surat-keluar.create',
            'surat-keluar.edit',
            'surat-keluar.delete',
            'surat-keluar.arsipkan',
        ];

        // Permissions untuk Arsip Akreditasi
        $arsipAkreditasiPerms = [
            'arsip-akreditasi.view',
            'arsip-akreditasi.create',
            'arsip-akreditasi.edit',
            'arsip-akreditasi.delete',
        ];

        // Permissions untuk NISN Management
        $nisnManagementPerms = [
            'nisn-management.view',
            'nisn-management.edit',
            'nisn-management.sync',
            'nisn-management.regenerate',
        ];

        $allPerms = [...$suratMasukPerms, ...$suratKeluarPerms, ...$arsipAkreditasiPerms, ...$nisnManagementPerms];

        foreach ($allPerms as $perm) {
            Permission::firstOrCreate([
                'name' => $perm,
                'guard_name' => 'web'
            ]);
        }
        $this->command->info('TU Permissions created.');

        // Assign permissions ke TU role
        $tuRole->givePermissionTo($allPerms);
        $this->command->info('Permissions assigned to TU role.');

        // Admin juga dapat semua TU permissions
        $adminRole = Role::where('name', 'Admin')->first();
        if ($adminRole) {
            $adminRole->givePermissionTo($allPerms);
            $this->command->info('TU Permissions assigned to Admin role.');
        }

        // Staf juga mendapatkan view & create permissions
        $stafRole = Role::where('name', 'Staf')->first();
        if ($stafRole) {
            $stafRole->givePermissionTo([
                'surat-masuk.view',
                'surat-masuk.create',
                'surat-keluar.view',
                'arsip-akreditasi.view',
                'nisn-management.view',
            ]);
            $this->command->info('View permissions assigned to Staf role.');
        }
    }
}
