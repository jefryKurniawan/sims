<?php

namespace Database\Seeders;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SiswaSeeder extends Seeder
{
    public function run(): void
    {
        // Get users that are role murid and do not have a siswa record
        $users = User::where('role', 'murid')
            ->whereDoesntHave('siswa') // Need to define siswa() relation on User model
            ->limit(20)
            ->get();

        // If the relation doesn't exist, we fallback to checking via subquery
        if ($users->isEmpty()) {
            $users = User::where('role', 'murid')
                ->whereNotIn('id', function($query) {
                    $query->select('user_id')->from('siswa');
                })
                ->limit(20)
                ->get();
        }

        if ($users->isEmpty()) {
            // fallback: create some users
            $users = User::factory()->count(20)->make([
                'role' => 'murid',
                'password' => bcrypt('password'),
            ]);
            foreach ($users as $user) {
                $user->save();
            }
        }

        foreach ($users as $user) {
            Siswa::create([
                'user_id' => $user->id,
                'nisn' => $this->generateUniqueNISN(),
                'nama_lengkap' => $user->name,
                'tempat_lahir' => fake()->city(),
                'tanggal_lahir' => fake()->dateTimeBetween('-15 years', '-5 years')->format('Y-m-d'),
                'jenis_kelamin' => fake()->randomElement(['L', 'P']),
                'alamat' => fake()->address(),
                'no_hp' => fake()->phoneNumber(),
                'email' => $user->email,
                'nama_ortu' => fake()->name(),
                'no_hp_ortu' => fake()->phoneNumber(),
                'asal_sekolah' => fake()->company(),
                'status' => 'aktif',
                'tanggal_masuk' => now()->subYear(rand(0,3))->format('Y-m-d'),
            ]);
        }
    }

    private function generateUniqueNISN(): string
    {
        do {
            $nisn = mt_rand(1000000000, 9999999999); // 10 digits
        } while (Siswa::where('nisn', $nisn)->exists());

        return $nisn;
    }
}