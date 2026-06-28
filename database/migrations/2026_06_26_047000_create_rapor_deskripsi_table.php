<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rapor_deskripsi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rapor_siswa_id')->constrained('rapor_siswa')->cascadeOnDelete();
            $table->foreignId('rapor_mapel_id')->constrained('rapor_mapel')->cascadeOnDelete();
            $table->text('deskripsi_pengetahuan')->nullable();
            $table->text('deskripsi_keterampilan')->nullable();
            $table->timestamps();

            $table->unique(['rapor_siswa_id', 'rapor_mapel_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rapor_deskripsi');
    }
};
