<?php

namespace App\Http\Controllers\Erapor;

use App\Http\Controllers\Controller;
use App\Models\AsesmenFormatif;
use App\Models\AsesmenSumatif;
use App\Models\RaporSiswa;
use App\Models\RaporMapel;
use App\Models\TujuanPembelajaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NilaiController extends Controller
{
    public function index(Request $request)
    {
        $query = AsesmenFormatif::with(['raporSiswa.siswa', 'raporMapel', 'tujuanPembelajaran'])
            ->when($request->filled('rapor_mapel_id'), fn($q) => $q->where('rapor_mapel_id', $request->rapor_mapel_id))
            ->when($request->filled('tanggal_from'), fn($q) => $q->whereDate('tanggal', '>=', $request->tanggal_from))
            ->when($request->filled('tanggal_to'), fn($q) => $q->whereDate('tanggal', '<=', $request->tanggal_to))
            ->latest('tanggal');

        $nilaiFormatif = $query->paginate(30);

        $querySumatif = AsesmenSumatif::with(['raporSiswa.siswa', 'raporMapel'])
            ->latest('tanggal');

        $nilaiSumatif = $querySumatif->paginate(30);

        return Inertia::render('Erapor/Nilai/Index', [
            'nilaiFormatif' => $nilaiFormatif,
            'nilaiSumatif' => $nilaiSumatif,
            'mapels' => RaporMapel::all(['id', 'nama']),
            'filters' => $request->only(['rapor_mapel_id', 'tanggal_from', 'tanggal_to']),
        ]);
    }

    public function inputForm(Request $request)
    {
        $request->validate([
            'jenis_nilai' => 'required|in:formatif,sumatif',
        ]);

        $siswas = RaporSiswa::with('siswa')->get();
        $mapels = RaporMapel::all();
        $tps = TujuanPembelajaran::aktif()->get();

        return Inertia::render('Erapor/Nilai/InputForm', [
            'jenis' => $request->jenis_nilai,
            'siswas' => $siswas,
            'mapels' => $mapels,
            'tps' => $tps,
        ]);
    }

    public function storeFormatif(Request $request)
    {
        $validated = $request->validate([
            'entries' => 'required|array',
            'entries.*.rapor_siswa_id' => 'required|exists:rapor_siswa,id',
            'entries.*.rapor_mapel_id' => 'required|exists:rapor_mapel,id',
            'entries.*.tujuan_pembelajaran_id' => 'nullable|exists:tujuan_pembelajaran,id',
            'entries.*.jenis' => 'required|string|max:50',
            'entries.*.tanggal' => 'required|date',
            'entries.*.nilai' => 'required|numeric|min:0|max:100',
            'entries.*.catatan' => 'nullable|string',
        ]);

        foreach ($validated['entries'] as $entry) {
            AsesmenFormatif::create($entry);
        }

        return redirect()->route('admin.erapor.nilai.index')
            ->with('success', 'Nilai formatif berhasil disimpan');
    }

    public function storeSumatif(Request $request)
    {
        $validated = $request->validate([
            'entries' => 'required|array',
            'entries.*.rapor_siswa_id' => 'required|exists:rapor_siswa,id',
            'entries.*.rapor_mapel_id' => 'required|exists:rapor_mapel,id',
            'entries.*.jenis' => 'required|string|max:50',
            'entries.*.tanggal' => 'required|date',
            'entries.*.nilai' => 'required|numeric|min:0|max:100',
            'entries.*.soal_file_url' => 'nullable|url',
        ]);

        foreach ($validated['entries'] as $entry) {
            AsesmenSumatif::create($entry);
        }

        return redirect()->route('admin.erapor.nilai.index')
            ->with('success', 'Nilai sumatif berhasil disimpan');
    }

    public function exportExcel(Request $request)
    {
        return back()->with('info', 'Export Excel akan tersedia setelah package Maatwebsite diinstall');
    }

    public function importExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:10240',
            'jenis' => 'required|in:formatif,sumatif',
        ]);

        return back()->with('success', 'Import nilai berhasil (pending Excel package)');
    }
}