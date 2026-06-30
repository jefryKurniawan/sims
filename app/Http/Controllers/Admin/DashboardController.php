<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(MenuService $menuService)
    {
        $siswaAktif = DB::table('siswa')->count();
        $totalPendaftar = DB::table('calon_siswa')->count();
        $totalPeminjaman = DB::table('borrowings')
            ->whereNull('return_date')
            ->orWhere('return_date', '>=', now()->toDateString())
            ->count();
        $totalAlumni = DB::table('alumni')->count();
        $totalBuku = DB::table('books')->count();

        $pembayaranBulanIni = DB::table('detail_payment_spps')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->where('status', 'paid')
            ->sum('amount');

        $pembayaranBulanLalu = DB::table('detail_payment_spps')
            ->whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->where('status', 'paid')
            ->sum('amount');

        $pendaftarBulanIni = DB::table('calon_siswa')
            ->whereMonth('tanggal_daftar', now()->month)
            ->whereYear('tanggal_daftar', now()->year)
            ->count();
        $pendaftarBulanLalu = DB::table('calon_siswa')
            ->whereMonth('tanggal_daftar', now()->subMonth()->month)
            ->whereYear('tanggal_daftar', now()->subMonth()->year)
            ->count();

        $latestActivities = DB::table('audit_logs')
            ->latest()
            ->take(8)
           ->get(['description', 'created_at', 'user_type', 'user_id'])
            ->map(function ($log) {
                $time = \Carbon\Carbon::parse($log->created_at);
                return [
                    'description' => $log->description,
                    'time' => $time->diffForHumans(),
                    'created_at' => $log->created_at,
                    'user_type' => $log->user_type,
                ];
            });

        return Inertia::render('Dashboard', [
            'menu' => $menuService->getMenuTree(),
            'stats' => [
                'siswaAktif' => $siswaAktif,
                'totalPendaftar' => $totalPendaftar,
                'totalPeminjaman' => $totalPeminjaman,
                'totalAlumni' => $totalAlumni,
                'totalBuku' => $totalBuku,
                'pembayaranBulanIni' => $pembayaranBulanIni,
                'pembayaranChange' => $pembayaranBulanLalu > 0
                    ? round((($pembayaranBulanIni - $pembayaranBulanLalu) / $pembayaranBulanLalu) * 100, 1)
                    : 0,
                'pendaftarChange' => $pendaftarBulanLalu > 0
                    ? round((($pendaftarBulanIni - $pendaftarBulanLalu) / $pendaftarBulanLalu) * 100, 1)
                    : 0,
            ],
            'latestActivities' => $latestActivities,
        ]);
    }
}
