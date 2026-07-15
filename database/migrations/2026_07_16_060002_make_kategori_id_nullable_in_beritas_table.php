<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('beritas', function (Blueprint $table) {
            $table->dropForeign(['kategori_id']);
            $table->dropColumn('kategori_id');
        });

        Schema::table('beritas', function (Blueprint $table) {
            $table->unsignedBigInteger('kategori_id')->nullable()->after('content');
        });
    }

    public function down(): void
    {
        Schema::table('beritas', function (Blueprint $table) {
            $table->dropColumn('kategori_id');
        });

        Schema::table('beritas', function (Blueprint $table) {
            $table->unsignedBigInteger('kategori_id')->after('content');
            $table->foreign('kategori_id')->references('id')->on('kategori_beritas');
        });
    }
};