<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Http\Requests\VideoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $video = Video::all();

        return Inertia::render('Admin/Website/Video/Index', [
            'video' => $video,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/Video/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VideoRequest $request)
    {
        try {
            if ($request->is_active == '0') {
                Video::where('is_active', '0')->update([
                    'is_active' => '1'
                ]);
            }

            $video = new Video();
            $video->title = $request->title;
            $video->desc = $request->desc;
            $video->url = $request->url;
            $video->is_active = $request->is_active;
            $video->save();

            Session::flash('success', 'Video Berhasil ditambah !');

            return redirect()->route('website.video.index');
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
        $video = Video::findOrFail($id);

        return Inertia::render('Admin/Website/Video/Show', [
            'video' => $video,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $video = Video::findOrFail($id);

        return Inertia::render('Admin/Website/Video/Edit', [
            'video' => $video,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            if ($request->is_active == '0') {
                Video::where('is_active', '0')->update([
                    'is_active' => '1'
                ]);
            }

            $video = Video::findOrFail($id);
            $video->title = $request->title ?? $video->title;
            $video->desc = $request->desc ?? $video->desc;
            $video->url = $request->url ?? $video->url;
            $video->is_active = $request->is_active;
            $video->save();

            Session::flash('success', 'Video Berhasil diupdate !');

            return redirect()->route('website.video.index');
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
            $video = Video::findOrFail($id);
            $video->delete();

            Session::flash('success', 'Video Berhasil dihapus !');

            return redirect()->route('website.video.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}