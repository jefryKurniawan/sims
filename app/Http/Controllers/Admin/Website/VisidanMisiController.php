<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\Visimisi;
use App\Http\Requests\VisidanMisiRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class VisidanMisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $visimisi = Visimisi::first();

        return Inertia::render('Admin/Website/VisidanMisi/Index', [
            'visimisi' => $visimisi,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/VisidanMisi/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VisidanMisiRequest $request)
    {
        try {
            $nama_img = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $nama_img = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/visimisi';
                $image->storeAs($tujuan_upload, $nama_img);
            }

            $visimisi = new Visimisi();
            $visimisi->visi = $request->visi;
            $visimisi->misi = $request->misi;
            $visimisi->image = $nama_img;
            $visimisi->save();

            Session::flash('success', 'Visi dan Misi Berhasil dibuat!');

            return redirect()->route('website.visimisi.index');
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
        $visimisi = Visimisi::findOrFail($id);

        return Inertia::render('Admin/Website/VisidanMisi/Show', [
            'visimisi' => $visimisi,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $visimisi = Visimisi::findOrFail($id);

        return Inertia::render('Admin/Website/VisidanMisi/Edit', [
            'visimisi' => $visimisi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VisidanMisiRequest $request, $id)
    {
        try {
            $visimisi = Visimisi::findOrFail($id);

            $nama_img = $visimisi->image;
            if ($request->hasFile('image')) {
                // Delete old image
                if ($visimisi->image) {
                    Storage::delete('public/images/visimisi/' . $visimisi->image);
                }
                $image = $request->file('image');
                $nama_img = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/visimisi';
                $image->storeAs($tujuan_upload, $nama_img);
            }

            $visimisi->visi = $request->visi;
            $visimisi->misi = $request->misi;
            $visimisi->image = $nama_img ?? $visimisi->image;
            $visimisi->save();

            Session::flash('success', 'Visi dan Misi Berhasil diupdate!');

            return redirect()->route('website.visimisi.index');
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
            $visimisi = Visimisi::findOrFail($id);

            if ($visimisi->image) {
                Storage::delete('public/images/visimisi/' . $visimisi->image);
            }

            $visimisi->delete();

            Session::flash('success', 'Visi dan Misi Berhasil dihapus!');

            return redirect()->route('website.visimisi.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}