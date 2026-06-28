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
        Schema::create('tracer_studies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumni_id')->constrained('alumni')->onDelete('cascade');
            $table->string('nama_lengkap');
            $table->string('jenjang_pendidikan')->nullable(); // S1, S2, D3, dll
            $table->string('nama_instansi')->nullable(); // nama kampus/perusahaan
            $table->string('bidang_studi')->nullable();
            $table->year('tahun_lulus')->nullable();
            $table->enum('status', ['kuliah', 'bekerja', 'wirausaha', 'tidak_bekerja'])->default('tidak_bekerja');
            $table->text('alamat')->nullable();
            $table->string('no_telp', 20)->nullable();
            $table->string('linkedin', 255)->nullable();
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
        Schema::dropIfExists('tracer_studies');
    }
};
