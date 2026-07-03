<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GtkController extends Controller
{
    public function index(Request $request)
    {
        $query = Guru::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                  ->orWhere('nuptk', 'like', "%{$search}%")
                  ->orWhere('jabatan', 'like', "%{$search}%");
            });
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        $guru = $query->orderBy('nama_lengkap')->paginate(15);
        return Inertia::render('Admin/Gtk/Index', [
            'guru' => $guru,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Gtk/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap'       => 'required|string|max:255',
            'nuptk'              => 'nullable|string|max:30|unique:guru,nuptk',
            'jenis_kelamin'      => 'required|in:L,P',
            'tempat_lahir'       => 'required|string|max:255',
            'tanggal_lahir'      => 'required|date',
            'agama'              => 'required|string|max:50',
            'alamat'             => 'required|string',
            'no_telp'            => 'required|string|max:20',
            'email'              => 'nullable|email|max:255',
            'jenis'              => 'required|in:Guru,Tenaga Kependidikan',
            'bidang_studi'       => 'nullable|string|max:255',
            'jabatan'            => 'required|string|max:255',
            'status_kepegawaian' => 'required|in:Tetap Yayasan,Kontrak,Honorer',
            'tanggal_masuk'      => 'required|date',
            'foto'               => 'nullable|string|max:255',
        ]);

        Guru::create($validated);

        return redirect()->route('gtk.index')
            ->with('success', 'GTK berhasil ditambahkan.');
    }

    public function show(Guru $gtk)
    {
        return Inertia::render('Admin/Gtk/Show', [
            'guru' => $gtk,
        ]);
    }

    public function edit(Guru $gtk)
    {
        return Inertia::render('Admin/Gtk/Edit', [
            'guru' => $gtk,
        ]);
    }

    public function update(Request $request, Guru $gtk)
    {
        $validated = $request->validate([
            'nama_lengkap'       => 'required|string|max:255',
            'nuptk'              => 'nullable|string|max:30|unique:guru,nuptk,' . $gtk->id,
            'jenis_kelamin'      => 'required|in:L,P',
            'tempat_lahir'       => 'required|string|max:255',
            'tanggal_lahir'      => 'required|date',
            'agama'              => 'required|string|max:50',
            'alamat'             => 'required|string',
            'no_telp'            => 'required|string|max:20',
            'email'              => 'nullable|email|max:255',
            'jenis'              => 'required|in:Guru,Tenaga Kependidikan',
            'bidang_studi'       => 'nullable|string|max:255',
            'jabatan'            => 'required|string|max:255',
            'status_kepegawaian' => 'required|in:Tetap Yayasan,Kontrak,Honorer',
            'tanggal_masuk'      => 'required|date',
            'foto'               => 'nullable|string|max:255',
        ]);

        $gtk->update($validated);

        return redirect()->route('gtk.index')
            ->with('success', 'GTK berhasil diperbarui.');
    }

    public function destroy(Guru $gtk)
    {
        $gtk->delete();

        return redirect()->route('gtk.index')
            ->with('success', 'GTK berhasil dihapus.');
    }
}
