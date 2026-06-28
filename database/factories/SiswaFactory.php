<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Siswa;
use Faker\Generator as Faker;

$factory->define(Siswa::class, function (Faker $faker) {
    return [
        'nisn' => $faker->unique()->numerify('##########'),
        'nama_lengkap' => $faker->name,
        'tempat_lahir' => $faker->city,
        'tanggal_lahir' => $faker->dateTimeBetween('-20 years', '-5 years')->format('Y-m-d'),
        'jenis_kelamin' => $faker->randomElement(['L', 'P']),
        'alamat' => $faker->address,
        'no_hp' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'nama_ortu' => $faker->name,
        'no_hp_ortu' => $faker->phoneNumber,
        'asal_sekolah' => $faker->company,
        'tanggal_masuk' => $faker->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
        'user_id' => function () {
            return \App\User::factory()->create(['role' => 'ortu'])->id;
        },
    ];
});