<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DonationSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        for ($i = 0; $i < 10; $i++) {
            DB::table('donations')->insert([
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}