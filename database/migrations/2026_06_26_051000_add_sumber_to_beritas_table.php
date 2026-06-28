<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('beritas', function (Blueprint $table) {
            $table->enum('sumber', ['manual', 'ppdb', 'alumni'])->default('manual')->after('is_active');
            $table->enum('status', ['draft', 'published'])->default('draft')->after('sumber');
        });
    }

    public function down(): void
    {
        Schema::table('beritas', function (Blueprint $table) {
            $table->dropColumn(['sumber', 'status']);
        });
    }
};
