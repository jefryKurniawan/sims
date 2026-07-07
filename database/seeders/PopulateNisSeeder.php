<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Siswa;

class PopulateNisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // For existing siswa with null nis, set nis to nisn (or generate)
        Siswa::whereNull('nis')
            ->update(['nis' => \DB::raw('nisn')]);
        // Alternatively, generate a unique NIS based on year and id, etc.
        // This example copies nisn to nis for simplicity.
        $this->command->info('NIS populated for ' . Siswa::whereNull('nis')->count() . ' students.');
    }
}