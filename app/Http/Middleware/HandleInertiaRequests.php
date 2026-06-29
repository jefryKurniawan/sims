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
        ]);

        return parent::handle($request, $next);
    }
}