<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesImport;
use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Guru;
use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    use HandlesImport;

    /** Header template import Kelas. */
    protected function kelasHeaders(): array
    {
        return ['nama_kelas', 'tingkat', 'jurusan_nama', 'wali_nama', 'ruangan', 'kapasitas', 'tahun_ajaran'];
    }

    public function template(Request $request)
    {
        $sample = [
            'nama_kelas' => 'X MIPA 1',
            'tingkat' => '10',
            'jurusan_nama' => 'IPA',
            'wali_nama' => 'Budi Santoso, S.Pd.',
            'ruangan' => 'Ruang 101',
            'kapasitas' => '35',
            'tahun_ajaran' => '2025/2026',
        ];

        return $this->downloadTemplate('kelas', $this->kelasHeaders(), $sample, $request->get('format', 'xlsx'));
    }

    public function import(Request $request)
    {
        // ponytail: cache lookup FK sekali per import untuk hindari N+1
        $jurusanMap = Jurusan::pluck('id', 'nama');
        $guruMap = Guru::pluck('id', 'nama_lengkap');

        $result = $this->runImport($request, Kelas::class, function ($row) use ($jurusanMap, $guruMap) {
            $namaKelas = trim((string) ($row['nama_kelas'] ?? ''));
            if ($namaKelas === '') {
                return null;
            }

            $jurusanNama = $this->nullable($row['jurusan_nama'] ?? null);
            $waliNama = $this->nullable($row['wali_nama'] ?? null);

            return [
                'nama_kelas'    => $namaKelas,
                'tingkat'        => in_array($row['tingkat'] ?? '', ['10', '11', '12'], true) ? $row['tingkat'] : '10',
                'jurusan_id'     => $jurusanNama && isset($jurusanMap[$jurusanNama]) ? $jurusanMap[$jurusanNama] : null,
                'wali_kelas_id'  => $waliNama && isset($guruMap[$waliNama]) ? $guruMap[$waliNama] : null,
                'ruangan'        => $this->nullable($row['ruangan'] ?? null),
                'kapasitas'      => (int) ($row['kapasitas'] ?? 0) ?: 30,
                'tahun_ajaran'   => (string) ($row['tahun_ajaran'] ?? date('Y') . '/' . (date('Y') + 1)),
            ];
        });

        return back()->with($this->importFlash($result));
    }

    private function nullable($v)
    {
        $v = trim((string) $v);
        return $v === '' ? null : $v;
    }

    public function index()
    {
        $perPage = (int) request()->query('per_page', 15);
        $perPage = in_array($perPage, [10, 25, 50, 100], true) ? $perPage : 15;

        $kelas = Kelas::with(['jurusan', 'waliKelas'])
            ->paginate($perPage)
            ->withQueryString();

        $guru = Guru::select('id', 'nama_lengkap')->get();
        $jurusan = Jurusan::select('id', 'nama')->get();

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
        $jurusan = Jurusan::select('id', 'nama')->get();

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