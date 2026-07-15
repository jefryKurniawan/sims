<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nisn_sync_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->cascadeOnDelete();
            $table->enum('action', ['verify', 'regenerate', 'sync_dapodik', 'fix_duplicate', 'fix_empty']);
            $table->string('old_nisn', 20)->nullable();
            $table->string('new_nisn', 20)->nullable();
            $table->enum('status', ['success', 'failed'])->default('success');
            $table->text('message')->nullable();
            $table->foreignId('executor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['siswa_id', 'created_at']);
            $table->index('status');
            $table->index('action');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nisn_sync_logs');
    }
};