<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('spmb_applicants', function (Blueprint $table) {
            $table->string('token_pendaftaran', 64)->unique()->nullable()->after('status_pendaftaran');
            $table->string('edit_token', 64)->unique()->nullable()->after('token_pendaftaran');
            $table->timestamp('guest_token_expires_at')->nullable()->after('edit_token');

            $table->string('jalur_pendaftaran', 50)->nullable()->after('guest_token_expires_at');

            $table->foreignId('tahun_ajaran_id')->nullable()->constrained('spmb_config')->nullOnDelete()->after('jalur_pendaftaran');

            $table->string('npsn_sekolah', 20)->nullable()->after('asal_sekolah');
            $table->string('jurusan_sekolah', 100)->nullable()->after('npsn_sekolah');
            $table->year('tahun_lulus')->nullable()->after('jurusan_sekolah');

            $table->string('penghasilan_ortu', 50)->nullable()->after('pekerjaan_ibu');
            $table->string('no_hp_ortu', 20)->nullable()->after('penghasilan_ortu');

            $table->string('bukti_bayar', 255)->nullable()->after('verified_at');
            $table->decimal('biaya_pendaftaran', 12, 2)->default(0)->after('bukti_bayar');
            $table->enum('status_pembayaran', ['unpaid', 'pending', 'paid', 'verified', 'failed'])
                ->default('unpaid')->after('biaya_pendaftaran');

            $table->foreignId('siswa_id')->nullable()->constrained('siswa')->nullOnDelete()->after('status_pembayaran');
        });
    }

    public function down(): void
    {
        Schema::table('spmb_applicants', function (Blueprint $table) {
            $table->dropForeign(['tahun_ajaran_id']);
            $table->dropForeign(['siswa_id']);

            $table->dropColumn([
                'token_pendaftaran',
                'edit_token',
                'guest_token_expires_at',
                'jalur_pendaftaran',
                'tahun_ajaran_id',
                'npsn_sekolah',
                'jurusan_sekolah',
                'tahun_lulus',
                'penghasilan_ortu',
                'no_hp_ortu',
                'bukti_bayar',
                'biaya_pendaftaran',
                'status_pembayaran',
                'siswa_id',
            ]);
        });
    }
};
