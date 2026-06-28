<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calon_siswa', function (Blueprint $table) {
            $table->id();
            $table->string('nisn')->unique();
            $table->string('nama_lengkap');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('alamat');
            $table->string('no_hp');
            $table->string('email')->nullable();
            $table->string('nama_ortu');
            $table->string('no_hp_ortu');
            $table->string('asal_sekolah');
            $table->text('prestasi')->nullable();
            $table->enum('status', ['pendaftaran', 'seleksi', 'lulus', 'tidak_lulus'])->default('pendaftaran');
            $table->date('tanggal_daftar');
            $table->decimal('biaya_pendaftaran', 10, 2)->default(0);
            $table->string('bukti_bayar')->nullable();
            $table->enum('keputusan', ['belum', 'diterima', 'ditolak'])->default('belum');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calon_siswa');
    }
};