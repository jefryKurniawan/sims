<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('arsip_akreditasi', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('standar'); // 1-8
            $table->string('sub_standar'); // e.g., "1.1", "1.2"
            $table->string('butir'); // e.g., "1.1.1"
            $table->string('nama_dokumen');
            $table->string('file_path');
            $table->string('tahun_ajaran'); // e.g., "2024/2025"
            $table->enum('status', ['lengkap', 'belum'])->default('belum');
            $table->foreignId('penanggung_jawab')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('standar');
            $table->index('sub_standar');
            $table->index('tahun_ajaran');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('arsip_akreditasi');
    }
};
