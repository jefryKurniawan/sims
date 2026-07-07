<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\BankAccount;
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
            $setgt->user_id = auth()->id();
        }
        $setting->isEmail = $request->isEmail ?? 0;
        $setting->save();

        return redirect()->route('settings')->with('success', 'Berhasil mengupdate setting notifikasi.');
    }
}