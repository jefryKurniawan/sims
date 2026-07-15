<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jadwal_pelajaran', function (Blueprint $table) {
            $table->id();
            // ponytail: nama_mapel string, bukan FK mapel — tidak ada master mapel table (YAGNI untuk MVP §15.2#5). Upgrade: buat tabel master mapel saat modul Kurikulum (§26) dibangun.
            $table->string('nama_mapel', 150);
            $table->enum('hari', ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']);
            $table->unsignedTinyInteger('jam_ke');
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->foreignId('guru_id')->nullable()->constrained('guru')->nullOnDelete();
            $table->string('ruangan', 100)->nullable();
            $table->enum('semester', ['Ganjil', 'Genap'])->default('Ganjil');
            $table->string('tahun_ajaran', 20);
            $table->timestamps();

            // Validasi bentrok: 1 slot per kelas
            $table->unique(['kelas_id', 'hari', 'jam_ke', 'semester', 'tahun_ajaran'], 'uq_jadwal_slot_kelas');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jadwal_pelajaran');
    }
};
