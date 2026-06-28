<?php

namespace Database\Seeders;

use App\Models\ForumThread;
use App\Models\Alumni;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ForumThreadSeeder extends Seeder
{
    public function run(): void
    {
        $alumni = Alumni::all();
        if ($alumni->isEmpty()) {
            $this->command->info('No alumni found, skipping forum thread seed.');
            return;
        }

        $categories = ['lowongan', 'bisnis', 'diskusi'];
        $statuses = ['aktif', 'tertutup'];

        foreach ($alumni as $index => $alumniRecord) {
            // create 1-2 threads per alumni
            for ($i = 0; $i < rand(1,2); $i++) {
                ForumThread::create([
                    'alumni_id' => $alumniRecord->id,
                    'slug' => Str::slug(fake()->sentence(3)),
                    'judul' => fake()->sentence(4),
                    'isi' => fake()->paragraphs(3, true),
                    'kategori' => $categories[array_rand($categories)],
                    'status' => $statuses[array_rand($statuses)],
                    'views' => rand(0, 100),
                ]);
            }
        }
    }
}