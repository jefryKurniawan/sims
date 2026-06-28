<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Tabel dasar untuk SPMB (Sistem Penerimaan Murid Baru)
     * Tabel ini akan di-enhance dengan migration berikutnya untuk field Dapodik lengkap
     */
    public function up(): void
    {
        // Tabel utama SPMB Applicants - dasar
        Schema::create('spmb_applicants', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_registrasi', 50)->unique();
            $table->string('nama_lengkap', 100);
            $table->string('email', 100)->nullable();

            // Data dasar
            $table->string('no_hp', 20)->nullable();
            $table->text('alamat')->nullable();
            $table->string('asal_sekolah', 100)->nullable();

            // Status
            $table->enum('status', ['draft', 'submitted', 'verified', 'lulus', 'tidak_lulus'])->default('draft');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('verified_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spmb_applicants');
    }
};