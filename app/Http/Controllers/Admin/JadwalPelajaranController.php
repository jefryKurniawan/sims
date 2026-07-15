<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JadwalPelajaran;
use App\Models\Kelas;
use App\Models\Guru;
use App\Models\RaporMapel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class JadwalPelajaranController extends Controller
{
    public function index()
    {
        $perPage = (int) request()->query('per_page', 15);
        $perPage = in_array($perPage, [10, 25, 50, 100], true) ? $perPage : 15;

        $jadwal = JadwalPelajaran::with(['kelas', 'guru'])
            ->orderByRaw("FIELD(hari,'Senin','Selasa','Rabu','Kamis','Jumat','Sabtu')")
            ->orderBy('jam_ke')
            ->paginate($perPage)
            ->withQueryString();

        $kelas = Kelas::select('id', 'nama_kelas', 'tingkat', 'tahun_ajaran')->get();
        $guru = Guru::select('id', 'nama_lengkap')->get();
        $mapelOptions = RaporMapel::distinct()->orderBy('nama_mapel')->pluck('nama_mapel');

        return Inertia::render('Admin/JadwalPelajaran/Index', [
            'jadwal' => $jadwal,
            'kelas' => $kelas,
            'guru' => $guru,
            'mapelOptions' => $mapelOptions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_mapel' => 'required|string|max:150',
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu',
            'jam_ke' => 'required|integer|min:1|max:12',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'kelas_id' => 'required|exists:kelas,id',
            'guru_id' => 'nullable|exists:guru,id',
            'ruangan' => 'nullable|string|max:100',
            'semester' => 'required|in:Ganjil,Genap',
            'tahun_ajaran' => 'required|string|max:20',
        ]);

        // Validasi bentrok guru & ruangan di slot yang sama
        $conflictGuru = $validated['guru_id']
            ? JadwalPelajaran::where('guru_id', $validated['guru_id'])
                ->where('hari', $validated['hari'])
                ->where('jam_ke', $validated['jam_ke'])
                ->where('semester', $validated['semester'])
                ->where('tahun_ajaran', $validated['tahun_ajaran'])
                ->exists()
            : false;

        if ($conflictGuru) {
            return back()->withErrors(['guru_id' => 'Guru sudah mengajar di slot ini.'])->withInput();
        }

        if (!empty($validated['ruangan'])) {
            $conflictRuangan = JadwalPelajaran::where('ruangan', $validated['ruangan'])
                ->where('hari', $validated['hari'])
                ->where('jam_ke', $validated['jam_ke'])
                ->where('semester', $validated['semester'])
                ->where('tahun_ajaran', $validated['tahun_ajaran'])
                ->exists();
            if ($conflictRuangan) {
                return back()->withErrors(['ruangan' => 'Ruangan sudah dipakai di slot ini.'])->withInput();
            }
        }

        JadwalPelajaran::create($validated);

        return redirect()->route('jadwal.index')
            ->with('success', 'Jadwal pelajaran berhasil ditambahkan.');
    }

    public function update(Request $request, JadwalPelajaran $jadwal)
    {
        $validated = $request->validate([
            'nama_mapel' => 'required|string|max:150',
            'hari' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu',
            'jam_ke' => 'required|integer|min:1|max:12',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'kelas_id' => 'required|exists:kelas,id',
            'guru_id' => 'nullable|exists:guru,id',
            'ruangan' => 'nullable|string|max:100',
            'semester' => 'required|in:Ganjil,Genap',
            'tahun_ajaran' => 'required|string|max:20',
        ]);

        if ($validated['guru_id']) {
            $conflictGuru = JadwalPelajaran::where('guru_id', $validated['guru_id'])
                ->where('hari', $validated['hari'])
                ->where('jam_ke', $validated['jam_ke'])
                ->where('semester', $validated['semester'])
                ->where('tahun_ajaran', $validated['tahun_ajaran'])
                ->where('id', '!=', $jadwal->id)
                ->exists();
            if ($conflictGuru) {
                return back()->withErrors(['guru_id' => 'Guru sudah mengajar di slot ini.'])->withInput();
            }
        }

        if (!empty($validated['ruangan'])) {
            $conflictRuangan = JadwalPelajaran::where('ruangan', $validated['ruangan'])
                ->where('hari', $validated['hari'])
                ->where('jam_ke', $validated['jam_ke'])
                ->where('semester', $validated['semester'])
                ->where('tahun_ajaran', $validated['tahun_ajaran'])
                ->where('id', '!=', $jadwal->id)
                ->exists();
            if ($conflictRuangan) {
                return back()->withErrors(['ruangan' => 'Ruangan sudah dipakai di slot ini.'])->withInput();
            }
        }

        $jadwal->update($validated);

        return redirect()->route('jadwal.index')
            ->with('success', 'Jadwal pelajaran berhasil diperbarui.');
    }

    public function destroy(JadwalPelajaran $jadwal)
    {
        $jadwal->delete();

        return redirect()->route('jadwal.index')
            ->with('success', 'Jadwal pelajaran berhasil dihapus.');
    }
}
