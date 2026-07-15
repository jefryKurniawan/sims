<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BukuIndukProfilRequest;
use App\Http\Requests\MutasiSiswaRequest;
use App\Http\Requests\OrangTuaDetailRequest;
use App\Http\Requests\RekamMedisRequest;
use App\Models\BukuIndukSiswa;
use App\Models\MutasiSiswa;
use App\Models\OrangTuaDetail;
use App\Models\RekamMedisSiswa;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BukuIndukController extends Controller
{
    /**
     * Landing: list siswa + status kelengkapan buku induk.
     */
    public function index(Request $request)
    {
        $query = Siswa::query()->with(['bukuInduk', 'rekamMedis', 'orangTuaDetails', 'mutasis']);

        if ($request->filled('search')) {
            $q = $request->search;
            $query->where(function ($sub) use ($q) {
                $sub->where('nama_lengkap', 'like', "%{$q}%")
                    ->orWhere('nis', 'like', "%{$q}%")
                    ->orWhere('nisn', 'like', "%{$q}%");
            });
        }

        $siswa = $query->orderBy('nama_lengkap')->paginate(15)->withQueryString();

        return Inertia::render('Admin/BukuInduk/Index', [
            'siswa' => $siswa,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show buku induk untuk 1 siswa (4 tab).
     */
    public function show(Siswa $siswa)
    {
        $siswa->load([
            'bukuInduk',
            'rekamMedis',
            'orangTuaDetails',
            'mutasis.pencatat',
            'jurusan',
        ]);

        // 1:1 record (or new instance for form default)
        $bukuInduk = $siswa->bukuInduk ?? new BukuIndukSiswa(['siswa_id' => $siswa->id]);
        $rekamMedis = $siswa->rekamMedis ?? new RekamMedisSiswa(['siswa_id' => $siswa->id]);

        return Inertia::render('Admin/BukuInduk/Show', [
            'siswa' => $siswa,
            'bukuInduk' => $bukuInduk,
            'rekamMedis' => $rekamMedis,
            'orangTua' => $siswa->orangTuaDetails,
            'mutasi' => $siswa->mutasis,
            'pendidikanOptions' => ['Tidak Sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3'],
            'penghasilanOptions' => ['<1JT', '1-3JT', '3-5JT', '5-10JT', '>10JT'],
            'agamaOptions' => ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya'],
            'transportasiOptions' => ['Jalan Kaki', 'Sepeda', 'Motor', 'Mobil Pribadi', 'Angkot', 'Bus Sekolah', 'Lainnya'],
            'golonganDarahOptions' => ['A', 'B', 'AB', 'O', 'Tidak Tahu'],
            'hubunganOptions' => ['Ayah', 'Ibu', 'Wali'],
            'statusPernikahanOptions' => ['Menikah', 'Cerai Hidup', 'Cerai Mati', 'Belum Menikah'],
        ]);
    }

    /**
     * Cetak buku induk (window.print friendly view).
     */
    public function cetak(Siswa $siswa)
    {
        $siswa->load([
            'bukuInduk',
            'rekamMedis',
            'orangTuaDetails',
            'mutasis',
            'jurusan',
        ]);

        return Inertia::render('Admin/BukuInduk/Cetak', [
            'siswa' => $siswa,
            'bukuInduk' => $siswa->bukuInduk,
            'rekamMedis' => $siswa->rekamMedis,
            'orangTua' => $siswa->orangTuaDetails,
            'mutasi' => $siswa->mutasis,
        ]);
    }

    // === Profil (buku_induk_siswa) ===

    public function updateProfil(BukuIndukProfilRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $data['siswa_id'] = $siswa->id;

        BukuIndukSiswa::updateOrCreate(['siswa_id' => $siswa->id], $data);

        return back()->with('success', 'Profil buku induk disimpan.');
    }

    // === Rekam Medis ===

    public function updateRekamMedis(RekamMedisRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $data['siswa_id'] = $siswa->id;

        RekamMedisSiswa::updateOrCreate(['siswa_id' => $siswa->id], $data);

        return back()->with('success', 'Rekam medis disimpan.');
    }

    // === Orang Tua / Wali (1:N) ===

    public function storeOrangTua(OrangTuaDetailRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $data['siswa_id'] = $siswa->id;
        OrangTuaDetail::create($data);

        return back()->with('success', 'Data orang tua/wali ditambahkan.');
    }

    public function updateOrangTua(OrangTuaDetailRequest $request, Siswa $siswa, OrangTuaDetail $orangTua)
    {
        abort_unless($orangTua->siswa_id === $siswa->id, 404);
        $orangTua->update($request->validated());

        return back()->with('success', 'Data orang tua/wali diperbarui.');
    }

    public function destroyOrangTua(Siswa $siswa, OrangTuaDetail $orangTua)
    {
        abort_unless($orangTua->siswa_id === $siswa->id, 404);
        $orangTua->delete();

        return back()->with('success', 'Data orang tua/wali dihapus.');
    }

    // === Mutasi (1:N) ===

    public function storeMutasi(MutasiSiswaRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $data['siswa_id'] = $siswa->id;
        $data['dicatat_oleh'] = Auth::id();

        if ($request->hasFile('dokumen_scan')) {
            $file = $request->file('dokumen_scan');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/images/mutasi', $filename);
            $data['dokumen_scan'] = $filename;
        }

        MutasiSiswa::create($data);

        return back()->with('success', 'Mutasi siswa dicatat.');
    }

    public function destroyMutasi(Siswa $siswa, MutasiSiswa $mutasi)
    {
        abort_unless($mutasi->siswa_id === $siswa->id, 404);
        $mutasi->delete();

        return back()->with('success', 'Mutasi dihapus.');
    }
}
