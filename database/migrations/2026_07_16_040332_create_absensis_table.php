<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('absensis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->date('tanggal');
            $table->time('jam_masuk')->nullable();
            $table->time('jam_pulang')->nullable();
            $table->enum('status_masuk', ['hadir', 'terlambat', 'izin', 'sakit', 'alpa'])->default('alpa');
            $table->enum('status_pulang', ['hadir', 'pulang_cepat', 'izin', 'sakit', 'alpa'])->default('alpa');
            $table->enum('metode', ['manual', 'gps'])->default('manual');
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->text('keterangan')->nullable();
            $table->foreignId('dicatat_oleh')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->unique(['siswa_id', 'tanggal']);
            $table->index(['kelas_id', 'tanggal']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('absensis');
    }
};