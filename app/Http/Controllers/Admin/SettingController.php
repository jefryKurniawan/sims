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
            'nama_sekolah' => 'sometimes|required|string|max:255',
            'alamat' => 'sometimes|required|string|max:255',
            'logo_url' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            // Legalitas
            'npsn' => 'sometimes|required|string|max:255',
            'akreditasi' => 'sometimes|required|string|max:50',
            'nama_kepala_sekolah' => 'sometimes|required|string|max:255',
            'nip_kepala_sekolah' => 'sometimes|required|string|max:255',
            // Tema
            'tema' => 'sometimes|required|in:navy,emerald,amber,rose,indigo',
            // Hero
            'hero_media_type' => 'sometimes|required|in:foto,video',
            'hero_media_url' => 'nullable|string|max:255',
        ]);

        // Update Profile Sekolah — only if fields present
        $profileFields = ['nama_sekolah', 'alamat', 'logo_url', 'facebook', 'twitter', 'instagram'];
        if ($request->hasAny($profileFields)) {
            $profile = ProfileSekolah::first() ?? new ProfileSekolah();
            foreach ($profileFields as $f) {
                if ($request->has($f)) $profile->{$f} = $request->{$f};
            }
            $profile->save();
        }

        // Update Setting — only if fields present
        $settingFields = ['npsn', 'akreditasi', 'nama_kepala_sekolah', 'nip_kepala_sekolah', 'tema', 'hero_media_type', 'hero_media_url'];
        if ($request->hasAny($settingFields)) {
            $setting = Setting::where('user_id', auth()->id())->first() ?? new Setting(['user_id' => auth()->id()]);
            foreach ($settingFields as $f) {
                if ($request->has($f)) $setting->{$f} = $request->{$f};
            }
            $setting->save();
        }

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