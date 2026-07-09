<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\BankAccount;
use App\Models\ProfileSekolah;
use App\Models\Setting;
use App\Models\SppSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Setting/Index', [
            'banks' => Bank::all(),
            'spp' => SppSetting::first(),
            'profileSekolah' => ProfileSekolah::first(),
            'setting' => Setting::where('user_id', auth()->id())->first(),
        ]);
    }

    // Tambah Bank
    public function addBank(Request $request)
    {
        $request->validate([
            'account_number' => 'required|string|max:255',
            'account_name' => 'required|string|max:255',
            'bank_name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        BankAccount::create([
            'user_id' => auth()->id(),
            'account_number' => $request->account_number,
            'account_name' => $request->account_name,
            'bank_name' => $request->bank_name,
            'is_active' => $request->is_active ?? false,
            'is_primary' => 1
        ]);

        return redirect()->route('settings')->with('success', 'Akun Bank Berhasil Ditambah.');
    }

    // Setting Notification
    public function notifications(Request $request)
    {
        $request->validate([
            'isEmail' => 'boolean',
        ]);

        $setting = Setting::where('user_id', auth()->id())->first();
        if (!$setting) {
            $setting = new Setting();
            $setting->user_id = auth()->id();
        }
        $setting->isEmail = $request->isEmail ?? 0;
        $setting->save();

        return redirect()->route('settings')->with('success', 'Berhasil mengupdate setting notifikasi.');
    }

    // Update Settings
    public function update(Request $request)
    {
        $request->validate([
            // Profile Sekolah
            'nama_sekolah' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'logo_url' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            // Legalitas
            'npsn' => 'required|string|max:255',
            'akreditasi' => 'required|string|max:50',
            'nama_kepala_sekolah' => 'required|string|max:255',
            'nip_kepala_sekolah' => 'required|string|max:255',
            // Tema
            'tema' => 'required|in:navy,emerald',
            // Hero
            'hero_media_type' => 'required|in:foto,video',
            'hero_media_url' => 'nullable|string|max:255',
        ]);

        // Update Profile Sekolah
        $profile = ProfileSekolah::first();
        if (!$profile) {
            $profile = new ProfileSekolah();
        }
        $profile->nama_sekolah = $request->nama_sekolah;
        $profile->alamat = $request->alamat;
        $profile->logo = $request->logo_url;
        $profile->facebook = $request->facebook;
        $profile->twitter = $request->twitter;
        $profile->instagram = $request->instagram;
        $profile->save();

        // Update Setting
        $setting = Setting::where('user_id', auth()->id())->first();
        if (!$setting) {
            $setting = new Setting();
            $setting->user_id = auth()->id();
        }
        $setting->npsn = $request->npsn;
        $setting->akreditasi = $request->akreditasi;
        $setting->nama_kepala_sekolah = $request->nama_kepala_sekolah;
        $setting->nip_kepala_sekolah = $request->nip_kepala_sekolah;
        $setting->tema = $request->tema;
        $setting->hero_media_type = $request->hero_media_type;
        $setting->hero_media_url = $request->hero_media_url;
        $setting->save();

        return redirect()->route('settings')->with('success', 'Pengaturan berhasil disimpan.');
    }

    // Halaman Data Instansi
    public function dataInstansi()
    {
        return Inertia::render('Admin/Setting/DataInstansi', [
            'banks' => \App\Models\Bank::all(),
            'spp' => \App\Models\SppSetting::first(),
            'profileSekolah' => \App\Models\ProfileSekolah::first(),
            'setting' => \App\Models\Setting::where('user_id', auth()->id())->first(),
        ]);
    }

    // Halaman Legalitas Instansi
    public function legalitas()
    {
        return Inertia::render('Admin/Setting/LegalitasInstansi', [
            'banks' => \App\Models\Bank::all(),
            'spp' => \App\Models\SppSetting::first(),
            'profileSekolah' => \App\Models\ProfileSekolah::first(),
            'setting' => \App\Models\Setting::where('user_id', auth()->id())->first(),
        ]);
    }

    // Halaman Konfigurasi Web
    public function konfigurasi()
    {
        return Inertia::render('Admin/Setting/KonfigurasiWeb', [
            'banks' => \App\Models\Bank::all(),
            'spp' => \App\Models\SppSetting::first(),
            'profileSekolah' => \App\Models\ProfileSekolah::first(),
            'setting' => \App\Models\Setting::where('user_id', auth()->id())->first(),
        ]);
    }
}