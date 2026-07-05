<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\Jurusan;
use App\Models\Guru;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class KelasSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $tahunAjaranOptions = ['2022/2023', '2023/2024', '2024/2025', '2025/2026'];
        $tingkatOptions = ['10', '11', '12'];

        // Get existing jurusan and guru ids (can be null if none)
        $jurusanIds = Jurusan::pluck('id')->toArray();
        $guruIds = Guru::pluck('id')->toArray();

        for ($i = 0; $i < 20; $i++) {
            Kelas::create([
                'nama_kelas' => $faker->randomElement(['A', 'B', 'C', 'D']) . $faker->numberBetween(1, 3),
                'tingkat' => $faker->randomElement($tingkatOptions),
                'jurusan_id' => !empty($jurusanIds) ? $faker->randomElement($jurusanIds) : null,
                'wali_kelas_id' => !empty($guruIds) ? $faker->randomElement($guruIds) : null,
                'ruangan' => $faker->optional()->buildingNumber,
                'kapasitas' => $faker->numberBetween(20, 40),
                'tahun_ajaran' => $faker->randomElement($tahunAjaranOptions),
            ]);
        }

        $this->command->info('Kelas seeder completed: 20 kelas created.');
    }
}