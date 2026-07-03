<?php

namespace Database\Seeders;

use App\Models\dataMurid;
use App\Models\User;
use Illuminate\Database\Seeder;

class MuridSeeder extends Seeder
{
    public function run(): void
    {
        $existing = User::whereIn('role', ['Murid', 'Guest'])->count();
        $need = max(0, 50 - $existing);

        if ($need === 0) {
            $this->command->info("Sudah ada {$existing} Murid/Guest, tidak perlu seed lagi.");
            return;
        }

        $users = User::factory()->count($need)->make([
            'role' => 'Guest',
            'password' => bcrypt('password'),
        ]);

        foreach ($users as $user) {
            $user->save();
            $user->assignRole($user->role);

            dataMurid::create([
                'user_id' => $user->id,
            ]);
        }

        $this->command->info("{$need} Murid/Guest berhasil dibuat. Total: " . User::whereIn('role', ['Murid', 'Guest'])->count());
    }
}