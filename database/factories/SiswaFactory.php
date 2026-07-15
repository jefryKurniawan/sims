<?php

namespace Database\Factories;

use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

class SiswaFactory extends Factory
{
    protected $model = Siswa::class;

    public function definition()
    {
        return [
            'nisn' => $this->faker->unique()->numerify('##########'),
            'nama_lengkap' => $this->faker->name,
            'tempat_lahir' => $this->faker->city,
            'tanggal_lahir' => $this->faker->dateTimeBetween('-20 years', '-5 years')->format('Y-m-d'),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'alamat' => $this->faker->address,
            'no_hp' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'nama_ortu' => $this->faker->name,
            'no_hp_ortu' => $this->faker->phoneNumber,
            'asal_sekolah' => $this->faker->company,
            'tanggal_masuk' => $this->faker->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'user_id' => function () {
                return \App\Models\User::factory()->create(['role' => 'Orang Tua'])->id;
            },
        ];
    }
}