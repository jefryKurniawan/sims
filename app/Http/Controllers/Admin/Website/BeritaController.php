<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\KategoriBerita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $kategori = KategoriBerita::where('is_Active', '0')->get();
        $berita = Berita::with('kategori', 'user')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Website/Berita/Index', [
            'kategori' => $kategori,
            'berita' => $berita,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $kategori = KategoriBerita::where('is_Active', '0')->get();

        return Inertia::render('Admin/Website/Berita/Create', [
            'kategori' => $kategori,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:beritas,slug',
            'content' => 'required|string',
            'kategori_id' => 'required|exists:kategori_berita,id',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_active' => 'sometimes|in:0,1',
        ]);

        try {
            $nama_image = null;
            if ($request->hasFile('thumbnail')) {
                $image = $request->file('thumbnail');
                $nama_image = time() . "_" . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/berita';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $slug = $request->slug ?: Str::slug($request->title);

            $berita = new Berita;
            $berita->title = $request->title;
            $berita->slug = $slug;
            $berita->content = $request->content;
            $berita->kategori_id = $request->kategori_id;
            $berita->thumbnail = $nama_image;
            $berita->created_by = Auth::id();
            $berita->is_active = $request->input('is_active', '0');
            $berita->save();

            Session::flash('success', 'Berita Berhasil ditambah !');

            return redirect()->route('website.berita.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $berita = Berita::with('kategori', 'user')->findOrFail($id);

        return Inertia::render('Admin/Website/Berita/Show', [
            'berita' => $berita,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $kategori = KategoriBerita::where('is_Active', '0')->get();
        $berita = Berita::find($id);

        return Inertia::render('Admin/Website/Berita/Edit', [
            'kategori' => $kategori,
            'berita' => $berita,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:beritas,slug,' . $id,
            'content' => 'required|string',
            'kategori_id' => 'required|exists:kategori_berita,id',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_active' => 'sometimes|in:0,1',
        ]);

        try {
            $berita = Berita::findOrFail($id);

            $nama_image = $berita->thumbnail;
            if ($request->hasFile('thumbnail')) {
                // Delete old image
                if ($berita->thumbnail) {
                    Storage::delete('public/images/berita/' . $berita->thumbnail);
                }
                $image = $request->file('thumbnail');
                $nama_image = time() . "_" . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/berita';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $slug = $request->slug ?: $berita->slug;
            if ($request->has('slug') && $request->slug !== $berita->slug) {
                $slug = $request->slug;
            }

            $berita->title = $request->title;
            $berita->slug = $slug;
            $berita->content = $request->content;
            $berita->kategori_id = $request->kategori_id;
            $berita->thumbnail = $nama_image;
            $berita->is_active = $request->input('is_active', $berita->is_active);
            $berita->save();

            Session::flash('success', 'Berita Berhasil diupdate !');

            return redirect()->route('website.berita.index');
        } catch (\Exception $e) {
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
            $berita = Berita::findOrFail($id);

            if ($berita->thumbnail) {
                Storage::delete('public/images/berita/' . $berita->thumbnail);
            }

            $berita->delete();

            Session::flash('success', 'Berita Berhasil dihapus !');

            return redirect()->route('website.berita.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}