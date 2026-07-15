<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Events;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $role = strtolower($user->role ?? '');

        // ===== ADMIN: full Dashboard with stats & charts =====
        if ($role == 'admin') {
            $siswaAktif = DB::table('siswa')->count();
            $totalPendaftar = DB::table('calon_siswa')->count();
            $totalPeminjaman = DB::table('peminjaman')
                ->whereNull('tanggal_kembali')
                ->count();
            $totalAlumni = DB::table('alumni')->count();
            $totalBuku = DB::table('buku')->count();

            $pembayaranBulanIni = DB::table('spp_pembayaran')
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->where('status', 'lunas')
                ->sum('nominal');

            $pembayaranBulanLalu = DB::table('spp_pembayaran')
                ->whereMonth('created_at', now()->subMonth()->month)
                ->whereYear('created_at', now()->subMonth()->year)
                ->where('status', 'lunas')
                ->sum('nominal');

            $pendaftarBulanIni = DB::table('calon_siswa')
                ->whereMonth('tanggal_daftar', now()->month)
                ->whereYear('tanggal_daftar', now()->year)
                ->count();
            $pendaftarBulanLalu = DB::table('calon_siswa')
                ->whereMonth('tanggal_daftar', now()->subMonth()->month)
                ->whereYear('tanggal_daftar', now()->subMonth()->year)
                ->count();

            $stats = [
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
            ];

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
                })->toArray();

            return Inertia::render('Dashboard', [
                'stats' => $stats,
                'latestActivities' => $latestActivities,
            ]);
        }

        // ===== NON-ADMIN: role-based Home page =====
        $data = [];

        if ($role == 'murid') {
            $authId = Auth::id();
            $data['event'] = Events::where('is_active', '0')->first();
            $data['lateness'] = Borrowing::with('members')
                ->when($authId, function ($q) use ($authId) {
                    $q->whereHas('members', function ($a) use ($authId) {
                        $a->where('user_id', $authId);
                    });
                })
                ->whereNull('tanggal_kembali')
                ->count();
            $data['pinjam'] = Borrowing::with('members')
                ->when($authId, function ($q) use ($authId) {
                    $q->whereHas('members', function ($a) use ($authId) {
                        $a->where('user_id', $authId);
                    });
                })
                ->count();
        } elseif ($role == 'guru' || $role == 'staf') {
            $data['event'] = Events::where('is_active', '0')->first();
        } elseif ($role == 'perpustakaan') {
            $data['book'] = Book::sum('stok');
            $data['borrow'] = Borrowing::whereNull('tanggal_kembali')->count();
            $data['member'] = Member::where('status', 'nonaktif')->count();
            $data['members'] = Member::count();
        }

        // auth is shared globally via HandleInertiaRequests middleware
        return Inertia::render('Admin/Home', [
            'data' => $data,
        ]);
    }
}
