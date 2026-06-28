<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * SPMB (Sistem Penerimaan Murid Baru) 2026 Enhancements:
     * - Data lengkap sesuai standar Dapodik
     * - Jalur afirmasi (KIP, PKH, KJP Plus)
     * - Jalur prestasi (akademik & non-akademik)
     * - Integrasi dengan PPDB yang sudah ada
     */
    public function up(): void
    {
        //增强 spmb_applicants 表 dengan field Dapodik
        Schema::table('spmb_applicants', function (Blueprint $table) {
            // Data Dapodik fields
            $table->string('nisn', 10)->nullable()->after('email');
            $table->string('nik', 16)->nullable()->after('nisn');
            $table->string('no_kk', 16)->nullable()->after('nik');

            // Data orang tua/keluarga
            $table->string('nama_ayah', 100)->nullable()->after('no_kk');
            $table->string('nik_ayah', 16)->nullable()->after('nama_ayah');
            $table->string('no_hp_ayah', 20)->nullable()->after('nik_ayah');
            $table->string('pekerjaan_ayah', 50)->nullable()->after('no_hp_ayah');

            $table->string('nama_ibu', 100)->nullable()->after('pekerjaan_ayah');
            $table->string('nik_ibu', 16)->nullable()->after('nama_ibu');
            $table->string('no_hp_ibu', 20)->nullable()->after('nik_ibu');
            $table->string('pekerjaan_ibu', 50)->nullable()->after('no_hp_ibu');

            $table->string('nama_wali', 100)->nullable()->after('pekerjaan_ibu');
            $table->string('no_hp_wali', 20)->nullable()->after('nama_wali');

            // Alamat lengkap
            $table->text('alamat_jalan')->nullable()->after('no_hp_wali');
            $table->string('rt', 5)->nullable()->after('alamat_jalan');
            $table->string('rw', 5)->nullable()->after('rt');
            $table->string('nama_dusun', 100)->nullable()->after('rw');
            $table->string('desa_kelurahan', 100)->nullable()->after('nama_dusun');
            $table->string('kecamatan', 100)->nullable()->after('desa_kelurahan');
            $table->string('kode_pos', 10)->nullable()->after('kecamatan');

            // Informasi tambahan
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable()->after('kode_pos');
            $table->date('tanggal_lahir')->nullable()->after('jenis_kelamin');
            $table->string('tempat_lahir', 100)->nullable()->after('tanggal_lahir');
            $table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])->nullable()->after('tempat_lahir');

            // Status pendaftaran
            $table->enum('status_pendaftaran', [
                'draft',
                'submitted',
                'verifikasi_berkas',
                'lulus_seleksi',
                'daftar_ulang',
                'diterima',
                'ditolak'
            ])->default('draft')->after('status');
        });

        // Jalur Afirmasi (KIP/PKH/KJP Plus)
        Schema::create('spmb_afirmasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spmb_applicant_id')->constrained('spmb_applicants')->cascadeOnDelete();
            $table->enum('jenis_afirmasi', [
                'kip',           // Kartu Indonesia Pintar
                'pkh',           // Program Keluarga Harapan
                'kjp_plus',      // Kartu Jakarta Plus
                'yayasan',       // Siswa dari yayasan
                'kemiskinan'     // Keluarga tidak mampu (non-kartu)
            ])->index();
            $table->string('nomor_kartu', 50)->nullable(); // No. KIP/PKH/KJP
            $table->string('nama_penerima_kartu', 100)->nullable(); // Nama di kartu
            $table->decimal('penghasilan_ortu_per_bulan', 12, 2)->nullable(); // dalam Rupiah
            $table->text('keterangan')->nullable();
            $table->string('bukti_file_path', 255)->nullable(); // Upload scan kartu
            $table->boolean('terverifikasi')->default(false);
            $table->timestamps();
        });

        // Jalur Prestasi (Akademik & Non-Akademik)
        Schema::create('spmb_prestasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spmb_applicant_id')->constrained('spmb_applicants')->cascadeOnDelete();
            $table->enum('jenis_prestasi', [
                'akademik',      // Nilai rapor, TKA, olimpiade
                'non_akademik'   // Olahraga, seni, tahfidz, dll
            ])->index();
            $table->string('nama_prestasi', 200);
            $table->string('jenis_lomba', 100)->nullable(); // Jika lomba
            $table->enum('tingkat_prestasi', [
                'sekolah',
                'kecamatan',
                'kabupaten_kota',
                'provinsi',
                'nasional',
                'internasional'
            ]);
            $table->integer('peringkat')->nullable(); // 1, 2, 3
            $table->enum('jenis_penghargaan', [
                'juara_1',
                'juara_2',
                'juara_3',
                'finalis',
                'pesertadidik_berprestasi'
            ])->nullable();
            $table->date('tanggal_prestasi');
            $table->string('penyelenggara', 150);
            $table->text('keterangan')->nullable();
            $table->string('bukti_file_path', 255)->nullable();
            $table->timestamps();
        });

        // Nilai Akademik untuk Jalur Prestasi
        Schema::create('spmb_nilai_akademik', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spmb_applicant_id')->constrained('spmb_applicants')->cascadeOnDelete();
            $table->string('mata_pelajaran', 100);
            $table->enum('semester', [1, 2, 3, 4, 5]); // Semester 1-5 (kelas 7-9)
            $table->decimal('nilai_rapor', 5, 2);
            $table->timestamps();

            $table->index(['spmb_applicant_id', 'semester']);
        });

        // Tes Kompetensi Akademik (TKA)
        Schema::create('spmb_tka', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spmb_applicant_id')->constrained('spmb_applicants')->cascadeOnDelete();
            $table->date('tanggal_tes');
            $table->decimal('nilai_matematika', 5, 2)->nullable();
            $table->decimal('nilai_ipa', 5, 2)->nullable();
            $table->decimal('nilai_ips', 5, 2)->nullable();
            $table->decimal('nilai_bahasa_indonesia', 5, 2)->nullable();
            $table->decimal('nilai_bahasa_inggris', 5, 2)->nullable();
            $table->decimal('nilai_iq', 5, 2)->nullable();
            $table->decimal('nilai_total', 5, 2)->nullable(); // Auto-calculated
            $table->string('ruangan', 10)->nullable();
            $table->string('peserta_nomor', 20)->unique();
            $table->timestamps();
        });

        // Konfigurasi SPMB (biaya, kuota, timeline)
        Schema::create('spmb_config', function (Blueprint $table) {
            $table->id();
            $table->string('tahun_ajaran', 20);
            $table->integer('kuota_total')->default(0);
            $table->integer('kuota_reguler')->default(0);
            $table->integer('kuota_afirmasi')->default(0);
            $table->integer('kuota_prestasi')->default(0);
            $table->decimal('biaya_pendaftaran', 12, 2)->default(0);
            $table->decimal('uang_pendaftaran', 12, 2)->default(0); // Biaya awal
            $table->date('tanggal_buka');
            $table->date('tanggal_tutup');
            $table->date('tanggal_pengumuman');
            $table->date('tanggal_daftar_ulang');
            $table->boolean('aktif')->default(false);
            $table->timestamps();
        });

        // Skor & Ranking SPMB
        Schema::create('spmb_ranking', function (Blueprint $table) {
            $table->id();
            $table->foreignId('spmb_applicant_id')->constrained('spmb_applicants')->cascadeOnDelete();
            $table->decimal('skor_nilai_rapor', 8, 2)->default(0); // 40%
            $table->decimal('skor_tka', 8, 2)->default(0); // 40%
            $table->decimal('skor_prestasi', 8, 2)->default(0); // 20%
            $table->decimal('skor_afirmasi', 8, 2)->default(0); // Bonus poin afirmasi
            $table->decimal('skor_total', 8, 2)->default(0);
            $table->integer('ranking')->nullable(); // Ranking keseluruhan
            $table->enum('jalur_seleksi', [
                'reguler',
                'afirmasi',
                'prestasi_akademik',
                'prestasi_non_akademik'
            ])->index();
            $table->boolean('lulus_seleksi')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spmb_ranking');
        Schema::dropIfExists('spmb_tka');
        Schema::dropIfExists('spmb_nilai_akademik');
        Schema::dropIfExists('spmb_prestasi');
        Schema::dropIfExists('spmb_afirmasi');
        Schema::dropIfExists('spmb_config');

        // Remove added columns from spmb_applicants
        Schema::table('spmb_applicants', function (Blueprint $table) {
            $columns = [
                'nisn', 'nik', 'no_kk',
                'nama_ayah', 'nik_ayah', 'no_hp_ayah', 'pekerjaan_ayah',
                'nama_ibu', 'nik_ibu', 'no_hp_ibu', 'pekerjaan_ibu',
                'nama_wali', 'no_hp_wali',
                'alamat_jalan', 'rt', 'rw', 'nama_dusun', 'desa_kelurahan', 'kecamatan', 'kode_pos',
                'jenis_kelamin', 'tanggal_lahir', 'tempat_lahir', 'agama',
                'status_pendaftaran'
            ];

            foreach ($columns as $column) {
                $table->dropColumn($column);
            }
        });
    }
};