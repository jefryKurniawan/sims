<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PerpustakaanBuku;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerpustakaanController extends Controller
{
    public function index(Request $request)
    {
        $query = PerpustakaanBuku::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('penulis', 'like', "%{$search}%")
                  ->orWhere('kategori', 'like', "%{$search}%");
            });
        }

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        if ($request->filled('tersedia')) {
            $query->where('tersedia', $request->tersavailable == 'yes');
        }

        $buku = $query->orderBy('judul')->paginate(15);

        return Inertia::render('Admin/Perpustakaan/Index', [
            'buku' => $buku,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Perpustakaan/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'penulis' => 'required|string|max:150',
            'penerbit' => 'nullable|string|max:150',
            'tahun_terbit' => 'nullable|integer|min:1000|max:'.date('Y'),
            'isbn' => 'nullable|string|max:20',
            'kategori' => 'nullable|string|max:100',
            'deskripsi' => 'nullable|string',
            'jumlah_halaman' => 'nullable|integer|min:1',
            'jumalah_stok' => 'required|integer|min:1',
            'lokasi_rak' => 'nullable|string|max:50',
            'file_cover' => 'nullable|string|max:255',
            'tersedia' => 'required|boolean',
        ]);

        PerpustakaanBuku::create($validated);

        return redirect()->route('perpustakaan.index')->with('success', 'Buku berhasil ditambahkan.');
    }

    public function show(PerpustakaanBuku $buku)
    {
        return Inertia::render('Admin/Perpustakaan/Show', [
            'buku' => $buku,
        ]);
    }

    public function edit(PerpustakaanBuku $buku)
    {
        return Inertia::render('Admin/Perpustakaan/Edit', [
            'buku' => $buku,
        ]);
    }

    public function update(Request $request, PerpustakaanBuku $buku)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'penulis' => 'required|string|max:150',
            'penerbit' => 'nullable|string|max:150',
            'tahun_terbit' => 'nullable|integer|min:1000|max:'.date('Y'),
            'isbn' => 'nullable|string|max:20',
            'kategori' => 'nullable|string|max:100',
            'deskripsi' => 'nullable|string',
            'jumlah_halaman' => 'nullable|integer|min:1',
            'jumalah_stok' => 'required|integer|min:1',
            'lokasi_rak' => 'nullable|string|max:50',
            'file_cover' => 'nullable|string|max:255',
            'tersedia' => 'required|boolean',
        ]);

        $buku->update($validated);

        return redirect()->route('perpustakaan.index')->with('success', 'Buku berhasil diperbarui.');
    }

    public function destroy(PerpustakaanBuku $buku)
    {
        $buku->delete();

        return redirect()->route('perpustakaan.index')->with('success', 'Buku berhasil dihapus.');
    }
}