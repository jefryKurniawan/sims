<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rapor_catatan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rapor_siswa_id')->constrained('rapor_siswa')->cascadeOnDelete()->unique();
            $table->text('catatan_wali_kelas')->nullable();
            $table->text('catatan_ortu')->nullable();
            $table->decimal('tinggi_badan', 5, 1)->nullable();
            $table->decimal('berat_badan', 5, 1)->nullable();
            $table->integer('jumlah_sakit')->default(0);
            $table->integer('jumlah_izin')->default(0);
            $table->integer('jumlah_alpha')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rapor_catatan');
    }
};
