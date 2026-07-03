<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('perpustakaan_buku', function (Blueprint $table) {
            $table->id();
            $table->string('judul', 255);
            $table->string('penulis', 150);
            $table->string('penerbit', 150)->nullable();
            $table->integer('tahun_terbit')->nullable();
            $table->string('isbn', 20)->nullable();
            $table->string('kategori', 100)->nullable(); // misal: Fiksi, Non-Fiksi, Sains, Sastra
            $table->text('deskripsi')->nullable();
            $table->integer('jumlah_halaman')->nullable();
            $table->integer('jumalah_stok')->default(1);
            $table->string('lokasi_rak', 50)->nullable(); // misal: A1, B2, C3
            $table->string('file_cover')->nullable(); // path gambar
            $table->boolean('tersedia')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_buku');
    }
};