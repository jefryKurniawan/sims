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
        Schema::create('anggota', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('nama');
            $table->string('nik_nisn')->unique();
            $table->string('alamat');
            $table->string('no_hp');
            $table->string('email')->unique()->nullable();
            $table->date('tanggal_bergabung');
            $table->string('foto')->nullable(); // path to photo
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->string('kode_anggota')->unique()->nullable(); // for QR code
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
        Schema::dropIfExists('anggota');
    }
};
