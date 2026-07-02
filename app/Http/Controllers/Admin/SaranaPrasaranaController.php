<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SaranaPrasarana;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaranaPrasaranaController extends Controller
{
    public function index()
    {
        $perPage = (int) request()->query('per_page', 15);
        $perPage = in_array($perPage, [10, 25, 50, 100], true) ? $perPage : 15;

        $sarana = SaranaPrasarana::paginate($perPage)->withQueryString();

        return Inertia::render('Admin/SaranaPrasarana/Index', [
            'sarana' => $sarana,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:200',
            'kategori' => 'required|in:ruangan,laboratorium,perpustakaan,olahraga,ibadah,sanitasi,teknologi,lainnya',
            'deskripsi' => 'nullable|string',
            'lokasi' => 'nullable|string|max:200',
            'kapasitas' => 'nullable|integer|min:0',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'foto' => 'nullable|string|max:255',
            'tahun_pengadaan' => 'nullable|integer|min:1900|max:2100',
            'sumber_dana' => 'nullable|string|max:100',
        ]);

        SaranaPrasarana::create($validated);

        return redirect()->route('sarana.index')
            ->with('success', 'Sarana prasarana berhasil ditambahkan.');
    }

    public function show(SaranaPrasarana $sarana)
    {
        return Inertia::render('Admin/SaranaPrasarana/Show', [
            'sarana' => $sarana,
        ]);
    }

    public function edit(SaranaPrasarana $sarana)
    {
        return Inertia::render('Admin/SaranaPrasarana/Edit', [
            'sarana' => $sarana,
        ]);
    }

    public function update(Request $request, SaranaPrasarana $sarana)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:200',
            'kategori' => 'required|in:ruangan,laboratorium,perpustakaan,olahraga,ibadah,sanitasi,teknologi,lainnya',
            'deskripsi' => 'nullable|string',
            'lokasi' => 'nullable|string|max:200',
            'kapasitas' => 'nullable|integer|min:0',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'foto' => 'nullable|string|max:255',
            'tahun_pengadaan' => 'nullable|integer|min:1900|max:2100',
            'sumber_dana' => 'nullable|string|max:100',
        ]);

        $sarana->update($validated);

        return redirect()->route('sarana.index')
            ->with('success', 'Sarana prasarana berhasil diperbarui.');
    }

    public function destroy(SaranaPrasarana $sarana)
    {
        $sarana->delete();

        return redirect()->route('sarana.index')
            ->with('success', 'Sarana prasarana berhasil dihapus.');
    }
}