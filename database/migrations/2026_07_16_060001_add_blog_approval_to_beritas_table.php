<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // First: add kategori column, drop old status
        Schema::table('beritas', function (Blueprint $table) {
            $table->enum('kategori', ['pengumuman', 'kegiatan', 'artikel'])->default('artikel')->after('kategori_id');
            $table->dropColumn('status');
        });

        // Second: add new status column with new enum + other new columns
        Schema::table('beritas', function (Blueprint $table) {
            $table->enum('status', ['draft', 'pending', 'published', 'rejected'])
                ->default('draft')
                ->after('kategori');

            $table->text('rejection_reason')->nullable()->after('status');
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete()->after('rejection_reason');
            $table->timestamp('published_at')->nullable()->after('approved_by');
            $table->foreignId('penulis_id')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
        });
    }

    public function down(): void
    {
        Schema::table('beritas', function (Blueprint $table) {
            $table->dropColumn([
                'kategori',
                'status',
                'rejection_reason',
                'approved_by',
                'published_at',
                'penulis_id',
            ]);
        });
    }
};