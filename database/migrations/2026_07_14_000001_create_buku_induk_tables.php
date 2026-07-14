<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Modul Buku Induk Digital (PRD Section 23)
     *
     * - buku_induk_siswa  : profil tambahan (extend `siswa`)
     * - rekam_medis_siswa : data kesehatan ringkas (1 siswa = 1 record)
     * - orang_tua_detail  : ayah/ibu/wali (bisa multiple rows per siswa)
     * - mutasi_siswa      : riwayat mutasi masuk/keluar
     */
    public function up(): void
    {
        Schema::create('buku_induk_siswa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya'])->nullable();
            $table->integer('anak_ke')->nullable();
            $table->integer('jumlah_saudara')->nullable();
            $table->string('bahasa_sehari_hari', 50)->nullable();
            $table->enum('transportasi', ['Jalan Kaki', 'Sepeda', 'Motor', 'Mobil Pribadi', 'Angkot', 'Bus Sekolah', 'Lainnya'])->nullable();
            $table->decimal('jarak_rumah_sekolah_km', 5, 2)->nullable();
            $table->string('hobi', 100)->nullable();
            $table->string('cita_cita', 100)->nullable();
            $table->decimal('berat_badan_kg', 5, 2)->nullable();
            $table->decimal('tinggi_badan_cm', 5, 2)->nullable();
            $table->text('kebutuhan_khusus')->nullable();
            $table->timestamps();

            $table->unique('siswa_id'); // 1:1 dengan siswa
        });

        Schema::create('rekam_medis_siswa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->enum('golongan_darah', ['A', 'B', 'AB', 'O', 'Tidak Tahu'])->nullable();
            $table->text('alergi')->nullable();
            $table->text('penyakit_terdahulu')->nullable();
            $table->text('obat_rutin')->nullable();
            $table->string('nama_dokter', 100)->nullable();
            $table->string('rumah_sakit_rujukan', 150)->nullable();
            $table->string('kontak_darurat_nama', 100)->nullable();
            $table->string('kontak_darurat_hp', 20)->nullable();
            $table->string('kontak_darurat_hubungan', 50)->nullable();
            $table->timestamps();

            $table->unique('siswa_id'); // 1:1 dengan siswa
        });

        Schema::create('orang_tua_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->enum('hubungan', ['Ayah', 'Ibu', 'Wali']);
            $table->string('nama_lengkap', 150);
            $table->string('nik', 16)->nullable();
            $table->string('npwp', 20)->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('pendidikan_terakhir', ['Tidak Sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3'])->nullable();
            $table->string('pekerjaan', 100)->nullable();
            $table->enum('penghasilan_bulanan', ['<1JT', '1-3JT', '3-5JT', '5-10JT', '>10JT'])->nullable();
            $table->enum('status_pernikahan', ['Menikah', 'Cerai Hidup', 'Cerai Mati', 'Belum Menikah'])->nullable();
            $table->integer('jumlah_tanggungan')->nullable();
            $table->string('no_hp', 20)->nullable();
            $table->string('email', 100)->nullable();
            $table->text('alamat')->nullable();
            $table->timestamps();

            $table->index(['siswa_id', 'hubungan']);
        });

        Schema::create('mutasi_siswa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->enum('jenis', ['masuk', 'keluar']);
            $table->date('tanggal_mutasi');
            $table->string('asal_sekolah', 200)->nullable();
            $table->string('sekolah_tujuan', 200)->nullable();
            $table->text('alasan');
            $table->string('no_sk', 100)->nullable();
            $table->string('dokumen_scan')->nullable();
            $table->foreignId('dicatat_oleh')->constrained('users')->cascadeOnDelete();
            $table->timestamps();

            $table->index(['siswa_id', 'tanggal_mutasi']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mutasi_siswa');
        Schema::dropIfExists('orang_tua_detail');
        Schema::dropIfExists('rekam_medis_siswa');
        Schema::dropIfExists('buku_induk_siswa');
    }
};
