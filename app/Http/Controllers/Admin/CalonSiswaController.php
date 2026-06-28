<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CalonSiswa;
use App\Models\Gelombang;
use App\Models\AuditLog;
use App\Services\PpdbService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CalonSiswaController extends Controller
{
    protected PpdbService $ppdb;

    public function __construct(PpdbService $ppdb)
    {
        $this->ppdb = $ppdb;
    }

    public function index(Request $request)
    {
        $calonSiswa = CalonSiswa::query()
            ->filter($request->all())
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/CalonSiswa/Index', [
            'calonSiswa' => $calonSiswa,
            'filters' => $request->all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CalonSiswa/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nisn' => 'required|unique:calon_siswa,nisn',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'no_hp' => 'required|string',
            'email' => 'nullable|email|max:255',
            'nama_ortu' => 'required|string|max:255',
            'no_hp_ortu' => 'required|string',
            'asal_sekolah' => 'required|string|max:255',
            'prestasi' => 'nullable|string',
            'biaya_pendaftaran' => 'required|numeric|min:0',
            'bukti_bayar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            $validated['bukti_bayar'] = $request->file('bukti_bayar')->store('calon_siswa/bukti', 'public');
        }

        $validated['status'] = 'pendaftaran';
        $validated['keputusan'] = 'belum';
        $validated['tanggal_daftar'] = now();

        CalonSiswa::create($validated);

        return redirect()->route('ppdb.index')
            ->with('success', 'Data calon siswa berhasil ditambahkan!');
    }

    public function show(CalonSiswa $calonSiswa)
    {
        $calonSiswa->load(['jurusan', 'gelombang']);

        return Inertia::render('Admin/CalonSiswa/Show', [
            'calonSiswa' => $calonSiswa,
        ]);
    }

    public function edit(CalonSiswa $calonSiswa)
    {
        return Inertia::render('Admin/CalonSiswa/Edit', [
            'calonSiswa' => $calonSiswa,
        ]);
    }

    public function update(Request $request, CalonSiswa $calonSiswa)
    {
        $validated = $request->validate([
            'nisn' => 'required|unique:calon_siswa,nisn,' . $calonSiswa->id,
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'no_hp' => 'required|string',
            'email' => 'nullable|email|max:255',
            'nama_ortu' => 'required|string|max:255',
            'no_hp_ortu' => 'required|string',
            'asal_sekolah' => 'required|string|max:255',
            'prestasi' => 'nullable|string',
            'status' => 'required|in:pendaftaran,seleksi,lulus,tidak_lulus',
            'biaya_pendaftaran' => 'required|numeric|min:0',
            'bukti_bayar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'keputusan' => 'required|in:belum,diterima,ditolak',
            'catatan' => 'nullable|string',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            if ($calonSiswa->bukti_bayar) {
                Storage::disk('public')->delete($calonSiswa->bukti_bayar);
            }
            $validated['bukti_bayar'] = $request->file('bukti_bayar')->store('calon_siswa/bukti', 'public');
        }

        $calonSiswa->update($validated);

        return redirect()->route('ppdb.index')
            ->with('success', 'Data calon siswa berhasil diperbarui!');
    }

    public function destroy(CalonSiswa $calonSiswa)
    {
        if ($calonSiswa->bukti_bayar) {
            Storage::disk('public')->delete($calonSiswa->bukti_bayar);
        }
        $calonSiswa->delete();

        return redirect()->route('ppdb.index')
            ->with('success', 'Data calon siswa berhasil dihapus!');
    }

    public function accept(CalonSiswa $calonSiswa)
    {
        $oldValues = $calonSiswa->only(['status', 'keputusan']);

        $calonSiswa->update([
            'status' => 'lulus',
            'keputusan' => 'diterima',
        ]);

        AuditLog::log(
            $calonSiswa,
            'accepted',
            $oldValues,
            ['status' => 'lulus', 'keputusan' => 'diterima'],
            'Calon siswa diterima dan akan dikonversi menjadi siswa: ' . $calonSiswa->nama_lengkap
        );

        $siswa = $this->ppdb->syncToSiswa($calonSiswa);

        return redirect()->route('ppdb.show', $calonSiswa)
            ->with('success', $siswa
                ? 'Calon siswa diterima & dikonversi menjadi siswa!'
                : 'Calon siswa diterima (siswa sudah terdaftar sebelumnya).');
    }

    public function reject(CalonSiswa $calonSiswa)
    {
        $calonSiswa->update([
            'status' => 'tidak_lulus',
            'keputusan' => 'ditolak',
        ]);

        return redirect()->route('ppdb.index')
            ->with('success', 'Calon siswa berhasil ditolak!');
    }

    public function inputNilai(Request $request, CalonSiswa $calonSiswa)
    {
        $validated = $request->validate([
            'nilai_rapot' => 'required|numeric|min:0|max:100',
            'nilai_wawancara' => 'required|numeric|min:0|max:100',
            'tanggal_wawancara' => 'nullable|date',
        ]);

        $this->ppdb->inputNilai(
            $calonSiswa->id,
            $validated['nilai_rapot'],
            $validated['nilai_wawancara'],
            !empty($validated['tanggal_wawancara']) ? new \DateTime($validated['tanggal_wawancara']) : null,
        );

        return redirect()->route('ppdb.show', $calonSiswa)
            ->with('success', 'Nilai berhasil diinput!');
    }

    public function prosesSeleksi(Request $request)
    {
        $validated = $request->validate([
            'gelombang_id' => 'required|exists:gelombang,id',
            'jurusan_id' => 'nullable|exists:jurusan,id',
        ]);

        $result = $this->ppdb->prosesSeleksi(
            $validated['gelombang_id'],
            $validated['jurusan_id'] ?? null,
        );

        return redirect()->route('ppdb.seleksi.form')
            ->with('success', "Seleksi selesai: {$result['lulus']} lulus, {$result['tidak_lulus']} tidak lulus dari {$result['processed']} diproses.");
    }

    public function seleksiForm()
    {
        return Inertia::render('Admin/CalonSiswa/Seleksi', [
            'gelombang' => Gelombang::where('is_active', true)->get(),
        ]);
    }

    public function statistik(Request $request)
    {
        $gelombangId = $request->input('gelombang_id');

        return Inertia::render('Admin/CalonSiswa/Statistik', [
            'statistik' => $this->ppdb->getStatistik($gelombangId ? (int) $gelombangId : null),
            'gelombang' => Gelombang::where('is_active', true)->get(),
            'gelombang_id' => $gelombangId,
        ]);
    }
}