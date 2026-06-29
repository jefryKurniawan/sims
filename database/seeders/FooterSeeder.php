<?php

namespace Database\Seeders;

use App\Models\Footer;
use Illuminate\Database\Seeder;

class FooterSeeder extends Seeder
{
    public function run()
    {
        $footer = Footer::first();

        if ($footer) {
            $footer->update(['nama_sekolah' => 'SMAS St. Bonaventura']);
            $this->command->info('Footer school name has been updated.');
        } else {
            $this->command->warn('No footer record found. Create one via admin panel first, then re-run this seeder.');
        }
    }
}
