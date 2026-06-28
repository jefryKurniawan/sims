<?php

namespace Database\Seeders;

use App\Models\SpmbNilaiAkademik;
use App\Models\SpmbApplicant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SpmbNilaiAkademikSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $applicants = SpmbApplicant::inRandomOrder()->limit(20)->get();

        foreach ($applicants as $applicant) {
            // each applicant gets 3-5 subjects across semesters
            $subjects = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Indonesia', 'Bahasa Inggris', 'Sejarah', 'Geografi', 'Sosiologi', 'Ekonomi'];
            $selected = $faker->randomElements($subjects, random_int(3,5));

            foreach ($selected as $mapel) {
                $semester = $faker->randomElement([1,2,3,4,5]);
                $nilai = $faker->randomFloat(2, 60, 100);

                SpmbNilaiAkademik::create([
                    'spmb_applicant_id' => $applicant->id,
                    'mata_pelajaran' => $mapel,
                    'semester' => $semester,
                    'nilai_rapor' => $nilai,
                ]);
            }
        }
    }
}