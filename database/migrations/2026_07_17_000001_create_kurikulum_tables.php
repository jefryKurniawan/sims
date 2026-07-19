<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kurikulum', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // Merdeka / K13
            $table->boolean('aktif')->default(false);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });

        Schema::create('kurikulum_mapel', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kurikulum_id')->constrained('kurikulum')->cascadeOnDelete();
            $table->foreignId('rapor_mapel_id')->constrained('rapor_mapel')->cascadeOnDelete();
            $table->string('fase', 10)->nullable();
            $table->integer('jam_mengajar_mingguan')->default(0);
            $table->integer('semester')->default(1);
            $table->timestamps();
            $table->unique(['kurikulum_id', 'rapor_mapel_id', 'semester'], 'kurikulum_mapel_unique');
        });

        Schema::create('skbm', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kurikulum_id')->constrained('kurikulum')->cascadeOnDelete();
            $table->foreignId('rapor_mapel_id')->constrained('rapor_mapel')->cascadeOnDelete();
            $table->string('fase', 10)->nullable();
            $table->string('kode_kd', 50);
            $table->text('deskripsi_kd');
            $table->timestamps();
        });

        Schema::create('kalender_akademik', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->string('kegiatan');
            $table->text('keterangan')->nullable();
            $table->string('semester', 10)->nullable();
            $table->string('tahun_ajaran', 20)->nullable();
            $table->timestamps();
            $table->index(['tanggal', 'semester', 'tahun_ajaran']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kalender_akademik');
        Schema::dropIfExists('skbm');
        Schema::dropIfExists('kurikulum_mapel');
        Schema::dropIfExists('kurikulum');
    }
};