<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kurikulum;
use App\Models\KurikulumMapel;
use App\Models\Skbm;
use App\Models\KalenderAkademik;
use App\Models\RaporMapel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KurikulumController extends Controller
{
    // ===== KURIKULUM =====
    public function index()
    {
        $kurikulums = Kurikulum::withCount('mapels')->latest()->paginate(10);

        return Inertia::render('Admin/Kurikulum/Index', [
            'kurikulums' => $kurikulums,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kurikulum/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'aktif' => 'boolean',
            'keterangan' => 'nullable|string',
        ]);

        if ($validated['aktif'] ?? false) {
            Kurikulum::where('aktif', true)->update(['aktif' => false]);
        }

        Kurikulum::create($validated);

        return redirect()->route('admin.kurikulum.index')
            ->with('success', 'Kurikulum berhasil ditambahkan');
    }

    public function edit(Kurikulum $kurikulum)
    {
        $kurikulum->load('mapels.raporMapel');
        return Inertia::render('Admin/Kurikulum/Edit', [
            'kurikulum' => $kurikulum,
        ]);
    }

    public function update(Request $request, Kurikulum $kurikulum)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'aktif' => 'boolean',
            'keterangan' => 'nullable|string',
        ]);

        if ($validated['aktif'] ?? false) {
            Kurikulum::where('aktif', true)->update(['aktif' => false]);
        }

        $kurikulum->update($validated);

        return redirect()->route('admin.kurikulum.index')
            ->with('success', 'Kurikulum berhasil diupdate');
    }

    public function destroy(Kurikulum $kurikulum)
    {
        $kurikulum->delete();
        return redirect()->route('admin.kurikulum.index')
            ->with('success', 'Kurikulum berhasil dihapus');
    }

    // ===== KURIKULUM MAPEL =====
    public function mapels(Kurikulum $kurikulum)
    {
        $kurikulum->load('mapels.raporMapel');
        $mapels = RaporMapel::orderBy('nama_mapel')->get(['id', 'nama_mapel', 'kkm']);

        return Inertia::render('Admin/Kurikulum/Mapels', [
            'kurikulum' => $kurikulum,
            'allMapels' => $mapels,
        ]);
    }

    public function storeMapel(Request $request, Kurikulum $kurikulum)
    {
        $validated = $request->validate([
            'rapor_mapel_id' => 'required|exists:rapor_mapel,id',
            'fase' => 'nullable|string|max:10',
            'jam_mengajar_mingguan' => 'integer|min:0',
            'semester' => 'required|integer|min:1|max:2',
        ]);

        $validated['kurikulum_id'] = $kurikulum->id;
        KurikulumMapel::create($validated);

        return back()->with('success', 'Mata pelajaran ditambahkan ke kurikulum');
    }

    public function destroyMapel(Kurikulum $kurikulum, KurikulumMapel $mapel)
    {
        abort_unless($mapel->kurikulum_id === $kurikulum->id, 404);
        $mapel->delete();
        return back()->with('success', 'Mata pelajaran dihapus dari kurikulum');
    }

    // ===== SKBM =====
    public function skbm(Kurikulum $kurikulum)
    {
        $kurikulum->load('mapels.raporMapel', 'skbms.raporMapel');
        $mapels = RaporMapel::orderBy('nama_mapel')->get(['id', 'nama_mapel']);

        return Inertia::render('Admin/Kurikulum/Skbm', [
            'kurikulum' => $kurikulum,
            'allMapels' => $mapels,
        ]);
    }

    public function storeSkbm(Request $request, Kurikulum $kurikulum)
    {
        $validated = $request->validate([
            'rapor_mapel_id' => 'required|exists:rapor_mapel,id',
            'fase' => 'nullable|string|max:10',
            'kode_kd' => 'required|string|max:50',
            'deskripsi_kd' => 'required|string',
        ]);

        $validated['kurikulum_id'] = $kurikulum->id;
        Skbm::create($validated);

        return back()->with('success', 'SKBM berhasil ditambahkan');
    }

    public function destroySkbm(Kurikulum $kurikulum, Skbm $skbm)
    {
        abort_unless($skbm->kurikulum_id === $kurikulum->id, 404);
        $skbm->delete();
        return back()->with('success', 'SKBM berhasil dihapus');
    }

    // ===== KALENDER AKADEMIK =====
    public function kalender()
    {
        $events = KalenderAkademik::orderBy('tanggal', 'desc')->paginate(20);
        return Inertia::render('Admin/Kurikulum/Kalender', [
            'events' => $events,
        ]);
    }

    public function storeKalender(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'kegiatan' => 'required|string|max:200',
            'keterangan' => 'nullable|string',
            'semester' => 'nullable|in:Ganjil,Genap',
            'tahun_ajaran' => 'nullable|string|max:20',
        ]);

        KalenderAkademik::create($validated);

        return back()->with('success', 'Kalender akademik berhasil ditambahkan');
    }

    public function destroyKalender(KalenderAkademik $kalender)
    {
        $kalender->delete();
        return back()->with('success', 'Kalender akademik berhasil dihapus');
    }
}