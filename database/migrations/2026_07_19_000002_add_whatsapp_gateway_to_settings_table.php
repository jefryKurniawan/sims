<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->string('wa_gateway_url')->nullable()->after('nip_kepala_sekolah');
            $table->string('wa_api_key')->nullable()->after('wa_gateway_url');
            $table->string('wa_nomor_tujuan', 30)->nullable()->after('wa_api_key');
            $table->text('wa_template_pesan')->nullable()->after('wa_nomor_tujuan');
        });
    }

    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['wa_gateway_url', 'wa_api_key', 'wa_nomor_tujuan', 'wa_template_pesan']);
        });
    }
};
