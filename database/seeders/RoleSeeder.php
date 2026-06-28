<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name'          => 'Admin',
                'guard_name'    => 'web'
            ],
            [
                'name'          => 'Guru',
                'guard_name'    => 'web'
            ],
            [
                'name'          => 'Staf',
                'guard_name'    => 'web'
            ],
            [
                'name'          => 'Murid',
                'guard_name'    => 'web'
            ],
            [
                'name'          => 'Orang Tua',
                'guard_name'    => 'web'
            ],
            [
                'name'          => 'Alumni',
                'guard_name'    => 'web'
            ],
            [
                'name'          => 'Guest',
                'guard_name'    => 'web'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate($role);
            $this->command->info('Data Role '.$role['name'].' has been saved.');
        }
    }
}