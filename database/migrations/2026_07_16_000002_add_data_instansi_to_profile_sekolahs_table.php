<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profile_sekolahs', function (Blueprint $table) {
            $table->string('nama_sekolah', 200)->nullable()->after('id');
            $table->text('alamat')->nullable()->after('nama_sekolah');
            $table->string('logo_url', 255)->nullable()->after('alamat');
            $table->string('facebook', 255)->nullable()->after('logo_url');
            $table->string('twitter', 255)->nullable()->after('facebook');
            $table->string('instagram', 255)->nullable()->after('twitter');
        });
    }

    public function down(): void
    {
        Schema::table('profile_sekolahs', function (Blueprint $table) {
            $table->dropColumn(['nama_sekolah', 'alamat', 'logo_url', 'facebook', 'twitter', 'instagram']);
        });
    }
};
