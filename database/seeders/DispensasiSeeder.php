<?php

namespace Database\Seeders;

use App\Models\Dispensasi;
use App\Models\Siswa;
use Illuminate\Database\Seeder;

class DispensasiSeeder extends Seeder
{
    public function run(): void
    {
        $siswaList = Siswa::inRandomOrder()->limit(10)->get();
        foreach ($siswaList as $siswa) {
            Dispensasi::create([
                'siswa_id' => $siswa->user_id, // foreign key to users table
                'jenis' => $this->faker()->randomElement(['potongan', 'penundaan']),
                'nominal' => $this->faker()->randomFloat(2, 0, 500000),
                'tanggal_mulai' => $this->faker()->date(),
                'tanggal_selesai' => $this->faker()->date(),
                'keterangan' => $this->faker()->sentence(),
            ]);
        }
    }

    protected function faker()
    {
        return \Faker\Factory::create('id_ID');
    }
}