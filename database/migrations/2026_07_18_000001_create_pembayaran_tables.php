<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->morphs('tagihan'); // polymorphic: spp_tagihan, uks, seragam dll
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->string('jenis_pembayaran', 50); // SPP, UKS, Seragam, Ekstrakurikuler, dll
            $table->decimal('jumlah_tagihan', 15, 2);
            $table->decimal('jumlah_dibayar', 15, 2)->default(0);
            $table->decimal('sisa', 15, 2)->default(0);
            $table->string('status', 20)->default('belum_lunas'); // belum_lunas, lunas, angsuran
            $table->date('jatuh_tempo')->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });

        Schema::create('pembayaran_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pembayaran_id')->constrained('pembayaran')->cascadeOnDelete();
            $table->decimal('jumlah', 15, 2);
            $table->date('tanggal_bayar');
            $table->string('metode', 30)->default('tunai'); // tunai, transfer, qris, dll
            $table->string('bukti_pembayaran')->nullable();
            $table->foreignId('dicatat_oleh')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status_verifikasi', 20)->default('pending'); // pending, terverifikasi, ditolak
            $table->text('catatan_verifikasi')->nullable();
            $table->timestamp('diverifikasi_pada')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pembayaran_detail');
        Schema::dropIfExists('pembayaran');
    }
};