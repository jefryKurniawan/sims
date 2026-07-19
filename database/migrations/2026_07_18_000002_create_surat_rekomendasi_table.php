<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surat_rekomendasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->enum('jenis', ['panggilan_ortu', 'pernyataan', 'rekomendasi_pkl', 'rekomendasi_kuliah', 'lainnya'])->comment('Jenis surat');
            $table->text('isi_surat')->nullable();
            $table->string('file_path')->nullable()->comment('Path file PDF yang digenerate');
            $table->foreignId('dibuat_oleh')->constrained('users')->cascadeOnDelete();
            $table->foreignId('disetujui_oleh')->nullable()->constrained('users')->nullOnDelete()->comment('Kepala Sekolah/Wali Kelas yang menandatangani');
            $table->enum('status', ['draft', 'diajukan', 'disetujui', 'ditolak'])->default('draft');
            $table->date('tanggal_surat')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surat_rekomendasi');
    }
};
