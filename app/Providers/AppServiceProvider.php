<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\CalonSiswa;
use App\Observers\CalonSiswaObserver;
use App\Models\Alumni;
use App\Observers\AlumniObserver;

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
    }
}