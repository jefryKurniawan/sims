<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\ImageSlider;
use Illuminate\Http\Request;
use App\Http\Requests\ImageSliderRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ImageSliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $image = ImageSlider::orderBy('urutan', 'asc')->get();

        return Inertia::render('Admin/Website/ImageSlider/Index', [
            'image' => $image,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/ImageSlider/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ImageSliderRequest $request)
    {
        try {
            $nama_image = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/slider';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $imageSlider = ImageSlider::create([
                'image' => $nama_image,
                'title' => $request->title,
                'desc' => $request->desc,
                'urutan' => $request->urutan,
                'is_active' => $request->input('is_active', '0'),
            ]);

            Session::flash('success', 'Gambar Slider Berhasil ditambah !');

            return redirect()->route('imageslider.index');
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
        $image = ImageSlider::findOrFail($id);

        return Inertia::render('Admin/Website/ImageSlider/Show', [
            'image' => $image,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $image = ImageSlider::findOrFail($id);

        return Inertia::render('Admin/Website/ImageSlider/Edit', [
            'image' => $image,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ImageSliderRequest $request, $id)
    {
        try {
            $image = ImageSlider::findOrFail($id);

            $nama_image = $image->image;
            if ($request->hasFile('image')) {
                // Delete old image
                if ($image->image) {
                    Storage::delete('public/images/slider/' . $image->image);
                }
                $image = $request->file('image');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/slider';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $image->update([
                'title' => $request->title,
                'desc' => $request->desc,
                'image' => $nama_image,
                'urutan' => $request->urutan,
                'is_active' => $request->input('is_active', $image->is_active),
            ]);

            Session::flash('success', 'Gambar Slider Berhasil diupdate !');

            return redirect()->route('imageslider.index');
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
            $image = ImageSlider::findOrFail($id);

            if ($image->image) {
                Storage::delete('public/images/slider/' . $image->image);
            }

            $image->delete();

            Session::flash('success', 'Gambar Slider Berhasil dihapus !');

            return redirect()->route('imageslider.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}