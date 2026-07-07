<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileSettingsRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profile = User::whereId(Auth::id())->first();

        return Inertia::render('Admin/Profile/Index', [
            'profile' => $profile,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileSettingsRequest $request, $id)
    {
        try {
            $nama_image = null;
            if ($request->foto_profile) {
                $image = $request->file('foto_profile');
                $nama_image = time() . '_' . $image->getClientOriginalName();
                // isi dengan nama folder tempat kemana file diupload
                $tujuan_upload = 'public/images/profile';
                $image->storeAs($tujuan_upload, $nama_image);
            }

            $profile = User::find($id);
            $profile->name = $request->name;
            $profile->username = $request->username;
            $profile->email = $request->email;
            $profile->foto_profile = $nama_image ?? $profile->foto_profile;
            if ($request->email) {
                $profile->email_verified_at = null;
            }
            $profile->save();

            Session::flash('success', 'Profile Berhasil diupdate !');

            return redirect()->back();
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    // Ubah Password
    public function changePassword(ChangePasswordRequest $request, $id)
    {
        try {
            $profile = User::find($id);
            $profile->password = bcrypt($request->password);
            $profile->save();

            Session::flash('success', 'Password Berhasil diupdate !');

            return redirect()->back();
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }
}