<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(MenuService $menuService)
    {
        $totalCalonSiswa = DB::table('calon_siswa')->count();
        $totalAlumni = DB::table('alumni')->count();
        $totalBuku = DB::table('books')->count();
        $totalUsers = DB::table('users')->count();

        // Hitung total pembayaran SPP bulan ini dari detail_payment_spps
        $pembayaranBulanIni = DB::table('detail_payment_spps')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->where('status', 'paid')
            ->sum('amount');

        return Inertia::render('Dashboard', [
            'menu' => $menuService->getMenuTree(),
            'stats' => [
                'calonSiswa' => $totalCalonSiswa,
                'alumni' => $totalAlumni,
                'buku' => $totalBuku,
                'users' => $totalUsers,
                'pembayaranBulanIni' => $pembayaranBulanIni,
            ],
        ]);
    }
}
