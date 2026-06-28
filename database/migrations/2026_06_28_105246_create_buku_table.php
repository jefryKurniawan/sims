<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buku', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('penulis')->nullable();
            $table->string('penerbit')->nullable();
            $table->string('isbn')->unique()->nullable();
            $table->year('tahun_terbit')->nullable();
            $table->integer('jumlah_halaman')->nullable();
            $table->integer('stok')->default(0);
            $table->string('kode_rak')->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('cover_image')->nullable(); // path to image
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buku');
    }
};
