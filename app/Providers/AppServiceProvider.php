<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\CalonSiswa;
use App\Observers\CalonSiswaObserver;
use App\Models\Alumni;
use App\Observers\AlumniObserver;
use App\Models\Siswa;
use App\Observers\SiswaObserver;
use App\Models\SuratMasuk;
use App\Observers\SuratMasukObserver;
use App\Models\SuratKeluar;
use App\Observers\SuratKeluarObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        CalonSiswa::observe(CalonSiswaObserver::class);
        Alumni::observe(AlumniObserver::class);
        Siswa::observe(SiswaObserver::class);
        SuratMasuk::observe(SuratMasukObserver::class);
        SuratKeluar::observe(SuratKeluarObserver::class);
    }
}
