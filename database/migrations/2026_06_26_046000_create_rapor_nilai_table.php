<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rapor_nilai', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rapor_siswa_id')->constrained('rapor_siswa')->cascadeOnDelete();
            $table->foreignId('rapor_mapel_id')->constrained('rapor_mapel')->cascadeOnDelete();
            $table->decimal('nilai_pengetahuan', 5, 2)->nullable();
            $table->string('predikat_pengetahuan', 5)->nullable();
            $table->decimal('nilai_keterampilan', 5, 2)->nullable();
            $table->string('predikat_keterampilan', 5)->nullable();
            $table->decimal('nilai_akhir', 5, 2)->nullable();
            $table->timestamps();

            $table->unique(['rapor_siswa_id', 'rapor_mapel_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rapor_nilai');
    }
};
