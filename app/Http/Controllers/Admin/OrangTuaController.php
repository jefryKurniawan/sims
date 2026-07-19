<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrangTuaDetail;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrangTuaController extends Controller
{
    public function index(Request $request)
    {
        $query = OrangTuaDetail::with('siswa:id,nama_lengkap,nisn,nis');

        if ($request->filled('search')) {
            $q = $request->search;
            $query->where(function ($sub) use ($q) {
                $sub->where('nama_lengkap', 'like', "%{$q}%")
                    ->orWhere('no_hp', 'like', "%{$q}%")
                    ->orWhere('nik', 'like', "%{$q}%")
                    ->orWhereHas('siswa', fn($s) => $s->where('nama_lengkap', 'like', "%{$q}%"));
            });
        }

        if ($request->filled('hubungan')) {
            $query->where('hubungan', $request->hubungan);
        }

        $orangTua = $query->orderBy('created_at', 'desc')->paginate(20)->withQueryString();

        return Inertia::render('Admin/OrangTua/Index', [
            'orangTua' => $orangTua,
            'filters' => $request->only(['search', 'hubungan']),
        ]);
    }

    public function create()
    {
        $siswa = Siswa::select('id', 'nama_lengkap', 'nisn')->orderBy('nama_lengkap')->get();
        return Inertia::render('Admin/OrangTua/Create', [
            'siswa' => $siswa,
            'hubunganOptions' => ['Ayah', 'Ibu', 'Wali'],
            'pendidikanOptions' => ['Tidak Sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3'],
            'penghasilanOptions' => ['<1JT', '1-3JT', '3-5JT', '5-10JT', '>10JT'],
            'statusPernikahanOptions' => ['Menikah', 'Cerai Hidup', 'Cerai Mati', 'Belum Menikah'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'hubungan' => 'required|in:Ayah,Ibu,Wali',
            'nama_lengkap' => 'required|string|max:150',
            'nik' => 'nullable|string|max:16',
            'npwp' => 'nullable|string|max:20',
            'tanggal_lahir' => 'nullable|date',
            'pendidikan_terakhir' => 'nullable|string|max:50',
            'pekerjaan' => 'nullable|string|max:100',
            'penghasilan_bulanan' => 'nullable|string|max:10',
            'status_pernikahan' => 'nullable|string|max:50',
            'jumlah_tanggungan' => 'nullable|integer',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'alamat' => 'nullable|string|max:255',
        ]);

        OrangTuaDetail::create($validated);

        return redirect()->route('orang-tua.index')->with('success', 'Data orang tua/wali berhasil ditambahkan.');
    }

    public function edit(OrangTuaDetail $orangTua)
    {
        $orangTua->load('siswa:id,nama_lengkap,nisn');
        $siswa = Siswa::select('id', 'nama_lengkap', 'nisn')->orderBy('nama_lengkap')->get();

        return Inertia::render('Admin/OrangTua/Edit', [
            'orangTua' => $orangTua,
            'siswa' => $siswa,
            'hubunganOptions' => ['Ayah', 'Ibu', 'Wali'],
            'pendidikanOptions' => ['Tidak Sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3'],
            'penghasilanOptions' => ['<1JT', '1-3JT', '3-5JT', '5-10JT', '>10JT'],
            'statusPernikahanOptions' => ['Menikah', 'Cerai Hidup', 'Cerai Mati', 'Belum Menikah'],
        ]);
    }

    public function update(Request $request, OrangTuaDetail $orangTua)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'hubungan' => 'required|in:Ayah,Ibu,Wali',
            'nama_lengkap' => 'required|string|max:150',
            'nik' => 'nullable|string|max:16',
            'npwp' => 'nullable|string|max:20',
            'tanggal_lahir' => 'nullable|date',
            'pendidikan_terakhir' => 'nullable|string|max:50',
            'pekerjaan' => 'nullable|string|max:100',
            'penghasilan_bulanan' => 'nullable|string|max:10',
            'status_pernikahan' => 'nullable|string|max:50',
            'jumlah_tanggungan' => 'nullable|integer',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'alamat' => 'nullable|string|max:255',
        ]);

        $orangTua->update($validated);

        return redirect()->route('orang-tua.index')->with('success', 'Data orang tua/wali berhasil diperbarui.');
    }

    public function destroy(OrangTuaDetail $orangTua)
    {
        $orangTua->delete();
        return redirect()->route('orang-tua.index')->with('success', 'Data orang tua/wali berhasil dihapus.');
    }
}
