<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Guru;
use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index()
    {
        $perPage = (int) request()->query('per_page', 15);
        $perPage = in_array($perPage, [10, 25, 50, 100], true) ? $perPage : 15;

        $kelas = Kelas::with(['jurusan', 'waliKelas'])
            ->paginate($perPage)
            ->withQueryString();

        $guru = Guru::select('id', 'nama_lengkap')->get();
        $jurusan = Jurusan::select('id', 'nama_jurusan')->get();

        return Inertia::render('Admin/Kelas/Index', [
            'kelas' => $kelas,
            'guru' => $guru,
            'jurusan' => $jurusan,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kelas' => 'required|string|max:100',
            'tingkat' => 'required|in:10,11,12',
            'jurusan_id' => 'nullable|exists:jurusans,id',
            'wali_kelas_id' => 'nullable|exists:guru,id',
            'ruangan' => 'nullable|string|max:100',
            'kapasitas' => 'required|integer|min:1',
            'tahun_ajaran' => 'required|string|max:20',
        ]);

        Kelas::create($validated);

        return redirect()->route('kelas.index')
            ->with('success', 'Kelas berhasil ditambahkan.');
    }

    public function show(Kelas $kela)
    {
        return Inertia::render('Admin/Kelas/Show', [
            'kelas' => $kela->load(['jurusan', 'waliKelas']),
        ]);
    }

    public function edit(Kelas $kela)
    {
        $guru = Guru::select('id', 'nama_lengkap')->get();
        $jurusan = Jurusan::select('id', 'nama_jurusan')->get();

        return Inertia::render('Admin/Kelas/Edit', [
            'kelas' => $kela,
            'guru' => $guru,
            'jurusan' => $jurusan,
        ]);
    }

    public function update(Request $request, Kelas $kela)
    {
        $validated = $request->validate([
            'nama_kelas' => 'required|string|max:100',
            'tingkat' => 'required|in:10,11,12',
            'jurusan_id' => 'nullable|exists:jurusans,id',
            'wali_kelas_id' => 'nullable|exists:guru,id',
            'ruangan' => 'nullable|string|max:100',
            'kapasitas' => 'required|integer|min:1',
            'tahun_ajaran' => 'required|string|max:20',
        ]);

        $kela->update($validated);

        return redirect()->route('kelas.index')
            ->with('success', 'Kelas berhasil diperbarui.');
    }

    public function destroy(Kelas $kela)
    {
        $kela->delete();

        return redirect()->route('kelas.index')
            ->with('success', 'Kelas berhasil dihapus.');
    }
}