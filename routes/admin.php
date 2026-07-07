<?php

use Illuminate\Support\Facades\Route;

// ======= DASHBOARD & ADMIN (Authenticated) =======
Route::middleware('auth')->prefix('dashboard')->group(function () {
    // ====== ROLE SCOPE GROUPS (currently empty; available for future use) ======
    Route::middleware('role:Guru')->group(function () {});
    Route::middleware('role:Staf')->group(function () {});
    Route::middleware('role:Murid')->group(function () {});
    Route::middleware('role:Orang Tua')->group(function () {});
    Route::middleware('role:Alumni')->group(function () {});

    // ====== MAIN DASHBOARD ======
    Route::get('/', 'Admin\HomeController@index')->name('dashboard');

    // ====== PROFILE SETTINGS ======
    Route::resource('profile-settings', 'Admin\ProfileController');
    Route::put('profile-settings/change-password/{id}', 'Admin\ProfileController@changePassword')->name('profile.change-password');

    // ====== SETTINGS ======
    Route::prefix('settings')->group(function () {
        Route::get('/', 'Admin\SettingController@index')->name('settings');
        Route::post('add-bank', 'Admin\SettingController@addBank')->name('settings.add.bank');
        Route::put('notifications/{id}', 'Admin\SettingController@notifications')->name('settings.notifications');
    });

    // ====== ADMIN-ONLY ROUTES ======
    Route::middleware('role:Admin')->group(function () {
        // MVP 1 – Siswa CRUD (soft delete)
        Route::resource('siswa', 'Admin\\SiswaController');
        // PPDB
        Route::get('ppdb/seleksi', 'Admin\CalonSiswaController@seleksiForm')->name('ppdb.seleksi.form');
        Route::get('ppdb/statistik', 'Admin\CalonSiswaController@statistik')->name('ppdb.statistik');
        Route::resource('ppdb', 'Admin\CalonSiswaController');
        Route::post('ppdb/seleksi', 'Admin\CalonSiswaController@prosesSeleksi')->name('ppdb.seleksi.proses');
        Route::post('ppdb/{calonSiswa}/accept', 'Admin\CalonSiswaController@accept')->name('ppdb.accept');
        Route::post('ppdb/{calonSiswa}/reject', 'Admin\CalonSiswaController@reject')->name('ppdb.reject');
        Route::post('ppdb/{calonSiswa}/input-nilai', 'Admin\CalonSiswaController@inputNilai')->name('ppdb.input-nilai');

        // Website Management
        Route::resource('website/profile-sekolah', 'Admin\Website\ProfilSekolahController');
        Route::resource('website/visimisi', 'Admin\Website\VisidanMisiController');
        Route::resource('website/program-studi', 'Admin\Website\ProgramController');
        Route::resource('website/kegiatan', 'Admin\Website\KegiatanController');
        Route::resource('website/slider', 'Admin\Website\ImageSliderController');
        Route::resource('website/about', 'Admin\Website\AboutController');
        Route::resource('website/video', 'Admin\Website\VideoController');
        Route::resource('website/kategori-berita', 'Admin\Website\KategoriBeritaController');
        Route::resource('website/berita', 'Admin\Website\BeritaController');
        Route::resource('website/event', 'Admin\Website\EventsController');
        Route::resource('website/footer', 'Admin\Website\FooterController');

        // Alumni
        Route::get('alumni/template', 'Admin\AlumniController@template')->name('alumni.template');
        Route::post('alumni/import', 'Admin\AlumniController@import')->name('alumni.import');
        Route::resource('alumni', 'Admin\AlumniController', ['parameters' => ['alumni' => 'alumni']]);
        Route::resource('alumni/donasi', 'Admin\DonasiController', ['as' => 'alumni']);
        Route::post('alumni/donasi/{donasi}/verify', 'Admin\DonasiController@verify')->name('alumni.donasi.verify');
        Route::resource('alumni/tracer-study', 'Admin\TracerStudyController', ['as' => 'alumni']);
        Route::resource('berita-admin', 'Admin\BeritaController');

        // User Management
        Route::resource('users/pengajar', 'Admin\Pengguna\PengajarController', ['as' => 'users']);
        Route::resource('users/staf', 'Admin\Pengguna\StafController', ['as' => 'users']);
        Route::get('users/murid/template', 'Admin\SiswaController@template')->name('users.murid.template');
        Route::post('users/murid/import', 'Admin\SiswaController@import')->name('users.murid.import');
        Route::get('users/murid/tingkat/{tingkat}', 'Admin\SiswaController@tingkat')
            ->whereNumber('tingkat')->name('users.murid.tingkat');
        Route::post('users/murid/promote', 'Admin\SiswaController@promote')->name('users.murid.promote');
        Route::resource('users/murid', 'Admin\SiswaController', ['as' => 'users']);
        Route::resource('users/ppdb', 'Admin\Pengguna\PPDBController', ['as' => 'users']);
        Route::resource('users/perpus', 'Admin\Pengguna\PerpusController', ['as' => 'users']);
        Route::resource('users/bendahara', 'Admin\Pengguna\BendaharaController', ['as' => 'users']);

        // Prestasi Siswa
        Route::resource('prestasi', 'Admin\PrestasiController', ['as' => 'admin']);

        // SPP - Dispensi
        Route::resource('dispensasi', 'Admin\DispensasiController');

        // Rapor
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

        // E-RAPOR
        Route::prefix('erapor')->group(function () {
            Route::get('dapodik-sync', 'Erapor\DapodikSyncController@index')->name('erapor.dapodik-sync');
            Route::post('dapodik-sync/manual', 'Erapor\DapodikSyncController@syncManual')->name('erapor.dapodik-sync.manual');
            Route::post('dapodik-sync/pull', 'Erapor\DapodikSyncController@pullData')->name('erapor.dapodik-sync.pull');
            Route::get('tujuan-pembelajaran', 'Erapor\TujuanPembelajaranController@index')->name('erapor.tujuan-pembelajaran.index');
            Route::get('tujuan-pembelajaran/create', 'Erapor\TujuanPembelajaranController@create')->name('erapor.tujuan-pembelajaran.create');
            Route::post('tujuan-pembelajaran', 'Erapor\TujuanPembelajaranController@store')->name('erapor.tujuan-pembelajaran.store');
            Route::get('tujuan-pembelajaran/{tujuanPembelajaran}/edit', 'Erapor\TujuanPembelajaranController@edit')->name('erapor.tujuan-pembelajaran.edit');
            Route::put('tujuan-pembelajaran/{tujuanPembelajaran}', 'Erapor\TujuanPembelajaranController@update')->name('erapor.tujuan-pembelajaran.update');
            Route::delete('tujuan-pembelajaran/{tujuanPembelajaran}', 'Erapor\TujuanPembelajaranController@destroy')->name('erapor.tujuan-pembelajaran.destroy');
            Route::post('tujuan-pembelajaran/import', 'Erapor\TujuanPembelajaranController@bulkImport')->name('erapor.tujuan-pembelajaran.import');
            Route::get('nilai', 'Erapor\NilaiController@index')->name('erapor.nilai.index');
            Route::get('nilai/input', 'Erapor\NilaiController@inputForm')->name('erapor.nilai.input');
            Route::post('nilai/formatif', 'Erapor\NilaiController@storeFormatif')->name('erapor.nilai.store-formatif');
            Route::post('nilai/sumatif', 'Erapor\NilaiController@storeSumatif')->name('erapor.nilai.store-sumatif');
            Route::get('nilai/export', 'Erapor\NilaiController@exportExcel')->name('erapor.nilai.export');
            Route::post('nilai/import', 'Erapor\NilaiController@importExcel')->name('erapor.nilai.import');
            Route::get('p5', 'Erapor\P5Controller@index')->name('erapor.p5.index');
            Route::get('p5/create', 'Erapor\P5Controller@create')->name('erapor.p5.create');
            Route::post('p5', 'Erapor\P5Controller@store')->name('erapor.p5.store');
            Route::get('p5/{p5Projek}/edit', 'Erapor\P5Controller@edit')->name('erapor.p5.edit');
            Route::put('p5/{p5Projek}', 'Erapor\P5Controller@update')->name('erapor.p5.update');
            Route::delete('p5/{p5Projek}', 'Erapor\P5Controller@destroy')->name('erapor.p5.destroy');
            Route::get('p5/{p5Projek}/input-nilai', 'Erapor\P5Controller@inputNilai')->name('erapor.p5.input-nilai');
            Route::post('p5/{p5Projek}/input-nilai', 'Erapor\P5Controller@storeNilai')->name('erapor.p5.store-nilai');
        });

        // GTK
        Route::get('gtk/template', 'Admin\GtkController@template')->name('gtk.template');
        Route::post('gtk/import', 'Admin\GtkController@import')->name('gtk.import');
        Route::resource('gtk', 'Admin\GtkController');

        // Kelas
        Route::get('kelas/template', 'Admin\KelasController@template')->name('kelas.template');
        Route::post('kelas/import', 'Admin\KelasController@import')->name('kelas.import');
        Route::resource('kelas', 'Admin\KelasController');

        // Sarana Prasarana
            Route::get('sarana/template', 'Admin\SaranaPrasaranaController@template')->name('sarana.template');
            Route::post('sarana/import', 'Admin\SaranaPrasaranaController@import')->name('sarana.import');
            Route::resource('sarana', 'Admin\SaranaPrasaranaController');

    // Perpustakaan
    Route::get('perpustakaan/template', 'Admin\PerpustakaanController@template')->name('admin.perpustakaan.template');
    Route::post('perpustakaan/import', 'Admin\PerpustakaanController@import')->name('admin.perpustakaan.import');
    Route::resource('perpustakaan', 'Admin\PerpustakaanController', ['as' => 'admin', 'parameters' => ['perpustakaan' => 'buku']]);

        // SPP
        Route::resource('spp', 'Admin\SppController');

        // SPMB Admin
        Route::get('spmb/applicant', 'Admin\SpmbApplicantController@index')->name('spmb.applicant.index');
        Route::get('spmb/applicant/{spmbApplicant}', 'Admin\SpmbApplicantController@show')->name('spmb.applicant.show');
        Route::get('spmb/applicant/{spmbApplicant}/edit', 'Admin\SpmbApplicantController@edit')->name('spmb.applicant.edit');
        Route::put('spmb/applicant/{spmbApplicant}', 'Admin\SpmbApplicantController@update')->name('spmb.applicant.update');
        Route::delete('spmb/applicant/{spmbApplicant}', 'Admin\SpmbApplicantController@destroy')->name('spmb.applicant.destroy');
        Route::get('spmb/ranking', 'Admin\SpmbRankingController@index')->name('spmb.ranking.index');
        Route::post('spmb/ranking/proses', 'Admin\SpmbRankingController@proses')->name('spmb.ranking.proses');
        Route::get('spmb/ranking/hitung-skor/{spmbApplicant}', 'Admin\SpmbRankingController@hitungSkorIndividual')->name('spmb.ranking.hitung-skor');
        Route::get('spmb/config/create', 'Admin\SpmbConfigController@create')->name('spmb.config.create');
    Route::get('spmb/config', 'Admin\SpmbConfigController@index')->name('spmb.config.index');
        Route::post('spmb/config', 'Admin\SpmbConfigController@store')->name('spmb.config.store');
        Route::put('spmb/config/{spmbConfig}', 'Admin\SpmbConfigController@update')->name('spmb.config.update');
        Route::delete('spmb/config/{spmbConfig}', 'Admin\SpmbConfigController@destroy')->name('spmb.config.destroy');
    Route::get('spmb/config/{spmbConfig}/edit', 'Admin\SpmbConfigController@edit')->name('spmb.config.edit');
    Route::get('spmb/config/{spmbConfig}', 'Admin\SpmbConfigController@show')->name('spmb.config.show');
    });
});
