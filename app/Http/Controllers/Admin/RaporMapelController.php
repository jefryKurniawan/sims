<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RaporMapel;
use App\Models\RaporKelas;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RaporMapelController extends Controller
{
    public function index(Request $request)
    {
        $mapel = RaporMapel::query()
            ->with('raporKelas')
            ->filter($request->all())
            ->orderBy('nama_mapel')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/RaporMapel/Index', [
            'mapel' => $mapel,
            'filters' => $request->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/RaporMapel/Form', [
            'kelas' => RaporKelas::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rapor_kelas_id' => 'required|exists:rapor_kelas,id',
            'nama_mapel' => 'required|string|max:255',
            'kkm' => 'required|integer|min:0|max:100',
            'kelompok' => 'required|in:A,B,C',
        ]);

        $mapel = RaporMapel::create($validated);

        AuditLog::log(
            $mapel,
            'created',
            [],
            $validated,
            'Mapel rapor dibuat: ' . $mapel->nama_mapel
        );

        return redirect()->route('rapor-mapel.index')
            ->with('success', 'Mata pelajaran berhasil ditambahkan!');
    }

    public function edit(RaporMapel $raporMapel)
    {
        return Inertia::render('Admin/RaporMapel/Form', [
            'raporMapel' => $raporMapel,
            'kelas' => RaporKelas::all(),
        ]);
    }

    public function update(Request $request, RaporMapel $raporMapel)
    {
        $validated = $request->validate([
            'rapor_kelas_id' => 'required|exists:rapor_kelas,id',
            'nama_mapel' => 'required|string|max:255',
            'kkm' => 'required|integer|min:0|max:100',
            'kelompok' => 'required|in:A,B,C',
        ]);

        $old = $raporMapel->toArray();
        $raporMapel->update($validated);

        AuditLog::log(
            $raporMapel,
            'updated',
            $old,
            $validated,
            'Mapel rapor diperbarui: ' . $raporMapel->nama_mapel
        );

        return redirect()->route('rapor-mapel.index')
            ->with('success', 'Mata pelajaran berhasil diperbarui!');
    }

    public function destroy(RaporMapel $raporMapel)
    {
        $nama = $raporMapel->nama_mapel;
        $raporMapel->delete();

        return redirect()->route('rapor-mapel.index')
            ->with('success', 'Mata pelajaran ' . $nama . ' berhasil dihapus!');
    }
}
