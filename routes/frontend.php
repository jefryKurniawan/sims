<?php

use Illuminate\Support\Facades\Route;

// ======= PUBLIC PAGES (FRONTEND) =======

// Landing Page
Route::get('/', 'Frontend\PageController@index');

// Profile Sekolah
Route::get('profile-sekolah', 'Frontend\PageController@profileSekolah')->name('profile.sekolah');
Route::get('visi-dan-misi', 'Frontend\PageController@visimisi')->name('visimisi.sekolah');
Route::get('program/{slug}', 'Frontend\PageController@programStudi')->name('program.studi');
Route::get('kegiatan/{slug}', 'Frontend\PageController@kegiatan')->name('kegiatan');

// Berita
Route::get('berita', 'Frontend\PageController@berita')->name('berita');
Route::get('berita/{slug}', 'Frontend\PageController@detailBerita')->name('detail.berita');

// Event
Route::get('event', 'Frontend\PageController@events')->name('event');
Route::get('event/{slug}', 'Frontend\PageController@detailEvent')->name('detail.event');

// Alumni
Route::get('alumni', 'Frontend\PageController@alumni')->name('alumni');
Route::get('alumni/tracer-study', 'Frontend\PageController@tracerStudy')->name('alumni.tracer-study');
Route::get('alumni/forum', 'Frontend\PageController@forum')->name('alumni.forum');
Route::get('alumni/donasi', 'Frontend\PageController@donasi')->name('alumni.donasi');

// Guru & Tenaga Kependidikan
Route::get('guru', [App\Http\Controllers\Frontend\GuruController::class, 'index'])->name('guru');

// PPDB - Public Registration
Route::prefix('ppdb')->group(function () {
    Route::get('/daftar', 'Frontend\PpdbController@register')->name('ppdb.frontend.register');
    Route::post('/daftar', 'Frontend\PpdbController@submit')->name('ppdb.frontend.submit');
    Route::get('/sukses/{token}', 'Frontend\PpdbController@success')->name('ppdb.frontend.success');
    Route::get('/edit/{token}', 'Frontend\PpdbController@edit')->name('ppdb.frontend.edit');
    Route::put('/edit/{token}', 'Frontend\PpdbController@update')->name('ppdb.frontend.update');
    Route::get('/cek-status/{token}', 'Frontend\PpdbController@checkStatus')->name('ppdb.frontend.check-status');
});

// SPMB - Public Registration
Route::prefix('spmb')->group(function () {
    Route::get('/', 'Frontend\SpmbController@index')->name('spmb.index');
    Route::get('/daftar', 'Frontend\SpmbController@pendaftaran')->name('spmb.pendaftaran');
    Route::post('/daftar', 'Frontend\SpmbController@store')->name('spmb.store');
    Route::get('/sukses', 'Frontend\SpmbController@berhasil')->name('spmb.berhasil');
    Route::get('/cek-status', 'Frontend\SpmbController@cekStatus')->name('spmb.cek-status');
    Route::post('/cek-status', 'Frontend\SpmbController@cekStatusPost')->name('spmb.cek-status.post');
});

// ======= AUTHENTICATION =======
Route::prefix('auth')->group(function () {
    Route::get('login', [App\Http\Controllers\Auth\LoginController::class, 'showLoginForm'])->name('login');
    Route::post('login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
    Route::post('logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');
    Route::get('register', [App\Http\Controllers\Auth\RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('register', [App\Http\Controllers\Auth\RegisterController::class, 'register']);
});

// Redirect /login to /auth/login
Route::get('/login', function () {
    return redirect()->route('login');
});

// Redirect old /home to /dashboard
Route::get('/home', function () {
    return redirect()->route('dashboard');
});
