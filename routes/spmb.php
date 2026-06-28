<?php

use Illuminate\Support\Facades\Route;

// ======= SPMB - PENERIMAAN PESERTA DIDIK BARU ======= \\

// Public Routes (No Login Required)
Route::prefix('spmb')->group(function () {
    Route::get('/daftar', [App\Http\Controllers\SpmbPublicController::class, 'pendaftaran'])->name('spmb.pendaftaran');
    Route::post('/daftar', [App\Http\Controllers\SpmbPublicController::class, 'store'])->name('spmb.store');
    Route::get('/sukses', [App\Http\Controllers\SpmbPublicController::class, 'berhasil'])->name('spmb.berhasil');

    Route::get('/cek-status', [App\Http\Controllers\SpmbPublicController::class, 'cekStatus'])->name('spmb.cek-status');
    Route::post('/cek-status', [App\Http\Controllers\SpmbPublicController::class, 'cekStatusPost'])->name('spmb.cek-status.post');

    // Edit by token (methods will be added after guest_token migration)
    // Route::get('/edit/{token}', [App\Http\Controllers\SpmbPublicController::class, 'edit'])->name('spmb.edit');
    // Route::put('/edit/{token}', [App\Http\Controllers\SpmbPublicController::class, 'update'])->name('spmb.update');
});

// Admin Routes (Authenticated)
Route::middleware('auth')->prefix('dashboard')->group(function () {
    Route::middleware('role:Admin')->group(function () {

        // SpmbApplicant CRUD
        Route::get('spmb/applicant', [App\Http\Controllers\Admin\SpmbApplicantController::class, 'index'])->name('spmb.applicant.index');
        Route::get('spmb/applicant/{spmbApplicant}', [App\Http\Controllers\Admin\SpmbApplicantController::class, 'show'])->name('spmb.applicant.show');
        Route::get('spmb/applicant/{spmbApplicant}/edit', [App\Http\Controllers\Admin\SpmbApplicantController::class, 'edit'])->name('spmb.applicant.edit');
        Route::put('spmb/applicant/{spmbApplicant}', [App\Http\Controllers\Admin\SpmbApplicantController::class, 'update'])->name('spmb.applicant.update');
        Route::delete('spmb/applicant/{spmbApplicant}', [App\Http\Controllers\Admin\SpmbApplicantController::class, 'destroy'])->name('spmb.applicant.destroy');

        // SpmbRanking
        Route::get('spmb/ranking', [App\Http\Controllers\Admin\SpmbRankingController::class, 'index'])->name('spmb.ranking.index');
        Route::post('spmb/ranking/proses', [App\Http\Controllers\Admin\SpmbRankingController::class, 'proses'])->name('spmb.ranking.proses');
        Route::get('spmb/ranking/hitung-skor/{spmbApplicant}', [App\Http\Controllers\Admin\SpmbRankingController::class, 'hitungSkorIndividual'])->name('spmb.ranking.hitung-skor');

        // SpmbConfig CRUD
        Route::get('spmb/config', [App\Http\Controllers\Admin\SpmbConfigController::class, 'index'])->name('spmb.config.index');
        Route::post('spmb/config', [App\Http\Controllers\Admin\SpmbConfigController::class, 'store'])->name('spmb.config.store');
        Route::put('spmb/config/{spmbConfig}', [App\Http\Controllers\Admin\SpmbConfigController::class, 'update'])->name('spmb.config.update');
        Route::delete('spmb/config/{spmbConfig}', [App\Http\Controllers\Admin\SpmbConfigController::class, 'destroy'])->name('spmb.config.destroy');
    });
});
