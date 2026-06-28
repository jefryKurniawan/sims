<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dispensasi;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DispensasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dispensasi = Dispensasi::with('siswa')->get();
        $siswa = Siswa::select('id', 'nama', 'nisn')->get();

        return Inertia::render('Admin/Dispensasi/Index', [
            'dispensasi' => $dispensasi,
            'siswa' => $siswa,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $siswa = Siswa::select('id', 'nama', 'nisn')->get();

        return Inertia::render('Admin/Dispensasi/Create', [
            'siswa' => $siswa,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'jenis' => 'required|in:potongan,penundaan',
            'nominal' => 'required|numeric|min:0',
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
            'keterangan' => 'nullable|string',
        ]);

        Dispensasi::create($validated);

        return redirect()->route('dispensasi.index')
            ->with('success', 'Dispensasi berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dispensasi $dispensasi)
    {
        $siswa = Siswa::select('id', 'nama', 'nisn')->get();

        return Inertia::render('Admin/Dispensasi/Edit', [
            'dispensasi' => $dispensasi,
            'siswa' => $siswa,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dispensasi $dispensasi)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'jenis' => 'required|in:potongan,penundaan',
            'nominal' => 'required|numeric|min:0',
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
            'keterangan' => 'nullable|string',
        ]);

        $dispensasi->update($validated);

        return redirect()->route('dispensasi.index')
            ->with('success', 'Dispensasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dispensasi $dispensasi)
    {
        $dispensasi->delete();

        return redirect()->route('dispensasi.index')
            ->with('success', 'Dispensasi berhasil dihapus.');
    }
}