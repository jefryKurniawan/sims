<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->text('full_content')->after('title')->nullable();
        });
        // Salin data content lama ke full_content lalu ubah content ke mediumText
        \DB::statement('UPDATE events SET full_content = content');
        \DB::statement('ALTER TABLE events MODIFY full_content MEDIUMTEXT NULL');
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('full_content');
        });
    }
};