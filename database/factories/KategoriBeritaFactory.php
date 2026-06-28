<?php

namespace Database\Factories;

use App\Models\KategoriBerita;
use Illuminate\Database\Eloquent\Factories\Factory;

class KategoriBeritaFactory extends Factory
{
    protected $model = KategoriBerita::class;

    public function definition()
    {
        return [
            'nama' => fake()->unique()->word() . ' News',
            'is_active' => '0',
        ];
    }

    public function inactive()
    {
        return $this->state(function () {
            return [
                'is_active' => '1',
            ];
        });
    }
}
