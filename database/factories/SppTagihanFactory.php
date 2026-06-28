<?php

namespace Database\Factories;

use App\Models\SppTagihan;
use Illuminate\Database\Eloquent\Factories\Factory;

class SppTagihanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SppTagihan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'siswa_id' => \App\Models\Siswa::factory(),
            'nominal' => $this->faker->numberBetween(100000, 500000),
            'status' => $this->faker->randomElement(['belum_lunas', 'lunas']),
            'tanggal_jatuh_tempo' => $this->faker->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'keterangan' => $this->faker->sentence,
        ];
    }
}