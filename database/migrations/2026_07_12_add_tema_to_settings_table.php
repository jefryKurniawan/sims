<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->string('tema')->default('navy')->after('user_id');
            $table->string('hero_media_type')->default('foto')->after('tema');
            $table->string('hero_media_url')->nullable()->after('hero_media_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['tema', 'hero_media_type', 'hero_media_url']);
        });
    }
};
