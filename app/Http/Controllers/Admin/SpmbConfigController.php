<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SpmbConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpmbConfigController extends Controller
{
    public function index()
    {
        $configs = SpmbConfig::orderBy('tahun_ajaran', 'desc')->get();

        return Inertia::render('Admin/Spmb/Config/Index', [
            'configs' => $configs,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tahun_ajaran' => 'required|string|max:20',
            'tanggal_buka' => 'required|date',
            'tanggal_tutup' => 'required|date|after_or_equal:tanggal_buka',
            'kuota_reguler' => 'required|integer|min:0',
            'kuota_afirmasi' => 'required|integer|min:0',
            'kuota_prestasi' => 'required|integer|min:0',
            'biaya_pendaftaran' => 'required|numeric|min:0',
            'aktif' => 'boolean',
        ]);

        SpmbConfig::create($validated);

        return redirect()->route('spmb.config.index')
            ->with('success', 'Konfigurasi SPMB berhasil ditambahkan.');
    }

    public function update(Request $request, SpmbConfig $spmbConfig)
    {
        $validated = $request->validate([
            'tahun_ajaran' => 'required|string|max:20',
            'tanggal_buka' => 'required|date',
            'tanggal_tutup' => 'required|date|after_or_equal:tanggal_buka',
            'kuota_reguler' => 'required|integer|min:0',
            'kuota_afirmasi' => 'required|integer|min:0',
            'kuota_prestasi' => 'required|integer|min:0',
            'biaya_pendaftaran' => 'required|numeric|min:0',
            'aktif' => 'boolean',
        ]);

        $spmbConfig->update($validated);

        return redirect()->route('spmb.config.index')
            ->with('success', 'Konfigurasi SPMB berhasil diperbarui.');
    }

    public function destroy(SpmbConfig $spmbConfig)
    {
        $spmbConfig->delete();

        return redirect()->route('spmb.config.index')
            ->with('success', 'Konfigurasi SPMB berhasil dihapus.');
    }
}
