<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ArsipAkreditasi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\ArsipAkreditasiRequest;

class ArsipAkreditasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', ArsipAkreditasi::class);

        $query = ArsipAkreditasi::with('penanggungJawab')
            ->filter($request->only(['standar', 'sub_standar', 'tahun_ajaran', 'status', 'search']))
            ->ordered();

        $arsipAkreditasi = $query->paginate(15)->withQueryString();

        $tahunAjaranList = ArsipAkreditasi::select('tahun_ajaran')
            ->distinct()
            ->orderByDesc('tahun_ajaran')
            ->pluck('tahun_ajaran');

        return inertia('Admin/TU/ArsipAkreditasi/Index', [
            'arsipAkreditasi' => $arsipAkreditasi,
            'filters' => $request->only(['standar', 'sub_standar', 'tahun_ajaran', 'status', 'search']),
            'tahunAjaranList' => $tahunAjaranList,
        ]);
    }

    /**
     * Show tree view per standar
     */
    public function tree(Request $request, string $tahunAjaran)
    {
        $this->authorize('viewAny', ArsipAkreditasi::class);

        $tree = ArsipAkreditasi::getTree($tahunAjaran);

        return inertia('Admin/TU/ArsipAkreditasi/TreeView', [
            'tree' => $tree,
            'tahunAjaran' => $tahunAjaran,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', ArsipAkreditasi::class);

        $penanggungJawab = User::role(['Admin', 'Staf', 'TU'])->get(['id', 'name']);

        return inertia('Admin/TU/ArsipAkreditasi/Create', [
            'penanggungJawab' => $penanggungJawab,
            'standarList' => range(1, 8),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArsipAkreditasiRequest $request)
    {
        $this->authorize('create', ArsipAkreditasi::class);

        $data = $request->validated();

        if ($request->hasFile('file_path')) {
            $data['file_path'] = $request->file('file_path')->store('arsip-akreditasi', 'public');
        }

        ArsipAkreditasi::create($data);

        return redirect()->route('tu.arsip-akreditasi.index')
            ->with('success', 'Dokumen akreditasi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ArsipAkreditasi $arsipAkreditasi)
    {
        $this->authorize('view', $arsipAkreditasi);
        $arsipAkreditasi->load('penanggungJawab');
        return inertia('Admin/TU/ArsipAkreditasi/Show', ['arsipAkreditasi' => $arsipAkreditasi]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ArsipAkreditasi $arsipAkreditasi)
    {
        $this->authorize('update', $arsipAkreditasi);

        $penanggungJawab = User::role(['Admin', 'Staf', 'TU'])->get(['id', 'name']);

        return inertia('Admin/TU/ArsipAkreditasi/Edit', [
            'arsipAkreditasi' => $arsipAkreditasi,
            'penanggungJawab' => $penanggungJawab,
            'standarList' => range(1, 8),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArsipAkreditasiRequest $request, ArsipAkreditasi $arsipAkreditasi)
    {
        $this->authorize('update', $arsipAkreditasi);

        $data = $request->validated();

        if ($request->hasFile('file_path')) {
            if ($arsipAkreditasi->file_path) {
                Storage::disk('public')->delete($arsipAkreditasi->file_path);
            }
            $data['file_path'] = $request->file('file_path')->store('arsip-akreditasi', 'public');
        }

        $arsipAkreditasi->update($data);

        return redirect()->route('tu.arsip-akreditasi.index')
            ->with('success', 'Dokumen akreditasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ArsipAkreditasi $arsipAkreditasi)
    {
        $this->authorize('delete', $arsipAkreditasi);

        if ($arsipAkreditasi->file_path) {
            Storage::disk('public')->delete($arsipAkreditasi->file_path);
        }

        $arsipAkreditasi->delete();

        return redirect()->route('tu.arsip-akreditasi.index')
            ->with('success', 'Dokumen akreditasi berhasil dihapus.');
    }
}
