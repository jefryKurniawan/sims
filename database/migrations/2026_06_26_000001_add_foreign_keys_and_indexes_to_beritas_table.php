<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysAndIndexesToBeritasTable extends Migration
{
    public function up()
    {
        DB::statement('ALTER TABLE beritas MODIFY kategori_id BIGINT UNSIGNED NOT NULL');
        DB::statement('ALTER TABLE beritas MODIFY created_by BIGINT UNSIGNED NOT NULL');

        Schema::table('beritas', function (Blueprint $table) {
            $table->foreign('kategori_id')
                ->references('id')
                ->on('kategori_beritas')
                ->onDelete('restrict');

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');

            $table->unique('slug');
        });
    }

    public function down()
    {
        Schema::table('beritas', function (Blueprint $table) {
            $table->dropForeign(['kategori_id']);
            $table->dropForeign(['created_by']);
            $table->dropIndex(['slug']);
        });
    }
}
