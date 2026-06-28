<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guru', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('nuptk')->nullable()->unique();
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('agama');
            $table->text('alamat');
            $table->string('no_telp', 20);
            $table->string('email')->nullable();
            $table->enum('jenis', ['Guru', 'Tenaga Kependidikan'])->default('Guru');
            $table->string('bidang_studi')->nullable();
            $table->string('jabatan');
            $table->enum('status_kepegawaian', ['Tetap Yayasan', 'Kontrak', 'Honorer'])->default('Tetap Yayasan');
            $table->date('tanggal_masuk');
            $table->string('foto')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guru');
    }
};
