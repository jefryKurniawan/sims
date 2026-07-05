<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('siswa_kelas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->onDelete('cascade');
            $table->foreignId('kelas_id')->constrained('kelas')->onDelete('cascade');
            $table->enum('status', ['aktif', 'lulus', 'pindah'])->default('aktif');
            $table->date('tanggal_masuk_kelas');
            $table->date('tanggal_keluar_kelas')->nullable();
            $table->timestamps();

            // Ensure only one active record per siswa at a time (optional via uniqueness with condition)
            $table->unique(['siswa_id', 'kelas_id'], 'siswa_kelas_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa_kelas');
    }
};