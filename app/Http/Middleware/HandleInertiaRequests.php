<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function handle($request, Closure $next)
    {
        $user = $request->user();
        $setting = $user ? \App\Models\Setting::where('user_id', $user->id)->first() : null;

        Inertia::share([
            'auth' => [
                'user' => $user
                    ? array_merge($user->only(['id', 'name', 'email', 'role', 'foto_profile']), ['roles' => $user->getRoleNames()->toArray()])
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
            'ziggy' => fn () => [
                'routes' => (new Ziggy())->toArray(),
                'location' => $request->url(),
            ],
        ]);

        return parent::handle($request, $next);
    }
}
