<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('calon_siswa', function (Blueprint $table) {
            $table->foreignId('jurusan_id')->nullable()->constrained('jurusans')->nullOnDelete();
            $table->unsignedBigInteger('gelombang_id')->nullable();
            $table->string('pilihan_jurusan_2', 100)->nullable()->after('jurusan_id');
            $table->decimal('nilai_rapot', 5, 2)->nullable();
            $table->decimal('nilai_wawancara', 5, 2)->nullable();
            $table->decimal('nilai_akhir', 5, 2)->nullable();
            $table->dateTime('tanggal_wawancara')->nullable();
            $table->text('catatan_admin')->nullable();
        });

        Schema::table('calon_siswa', function (Blueprint $table) {
            $table->foreign('gelombang_id')->references('id')->on('gelombang')->nullOnDelete();
        });

        DB::statement("ALTER TABLE calon_siswa MODIFY COLUMN status ENUM('submitted','verified','lulus','tidak_lulus','rejected') NOT NULL DEFAULT 'submitted'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE calon_siswa MODIFY COLUMN status ENUM('submitted','verified','rejected') NOT NULL DEFAULT 'submitted'");

        Schema::table('calon_siswa', function (Blueprint $table) {
            $table->dropForeign(['gelombang_id']);
            $table->dropForeign(['jurusan_id']);
        });

        Schema::table('calon_siswa', function (Blueprint $table) {
            $table->dropColumn([
                'jurusan_id',
                'gelombang_id',
                'pilihan_jurusan_2',
                'nilai_rapot',
                'nilai_wawancara',
                'nilai_akhir',
                'tanggal_wawancara',
                'catatan_admin',
            ]);
        });
    }
};
