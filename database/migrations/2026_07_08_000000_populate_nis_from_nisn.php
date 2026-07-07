<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Set nis to nisn for existing siswa where nis is null
        DB::table('siswa')
            ->whereNull('nis')
            ->update(['nis' => DB::raw('nisn')]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // We could reset nis to null, but it's safer to leave as is since it's derived from nisn.
        // Or we can set nis to null again if we want to be reversible.
        DB::table('siswa')
            ->update(['nis' => null]);
    }
};