<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\KategoriBerita;
use App\Http\Requests\KategoriBeritaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class KategoriBeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategori = KategoriBerita::withCount('beritas')->get();

        return Inertia::render('Admin/Website/KategoriBerita/Index', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/KategoriBerita/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KategoriBeritaRequest $request)
    {
        try {
            $kategori = new KategoriBerita();
            $kategori->nama = $request->nama;
            $kategori->is_active = $request->is_active;
            $kategori->save();

            Session::flash('success', 'Kategori Berhasil ditambah !');

            return redirect()->route('website.kategori-berita.index');
        } catch (Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $kategori = KategoriBerita::withCount('beritas')->findOrFail($id);

        return Inertia::render('Admin/Website/KategoriBerita/Show', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $kategori = KategoriBerita::findOrFail($id);

        return Inertia::render('Admin/Website/KategoriBerita/Edit', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KategoriBeritaRequest $request, $id)
    {
        try {
            $kategori = KategoriBerita::findOrFail($id);
            $kategori->nama = $request->nama;
            $kategori->is_active = $request->is_active;
            $kategori->save();

            Session::flash('success', 'Kategori Berhasil diupdate !');

            return redirect()->route('website.kategori-berita.index');
        } catch (Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $kategori = KategoriBerita::findOrFail($id);

            if ($kategori->beritas()->count() > 0) {
                Session::flash('error', 'Kategori tidak dapat dihapus karena masih memiliki berita terkait !');
                return redirect()->route('website.kategori-berita.index');
            }

            $kategori->delete();

            Session::flash('success', 'Kategori Berhasil dihapus !');

            return redirect()->route('website.kategori-berita.index');
        } catch (Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}