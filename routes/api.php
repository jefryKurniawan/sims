<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum','role:Orang Tua'])->prefix('orangtua')->group(function () {
    Route::get('/spp', [\App\Http\Controllers\Api\OrangtuaSppController::class, 'index']);
});

// Absensi Digital API (PWA GPS)
Route::middleware('auth:sanctum')->prefix('absensi')->group(function () {
    // Siswa routes
    Route::post('checkin', [\App\Http\Controllers\Api\AbsensiApiController::class, 'checkin']);
    Route::post('checkout', [\App\Http\Controllers\Api\AbsensiApiController::class, 'checkout']);
    Route::get('status', [\App\Http\Controllers\Api\AbsensiApiController::class, 'status']);
    Route::get('status/{tanggal}', [\App\Http\Controllers\Api\AbsensiApiController::class, 'status']);

    // Guru routes
    Route::post('guru/checkin', [\App\Http\Controllers\Api\AbsensiApiController::class, 'guruCheckin']);
    Route::post('guru/checkout', [\App\Http\Controllers\Api\AbsensiApiController::class, 'guruCheckout']);
    Route::get('guru/status', [\App\Http\Controllers\Api\AbsensiApiController::class, 'guruStatus']);
    Route::get('guru/status/{tanggal}', [\App\Http\Controllers\Api\AbsensiApiController::class, 'guruStatus']);
});