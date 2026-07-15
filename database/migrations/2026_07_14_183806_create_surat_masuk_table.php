<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surat_masuk', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('no_agenda');
            $table->date('tanggal_terima');
            $table->string('no_surat');
            $table->date('tanggal_surat');
            $table->string('asal_surat');
            $table->string('perihal');
            $table->text('ringkasan');
            $table->string('file_scan')->nullable();
            $table->foreignId('disposisi_kepada')->nullable()->constrained('users')->nullOnDelete();
            $table->text('disposisi_instruksi')->nullable();
            $table->date('disposisi_batas_waktu')->nullable();
            $table->enum('status', ['baru', 'diproses', 'selesai', 'arsip'])->default('baru');
            $table->enum('status_disposisi', ['belum', 'dibaca', 'dibalas'])->default('belum');
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            // Unique index: no_agenda + year(tanggal_terima)
            $table->unique(['no_agenda', 'tanggal_terima'], 'surat_masuk_no_agenda_tahun_unique');
            $table->index('status');
            $table->index('disposisi_kepada');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surat_masuk');
    }
};
