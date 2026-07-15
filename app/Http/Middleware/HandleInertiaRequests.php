<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function handle($request, Closure $next)
    {
        $setting = $request->user() ? \App\Models\Setting::where('user_id', $request->user()->id)->first() : null;

        Inertia::share([
            'auth' => [
                'user' => $request->user()
                    ? $request->user()->only(['id', 'name', 'email', 'role', 'foto_profile'])
                    : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
            'setting' => $setting ? [
                'tema' => $setting->tema ?? 'navy',
                'hero_media_type' => $setting->hero_media_type ?? 'foto',
                'hero_media_url' => $setting->hero_media_url ?? '',
                'npsn' => $setting->npsn,
                'akreditasi' => $setting->akreditasi,
            ] : [
                'tema' => 'navy',
                'hero_media_type' => 'foto',
                'hero_media_url' => '',
            ],
        ]);

        return parent::handle($request, $next);
    }
}
