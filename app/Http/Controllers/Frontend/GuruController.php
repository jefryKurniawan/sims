<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;

/**
 * Guru Public Controller
 * Menampilkan daftar guru dan tenaga kependidikan untuk halaman publik
 */
class GuruController extends Controller
{
    /**
     * Display a listing of gurus with filters & pagination
     *
     * Query params:
     * - jenis: 'guru' | 'tenaga_kependidikan' (optional)
     * - bidang_studi: filter by bidang studi (optional)
     * - search: search by nama (optional)
     */
    public function index(Request $request)
    {
        $query = Guru::with('user');

        // Filter by jenis (Guru / Tenaga Kependidikan)
        if ($request->filled('jenis')) {
            $jenis = $request->input('jenis');
            if (in_array($jenis, ['Guru', 'Tenaga Kependidikan'], true)) {
                $query->where('jenis', $jenis);
            }
        }

        // Filter by bidang studi
        if ($request->filled('bidang_studi')) {
            $bidangStudi = $request->input('bidang_studi');
            $query->where('bidang_studi', 'like', "%{$bidangStudi}%");
        }

        // Search by nama lengkap
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('nama_lengkap', 'like', "%{$search}%");
        }

        // Pagination 12 per page
        $gurus = $query->orderBy('nama_lengkap')->paginate(12)->through(function ($guru) {
            return [
                'id' => $guru->id,
                'nama_lengkap' => $guru->nama_lengkap,
                'nip_nuptk' => $guru->nuptk ?? $guru->nip ?? '-',
                'jenis' => $guru->jenis ?? 'Guru',
                'jabatan' => $guru->jabatan ?? '-',
                'bidang_studi' => $guru->bidang_studi ?? '-',
                'foto' => $guru->foto,
                'user' => $guru->user ? [
                    'id' => $guru->user->id,
                    'name' => $guru->user->name,
                    'email' => $guru->user->email,
                    'foto_profile' => $guru->user->foto_profile,
                ] : [
                    'id' => null,
                    'name' => null,
                    'email' => null,
                    'foto_profile' => null,
                ],
            ];
        });

        // Get unique bidang studi untuk filter dropdown
        $bidangStudiList = Guru::whereNotNull('bidang_studi')
            ->where('bidang_studi', '!=', '')
            ->distinct()
            ->pluck('bidang_studi');

        // Stats (ponytail: match Admin GtkController — no user_id gate, DB-native values)
        $totalGuru = Guru::count();
        $guruCount = Guru::where('jenis', 'Guru')->count();
        $tendikCount = Guru::where('jenis', 'Tenaga Kependidikan')->count();

        return inertia('Frontend/Guru', [
            'gurus' => $gurus,
            'filters' => [
                'jenis' => $request->input('jenis', ''),
                'bidang_studi' => $request->input('bidang_studi', ''),
                'search' => $request->input('search', ''),
            ],
            'bidangStudiList' => $bidangStudiList,
            'stats' => [
                'total' => $totalGuru,
                'guru' => $guruCount,
                'tendik' => $tendikCount,
            ],
        ]);
    }
}