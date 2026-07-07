<?php

namespace App\Http\Controllers\Admin\Website;

use App\Http\Controllers\Controller;
use App\Models\Events;
use App\Http\Requests\EventRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $event = Events::all();

        return Inertia::render('Admin/Website/Events/Index', [
            'event' => $event,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Website/Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventRequest $request)
    {
        try {
            $nama_image = null;
            if ($request->hasFile('thumbnail')) {
                $image = $request->file('thumbnail');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/event';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $event = new Events();
            $event->title = $request->title;
            $event->slug = $request->slug ?: Str::slug($request->title);
            $event->desc = $request->desc;
            $event->content = $request->content;
            $event->thumbnail = $nama_image;
            $event->acara = $request->acara;
            $event->lokasi = $request->lokasi;
            $event->is_Active = $request->input('is_Active', '0');
            $event->save();

            Session::flash('success', 'Event Berhasil ditambah !');

            return redirect()->route('website.event.index');
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
        $event = Events::findOrFail($id);

        return Inertia::render('Admin/Website/Events/Show', [
            'event' => $event,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $event = Events::findOrFail($id);

        return Inertia::render('Admin/Website/Events/Edit', [
            'event' => $event,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventRequest $request, $id)
    {
        try {
            $event = Events::findOrFail($id);

            $nama_image = $event->thumbnail;
            if ($request->hasFile('thumbnail')) {
                // Delete old image
                if ($event->thumbnail) {
                    Storage::delete('public/images/event/' . $event->thumbnail);
                }
                $image = $request->file('thumbnail');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/event';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $event->title = $request->title;
            $event->slug = $request->slug ?: $event->slug;
            $event->desc = $request->desc;
            $event->content = $request->content;
            $event->thumbnail = $nama_image ?? $event->thumbnail;
            $event->acara = $request->acara;
            $event->lokasi = $request->lokasi;
            $event->is_Active = $request->input('is_Active', $event->is_Active);
            $event->save();

            Session::flash('success', 'Event Berhasil diupdate !');

            return redirect()->route('website.event.index');
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
            $event = Events::findOrFail($id);

            if ($event->thumbnail) {
                Storage::delete('public/images/event/' . $event->thumbnail);
            }

            $event->delete();

            Session::flash('success', 'Event Berhasil dihapus !');

            return redirect()->route('website.event.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}