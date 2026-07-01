<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Siswa::with('jurusan');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        // Search by name, NISN, or phone
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%")
                  ->orWhere('no_hp', 'like', "%{$search}%");
            });
        }

        $siswa = $query->orderBy('nama_lengkap')->paginate(15);

        return Inertia::render('Admin/Siswa/Index', [
            'siswa' => $siswa,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $jurusanList = Jurusan::select('id', 'nama')->orderBy('nama')->get();
        return Inertia::render('Admin/Siswa/Create', [
            'jurusanList' => $jurusanList,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nisn' => 'required|string|max:20|unique:siswa,nisn',
            'nis' => 'nullable|string|max:20',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => ['required', 'in:Laki-laki,Perempuan'],
            'alamat' => 'nullable|string',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'nama_ortu' => 'nullable|string|max:255',
            'no_hp_ortu' => 'nullable|string|max:20',
            'asal_sekolah' => 'nullable|string|max:255',
            'status' => ['required', 'in:Aktif,Pindah,Lulus,Dropout'],
            'tanggal_masuk' => 'nullable|date',
            'jurusan_id' => 'nullable|exists:jurusan,id',
        ]);

        Siswa::create($validated);

        return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $siswa = Siswa::with('jurusan')->findOrFail($id);
        return Inertia::render('Admin/Siswa/Detail', [
            'siswa' => $siswa,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $siswa = Siswa::findOrFail($id);
        $jurusanList = Jurusan::select('id', 'nama')->orderBy('nama')->get();
        return Inertia::render('Admin/Siswa/Edit', [
            'siswa' => $siswa,
            'jurusanList' => $jurusanList,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nisn' => "required|string|max:20|unique:siswa,nisn,{$id}",
            'nis' => 'nullable|string|max:20',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => ['required', 'in:Laki-laki,Perempuan'],
            'alamat' => 'nullable|string',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'nama_ortu' => 'nullable|string|max:255',
            'no_hp_ortu' => 'nullable|string|max:20',
            'asal_sekolah' => 'nullable|string|max:255',
            'status' => ['required', 'in:Aktif,Pindah,Lulus,Dropout'],
            'tanggal_masuk' => 'nullable|date',
            'jurusan_id' => 'nullable|exists:jurusan,id',
        ]);

        $siswa = Siswa::findOrFail($id);
        $siswa->update($validated);

        return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy($id)
    {
        $siswa = Siswa::findOrFail($id);
        $siswa->delete(); // soft delete
        return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil dihapus.');
    }
}
?>