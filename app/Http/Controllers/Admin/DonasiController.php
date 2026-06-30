<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\Donasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class DonasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Donasi::with(['alumni', 'verifiedBy'])->latest();

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->filled('tanggal_mulai')) {
            $query->whereDate('tanggal_donasi', '>=', $request->tanggal_mulai);
        }
        if ($request->filled('tanggal_selesai')) {
            $query->whereDate('tanggal_donasi', '<=', $request->tanggal_selesai);
        }

        // Search by nama
        if ($request->filled('search')) {
            $query->where('nama_pendonor', 'like', '%' . $request->search . '%');
        }

        $donasis = $query->paginate(15);

        // Stats
        $stats = [
            'total' => Donasi::count(),
            'pending' => Donasi::where('status', 'pending')->count(),
            'verified' => Donasi::where('status', 'verified')->count(),
            'total_nominal' => Donasi::where('status', 'verified')->sum('nominal'),
        ];

        return inertia('Admin/Donasi/Index', [
            'donasis' => $donasis,
            'filters' => [
                'status' => $request->status,
                'tanggal_mulai' => $request->tanggal_mulai,
                'tanggal_selesai' => $request->tanggal_selesai,
                'search' => $request->search,
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $alumis = Alumni::with('user')->orderBy('nama_lengkap')->get();

        return inertia('Admin/Donasi/Create', [
            'alumis' => $alumis,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'alumni_id' => 'nullable|exists:alumni,id',
            'nama_pendonor' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'no_telp' => 'nullable|string|max:20',
            'nominal' => 'required|numeric|min:0',
            'metode_pembayaran' => 'required|in:cash,transfer,dana,ovo,gopay,bri,bca,mandiri',
            'tanggal_donasi' => 'required|date',
            'keterangan' => 'nullable|string|max:1000',
            'anonym' => 'boolean',
        ]);

        $validated['status'] = 'pending';
        $validated['tanggal_donasi'] = now()->format('Y-m-d');

        Donasi::create($validated);

        return redirect()->route('admin.donasi.index')
            ->with('success', 'Data donasi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Donasi $donasi)
    {
        $donasi->load(['alumni', 'verifiedBy']);

        return inertia('Admin/Donasi/Show', [
            'donasi' => $donasi,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donasi $donasi)
    {
        $donasi->load('alumni');
        $alumis = Alumni::with('user')->orderBy('nama_lengkap')->get();

        return inertia('Admin/Donasi/Edit', [
            'donasi' => $donasi,
            'alumis' => $alumis,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donasi $donasi)
    {
        $validated = $request->validate([
            'alumni_id' => 'nullable|exists:alumni,id',
            'nama_pendonor' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'no_telp' => 'nullable|string|max:20',
            'nominal' => 'required|numeric|min:0',
            'metode_pembayaran' => 'required|in:cash,transfer,dana,ovo,gopay,bri,bca,mandiri',
            'tanggal_donasi' => 'required|date',
            'keterangan' => 'nullable|string|max:1000',
            'anonym' => 'boolean',
            'status' => [
                'required',
                Rule::in(['pending', 'verified', 'rejected']),
            ],
        ]);

        $donasi->update($validated);

        return redirect()->route('admin.donasi.index')
            ->with('success', 'Data donasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donasi $donasi)
    {
        $donasi->delete();

        return redirect()->route('admin.donasi.index')
            ->with('success', 'Data donasi berhasil dihapus.');
    }

    /**
     * Verify a donation
     */
    public function verify(Donasi $donasi)
    {
        $donasi->update([
            'status' => 'verified',
            'verified_at' => now(),
            'verified_by' => Auth::id(),
        ]);

        return back()->with('success', 'Donasi berhasil diverifikasi.');
    }
}