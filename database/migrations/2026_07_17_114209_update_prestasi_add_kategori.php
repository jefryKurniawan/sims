<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('prestasi', function (Blueprint $table) {
            // Change jenis from enum to string to be flexible
            // MySQL can't modify enum directly, so we use raw SQL
            DB::statement("ALTER TABLE prestasi MODIFY COLUMN jenis VARCHAR(50) NOT NULL DEFAULT 'akademik'");
            // Add new kategori field
            $table->string('kategori', 50)->nullable()->after('jenis');
        });
    }

    public function down(): void
    {
        Schema::table('prestasi', function (Blueprint $table) {
            $table->dropColumn('kategori');
            // Restore original enum (ponytail: safe rollback)
            DB::statement("ALTER TABLE prestasi MODIFY COLUMN jenis ENUM('akademik','nonakademik') NOT NULL DEFAULT 'akademik'");
        });
    }
};
