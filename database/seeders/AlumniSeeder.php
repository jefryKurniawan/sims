<?php

namespace Database\Seeders;

use App\Models\Alumni;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class AlumniSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        // Create users for alumni if not exist
        $alumniUsers = [];
        for ($i = 0; $i < 3; $i++) {
            $name = $faker->name();
            $email = $faker->unique()->safeEmail();
            $username = strtolower(str_replace(' ', '.', $name)) . mt_rand(10,99);
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'username' => $username,
                'password' => bcrypt('password'),
                'role' => 'murid',
                'status' => 'Aktif',
            ]);
            $alumniUsers[] = $user;
        }

        foreach ($alumniUsers as $user) {
            Alumni::create([
                'user_id' => $user->id,
                'tahun_lulus' => now()->subYear(rand(1,5))->year,
                'pekerjaan' => $faker->jobTitle(),
                'alamat' => $faker->address(),
                'no_telp' => $faker->phoneNumber(),
                'linkedin' => $faker->url(),
            ]);
        }
    }
}