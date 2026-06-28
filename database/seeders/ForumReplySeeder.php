<?php

namespace Database\Seeders;

use App\Models\ForumReply;
use App\Models\ForumThread;
use App\Models\Alumni;
use Illuminate\Database\Seeder;

class ForumReplySeeder extends Seeder
{
    public function run(): void
    {
        $threads = ForumThread::all();
        if ($threads->isEmpty()) {
            $this->command->info('No forum threads found, skipping reply seed.');
            return;
        }

        $alumni = Alumni::all();
        if ($alumni->isEmpty()) {
            $this->command->info('No alumni found, skipping reply seed.');
            return;
        }

        foreach ($threads as $thread) {
            // each thread gets 0-3 replies
            for ($i = 0; $i < rand(0,3); $i++) {
                $randomAlumni = $alumni->random();
                ForumReply::create([
                    'thread_id' => $thread->id,
                    'alumni_id' => $randomAlumni->id,
                    'body' => fake()->paragraph(),
                ]);
            }
        }
    }
}