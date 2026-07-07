<?php

namespace App\Http\Controllers\Admin\Pengguna;

use App\Http\Controllers\Controller;
use App\Http\Requests\StafRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class StafController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staf = User::with('userDetail')->where('role', 'Staf')->get();

        return Inertia::render('Admin/Pengguna/Staf/Index', [
            'staf' => $staf,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Pengguna/Staf/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StafRequest $request)
    {
        try {
            $nama_img = null;
            if ($request->hasFile('foto_profile')) {
                $image = $request->file('foto_profile');
                $nama_img = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/profile';
                $image->storeAs($tujuan_upload, $nama_img);
            }

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = strtolower(implode(" ", array_slice(explode(" ", $request->name), 0, 1))) . date("s");
            $user->role = 'Staf';
            $user->status = 'Aktif';
            $user->foto_profile = $nama_img;
            $user->password = bcrypt('12345678');
            $user->save();

            if ($user) {
                $userDetail = new \App\Models\UserDetail();
                $userDetail->user_id = $user->id;
                $userDetail->role = $user->role;
                $userDetail->nip = $request->nip;
                $userDetail->email = $request->email;
                $userDetail->linkidln = $request->linkidln;
                $userDetail->instagram = $request->instagram;
                $userDetail->website = $request->website;
                $userDetail->facebook = $request->facebook;
                $userDetail->twitter = $request->twitter;
                $userDetail->youtube = $request->youtube;
                $userDetail->save();
            }

            $user->assignRole($user->role);

            Session::flash('success', 'Staf Berhasil ditambah !');

            return redirect()->route('users.staf.index');
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
        $staf = User::with('userDetail')->where('role', 'Staf')->findOrFail($id);

        return Inertia::render('Admin/Pengguna/Staf/Show', [
            'staf' => $staf,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $staf = User::with('userDetail')->where('role', 'Staf')->findOrFail($id);

        return Inertia::render('Admin/Pengguna/Staf/Edit', [
            'staf' => $staf,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StafRequest $request, $id)
    {
        try {
            $staf = User::with('userDetail')->where('role', 'Staf')->findOrFail($id);

            $nama_img = $staf->foto_profile;
            if ($request->hasFile('foto_profile')) {
                // Delete old image
                if ($staf->foto_profile) {
                    Storage::delete('public/images/profile/' . $staf->foto_profile);
                }
                $image = $request->file('foto_profile');
                $nama_img = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/profile';
                $image->storeAs($tujuan_upload, $nama_img);
            }

            $staf->name = $request->name;
            $staf->email = $request->email;
            $staf->username = strtolower(implode(" ", array_slice(explode(" ", $request->name), 0, 1))) . date("s");
            $staf->role = 'Staf';
            $staf->status = 'Aktif';
            $staf->foto_profile = $nama_img ?? $staf->foto_profile;
            $staf->password = bcrypt('12345678');
            $staf->save();

            if ($staf) {
                $staf->userDetail->update([
                    'role' => $staf->role,
                    'nip' => $request->nip,
                    'email' => $request->email,
                    'linkidln' => $request->linkidln,
                    'instagram' => $request->instagram,
                    'website' => $request->website,
                    'facebook' => $request->facebook,
                    'twitter' => $request->twitter,
                    'youtube' => $request->youtube,
                ]);
            }

            $staf->assignRole($staf->role);

            Session::flash('success', 'Staf Berhasil diubah !');

            return redirect()->route('users.staf.index');
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
            $staf = User::with('userDetail')->where('role', 'Staf')->findOrFail($id);

            if ($staf->foto_profile) {
                Storage::delete('public/images/profile/' . $staf->foto_profile);
            }

            $staf->delete();

            Session::flash('success', 'Staf Berhasil dihapus !');

            return redirect()->route('users.staf.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }
}