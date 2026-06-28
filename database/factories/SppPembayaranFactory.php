<?php

namespace Database\Factories;

use App\Models\SppPembayaran;
use App\Models\SppTagihan;
use Illuminate\Database\Eloquent\Factories\Factory;

class SppPembayaranFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SppPembayaran::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'siswa_id' => \App\Models\Siswa::factory(),
            'spp_tagihan_id' => \App\Models\SppTagihan::factory(),
            'nominal' => $this->faker->numberBetween(100000, 500000),
            'tanggal_pembayaran' => $this->faker->dateTimeBetween('-1 months', 'now')->format('Y-m-d'),
            'metode' => $this->faker->randomElement(['transfer', 'cash', 'qris', 'debit', 'kredit']),
            'status' => $this->faker->randomElement(['lunas', 'pending', 'failed']),
            'keterangan' => $this->faker->sentence,
        ];
    }
}