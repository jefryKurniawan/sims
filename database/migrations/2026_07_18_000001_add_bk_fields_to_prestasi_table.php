<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('prestasi', function (Blueprint $table) {
            $table->integer('poin_prestasi')->default(0)->after('tingkat');
            $table->boolean('verified_by_bk')->default(false)->after('poin_prestasi');
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete()->after('verified_by_bk');
        });
    }

    public function down(): void
    {
        Schema::table('prestasi', function (Blueprint $table) {
            $table->dropColumn(['poin_prestasi', 'verified_by_bk', 'verified_by']);
        });
    }
};
