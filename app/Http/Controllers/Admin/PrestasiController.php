<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PrestasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Prestasi::with(['siswa', 'siswa.user'])->orderBy('created_at', 'desc');

        // filter by jenis
        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        // filter by tingkat
        if ($request->filled('tingkat')) {
            $query->where('tingkat', 'like', "%{$request->tingkat}%");
        }

        // search keyword in prestasi & siswa id
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('prestasi', 'like', "%{$search}%")
                  ->orWhere('siswa_id', $search);
            });
        }

        $prestasis = $query->paginate(10);
        $jenisList = Prestasi::selectRaw('distinct jenis')->pluck('jenis');
        return inertia('Admin/Prestasi/Index', [
            'prestasis' => $prestasis,
            'filters' => [
                'jenis' => $request->jenis ?? '',
                'tingkat' => $request->tingkat ?? '',
                'search' => $request->search ?? '',
            ],
            'jenisList' => $jenisList,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $siswa = Siswa::with('user')->orderBy('nama_lengkap')->get();
        return inertia('Admin/Prestasi/Create', ['siswa' => $siswa]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'jenis' => ['required', Rule::in(['akademik', 'non_akademik', 'nonakademik'])],
            'prestasi' => 'required|string|max:255',
            'tingkat' => 'required|string|max:100',
            'tanggal' => 'required|date',
            'bukti' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
            'keterangan' => 'nullable|string|max:500',
        ]);

        if ($request->hasFile('bukti')) {
            $validated['bukti'] = $request->file('bukti')->store('prestasi-bukti', 'public');
        }

        Prestasi::create($validated);
        return redirect()->route('admin.prestasi.index')->with('success', 'Prestasi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Prestasi $prestasi)
    {
        $prestasi->load(['siswa', 'siswa.user']);
        return inertia('Admin/Prestasi/Show', ['prestasi' => $prestasi]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prestasi $prestasi)
    {
        $prestasi->load('siswa');
        $siswa = Siswa::with('user')->orderBy('nama_lengkap')->get();
        return inertia('Admin/Prestasi/Edit', ['prestasi' => $prestasi, 'siswa' => $siswa]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Prestasi $prestasi)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'jenis' => ['required', Rule::in(['akademik', 'non_akademik', 'nonakademik'])],
            'prestasi' => 'required|string|max:255',
            'tingkat' => 'required|string|max:100',
            'tanggal' => 'required|date',
            'bukti' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
            'keterangan' => 'nullable|string|max:500',
        ]);

        if ($request->hasFile('bukti')) {
            $validated['bukti'] = $request->file('bukti')->store('prestasi-bukti', 'public');
        }

        $prestasi->update($validated);
        return redirect()->route('admin.prestasi.index')->with('success', 'Prestasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prestasi $prestasi)
    {
        $prestasi->delete();
        return redirect()->route('admin.prestasi.index')->with('success', 'Prestasi berhasil dihapus.');
    }
}
