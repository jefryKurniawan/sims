<?php

namespace Database\Factories;

use App\Models\Berita;
use App\Models\KategoriBerita;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class BeritaFactory extends Factory
{
    protected $model = Berita::class;

    public function definition()
    {
        $title = fake()->sentence(6);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => fake()->paragraphs(8, true),
            'kategori_id' => KategoriBerita::factory(),
            'thumbnail' => 'default.jpg',
            'is_active' => '0',
            'created_by' => User::factory(),
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

    public function withKategori($kategoriId)
    {
        return $this->state(function () use ($kategoriId) {
            return [
                'kategori_id' => $kategoriId,
            ];
        });
    }

    public function withAuthor($userId)
    {
        return $this->state(function () use ($userId) {
            return [
                'created_by' => $userId,
            ];
        });
    }
}
