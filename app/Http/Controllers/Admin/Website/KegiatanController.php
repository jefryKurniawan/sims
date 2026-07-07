<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Http\Requests\KegiatanRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kegiatan = Kegiatan::all();

        return Inertia::render('Admin/Website/Kegiatan/Index', [
            'kegiatan' => $kegiatan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/Kegiatan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KegiatanRequest $request)
    {
        try {
            $nama_image = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/kegiatan';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $kegiatan = new Kegiatan();
            $kegiatan->nama = $request->nama;
            $kegiatan->slug = $request->slug ?: Str::slug($request->nama);
            $kegiatan->image = $nama_image;
            $kegiatan->content = $request->content;
            $kegiatan->is_active = $request->input('is_active', '0');
            $kegiatan->save();

            Session::flash('success', 'Kegiatan Berhasil ditambah !');

            return redirect()->route('backend-kegiatan.index');
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
        $kegiatan = Kegiatan::findOrFail($id);

        return Inertia::render('Admin/Website/Kegiatan/Show', [
            'kegiatan' => $kegiatan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);

        return Inertia::render('Admin/Website/Kegiatan/Edit', [
            'kegiatan' => $kegiatan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $kegiatan = Kegiatan::findOrFail($id);

            $nama_image = $kegiatan->image;
            if ($request->hasFile('image')) {
                // Delete old image
                if ($kegiatan->image) {
                    Storage::delete('public/images/kegiatan/' . $kegiatan->image);
                }
                $image = $request->file('image');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/kegiatan';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $kegiatan->nama = $request->nama;
            $kegiatan->slug = $request->slug ?: $kegiatan->slug;
            $kegiatan->image = $nama_image ?? $kegiatan->image;
            $kegiatan->content = $request->content;
            $kegiatan->is_active = $request->input('is_active', $kegiatan->is_active);
            $kegiatan->save();

            Session::flash('success', 'Kegiatan Berhasil diupdate !');

            return redirect()->route('backend-kegiatan.index');
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
            $kegiatan = Kegiatan::findOrFail($id);

            if ($kegiatan->image) {
                Storage::delete('public/images/kegiatan/' . $kegiatan->image);
            }

            $kegiatan->delete();

            Session::flash('success', 'Kegiatan Berhasil dihapus !');

            return redirect()->route('backend-kegiatan.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}