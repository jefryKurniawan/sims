<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Guru;
use Faker\Generator as Faker;

$factory->define(Guru::class, function (Faker $faker) {
    return [
        'nama' => $faker->name,
        'nip' => $faker->unique()->regexify('[0-9]{18}'),
        'nuptk' => $faker->optional()->regexify('[0-9]{16}'),
        'pendidikan' => $faker->randomElement(['S1', 'S2', 'DIII', 'SMA']),
        'jabatan' => $faker->randomElement(['Guru Mapel', 'Kepala Sekolah', 'Wakil Kepala Sekolah', 'Tata Usaha']),
        'bidang_studi' => $faker->randomElement(['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris']),
        'user_id' => function () {
            return \App\User::factory()->create(['role' => 'pengajar'])->id;
        },
    ];
});