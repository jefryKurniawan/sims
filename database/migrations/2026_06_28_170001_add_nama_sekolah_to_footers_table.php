<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('footers', function (Blueprint $table) {
            $table->string('nama_sekolah')->nullable()->after('desc');
        });
    }

    public function down()
    {
        Schema::table('footers', function (Blueprint $table) {
            $table->dropColumn('nama_sekolah');
        });
    }
};
