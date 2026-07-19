<?php

namespace App\Http\Controllers\Admin\Pengguna;

use App\Http\Controllers\Controller;
use App\Http\Requests\PengajarRequest;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Excel;
use App\Http\Controllers\Concerns\HandlesImport;
use Inertia\Inertia;

class PengajarController extends Controller
{
    use HandlesImport;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengajar = User::with('userDetail')->whereRaw('LOWER(role) = ?', ['guru'])->get();

        return Inertia::render('Admin/Pengguna/Pengajar/Index', [
            'pengajar' => $pengajar,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Pengguna/Pengajar/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PengajarRequest $request)
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
            $user->role = 'Guru';
            $user->status = 'Aktif';
            $user->foto_profile = $nama_img;
            $user->password = bcrypt('12345678');
            $user->save();

            if ($user) {
                $userDetail = new \App\Models\UserDetail();
                $userDetail->user_id = $user->id;
                $userDetail->role = $user->role;
                $userDetail->mengajar = $request->mengajar;
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

            Session::flash('success', 'Pengajar Berhasil ditambah !');

            return redirect()->route('users.pengajar.index');
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
        $pengajar = User::with('userDetail')->whereRaw('LOWER(role) = ?', ['guru'])->findOrFail($id);

        return Inertia::render('Admin/Pengguna/Pengajar/Show', [
            'pengajar' => $pengajar,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $pengajar = User::with('userDetail')->whereRaw('LOWER(role) = ?', ['guru'])->findOrFail($id);

        return Inertia::render('Admin/Pengguna/Pengajar/Edit', [
            'pengajar' => $pengajar,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PengajarRequest $request, $id)
    {
        try {
            $pengajar = User::with('userDetail')->whereRaw('LOWER(role) = ?', ['guru'])->findOrFail($id);

            $nama_img = $pengajar->foto_profile;
            if ($request->hasFile('foto_profile')) {
                // Delete old image
                if ($pengajar->foto_profile) {
                    Storage::delete('public/images/profile/' . $pengajar->foto_profile);
                }
                $image = $request->file('foto_profile');
                $nama_img = time() . '_' . $image->getClientOriginalName();
                $tujuan_upload = 'public/images/profile';
                $image->storeAs($tujuan_upload, $nama_img);
            }

            $pengajar->name = $request->name;
            $pengajar->email = $request->email;
            $pengajar->username = strtolower(implode(" ", array_slice(explode(" ", $request->name), 0, 1))) . date("s");
            $pengajar->role = 'Guru';
            $pengajar->status = 'Aktif';
            $pengajar->foto_profile = $nama_img ?? $pengajar->foto_profile;
            $pengajar->password = bcrypt('12345678');
            $pengajar->save();

            if ($pengajar) {
                $pengajar->userDetail->update([
                    'role' => $pengajar->role,
                    'mengajar' => $request->mengajar,
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

            $pengajar->assignRole($pengajar->role);

            Session::flash('success', 'Pengajar Berhasil diubah !');

            return redirect()->route('users.pengajar.index');
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
            $pengajar = User::with('userDetail')->whereRaw('LOWER(role) = ?', ['guru'])->findOrFail($id);

            if ($pengajar->foto_profile) {
                Storage::delete('public/images/profile/' . $pengajar->foto_profile);
            }

            $pengajar->delete();

            Session::flash('success', 'Pengajar Berhasil dihapus !');

            return redirect()->route('users.pengajar.index');
        } catch (\Exception $e) {
            Session::flash('error', 'Terjadi kesalahan: ' . $e->getMessage());
            return redirect()->back();
        }
    }

    /**
     * Show import form.
     */
    public function importForm()
    {
        return Inertia::render('Admin/Pengguna/Pengajar/Import');
    }

    /**
     * Process import.
     */
    public function import(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240',
        ]);

        $result = $this->runImport($request, User::class, function ($row) {
            // map Excel columns to model attributes
            return [
                'name' => $row['nama_lengkap'] ?? null,
                'email' => $row['email'] ?? null,
                'username' => strtolower(str_replace(' ', '', $row['nama_lengkap'] ?? '')) . rand(1000,9999),
                'role' => 'Guru',
                'status' => 'Aktif',
                'password' => Hash::make('12345678'), // default password, should be changed on first login
            ];
        });

        // after creating users, create UserDetail records
        foreach (User::latest()->limit($result['imported'])->get() as $user) {
            UserDetail::create([
                'user_id' => $user->id,
                'role' => $user->role,
                // other fields can be left null or filled from sheet if present
                'nip' => null,
                'mengajar' => null,
                'email' => $user->email,
                'linkidln' => null,
                'instagram' => null,
                'website' => null,
                'facebook' => null,
                'twitter' => null,
                'youtube' => null,
            ]);
        }

        $flash = $this->importFlash($result);
        return redirect()
            ->back()
            ->with($flash['success'] ? ['success' => $flash['success']] : ['error' => $flash['error']]);
    }

    /**
     * Download import template.
     */
    public function template()
    {
        $headers = [
            'nama_lengkap',
            'email',
            // optional fields: nip, mengajar, linkidln, instagram, website, facebook, twitter, youtube
        ];

        return Excel::download(new \App\Exports\TemplateExport($headers, [
            'nama_lengkap' => 'Contoh Guru',
            'email' => 'guru@example.com',
        ]), 'template-pengajar.xlsx');
    }
}