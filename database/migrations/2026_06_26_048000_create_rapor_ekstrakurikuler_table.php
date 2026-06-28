<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rapor_ekstrakurikuler', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rapor_siswa_id')->constrained('rapor_siswa')->cascadeOnDelete();
            $table->string('nama_ekskul', 150);
            $table->enum('nilai', ['Sangat Baik', 'Baik', 'Cukup', 'Kurang'])->default('Baik');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rapor_ekstrakurikuler');
    }
};
