<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->string('npsn', 50)->nullable()->after('email');
            $table->string('akreditasi', 50)->nullable()->after('npsn');
            $table->string('nama_kepala_sekolah', 200)->nullable()->after('akreditasi');
            $table->string('nip_kepala_sekolah', 100)->nullable()->after('nama_kepala_sekolah');
        });
    }

    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['npsn', 'akreditasi', 'nama_kepala_sekolah', 'nip_kepala_sekolah']);
        });
    }
};
