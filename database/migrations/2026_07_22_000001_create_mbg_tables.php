<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Master kondisi khusus (alergi, intoleransi, dll)
        Schema::create('mbg_special_conditions', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->string('kategori', 50)->default('alergi')->comment('alergi, intoleransi, pantangan, vegetarian');
            $table->text('deskripsi')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Pivot siswa & kondisi khusus
        Schema::create('mbg_student_conditions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->foreignId('condition_id')->constrained('mbg_special_conditions')->cascadeOnDelete();
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->unique(['siswa_id', 'condition_id']);
        });

        // 3. Persetujuan orang tua
        Schema::create('mbg_consents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->enum('status', ['menunggu', 'setuju', 'tolak'])->default('menunggu');
            $table->timestamp('tanggal_persetujuan')->nullable();
            $table->string('file_path')->nullable()->comment('Upload scan/form yang ditandatangani');
            $table->text('catatan_ortu')->nullable();
            $table->timestamps();

            $table->unique('siswa_id');
        });

        // 4. Menu harian
        Schema::create('mbg_meal_menus', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->string('menu', 200);
            $table->text('deskripsi')->nullable();
            $table->string('sumber', 50)->default('SPPG')->comment('SPPG, catering, dll');
            $table->integer('porsi_direncanakan')->default(0);
            $table->timestamps();
        });

        // 5. BAST Serah Terima (Bukti Penerimaan Harian)
        Schema::create('mbg_basts', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->time('waktu_datang');
            $table->time('waktu_terima')->nullable();
            $table->integer('porsi_dipesan')->default(0);
            $table->integer('porsi_diterima')->default(0);
            $table->string('nama_kurir', 100)->nullable();
            $table->string('foto_bukti')->nullable();
            $table->text('catatan')->nullable();
            $table->enum('status', ['pending', 'diterima', 'ditolak'])->default('pending');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        // 6. Uji Organoleptik
        Schema::create('mbg_organoleptics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bast_id')->constrained('mbg_basts')->cascadeOnDelete();
            $table->enum('warna', ['baik', 'cukup', 'kurang'])->default('baik');
            $table->enum('aroma', ['baik', 'cukup', 'kurang'])->default('baik');
            $table->enum('rasa', ['baik', 'cukup', 'kurang'])->default('baik');
            $table->enum('suhu', ['baik', 'cukup', 'kurang'])->default('baik');
            $table->enum('tekstur', ['baik', 'cukup', 'kurang'])->default('baik');
            $table->enum('hasil', ['layak', 'tidak_layak'])->default('layak');
            $table->text('catatan')->nullable();
            $table->string('foto_kerusakan')->nullable();
            $table->foreignId('diuji_oleh')->constrained('users');
            $table->timestamps();
        });

        // 7. Absensi Makan Siswa
        Schema::create('mbg_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bast_id')->constrained('mbg_basts')->cascadeOnDelete();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->foreignId('kelas_id')->constrained('kelas');
            $table->enum('status', ['hadir_makan', 'tidak_hadir', 'dibawa_pulang', 'tidak_makan'])->default('hadir_makan');
            $table->text('catatan')->nullable();
            $table->foreignId('diinput_oleh')->constrained('users');
            $table->timestamps();

            $table->unique(['bast_id', 'siswa_id']);
        });

        // 8. Laporan Insiden
        Schema::create('mbg_incidents', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->enum('kategori', ['keracunan', 'keterlambatan', 'penolakan_massal', 'kerusakan', 'lainnya']);
            $table->text('deskripsi');
            $table->string('foto_bukti')->nullable();
            $table->enum('severity', ['ringan', 'sedang', 'berat'])->default('ringan');
            $table->enum('status', ['terlapor', 'ditangani', 'selesai'])->default('terlapor');
            $table->text('tindak_lanjut')->nullable();
            $table->foreignId('dilapor_oleh')->constrained('users');
            $table->foreignId('ditangani_oleh')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        // 9. Notulensi Rapat Evaluasi
        Schema::create('mbg_meetings', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal_rapat');
            $table->string('tempat', 100)->nullable();
            $table->text('agenda');
            $table->text('notulensi')->nullable();
            $table->text('kesimpulan')->nullable();
            $table->string('file_notulen')->nullable();
            $table->string('file_daftar_hadir')->nullable();
            $table->foreignId('dibuat_oleh')->constrained('users');
            $table->timestamps();
        });

        // 10. Galeri Dokumentasi MBG
        Schema::create('mbg_galleries', function (Blueprint $table) {
            $table->id();
            $table->string('judul', 200);
            $table->string('file_path');
            $table->string('kategori', 50)->default('kegiatan')->comment('serah_terima, uji_kelayakan, suasana_makan, dokumentasi');
            $table->date('tanggal_kegiatan');
            $table->text('deskripsi')->nullable();
            $table->foreignId('diupload_oleh')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mbg_galleries');
        Schema::dropIfExists('mbg_meetings');
        Schema::dropIfExists('mbg_incidents');
        Schema::dropIfExists('mbg_attendances');
        Schema::dropIfExists('mbg_organoleptics');
        Schema::dropIfExists('mbg_basts');
        Schema::dropIfExists('mbg_meal_menus');
        Schema::dropIfExists('mbg_consents');
        Schema::dropIfExists('mbg_student_conditions');
        Schema::dropIfExists('mbg_special_conditions');
    }
};
