<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use App\Http\Requests\AboutRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $about = About::all();

        return Inertia::render('Admin/Website/About/Index', [
            'about' => $about,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/About/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AboutRequest $request)
    {
        try {
            $nama_image = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/about';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $about = About::create([
                'title' => $request->title,
                'desc' => $request->desc,
                'image' => $nama_image,
                'is_active' => $request->input('is_active', '0'),
            ]);

            Session::flash('success', 'About Berhasil ditambah !');

            return redirect()->route('about.index');
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
        $about = About::findOrFail($id);

        return Inertia::render('Admin/Website/About/Show', [
            'about' => $about,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $about = About::findOrFail($id);

        return Inertia::render('Admin/Website/About/Edit', [
            'about' => $about,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AboutRequest $request, $id)
    {
        try {
            $about = About::findOrFail($id);

            $nama_image = $about->image;
            if ($request->hasFile('image')) {
                // Delete old image
                if ($about->image) {
                    Storage::delete('public/images/about/' . $about->image);
                }
                $image = $request->file('image');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/about';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $about->update([
                'title' => $request->title,
                'desc' => $request->desc,
                'image' => $nama_image,
                'is_active' => $request->input('is_active', $about->is_active),
            ]);

            Session::flash('success', 'About Berhasil diupdate !');

            return redirect()->route('about.index');
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
            $about = About::findOrFail($id);

            if ($about->image) {
                Storage::delete('public/images/about/' . $about->image);
            }

            $about->delete();

            Session::flash('success', 'About Berhasil dihapus !');

            return redirect()->route('about.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}