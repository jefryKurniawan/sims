<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('konseling', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->foreignId('guru_bk_id')->nullable()->constrained('guru')->nullOnDelete();
            $table->date('tanggal');
            $table->string('topik');
            $table->text('catatan')->nullable();
            $table->text('tindak_lanjut')->nullable();
            $table->enum('status', ['terbuka', 'selesai', 'rujukan'])->default('terbuka');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('konseling');
    }
};
