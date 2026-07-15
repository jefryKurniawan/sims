<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class BlogRolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Create roles
        $admin = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $humas = Role::firstOrCreate(['name' => 'Humas', 'guard_name' => 'web']);
        $penulis = Role::firstOrCreate(['name' => 'Penulis', 'guard_name' => 'web']);

        // Create permissions
        $permissions = [
            'berita.create',
            'berita.edit',
            'berita.edit.own',
            'berita.delete',
            'berita.approve',
            'berita.publish',
            'berita.view',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // Assign permissions to roles
        // Admin: full access
        $admin->givePermissionTo([
            'berita.create',
            'berita.edit',
            'berita.edit.own',
            'berita.delete',
            'berita.approve',
            'berita.publish',
            'berita.view',
        ]);

        // Humas: can create, edit, approve, publish
        $humas->givePermissionTo([
            'berita.create',
            'berita.edit',
            'berita.approve',
            'berita.publish',
            'berita.view',
        ]);

        // Penulis: can create, edit own, view
        $penulis->givePermissionTo([
            'berita.create',
            'berita.edit.own',
            'berita.view',
        ]);

        $this->command->info('Blog roles and permissions seeded successfully.');
    }
}