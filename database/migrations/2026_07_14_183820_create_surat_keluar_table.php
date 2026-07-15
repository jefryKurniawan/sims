<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surat_keluar', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('no_agenda');
            $table->date('tanggal_kirim');
            $table->string('no_surat'); // auto-generate: 001/TU/SK/2025
            $table->string('tujuan');
            $table->string('perihal');
            $table->text('ringkasan');
            $table->string('file_scan')->nullable();
            $table->string('penandatangan');
            $table->enum('status', ['draf', 'terkirim', 'arsip'])->default('draf');
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            // Unique index: no_agenda + year(tanggal_kirim)
            $table->unique(['no_agenda', 'tanggal_kirim'], 'surat_keluar_no_agenda_tahun_unique');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surat_keluar');
    }
};
