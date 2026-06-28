<?php

namespace App\Http\Controllers\Erapor;

use App\Http\Controllers\Controller;
use App\Models\TujuanPembelajaran;
use App\Models\RaporMapel;
use App\Models\Guru;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TujuanPembelajaranController extends Controller
{
    public function index(Request $request)
    {
        $query = TujuanPembelajaran::with(['raporMapel', 'guru'])
            ->when($request->filled('fase'), fn($q) => $q->where('fase', $request->fase))
            ->when($request->filled('tahun_ajaran'), fn($q) => $q->where('tahun_ajaran', $request->tahun_ajaran))
            ->when($request->boolean('aktif'), fn($q) => $q->where('aktif', true))
            ->latest();

        $tps = $query->paginate(20)->withQueryString();

        return Inertia::render('Erapor/TujuanPembelajaran/Index', [
            'tps' => $tps,
            'filters' => [
                'fase' => $request->fase,
                'tahun_ajaran' => $request->tahun_ajaran,
                'aktif' => $request->boolean('aktif'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Erapor/TujuanPembelajaran/Create', [
            'mapels' => RaporMapel::all(['id', 'nama']),
            'gurus' => Guru::all(['id', 'nama']),
            'faseOptions' => ['A', 'B', 'C', 'D', 'E', 'F'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rapor_mapel_id' => 'required|exists:rapor_mapel,id',
            'guru_id' => 'nullable|exists:guru,id',
            'kode_tp' => 'required|string|max:50',
            'deskripsi' => 'required|string',
            'fase' => 'required|in:A,B,C,D,E,F',
            'semester' => 'required|integer|min:1|max:2',
            'tahun_ajaran' => 'required|string|max:20',
            'aktif' => 'boolean',
        ]);

        TujuanPembelajaran::create($validated);

        return redirect()->route('admin.erapor.tujuan-pembelajaran.index')
            ->with('success', 'Tujuan Pembelajaran berhasil ditambahkan');
    }

    public function edit(TujuanPembelajaran $tujuanPembelajaran)
    {
        return Inertia::render('Erapor/TujuanPembelajaran/Edit', [
            'tp' => $tujuanPembelajaran,
            'mapels' => RaporMapel::all(['id', 'nama']),
            'gurus' => Guru::all(['id', 'nama']),
            'faseOptions' => ['A', 'B', 'C', 'D', 'E', 'F'],
        ]);
    }

    public function update(Request $request, TujuanPembelajaran $tujuanPembelajaran)
    {
        $validated = $request->validate([
            'rapor_mapel_id' => 'required|exists:rapor_mapel,id',
            'guru_id' => 'nullable|exists:guru,id',
            'kode_tp' => 'required|string|max:50',
            'deskripsi' => 'required|string',
            'fase' => 'required|in:A,B,C,D,E,F',
            'semester' => 'required|integer|min:1|max:2',
            'tahun_ajaran' => 'required|string|max:20',
            'aktif' => 'boolean',
        ]);

        $tujuanPembelajaran->update($validated);

        return redirect()->route('admin.erapor.tujuan-pembelajaran.index')
            ->with('success', 'Tujuan Pembelajaran berhasil diupdate');
    }

    public function destroy(TujuanPembelajaran $tujuanPembelajaran)
    {
        $tujuanPembelajaran->delete();

        return redirect()->route('admin.erapor.tujuan-pembelajaran.index')
            ->with('success', 'Tujuan Pembelajaran berhasil dihapus');
    }

    public function bulkImport(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        // Implementasi Excel import menggunakan Maatwebsite
        // akan diimplementasikan setelah package Excel diinstall
        
        return back()->with('success', 'Import tujuan pembelajaran berhasil (pending Excel package)');
    }
}
