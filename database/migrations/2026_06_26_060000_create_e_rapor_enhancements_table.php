<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Fitur e-Rapor Kemendikdasmen:
     * - Integrasi dengan Dapodik (data sinkronisasi)
     * - Tujuan Pembelajaran (TP)
     * - Asesmen Formatif & Sumatif
     * - P5 (Projek Penguatan Profil Pelajar Pancasila)
     * - Web Service untuk sync ke Dapodik
     */
    public function up(): void
    {
        // Tabel untuk sinkronisasi Dapodik
        Schema::create('dapodik_sync_logs', function (Blueprint $table) {
            $table->id();
            $table->string('entity_type'); // siswa, guru, nilai, rombongan_belajar
            $table->unsignedBigInteger('entity_id');
            $table->enum('action', ['create', 'update', 'delete']);
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->text('request_payload')->nullable();
            $table->text('response_payload')->nullable();
            $table->string('error_message')->nullable();
            $table->timestamp('synced_at')->nullable();
            $table->timestamps();

            $table->index(['entity_type', 'status']);
            $table->index('synced_at');
        });

        // Tujuan Pembelajaran (TP) - Required by Kurikulum Merdeka
        Schema::create('tujuan_pembelajaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rapor_mapel_id')->constrained('rapor_mapel')->cascadeOnDelete();
            $table->foreignId('guru_id')->nullable()->constrained('guru')->nullOnDelete();
            $table->string('kode_tp', 50);
            $table->text('deskripsi');
            $table->enum('fase', ['A', 'B', 'C', 'D', 'E', 'F']); // Fase Kurikulum Merdeka
            $table->integer('semester')->default(1);
            $table->string('tahun_ajaran', 20);
            $table->boolean('aktif')->default(true);
            $table->timestamps();

            $table->unique(['rapor_mapel_id', 'kode_tp']);
        });

        // Asesmen Formatif (Formatif Assessment)
        Schema::create('asesmen_formatif', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rapor_siswa_id')->constrained('rapor_siswa')->cascadeOnDelete();
            $table->foreignId('rapor_mapel_id')->constrained('rapor_mapel')->cascadeOnDelete();
            $table->foreignId('tujuan_pembelajaran_id')->nullable()->constrained('tujuan_pembelajaran')->nullOnDelete();
            $table->string('jenis', 50); // Kuis, Tugas, Ulangan Harian, dll
            $table->date('tanggal');
            $table->decimal('nilai', 5, 2);
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->index(['rapor_siswa_id', 'rapor_mapel_id']);
        });

        // Asesmen Sumatif (Sumatif Assessment) - ASAS
        Schema::create('asesmen_sumatif', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rapor_siswa_id')->constrained('rapor_siswa')->cascadeOnDelete();
            $table->foreignId('rapor_mapel_id')->constrained('rapor_mapel')->cascadeOnDelete();
            $table->string('jenis', 50); // STS (Sumatif Tengah Semester), SAS (Sumatif Akhir Semester)
            $table->date('tanggal');
            $table->decimal('nilai', 5, 2);
            $table->text('soal_file_url')->nullable(); // Link file soal
            $table->timestamps();

            $table->index(['rapor_siswa_id', 'rapor_mapel_id']);
        });

        // P5 - Projek Penguatan Profil Pelajar Pancasila
        Schema::create('p5_projek', function (Blueprint $table) {
            $table->id();
            $table->string('nama_projek', 200);
            $table->string('tema', 100); // Kebinekaan Global, Gotong Royong, dll
            $table->text('deskripsi');
            $table->enum('tingkat', ['10', '11', '12']);
            $table->foreignId('jurusan_id')->nullable()->constrained('jurusans')->nullOnDelete();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->string('nama_guru_pengampu', 100);
            $table->timestamps();
        });

        // Nilai P5 per Siswa
        Schema::create('p5_nilai', function (Blueprint $table) {
            $table->id();
            $table->foreignId('p5_projek_id')->constrained('p5_projek')->cascadeOnDelete();
            $table->foreignId('rapor_siswa_id')->constrained('rapor_siswa')->cascadeOnDelete();
            $table->enum('dimensi', [
                'beriman_bertaqwa',
                'berkebinekaan_global',
                'bergotong_royong',
                'mandiri',
                'bernalar_kritis',
                'kreatif'
            ]);
            $table->enum('predikat', ['A', 'B', 'C', 'D']); // A=Sangat Baik, B=Baik, C=Cukup, D=Perlu Bimbingan
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->unique(['p5_projek_id', 'rapor_siswa_id', 'dimensi']);
        });

        // Konfigurasi Web Service untuk sync ke Dapodik
        Schema::create('webservice_config', function (Blueprint $table) {
            $table->id();
            $table->string('server_url', 255);
            $table->string('username', 100);
            $table->string('password_encrypted', 255);
            $table->string('token', 500)->nullable(); // Token auth dari Dapodik
            $table->timestamp('token_expires_at')->nullable();
            $table->boolean('active')->default(false);
            $table->timestamps();
        });

        // Mapping ID lokal ke ID Dapodik
        Schema::create('dapodik_id_mapping', function (Blueprint $table) {
            $table->id();
            $table->string('entity_type'); // siswa, guru, rombongan_belajar
            $table->unsignedBigInteger('local_id');
            $table->string('dapodik_id', 50)->unique();
            $table->timestamp('last_sync_at')->nullable();
            $table->timestamps();

            $table->unique(['entity_type', 'local_id']);
            $table->index('dapodik_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dapodik_id_mapping');
        Schema::dropIfExists('webservice_config');
        Schema::dropIfExists('p5_nilai');
        Schema::dropIfExists('p5_projek');
        Schema::dropIfExists('asesmen_sumatif');
        Schema::dropIfExists('asesmen_formatif');
        Schema::dropIfExists('tujuan_pembelajaran');
        Schema::dropIfExists('dapodik_sync_logs');
    }
};