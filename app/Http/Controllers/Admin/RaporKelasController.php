<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RaporKelas;
use App\Models\Jurusan;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RaporKelasController extends Controller
{
    public function index(Request $request)
    {
        $kelas = RaporKelas::query()
            ->with('jurusan')
            ->filter($request->all())
            ->orderBy('tingkat')
            ->orderBy('nama_kelas')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/RaporKelas/Index', [
            'kelas' => $kelas,
            'filters' => $request->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/RaporKelas/Form', [
            'jurusan' => Jurusan::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kelas' => 'required|string|max:255',
            'tingkat' => 'required|integer|in:10,11,12',
            'jurusan_id' => 'required|exists:jurusan,id',
            'tahun_ajaran' => 'required|string|max:20',
        ]);

        $kelas = RaporKelas::create($validated);

        AuditLog::log(
            $kelas,
            'created',
            [],
            $validated,
            'Kelas rapor dibuat: ' . $kelas->nama_kelas
        );

        return redirect()->route('rapor-kelas.index')
            ->with('success', 'Kelas rapor berhasil ditambahkan!');
    }

    public function edit(RaporKelas $raporKelas)
    {
        return Inertia::render('Admin/RaporKelas/Form', [
            'raporKelas' => $raporKelas,
            'jurusan' => Jurusan::all(),
        ]);
    }

    public function update(Request $request, RaporKelas $raporKelas)
    {
        $validated = $request->validate([
            'nama_kelas' => 'required|string|max:255',
            'tingkat' => 'required|integer|in:10,11,12',
            'jurusan_id' => 'required|exists:jurusan,id',
            'tahun_ajaran' => 'required|string|max:20',
        ]);

        $old = $raporKelas->toArray();
        $raporKelas->update($validated);

        AuditLog::log(
            $raporKelas,
            'updated',
            $old,
            $validated,
            'Kelas rapor diperbarui: ' . $raporKelas->nama_kelas
        );

        return redirect()->route('rapor-kelas.index')
            ->with('success', 'Kelas rapor berhasil diperbarui!');
    }

    public function destroy(RaporKelas $raporKelas)
    {
        $nama = $raporKelas->nama_kelas;
        $raporKelas->delete();

        return redirect()->route('rapor-kelas.index')
            ->with('success', 'Kelas rapor ' . $nama . ' berhasil dihapus!');
    }
}
