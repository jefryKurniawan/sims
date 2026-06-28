<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spp_pembayaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->onDelete('cascade');
            $table->foreignId('spp_tagihan_id')->nullable()->constrained('spp_tagihan')->onDelete('set null');
            $table->decimal('nominal', 10, 2);
            $table->date('tanggal_pembayaran');
            $table->enum('metode', ['transfer', 'cash', 'qris', 'debit', 'kredit'])->default('transfer');
            $table->enum('status', ['lunas', 'pending', 'failed'])->default('lunas');
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('spp_pembayaran');
    }
};
