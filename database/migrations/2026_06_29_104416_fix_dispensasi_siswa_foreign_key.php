<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dispensasi', function (Blueprint $table) {
            $table->dropForeign('dispensasi_siswa_id_foreign');
        });

        DB::statement('UPDATE dispensasi SET siswa_id = (SELECT id FROM siswa WHERE siswa.user_id = dispensasi.siswa_id)');

        Schema::table('dispensasi', function (Blueprint $table) {
            $table->foreign('siswa_id')->references('id')->on('siswa')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('dispensasi', function (Blueprint $table) {
            $table->dropForeign(['siswa_id']);
        });

        DB::statement('UPDATE dispensasi SET siswa_id = (SELECT user_id FROM siswa WHERE siswa.id = dispensasi.siswa_id)');

        Schema::table('dispensasi', function (Blueprint $table) {
            $table->foreign('siswa_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
