<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run()
    {
        $user = User::where('role','Admin')->first();
        Setting::updateOrCreate(
            ['user_id' => $user->id],
            [
                'isEmail'   => false,
                'tema'      => 'navy',
                'user_id'   => $user->id,
                // Absensi settings
                'absensi_gps_radius_km' => 0.1,
                'sekolah_latitude' => -6.123456,
                'sekolah_longitude' => 106.123456,
                'absensi_jam_masuk' => '07:00',
                'absensi_jam_pulang' => '14:00',
                'absensi_jam_masuk_guru' => '07:00',
            ]
        );

        $this->command->info('Data Setting has been saved.');
    }
}
