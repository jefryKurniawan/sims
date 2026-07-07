<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\Footer;
use Illuminate\Http\Request;
use App\Http\Requests\FooterRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class FooterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $footer = Footer::first();

        return Inertia::render('Admin/Website/Footer/Index', [
            'footer' => $footer,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/Footer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FooterRequest $request)
    {
        try {
            $nama_logo = null;
            if ($request->hasFile('logo')) {
                $image = $request->file('logo');
                $nama_logo = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/logo';
                $image->storeAs($tujuan_upload, $nama_logo);
            }

            $footer = Footer::create([
                'facebook' => $request->facebook,
                'instagram' => $request->instagram,
                'twitter' => $request->twitter,
                'youtube' => $request->youtube,
                'logo' => $nama_logo,
                'email' => $request->email,
                'telp' => $request->telp,
                'whatsapp' => $request->whatsapp,
                'desc' => $request->desc,
            ]);

            Session::flash('success', 'Footer Berhasil dibuat !');

            return redirect()->route('website-footer.index');
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
        $footer = Footer::findOrFail($id);

        return Inertia::render('Admin/Website/Footer/Show', [
            'footer' => $footer,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $footer = Footer::findOrFail($id);

        return Inertia::render('Admin/Website/Footer/Edit', [
            'footer' => $footer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FooterRequest $request, $id)
    {
        try {
            $footer = Footer::findOrFail($id);

            $nama_logo = $footer->logo;
            if ($request->hasFile('logo')) {
                // Delete old logo
                if ($footer->logo) {
                    Storage::delete('public/images/logo/' . $footer->logo);
                }
                $image = $request->file('logo');
                $nama_logo = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/logo';
                $image->storeAs($tujuan_upload, $nama_logo);
            }

            $footer->update([
                'facebook' => $request->facebook,
                'instagram' => $request->instagram,
                'twitter' => $request->twitter,
                'youtube' => $request->youtube,
                'logo' => $nama_logo,
                'email' => $request->email,
                'telp' => $request->telp,
                'whatsapp' => $request->whatsapp,
                'desc' => $request->desc,
            ]);

            Session::flash('success', 'Footer Berhasil diupdate !');

            return redirect()->route('website-footer.index');
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
            $footer = Footer::findOrFail($id);

            if ($footer->logo) {
                Storage::delete('public/images/logo/' . $footer->logo);
            }

            $footer->delete();

            Session::flash('success', 'Footer Berhasil dihapus !');

            return redirect()->route('website-footer.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}