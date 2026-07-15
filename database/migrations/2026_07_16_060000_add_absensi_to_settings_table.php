<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->decimal('absensi_gps_radius_km', 4, 2)->default(0.1);
            $table->decimal('sekolah_latitude', 10, 7)->default(-6.123456);
            $table->decimal('sekolah_longitude', 10, 7)->default(106.123456);
            $table->time('absensi_jam_masuk')->default('07:00');
            $table->time('absensi_jam_pulang')->default('14:00');
            $table->time('absensi_jam_masuk_guru')->default('07:00');
        });
    }

    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn([
                'absensi_gps_radius_km',
                'sekolah_latitude',
                'sekolah_longitude',
                'absensi_jam_masuk',
                'absensi_jam_pulang',
                'absensi_jam_masuk_guru',
            ]);
        });
    }
};