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
        Schema::create('donasis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumni_id')->nullable()->constrained('alumni')->nullOnDelete();
            $table->string('nama_pendonor')->nullable();
            $table->string('email')->nullable();
            $table->string('no_telp')->nullable();
            $table->decimal('nominal', 15, 2);
            $table->enum('metode_pembayaran', ['cash', 'transfer', 'dana', 'ovo', 'gopay', 'bri', 'bca', 'mandiri'])->default('cash');
            $table->enum('status', ['pending', 'verified', 'rejected'])->default('pending');
            $table->date('tanggal_donasi');
            $table->text('keterangan')->nullable();
            $table->boolean('anonym')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
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
        Schema::dropIfExists('donasis');
    }
};
