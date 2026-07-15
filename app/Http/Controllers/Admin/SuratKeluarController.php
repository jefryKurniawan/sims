<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SuratKeluar;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\SuratKeluarRequest;

class SuratKeluarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', SuratKeluar::class);

        $query = SuratKeluar::with('createdBy')
            ->latest('tanggal_kirim');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no_surat', 'like', "%{$search}%")
                  ->orWhere('tujuan', 'like', "%{$search}%")
                  ->orWhere('perihal', 'like', "%{$search}%");
            });
        }

        // Date range filter
        if ($request->filled('tanggal_kirim_from')) {
            $query->where('tanggal_kirim', '>=', $request->tanggal_kirim_from);
        }
        if ($request->filled('tanggal_kirim_to')) {
            $query->where('tanggal_kirim', '<=', $request->tanggal_kirim_to);
        }

        $suratKeluar = $query->paginate(10)->withQueryString();

        $statuses = ['draf', 'terkirim', 'arsip'];

        return inertia('Admin/TU/SuratKeluar/Index', [
            'suratKeluar' => $suratKeluar,
            'filters' => $request->only(['status', 'search', 'tanggal_kirim_from', 'tanggal_kirim_to']),
            'statuses' => $statuses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', SuratKeluar::class);

        // Preview auto-generated nomor surat
        $year = now()->format('Y');
        $last = SuratKeluar::whereYear('tanggal_kirim', $year)
            ->orderBy('no_agenda', 'desc')
            ->first();
        $sequence = $last ? $last->no_agenda + 1 : 1;
        $previewNomor = str_pad((string) $sequence, 3, '0', STR_PAD_LEFT) . "/TU/SK/{$year}";

        return inertia('Admin/TU/SuratKeluar/Create', [
            'previewNomor' => $previewNomor,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SuratKeluarRequest $request)
    {
        $this->authorize('create', SuratKeluar::class);

        $data = $request->validated();
        $data['created_by'] = auth()->id();

        if ($request->hasFile('file_scan')) {
            $data['file_scan'] = $request->file('file_scan')->store('surat-keluar', 'public');
        }

        SuratKeluar::create($data);

        return redirect()->route('tu.surat-keluar.index')
            ->with('success', 'Surat keluar berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SuratKeluar $suratKeluar)
    {
        $this->authorize('view', $suratKeluar);
        $suratKeluar->load('createdBy');
        return inertia('Admin/TU/SuratKeluar/Show', ['suratKeluar' => $suratKeluar]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SuratKeluar $suratKeluar)
    {
        $this->authorize('update', $suratKeluar);
        return inertia('Admin/TU/SuratKeluar/Edit', ['suratKeluar' => $suratKeluar]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SuratKeluarRequest $request, SuratKeluar $suratKeluar)
    {
        $this->authorize('update', $suratKeluar);

        $data = $request->validated();

        if ($request->hasFile('file_scan')) {
            if ($suratKeluar->file_scan) {
                Storage::disk('public')->delete($suratKeluar->file_scan);
            }
            $data['file_scan'] = $request->file('file_scan')->store('surat-keluar', 'public');
        }

        $suratKeluar->update($data);

        return redirect()->route('tu.surat-keluar.index')
            ->with('success', 'Surat keluar berhasil diperbarui.');
    }

    /**
     * Arsipkan surat.
     */
    public function arsipkan(SuratKeluar $suratKeluar)
    {
        $this->authorize('arsipkan', $suratKeluar);
        $suratKeluar->update(['status' => 'arsip']);
        return redirect()->route('tu.surat-keluar.index')
            ->with('success', 'Surat keluar berhasil diarsipkan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SuratKeluar $suratKeluar)
    {
        $this->authorize('delete', $suratKeluar);

        if ($suratKeluar->file_scan) {
            Storage::disk('public')->delete($suratKeluar->file_scan);
        }

        $suratKeluar->delete();

        return redirect()->route('tu.surat-keluar.index')
            ->with('success', 'Surat keluar berhasil dihapus.');
    }
}
