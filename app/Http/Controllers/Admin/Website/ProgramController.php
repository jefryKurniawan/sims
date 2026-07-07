<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\Jurusan;
use App\Models\DataJurusan;
use Illuminate\Http\Request;
use App\Http\Requests\ProgramRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jurusan = Jurusan::with('dataJurusan')->get();

        return Inertia::render('Admin/Website/Program/Index', [
            'jurusan' => $jurusan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/Program/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProgramRequest $request)
    {
        try {
            $nama_image = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/jurusan';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $jurusan = Jurusan::create([
                'nama' => $request->nama,
                'singkatan' => $request->singkatan,
                'is_active' => $request->input('is_active', '0'),
            ]);

            $jurusan->dataJurusan()->create([
                'content' => $request->content,
                'image' => $nama_image,
            ]);

            Session::flash('success', 'Program Studi Berhasil ditambah !');

            return redirect()->route('program-studi.index');
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
        $jurusan = Jurusan::with('dataJurusan')->findOrFail($id);

        return Inertia::render('Admin/Website/Program/Show', [
            'jurusan' => $jurusan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $jurusan = Jurusan::with('dataJurusan')->findOrFail($id);

        return Inertia::render('Admin/Website/Program/Edit', [
            'jurusan' => $jurusan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProgramRequest $request, $id)
    {
        try {
            $jurusan = Jurusan::with('dataJurusan')->findOrFail($id);

            $nama_image = $jurusan->dataJurusan->image ?? null;
            if ($request->hasFile('image')) {
                // Delete old image
                if ($jurusan->dataJurusan->image) {
                    Storage::delete('public/images/jurusan/' . $jurusan->dataJurusan->image);
                }
                $image = $request->file('image');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/jurusan';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $jurusan->update([
                'nama' => $request->nama,
                'singkatan' => $request->singkatan,
                'is_active' => $request->input('is_active', $jurusan->is_active),
            ]);

            $jurusan->dataJurusan()->update([
                'content' => $request->content,
                'image' => $nama_image,
            ]);

            Session::flash('success', 'Program Studi Berhasil diupdate !');

            return redirect()->route('program-studi.index');
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
            $jurusan = Jurusan::with('dataJurusan')->findOrFail($id);

            // Delete image if exists
            if ($jurusan->dataJurusan && $jurusan->dataJurusan->image) {
                Storage::delete('public/images/jurusan/' . $jurusan->dataJurusan->image);
            }

            $jurusan->delete();

            Session::flash('success', 'Program Studi Berhasil dihapus !');

            return redirect()->route('program-studi.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}