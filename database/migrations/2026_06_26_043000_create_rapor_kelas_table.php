<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rapor_kelas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kelas', 100);
            $table->enum('tingkat', ['10', '11', '12']);
            $table->foreignId('jurusan_id')->nullable()->constrained('jurusans')->nullOnDelete();
            $table->string('tahun_ajaran', 20);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rapor_kelas');
    }
};
