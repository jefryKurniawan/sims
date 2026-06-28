<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rapor_mapel', function (Blueprint $table) {
            $table->id();
            $table->string('nama_mapel', 150);
            $table->integer('kkm')->default(70);
            $table->enum('kelompok', ['A', 'B', 'C'])->default('A');
            $table->foreignId('rapor_kelas_id')->constrained('rapor_kelas')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rapor_mapel');
    }
};
