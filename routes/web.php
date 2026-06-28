<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ======= PUBLIC PAGES (FRONTEND) ======= \\

// Landing Page
Route::get('/', 'Inertia\FrontendController@index');

//// PROFILE SEKOLAH \\
Route::get('profile-sekolah', 'Inertia\FrontendController@profileSekolah')->name('profile.sekolah');

//// VISI dan MISI \\
Route::get('visi-dan-misi', 'Inertia\FrontendController@visimisi')->name('visimisi.sekolah');

//// PROGRAM STUDI \\
Route::get('program/{slug}', 'Inertia\FrontendController@programStudi')->name('program.studi');

//// KEGIATAN \\
Route::get('kegiatan/{slug}', 'Inertia\FrontendController@kegiatan')->name('kegiatan');

//// BERITA \\
Route::get('berita', 'Inertia\FrontendController@berita')->name('berita');
Route::get('berita/{slug}', 'Inertia\FrontendController@detailBerita')->name('detail.berita');

//// EVENT \\
Route::get('event', 'Inertia\FrontendController@events')->name('event');
Route::get('event/{slug}', 'Inertia\FrontendController@detailEvent')->name('detail.event');

//// ALUMNI \\
Route::get('alumni', 'Inertia\FrontendController@alumni')->name('alumni');
Route::get('alumni/tracer-study', 'Inertia\FrontendController@tracerStudy')->name('alumni.tracer-study');
Route::get('alumni/forum', 'Inertia\FrontendController@forum')->name('alumni.forum');
Route::get('alumni/donasi', 'Inertia\FrontendController@donasi')->name('alumni.donasi');

//// PPDB - Hybrid Registration (No Login Required) \\
Route::prefix('ppdb')->group(function () {
    Route::get('/daftar', [App\Http\Controllers\Inertia\FrontendPpdbController::class, 'register'])->name('ppdb.frontend.register');
    Route::post('/daftar', [App\Http\Controllers\Inertia\FrontendPpdbController::class, 'submit'])->name('ppdb.frontend.submit');
    Route::get('/sukses/{token}', [App\Http\Controllers\Inertia\FrontendPpdbController::class, 'success'])->name('ppdb.frontend.success');
    Route::get('/edit/{token}', [App\Http\Controllers\Inertia\FrontendPpdbController::class, 'edit'])->name('ppdb.frontend.edit');
    Route::put('/edit/{token}', [App\Http\Controllers\Inertia\FrontendPpdbController::class, 'update'])->name('ppdb.frontend.update');
    Route::get('/cek-status/{token}', [App\Http\Controllers\Inertia\FrontendPpdbController::class, 'checkStatus'])->name('ppdb.frontend.check-status');
});

// ======= AUTHENTICATION (Public) ======= \\
// Login Routes
Route::prefix('auth')->group(function () {
    Auth::routes(['register' => true]);
});

// Redirect /login to /auth/login for backwards compatibility
Route::get('/login', function() {
    return redirect()->route('login');
});

