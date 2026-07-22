<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you register web routes for the application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// ======= DASHBOARD & ADMIN (Authenticated) =======
Route::middleware('auth')->prefix('dashboard')->group(function () {
    // ====== ROLE SCOPE GROUPS (currently empty; available for future use) ======
    Route::middleware('role:Guru')->group(function () {});
    Route::middleware('role:Staf')->group(function () {});
    Route::middleware('role:Murid')->group(function () {});
    Route::middleware('role:Orang Tua')->group(function () {});
    Route::middleware('role:Alumni')->group(function () {});
    Route::middleware('role:Guest')->group(function () {});

    // ====== MAIN DASHBOARD ======
    Route::get('/', 'Admin\DashboardController@index')->name('dashboard');

    // ====== PROFILE SETTINGS ======
    Route::resource('profile-settings', 'Admin\ProfileController');
    Route::put('profile-settings/change-password/{id}', 'Admin\ProfileController@changePassword')->name('profile.change-password');

    // ====== SETTINGS ======
    Route::middleware('role:Admin')->prefix('settings')->group(function () {
        Route::get('/', 'Admin\SettingController@index')->name('settings');
        Route::post('add-bank', 'Admin\SettingController@addBank')->name('settings.add.bank');
        Route::put('notifications/{id}', 'Admin\SettingController@notifications')->name('settings.notifications');
        Route::put('/', 'Admin\SettingController@update')->name('settings.update');

        // New sub-pages for settings cards
        Route::get('data-instansi', 'Admin\SettingController@dataInstansi')->name('settings.data-instansi');
        Route::get('legalitas', 'Admin\SettingController@legalitas')->name('settings.legalitas');
        Route::get('konfigurasi', 'Admin\SettingController@konfigurasi')->name('settings.konfigurasi');
    });

    // ====== ADMIN-ONLY ROUTES ======
    Route::middleware('role:Admin')->group(function () {
        // MVP 1 – Siswa CRUD (soft delete)
        Route::resource('siswa', 'Admin\SiswaController');
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
        Route::resource('berita', 'Admin\BeritaController')->names('admin.berita');
        Route::post('berita/{berita}/submit', 'Admin\BeritaController@submit')->name('admin.berita.submit');
        Route::post('berita/{berita}/approve', 'Admin\BeritaController@approve')->name('admin.berita.approve');
        Route::post('berita/{berita}/reject', 'Admin\BeritaController@reject')->name('admin.berita.reject');
        Route::get('berita/export', 'Admin\BeritaController@export')->name('admin.berita.export');

        // Berita Admin (legacy website)

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


        // === Buku Induk Digital (PRD Section 23) ===
        Route::get('buku-induk', 'Admin\BukuIndukController@index')->name('buku-induk.index');
        Route::get('buku-induk/{siswa}', 'Admin\BukuIndukController@show')->name('buku-induk.show');
        Route::get('buku-induk/{siswa}/cetak', 'Admin\BukuIndukController@cetak')->name('buku-induk.cetak');
        Route::post('buku-induk/{siswa}/profil', 'Admin\BukuIndukController@updateProfil')->name('buku-induk.update-profil');
        Route::post('buku-induk/{siswa}/rekam-medis', 'Admin\BukuIndukController@updateRekamMedis')->name('buku-induk.update-rekam-medis');
        Route::post('buku-induk/{siswa}/orang-tua', 'Admin\BukuIndukController@storeOrangTua')->name('buku-induk.store-orang-tua');
        Route::put('buku-induk/{siswa}/orang-tua/{orangTua}', 'Admin\BukuIndukController@updateOrangTua')->name('buku-induk.update-orang-tua');
        Route::delete('buku-induk/{siswa}/orang-tua/{orangTua}', 'Admin\BukuIndukController@destroyOrangTua')->name('buku-induk.destroy-orang-tua');
        Route::post('buku-induk/{siswa}/mutasi', 'Admin\BukuIndukController@storeMutasi')->name('buku-induk.store-mutasi');
        Route::delete('buku-induk/{siswa}/mutasi/{mutasi}', 'Admin\BukuIndukController@destroyMutasi')->name('buku-induk.destroy-mutasi');
        Route::get('buku-induk/cetak-semua', 'Admin\BukuIndukController@cetakSemua')->name('buku-induk.cetak-semua');
        Route::get('buku-induk/cetak-pdf-massal', 'Admin\BukuIndukController@cetakPdfMassal')->name('buku-induk.cetak-pdf-massal');

        // Prestasi Siswa
        Route::resource('prestasi', 'Admin\PrestasiController', ['as' => 'admin']);

        // SPP - Dispensi
        Route::resource('dispensasi', 'Admin\DispensasiController');
        Route::get('dispensasi/template', 'Admin\DispensasiController@importForm')->name('dispensasi.template');
        Route::post('dispensasi/import', 'Admin\DispensasiController@import')->name('dispensasi.import');

        // Master Bank
        Route::resource('master-bank', 'Admin\MasterBankController');
        Route::get('master-bank/template', 'Admin\MasterBankController@importForm')->name('master-bank.template');
        Route::post('master-bank/import', 'Admin\MasterBankController@import')->name('master-bank.import');

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
            Route::get('/cetak-pdf-massal', 'Admin\RaporSiswaController@cetakPdfMassal')->name('rapor-siswa.cetak-pdf-massal');
            Route::get('/{raporSiswa}', 'Admin\RaporSiswaController@show')->name('rapor-siswa.show');
            Route::get('/{raporSiswa}/cetak-pdf', 'Admin\RaporSiswaController@cetakPdf')->name('rapor-siswa.cetak-pdf');
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

        // Jadwal Pelajaran
        Route::resource('jadwal', 'Admin\JadwalPelajaranController')->names('jadwal');

        // Kurikulum
        Route::get('kurikulum', 'Admin\KurikulumController@index')->name('admin.kurikulum.index');
        Route::get('kurikulum/create', 'Admin\KurikulumController@create')->name('admin.kurikulum.create');
        Route::post('kurikulum', 'Admin\KurikulumController@store')->name('admin.kurikulum.store');
        Route::get('kurikulum/{kurikulum}/edit', 'Admin\KurikulumController@edit')->name('admin.kurikulum.edit');
        Route::put('kurikulum/{kurikulum}', 'Admin\KurikulumController@update')->name('admin.kurikulum.update');
        Route::delete('kurikulum/{kurikulum}', 'Admin\KurikulumController@destroy')->name('admin.kurikulum.destroy');
        Route::get('kurikulum/{kurikulum}/mapels', 'Admin\KurikulumController@mapels')->name('admin.kurikulum.mapels');
        Route::post('kurikulum/{kurikulum}/mapels', 'Admin\KurikulumController@storeMapel')->name('admin.kurikulum.mapels.store');
        Route::delete('kurikulum/{kurikulum}/mapels/{mapel}', 'Admin\KurikulumController@destroyMapel')->name('admin.kurikulum.mapels.destroy');
        Route::get('kurikulum/{kurikulum}/skbm', 'Admin\KurikulumController@skbm')->name('admin.kurikulum.skbm');
        Route::post('kurikulum/{kurikulum}/skbm', 'Admin\KurikulumController@storeSkbm')->name('admin.kurikulum.skbm.store');
        Route::delete('kurikulum/{kurikulum}/skbm/{skbm}', 'Admin\KurikulumController@destroySkbm')->name('admin.kurikulum.skbm.destroy');

        // Kalender Akademik
        Route::get('kalender-akademik', 'Admin\KurikulumController@kalender')->name('admin.kurikulum.kalender');
        Route::post('kalender-akademik', 'Admin\KurikulumController@storeKalender')->name('admin.kurikulum.kalender.store');
        Route::delete('kalender-akademik/{kalenderAkademik}', 'Admin\KurikulumController@destroyKalender')->name('admin.kurikulum.kalender.destroy');

        // Sarana Prasarana
        Route::get('sarana/template', 'Admin\SaranaPrasaranaController@template')->name('sarana.template');
        Route::post('sarana/import', 'Admin\SaranaPrasaranaController@import')->name('sarana.import');
        Route::resource('sarana', 'Admin\SaranaPrasaranaController');

        // Perpustakaan
        Route::get('perpustakaan/template', 'Admin\PerpustakaanController@template')->name('admin.perpustakaan.template');
        Route::post('perpustakaan/import', 'Admin\PerpustakaanController@import')->name('admin.perpustakaan.import');
        Route::resource('perpustakaan', 'Admin\PerpustakaanController', ['as' => 'admin', 'parameters' => ['perpustakaan' => 'buku']]);

        // SPP
        Route::get('spp/hutang', 'Admin\SppController@hutang')->name('spp.hutang');
        Route::get('spp/generate', 'Admin\SppController@generateForm')->name('spp.generate');
        Route::post('spp/generate', 'Admin\SppController@generate')->name('spp.generate.store');
        Route::get('spp/siswa/{siswa}', 'Admin\SppController@siswa')->name('spp.siswa');
        Route::post('spp/bayar/{tagihan}', 'Admin\SppController@bayar')->name('spp.bayar');
        Route::post('spp/setting', 'Admin\SppController@updateSetting')->name('spp.setting');
        Route::resource('spp', 'Admin\SppController');

        // Pembayaran Generic (Polymorphic) — Section 32.6
        Route::get('pembayaran', 'Admin\PembayaranController@index')->name('pembayaran.index');
        Route::get('pembayaran/create', 'Admin\PembayaranController@create')->name('pembayaran.create');
        Route::post('pembayaran', 'Admin\PembayaranController@store')->name('pembayaran.store');
        Route::get('pembayaran/{pembayaran}', 'Admin\PembayaranController@show')->name('pembayaran.show');
        Route::post('pembayaran/{pembayaran}/bayar', 'Admin\PembayaranController@bayar')->name('pembayaran.bayar');
        Route::post('pembayaran/detail/{detailId}/verify', 'Admin\PembayaranController@verifyDetail')->name('pembayaran.verify');
        Route::delete('pembayaran/{pembayaran}', 'Admin\PembayaranController@destroy')->name('pembayaran.destroy');

        // Absensi Digital (Simple MVP)
        Route::prefix('absensi')->name('absensi.')->group(function () {
            Route::get('/', 'Admin\AbsensiController@index')->name('index');
            Route::get('kelas/{kelas}', 'Admin\AbsensiController@kelas')->name('kelas');
            Route::get('kelas/{kelas}/{tanggal}', 'Admin\AbsensiController@kelas')->name('kelas.tanggal');
            Route::post('kelas/{kelas}', 'Admin\AbsensiController@storeKelas')->name('kelas.store');
            Route::get('rekap', 'Admin\AbsensiController@rekap')->name('rekap');
            Route::get('rekap/export', 'Admin\AbsensiController@export')->name('rekap.export');
            Route::get('guru', 'Admin\AbsensiController@guruIndex')->name('guru');
            Route::get('guru/export', 'Admin\AbsensiController@guruExport')->name('guru.export');
        });
        // SPMB Config
        // Laporan (Reports)
        Route::prefix("laporan")->name("laporan.")->group(function () {
            Route::get("/", "Admin\LaporanController@index")->name("index");
            Route::get("siswa", "Admin\LaporanController@siswa")->name("siswa");
            Route::get("spp", "Admin\LaporanController@spp")->name("spp");
            Route::get("alumni", "Admin\LaporanController@alumni")->name("alumni");
            Route::get("gtk", "Admin\LaporanController@gtk")->name("gtk");
            Route::get("perpustakaan", "Admin\LaporanController@perpustakaan")->name("perpustakaan");
            Route::get("sarana", "Admin\LaporanController@sarana")->name("sarana");
            Route::get("spmb", "Admin\LaporanController@spmb")->name("spmb");
            Route::get("prestasi", "Admin\LaporanController@prestasi")->name("prestasi");
            Route::get("dispensasi", "Admin\LaporanController@dispensasi")->name("dispensasi");
            Route::get("erapor", "Admin\LaporanController@erapor")->name("erapor");
            Route::get("{report}/export", "Admin\\LaporanController@export")->name("export");
            Route::get("{report}/print", "Admin\\LaporanController@print")->name("print");
        });
        Route::prefix('spmb')->as('spmb.')->group(function () {
            Route::resource('config', 'Admin\SpmbConfigController');
        });
    });

    // ====== TU MANAGEMENT (Admin & Staf TU) ======
    Route::middleware('role:Admin|TU|Staf')->prefix('tu')->name('tu.')->group(function () {
        Route::resource('surat-masuk', 'Admin\SuratMasukController')->names('surat-masuk');
        Route::post('surat-masuk/{suratMasuk}/disposisi', 'Admin\SuratMasukController@disposisiStore')->name('surat-masuk.disposisi');
        Route::put('surat-masuk/{suratMasuk}/arsipkan', 'Admin\SuratMasukController@arsipkan')->name('surat-masuk.arsipkan');

        Route::resource('surat-keluar', 'Admin\SuratKeluarController')->names('surat-keluar');
        Route::put('surat-keluar/{suratKeluar}/arsipkan', 'Admin\SuratKeluarController@arsipkan')->name('surat-keluar.arsipkan');

        Route::resource('arsip-akreditasi', 'Admin\ArsipAkreditasiController')->names('arsip-akreditasi');
        Route::get('arsip-akreditasi/tree/{tahunAjaran}', 'Admin\ArsipAkreditasiController@tree')->name('arsip-akreditasi.tree');

        // NISN Management
        Route::get('nisn-management', 'Admin\NisnManagementController@index')->name('nisn-management.index');
        Route::get('nisn-management/{siswa}', 'Admin\NisnManagementController@show')->name('nisn-management.show');
        Route::post('nisn-management/{siswa}/verify', 'Admin\NisnManagementController@verify')->name('nisn-management.verify');
        Route::post('nisn-management/{siswa}/regenerate', 'Admin\NisnManagementController@regenerate')->name('nisn-management.regenerate');
        Route::post('nisn-management/bulk-regenerate', 'Admin\NisnManagementController@bulkRegenerate')->name('nisn-management.bulk-regenerate');
        Route::post('nisn-management/sync-dapodik', 'Admin\NisnManagementController@syncDapodik')->name('nisn-management.sync-dapodik');
    });
    // Notifications — Section 32.7
    Route::middleware("auth")->prefix("notifications")->name("notifications.")->group(function () {
        Route::get("/", "Admin\NotificationController@index")->name("index");
        Route::get("/unread-count", "Admin\NotificationController@unreadCount")->name("unread-count");
        Route::post("/mark-all-read", "Admin\NotificationController@markAllAsRead")->name("mark-all-read");
        Route::put("/{id}/read", "Admin\NotificationController@markAsRead")->name("mark-as-read");
    });


    // ====== BK (Bimbingan Konseling) ======
    // ====== MBG (Makan Bergizi Gratis) ======
    Route::middleware('role:Admin|PPH|Guru')->prefix('mbg')->name('mbg.')->group(function () {
        // Dashboard
        Route::get('/', 'Admin\MbgController@index')->name('dashboard');

        // BAST (Serah Terima)
        Route::get('basts', 'Admin\MbgController@bastsIndex')->name('basts.index');
        Route::get('basts/create', 'Admin\MbgController@bastsCreate')->name('basts.create');
        Route::post('basts', 'Admin\MbgController@bastsStore')->name('basts.store');
        Route::get('basts/{bast}/edit', 'Admin\MbgController@bastsEdit')->name('basts.edit');
        Route::put('basts/{bast}', 'Admin\MbgController@bastsUpdate')->name('basts.update');
        Route::delete('basts/{bast}', 'Admin\MbgController@bastsDestroy')->name('basts.destroy');

        // Organoleptik (Uji Kelayakan)
        Route::get('organoleptik', 'Admin\MbgController@organoleptikIndex')->name('organoleptik.index');
        Route::get('organoleptik/create', 'Admin\MbgController@organoleptikCreate')->name('organoleptik.create');
        Route::post('organoleptik', 'Admin\MbgController@organoleptikStore')->name('organoleptik.store');

        // Absensi Makan
        Route::get('attendances', 'Admin\MbgController@attendancesIndex')->name('attendances.index');
        Route::get('attendances/create', 'Admin\MbgController@attendancesCreate')->name('attendances.create');
        Route::post('attendances/kelas', 'Admin\MbgController@attendancesByKelas')->name('attendances.by-kelas');
        Route::post('attendances', 'Admin\MbgController@attendancesStore')->name('attendances.store');

        // Persetujuan Orang Tua (Admin only)
        Route::middleware('role:Admin')->group(function () {
            Route::get('consents', 'Admin\MbgController@consentsIndex')->name('consents.index');
            Route::get('consents/create', 'Admin\MbgController@consentsCreate')->name('consents.create');
            Route::post('consents', 'Admin\MbgController@consentsStore')->name('consents.store');

            // Kondisi Khusus
            Route::get('special-conditions', 'Admin\MbgController@specialConditionsIndex')->name('special-conditions.index');
            Route::post('special-conditions', 'Admin\MbgController@specialConditionsStore')->name('special-conditions.store');
            Route::put('special-conditions/{condition}', 'Admin\MbgController@specialConditionsUpdate')->name('special-conditions.update');
        });

        // Insiden
        Route::get('incidents', 'Admin\MbgController@incidentsIndex')->name('incidents.index');
        Route::get('incidents/create', 'Admin\MbgController@incidentsCreate')->name('incidents.create');
        Route::post('incidents', 'Admin\MbgController@incidentsStore')->name('incidents.store');
        Route::put('incidents/{incident}', 'Admin\MbgController@incidentsUpdate')->name('incidents.update');

        // Notulensi Rapat
        Route::get('meetings', 'Admin\MbgController@meetingsIndex')->name('meetings.index');
        Route::get('meetings/create', 'Admin\MbgController@meetingsCreate')->name('meetings.create');
        Route::post('meetings', 'Admin\MbgController@meetingsStore')->name('meetings.store');

        // Laporan
        Route::get('reports', 'Admin\MbgController@reportsIndex')->name('reports.index');
        Route::get('reports/print', 'Admin\MbgController@printReport')->name('reports.print');

        // Galeri
        Route::get('galleries', 'Admin\MbgController@galleriesIndex')->name('galleries.index');
        Route::post('galleries', 'Admin\MbgController@galleriesStore')->name('galleries.store');
    });


    Route::middleware('role:Admin|Guru|BK')->prefix('bk')->name('bk.')->group(function () {
        Route::get('/', 'Admin\BkController@index')->name('index');
        // Pelanggaran
        Route::get('pelanggaran', 'Admin\BkController@pelanggaranIndex')->name('pelanggaran.index');
        Route::get('pelanggaran/create', 'Admin\BkController@pelanggaranCreate')->name('pelanggaran.create');
        Route::post('pelanggaran', 'Admin\BkController@pelanggaranStore')->name('pelanggaran.store');
        Route::get('pelanggaran/{pelanggaran}/edit', 'Admin\BkController@pelanggaranEdit')->name('pelanggaran.edit');
        Route::put('pelanggaran/{pelanggaran}', 'Admin\BkController@pelanggaranUpdate')->name('pelanggaran.update');
        Route::delete('pelanggaran/{pelanggaran}', 'Admin\BkController@pelanggaranDestroy')->name('pelanggaran.destroy');
        // Prestasi
        Route::get('prestasi', 'Admin\BkController@prestasiIndex')->name('prestasi.index');
        Route::get('prestasi/create', 'Admin\BkController@prestasiCreate')->name('prestasi.create');
        Route::post('prestasi', 'Admin\BkController@prestasiStore')->name('prestasi.store');
        Route::get('prestasi/{prestasi}/edit', 'Admin\BkController@prestasiEdit')->name('prestasi.edit');
        Route::put('prestasi/{prestasi}', 'Admin\BkController@prestasiUpdate')->name('prestasi.update');
        Route::delete('prestasi/{prestasi}', 'Admin\BkController@prestasiDestroy')->name('prestasi.destroy');
        // Konseling
        Route::get('konseling', 'Admin\BkController@konselingIndex')->name('konseling.index');
        Route::get('konseling/create', 'Admin\BkController@konselingCreate')->name('konseling.create');
        Route::post('konseling', 'Admin\BkController@konselingStore')->name('konseling.store');
        Route::get('konseling/{konseling}/edit', 'Admin\BkController@konselingEdit')->name('konseling.edit');
        Route::put('konseling/{konseling}', 'Admin\BkController@konselingUpdate')->name('konseling.update');
        Route::delete('konseling/{konseling}', 'Admin\BkController@konselingDestroy')->name('konseling.destroy');
        // Surat Rekomendasi
        Route::get('surat', 'Admin\BkController@suratIndex')->name('surat.index');
        Route::get('surat/create', 'Admin\BkController@suratCreate')->name('surat.create');
        Route::post('surat', 'Admin\BkController@suratStore')->name('surat.store');
        Route::get('surat/{surat}', 'Admin\BkController@suratShow')->name('surat.show');
        Route::get('surat/{surat}/edit', 'Admin\BkController@suratEdit')->name('surat.edit');
        Route::put('surat/{surat}', 'Admin\BkController@suratUpdate')->name('surat.update');
        Route::delete('surat/{surat}', 'Admin\BkController@suratDestroy')->name('surat.destroy');
        Route::get('surat/{surat}/cetak-pdf', 'Admin\BkController@suratCetakPdf')->name('surat.cetak-pdf');
    });
});
