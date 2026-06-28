<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\Setting;
use Modules\SPP\Entities\BankAccount;
use Modules\SPP\Entities\SppSetting;
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

        return redirect()->back()->with('success', 'Akun Bank Berhasil Ditambah.');
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

        return redirect()->back()->with('success', 'Berhasil meng update setting notifikasi.');
    }
}