<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sarana_prasarana', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200);
            $table->enum('kategori', ['ruangan', 'laboratorium', 'perpustakaan', 'olahraga', 'ibadah', 'sanitasi', 'teknologi', 'lainnya']);
            $table->text('deskripsi')->nullable();
            $table->string('lokasi', 200)->nullable();
            $table->integer('kapasitas')->nullable();
            $table->enum('kondisi', ['baik', 'rusak_ringan', 'rusak_berat'])->default('baik');
            $table->string('foto')->nullable();
            $table->integer('tahun_pengadaan')->nullable();
            $table->string('sumber_dana', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sarana_prasarana');
    }
};