// ======= DASHBOARD & ADMIN (Authenticated) ======= \\
Route::middleware('auth')->prefix('dashboard')->group(function () {
    // Protect routes by role
    // Admin routes already protected below
    // Guru routes (example)
    Route::middleware('role:Guru')->group(function () {
        // Add Guru-specific routes here
    });
    // Staf routes (example)
    Route::middleware('role:Staf')->group(function () {
        // Add Staf-specific routes here
    });
    // Murid routes (example)
    Route::middleware('role:Murid')->group(function () {
        // Add Murid-specific routes here
    });
    // Orang Tua routes (example)
    Route::middleware('role:Orang Tua')->group(function () {
        // Add Orang Tua-specific routes here
    });
    // Alumni routes (example)
    Route::middleware('role:Alumni')->group(function () {
        // Add Alumni-specific routes here
    });

    // Main Dashboard
    Route::get('/', [App\Http\Controllers\Inertia\DashboardController::class, 'index'])->name('dashboard');

    // Profile Settings
    Route::resource('profile-settings', 'Backend\ProfileController');
    Route::put('profile-settings/change-password/{id}', 'Backend\ProfileController@changePassword')->name('profile.change-password');

    // Settings
    Route::prefix('settings')->group(function() {
        Route::get('/', 'Backend\SettingController@index')->name('settings');
        Route::post('add-bank', 'Backend\SettingController@addBank')->name('settings.add.bank');
        Route::put('notifications/{id}', 'Backend\SettingController@notifications')->name('settings.notifications');
    });

    // Admin Only Routes
    Route::middleware('role:Admin')->group(function () {

        //// CALON SISWA (PPDB) \\
        Route::get('ppdb/seleksi', 'Admin\CalonSiswaController@seleksiForm')->name('ppdb.seleksi.form');
        Route::get('ppdb/statistik', 'Admin\CalonSiswaController@statistik')->name('ppdb.statistik');
        Route::resource('ppdb', 'Admin\CalonSiswaController');
        Route::post('ppdb/seleksi', 'Admin\CalonSiswaController@prosesSeleksi')->name('ppdb.seleksi.proses');
        Route::post('ppdb/{calonSiswa}/accept', 'Admin\CalonSiswaController@accept')->name('ppdb.accept');
        Route::post('ppdb/{calonSiswa}/reject', 'Admin\CalonSiswaController@reject')->name('ppdb.reject');
        Route::post('ppdb/{calonSiswa}/input-nilai', 'Admin\CalonSiswaController@inputNilai')->name('ppdb.input-nilai');

        //// WEBSITE MANAGEMENT \\
        Route::resource('website/profile-sekolah', 'Backend\Website\ProfilSekolahController');
        Route::resource('website/visimisi', 'Backend\Website\VisidanMisiController');
        Route::resource('website/program-studi', 'Backend\Website\ProgramController');
        Route::resource('website/kegiatan', 'Backend\Website\KegiatanController');
        Route::resource('website/slider', 'Backend\Website\ImageSliderController');
        Route::resource('website/about', 'Backend\Website\AboutController');
        Route::resource('website/video', 'Backend\Website\VideoController');
        Route::resource('website/kategori-berita', 'Backend\Website\KategoriBeritaController');
        Route::resource('website/berita', 'Backend\Website\BeritaController');
        Route::resource('website/event', 'Backend\Website\EventsController');
        Route::resource('website/footer', 'Backend\Website\FooterController');

        //// ALUMNI \\
        Route::resource('alumni', 'Admin\AlumniController');
        Route::resource('berita-admin', 'Admin\BeritaController');

        //// USER MANAGEMENT \\
        Route::resource('users/pengajar', 'Backend\Pengguna\PengajarController', ['as' => 'users']);
        Route::resource('users/staf', 'Backend\Pengguna\StafController', ['as' => 'users']);
        Route::resource('users/murid', 'Backend\Pengguna\MuridController', ['as' => 'users']);
        Route::resource('users/ppdb', 'Backend\Pengguna\PPDBController', ['as' => 'users']);
        Route::resource('users/perpus', 'Backend\Pengguna\PerpusController', ['as' => 'users']);
        Route::resource('users/bendahara', 'Backend\Pengguna\BendaharaController', ['as' => 'users']);

        //// SPP - DISPENSI \\
        Route::resource('dispensasi', 'Admin\DispensasiController');

        //// RAPOR \\
        Route::get('rapor-kelas/create', 'Admin\RaporKelasController@create')->name('rapor-kelas.create');
        Route::post('rapor-kelas', 'Admin\RaporKelasController@store')->name('rapor-kelas.store');
        Route::get('rapor-kelas', 'Admin\RaporKelasController@index')->name('rapor-kelas.index');
        Route::get('rapor-kelas/{raporKelas}/edit', 'Admin\RaporKelasController@edit')->name('rapor-kelas.edit');
        Route::put('rapor-kelas/{raporKelas}', 'Admin\RaporKelasController@update')->name('rapor-kelas.update');
        Route::delete('rapor-kelas/{raporKelas}', 'Admin\RaporKelasController@destroy')->name('rapor-kelas.destroy');

        Route::get('rapor-mapel/create', 'Admin\RaporMapelController@create')->name('rapor-mapel.create');
        Route::post('rapor-mapel', 'Admin\RaporMapelController@store')->name('rapor-mapel.store');
        Route::get('rapor-mapel', 'Admin\RaporMapelController@index')->name('rapor-mapel.index');
        Route::get('rapor-mapel/{raporMapel}/edit', 'Admin\RaporMapelController@edit')->name('rapor-mapel.edit');
        Route::put('rapor-mapel/{raporMapel}', 'Admin\RaporMapelController@update')->name('rapor-mapel.update');
        Route::delete('rapor-mapel/{raporMapel}', 'Admin\RaporMapelController@destroy')->name('rapor-mapel.destroy');

        Route::prefix('rapor-siswa')->group(function () {
            Route::get('/', 'Admin\RaporSiswaController@index')->name('rapor-siswa.index');
            Route::get('/assign', 'Admin\RaporSiswaController@assignForm')->name('rapor-siswa.assign');
            Route::post('/assign', 'Admin\RaporSiswaController@assignStore')->name('rapor-siswa.assign-store');
            Route::get('/statistik', 'Admin\RaporSiswaController@statistik')->name('rapor-siswa.statistik');
            Route::get('/{raporSiswa}', 'Admin\RaporSiswaController@show')->name('rapor-siswa.show');
            Route::get('/{raporSiswa}/input-nilai', 'Admin\RaporSiswaController@inputNilaiForm')->name('rapor-siswa.input-nilai');
            Route::post('/{raporSiswa}/input-nilai', 'Admin\RaporSiswaController@inputNilaiStore')->name('rapor-siswa.input-nilai-store');
            Route::post('/{raporSiswa}/generate-deskripsi', 'Admin\RaporSiswaController@generateDeskripsi')->name('rapor-siswa.generate-deskripsi');
            Route::post('/{raporSiswa}/ekstrakurikuler', 'Admin\RaporSiswaController@inputEkstrakurikuler')->name('rapor-siswa.ekstrakurikuler');
            Route::delete('/ekstrakurikuler/{raporEkstrakurikuler}', 'Admin\RaporSiswaController@hapusEkstrakurikuler')->name('rapor-siswa.hapus-ekstrakurikuler');
            Route::post('/{raporSiswa}/catatan', 'Admin\RaporSiswaController@inputCatatan')->name('rapor-siswa.catatan');
            Route::delete('/{raporSiswa}', 'Admin\RaporSiswaController@destroy')->name('rapor-siswa.destroy');
        });

        //// E-RAPOR KEMENDIKDASMEN \\
        Route::prefix('erapor')->group(function () {
            // Dapodik Sync
            Route::get('dapodik-sync', 'Erapor\DapodikSyncController@index')->name('erapor.dapodik-sync');
            Route::post('dapodik-sync/manual', 'Erapor\DapodikSyncController@syncManual')->name('erapor.dapodik-sync.manual');
            Route::post('dapodik-sync/pull', 'Erapor\DapodikSyncController@pullData')->name('erapor.dapodik-sync.pull');

            // Tujuan Pembelajaran
            Route::get('tujuan-pembelajaran', 'Erapor\TujuanPembelajaranController@index')->name('erapor.tujuan-pembelajaran.index');
            Route::get('tujuan-pembelajaran/create', 'Erapor\TujuanPembelajaranController@create')->name('erapor.tujuan-pembelajaran.create');
            Route::post('tujuan-pembelajaran', 'Erapor\TujuanPembelajaranController@store')->name('erapor.tujuan-pembelajaran.store');
            Route::get('tujuan-pembelajaran/{tujuanPembelajaran}/edit', 'Erapor\TujuanPembelajaranController@edit')->name('erapor.tujuan-pembelajaran.edit');
            Route::put('tujuan-pembelajaran/{tujuanPembelajaran}', 'Erapor\TujuanPembelajaranController@update')->name('erapor.tujuan-pembelajaran.update');
            Route::delete('tujuan-pembelajaran/{tujuanPembelajaran}', 'Erapor\TujuanPembelajaranController@destroy')->name('erapor.tujuan-pembelajaran.destroy');
            Route::post('tujuan-pembelajaran/import', 'Erapor\TujuanPembelajaranController@bulkImport')->name('erapor.tujuan-pembelajaran.import');

            // Nilai (Asesmen Formatif & Sumatif)
            Route::get('nilai', 'Erapor\NilaiController@index')->name('erapor.nilai.index');
            Route::get('nilai/input', 'Erapor\NilaiController@inputForm')->name('erapor.nilai.input');
            Route::post('nilai/formatif', 'Erapor\NilaiController@storeFormatif')->name('erapor.nilai.store-formatif');
            Route::post('nilai/sumatif', 'Erapor\NilaiController@storeSumatif')->name('erapor.nilai.store-sumatif');
            Route::get('nilai/export', 'Erapor\NilaiController@exportExcel')->name('erapor.nilai.export');
            Route::post('nilai/import', 'Erapor\NilaiController@importExcel')->name('erapor.nilai.import');

            // P5 (Projek Penguatan Profil Pelajar Pancasila)
            Route::get('p5', 'Erapor\P5Controller@index')->name('erapor.p5.index');
            Route::get('p5/create', 'Erapor\P5Controller@create')->name('erapor.p5.create');
            Route::post('p5', 'Erapor\P5Controller@store')->name('erapor.p5.store');
            Route::get('p5/{p5Projek}/edit', 'Erapor\P5Controller@edit')->name('erapor.p5.edit');
            Route::put('p5/{p5Projek}', 'Erapor\P5Controller@update')->name('erapor.p5.update');
            Route::delete('p5/{p5Projek}', 'Erapor\P5Controller@destroy')->name('erapor.p5.destroy');
            Route::get('p5/{p5Projek}/input-nilai', 'Erapor\P5Controller@inputNilai')->name('erapor.p5.input-nilai');
            Route::post('p5/{p5Projek}/input-nilai', 'Erapor\P5Controller@storeNilai')->name('erapor.p5.store-nilai');
        });

        //// GTK (GURU DAN TENAGA KEPENDIDIKAN) \\
        Route::resource('gtk', 'Admin\GtkController');
        // SPP (SISTEM PEMBAYARAN SPP)
        Route::resource('spp', 'App\Http\Controllers\Admin\SppController');
    });
});

// Redirect old /home to /dashboard
Route::get('/home', function() {
    return redirect()->route('dashboard');
});