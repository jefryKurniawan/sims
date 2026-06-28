<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('calon_siswa', function (Blueprint $table) {
            $table->string('guest_token')->unique()->nullable()->after('id');
            $table->string('edit_token')->unique()->nullable()->after('guest_token');
            $table->timestamp('guest_token_expires_at')->nullable()->after('edit_token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('calon_siswa', function (Blueprint $table) {
            $table->dropColumn(['guest_token', 'edit_token', 'guest_token_expires_at']);
        });
    }
};
