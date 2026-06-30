<?php

namespace App\Http\Controllers\Admin\Pengguna;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UsersDetail;
use ErrorException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class PerpusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $perpus = User::with('userDetail')->where('role','Perpustakaan')->get();
        return Inertia::render('Admin/Perpustakaan/Index', [
            'perpus' => $perpus,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Perpustakaan/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $image = $request->file('foto_profile');
            $nama_img = time()."_".$image->getClientOriginalName();
            // isi dengan nama folder tempat kemana file diupload
            $tujuan_upload = 'public/images/profile';
            $image->storeAs($tujuan_upload,$nama_img);

            // Pilih kalimat
            $kalimatKe  = "1";
            $username   = implode(" ", array_slice(explode(" ", $request->name), 0, $kalimatKe)); // ambil kata pertama

            $user = new User();
            $user->name             = $request->name;
            $user->email            = $request->email;
            $user->username         = strtolower($username).date("s");
            $user->role             = 'Perpustakaan';
            $user->status           = 'Aktif';
            $user->foto_profile     = $nama_img;
            $user->password         = bcrypt('12345678');
            $user->save();

            if ($user) {
                $userDetail = new UsersDetail();
                $userDetail->user_id      = $user->id;
                $userDetail->role         = $user->role;
                $userDetail->nip          = $request->nip;
                $userDetail->email        = $request->email;
                $userDetail->linkidln     = $request->linkidln;
                $userDetail->instagram    = $request->instagram;
                $userDetail->website      = $request->website;
                $userDetail->facebook     = $request->facebook;
                $userDetail->twitter      = $request->twitter;
                $userDetail->youtube      = $request->youtube;
                $userDetail->save();
            }

            $user->assignRole($user->role);
            DB::commit();
            session()->flash('success','Petugas Perpustakaan Berhasil ditambah !');
            return redirect()->route('users.perpus.index');

        } catch (\Throwable $e) {
            DB::rollback();
            throw new \Throwable($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $perpus = User::with('userDetail')->find($id);
        return Inertia::render('Admin/Perpustakaan/Edit', [
            'perpus' => $perpus,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            if ($request->foto_profile) {
                $image = $request->file('foto_profile');
                $nama_img = time()."_".$image->getClientOriginalName();
                // isi dengan nama folder tempat kemana file diupload
                $tujuan_upload = 'public/images/profile';
                $image->storeAs($tujuan_upload,$nama_img);
            }

            $user = User::find($id);
            $user->name             = $request->name;
            $user->email            = $request->email;
            $user->status           = $request->status;
            $user->foto_profile     = $nama_img ?? $user->foto_profile;
            $user->password         = bcrypt('12345678');
            $user->save();

            if ($user) {
                $userDetail = UsersDetail::where('user_id', $id)->first();
                $userDetail->user_id      = $user->id;
                $userDetail->is_active    = $user->status == 'Aktif' ? '0' : '1';
                $userDetail->nip          = $request->nip;
                $userDetail->email        = $request->email;
                $userDetail->linkidln     = $request->linkidln;
                $userDetail->instagram    = $request->instagram;
                $userDetail->website      = $request->website;
                $userDetail->facebook     = $request->facebook;
                $userDetail->twitter      = $request->twitter;
                $userDetail->youtube      = $request->youtube;
                $userDetail->save();
            }

            DB::commit();
            session()->flash('success','Petugas Perpustakaan Berhasil diubah !');
            return redirect()->route('users.perpus.index');

        } catch (\Throwable $e) {
            DB::rollback();
            throw new \Throwable($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            // Delete photo if exists
            if ($user->foto_profile && File::exists(public_path('images/profile/'.$user->foto_profile))) {
                File::delete(public_path('images/profile/'.$user->foto_profile));
            }
            // Delete user detail
            UsersDetail::where('user_id', $id)->delete();
            // Delete user
            $user->delete();
        }

        session()->flash('success','Petugas Perpustakaan Berhasil dihapus !');
        return redirect()->route('users.perpus.index');
    }
}