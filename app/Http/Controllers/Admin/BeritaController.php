<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BeritaRequest;
use App\Models\Berita;
use App\Models\KategoriBerita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $berita = Berita::with('kategori')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $kategori = KategoriBerita::where('is_active', '0')->get();

        return Inertia::render('Admin/Berita/Index', [
            'berita' => $berita,
            'kategori' => $kategori,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $kategori = KategoriBerita::where('is_active', '0')->get();

        return Inertia::render('Admin/Berita/Create', [
            'kategori' => $kategori,
        ]);
    }

    public function store(BeritaRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($request->title);
        $data['created_by'] = auth()->id();
        $data['is_active'] = '0';

        if ($request->hasFile('thumbnail')) {
            $image = $request->file('thumbnail');
            $name = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/images/berita', $name);
            $data['thumbnail'] = $name;
        }

        Berita::create($data);

        return redirect()->route('berita-admin.index')
            ->with('message', 'Berita berhasil ditambahkan.')
            ->with('type', 'success');
    }

    public function edit(string $id)
    {
        $berita = Berita::with('kategori')->findOrFail($id);
        $kategori = KategoriBerita::where('is_active', '0')->get();

        return Inertia::render('Admin/Berita/Edit', [
            'berita' => $berita,
            'kategori' => $kategori,
        ]);
    }

    public function update(BeritaRequest $request, string $id)
    {
        $berita = Berita::findOrFail($id);
        $data = $request->validated();
        $data['slug'] = Str::slug($request->title);
        $data['is_active'] = $request->input('is_active', '0');

        if ($request->hasFile('thumbnail')) {
            if ($berita->thumbnail) {
                Storage::delete('public/images/berita/' . $berita->thumbnail);
            }
            $image = $request->file('thumbnail');
            $name = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/images/berita', $name);
            $data['thumbnail'] = $name;
        } else {
            unset($data['thumbnail']);
        }

        $berita->update($data);

        return redirect()->route('berita-admin.index')
            ->with('message', 'Berita berhasil diperbarui.')
            ->with('type', 'success');
    }

    public function destroy(string $id)
    {
        $berita = Berita::findOrFail($id);

        if ($berita->thumbnail) {
            Storage::delete('public/images/berita/' . $berita->thumbnail);
        }

        $berita->delete();

        return redirect()->route('berita-admin.index')
            ->with('message', 'Berita berhasil dihapus.')
            ->with('type', 'success');
    }
}
