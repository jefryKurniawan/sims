<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RaporSiswa;
use App\Models\RaporKelas;
use App\Models\RaporNilai;
use App\Models\RaporDeskripsi;
use App\Models\RaporEkstrakurikuler;
use App\Models\RaporCatatan;
use App\Models\Siswa;
use App\Services\RaporService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RaporSiswaController extends Controller
{
    protected RaporService $raporService;

    public function __construct(RaporService $raporService)
    {
        $this->raporService = $raporService;
    }

    public function index(Request $request)
    {
        $query = RaporSiswa::query()
            ->with(['siswa', 'raporKelas.jurusan']);

        if ($request->filled('rapor_kelas_id')) {
            $query->where('rapor_kelas_id', $request->rapor_kelas_id);
        }

        if ($request->filled('semester')) {
            $query->where('semester', $request->semester);
        }

        if ($request->filled('tahun_ajaran')) {
            $query->where('tahun_ajaran', $request->tahun_ajaran);
        }

        $raporSiswa = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/RaporSiswa/Index', [
            'raporSiswa' => $raporSiswa,
            'kelas' => RaporKelas::all(),
            'filters' => $request->only(['rapor_kelas_id', 'semester', 'tahun_ajaran']),
        ]);
    }

    public function assignForm()
    {
        return Inertia::render('Admin/RaporSiswa/Assign', [
            'kelas' => RaporKelas::with('jurusan')->get(),
            'siswa' => Siswa::whereDoesntHave('raporSiswa', function ($q) {
                $q->where('semester', request('semester', 'Ganjil'))
                  ->where('tahun_ajaran', request('tahun_ajaran', date('Y') . '/' . (date('Y') + 1)));
            })->get(),
        ]);
    }

    public function assignStore(Request $request)
    {
        $validated = $request->validate([
            'rapor_kelas_id' => 'required|exists:rapor_kelas,id',
            'siswa_ids' => 'required|array',
            'siswa_ids.*' => 'exists:siswa,id',
            'semester' => 'required|in:Ganjil,Genap',
            'tahun_ajaran' => 'required|string|max:20',
        ]);

        $assigned = $this->raporService->assignSiswaToKelas(
            $validated['rapor_kelas_id'],
            $validated['siswa_ids'],
            $validated['semester'],
            $validated['tahun_ajaran'],
        );

        return redirect()->route('rapor-siswa.index')
            ->with('success', "$assigned siswa berhasil ditambahkan ke kelas!");
    }

    public function show(RaporSiswa $raporSiswa)
    {
        $rapor = $this->raporService->getRaporSiswa($raporSiswa->id);

        return Inertia::render('Admin/RaporSiswa/Show', [
            'rapor' => $rapor,
        ]);
    }

    public function inputNilaiForm(RaporSiswa $raporSiswa)
    {
        $raporSiswa->load([
            'siswa',
            'raporKelas.jurusan',
            'raporKelas.raporMapel',
            'raporNilai',
            'raporDeskripsi',
        ]);

        return Inertia::render('Admin/RaporSiswa/InputNilai', [
            'raporSiswa' => $raporSiswa,
        ]);
    }

    public function inputNilaiStore(Request $request, RaporSiswa $raporSiswa)
    {
        $validated = $request->validate([
            'nilai' => 'required|array',
            'nilai.*.rapor_mapel_id' => 'required|exists:rapor_mapel,id',
            'nilai.*.nilai_pengetahuan' => 'nullable|numeric|min:0|max:100',
            'nilai.*.predikat_pengetahuan' => 'nullable|string|max:10',
            'nilai.*.nilai_keterampilan' => 'nullable|numeric|min:0|max:100',
            'nilai.*.predikat_keterampilan' => 'nullable|string|max:10',
            'nilai.*.deskripsi_pengetahuan' => 'nullable|string',
            'nilai.*.deskripsi_keterampilan' => 'nullable|string',
        ]);

        DB::transaction(function () use ($raporSiswa, $validated) {
            foreach ($validated['nilai'] as $item) {
                $nilai = $this->raporService->inputNilai(
                    $raporSiswa->id,
                    $item['rapor_mapel_id'],
                    $item,
                );

                if (!empty($item['deskripsi_pengetahuan']) || !empty($item['deskripsi_keterampilan'])) {
                    RaporDeskripsi::updateOrCreate(
                        [
                            'rapor_siswa_id' => $raporSiswa->id,
                            'rapor_mapel_id' => $item['rapor_mapel_id'],
                        ],
                        [
                            'deskripsi_pengetahuan' => $item['deskripsi_pengetahuan'] ?? null,
                            'deskripsi_keterampilan' => $item['deskripsi_keterampilan'] ?? null,
                        ]
                    );
                }
            }
        });

        return redirect()->route('rapor-siswa.show', $raporSiswa)
            ->with('success', 'Nilai berhasil disimpan!');
    }

    public function generateDeskripsi(RaporSiswa $raporSiswa)
    {
        $generated = $this->raporService->generateSemuaDeskripsi($raporSiswa->id);

        return redirect()->route('rapor-siswa.show', $raporSiswa)
            ->with('success', "$generated deskripsi berhasil digenerate!");
    }

    public function inputEkstrakurikuler(Request $request, RaporSiswa $raporSiswa)
    {
        $validated = $request->validate([
            'nama_ekskul' => 'required|string|max:255',
            'nilai' => 'required|string|max:50',
            'deskripsi' => 'nullable|string',
        ]);

        $ekskul = RaporEkstrakurikuler::create([
            'rapor_siswa_id' => $raporSiswa->id,
            'nama_ekskul' => $validated['nama_ekskul'],
            'nilai' => $validated['nilai'],
            'deskripsi' => $validated['deskripsi'],
        ]);

        return redirect()->route('rapor-siswa.show', $raporSiswa)
            ->with('success', 'Ekstrakurikuler berhasil ditambahkan!');
    }

    public function hapusEkstrakurikuler(RaporEkstrakurikuler $raporEkstrakurikuler)
    {
        $raporSiswaId = $raporEkstrakurikuler->rapor_siswa_id;
        $raporEkstrakurikuler->delete();

        return redirect()->route('rapor-siswa.show', $raporSiswaId)
            ->with('success', 'Ekstrakurikuler berhasil dihapus!');
    }

    public function inputCatatan(Request $request, RaporSiswa $raporSiswa)
    {
        $validated = $request->validate([
            'catatan_wali_kelas' => 'nullable|string',
            'catatan_ortu' => 'nullable|string',
            'tinggi_badan' => 'nullable|string|max:10',
            'berat_badan' => 'nullable|string|max:10',
            'jumlah_sakit' => 'nullable|integer',
            'jumlah_izin' => 'nullable|integer',
            'jumlah_alpha' => 'nullable|integer',
        ]);

        RaporCatatan::updateOrCreate(
            ['rapor_siswa_id' => $raporSiswa->id],
            $validated,
        );

        return redirect()->route('rapor-siswa.show', $raporSiswa)
            ->with('success', 'Catatan rapor berhasil disimpan!');
    }

    public function statistik(Request $request)
    {
        $kelasId = $request->input('rapor_kelas_id');

        $statistik = [];
        if ($kelasId) {
            $statistik = $this->raporService->getStatistikKelas(
                (int) $kelasId,
                $request->input('semester', 'Ganjil'),
                $request->input('tahun_ajaran', date('Y') . '/' . (date('Y') + 1)),
            );
        }

        return Inertia::render('Admin/RaporSiswa/Statistik', [
            'kelas' => RaporKelas::with('jurusan')->get(),
            'statistik' => $statistik,
            'filters' => $request->only(['rapor_kelas_id', 'semester', 'tahun_ajaran']),
        ]);
    }

    public function destroy(RaporSiswa $raporSiswa)
    {
        $raporSiswa->delete();

        return redirect()->route('rapor-siswa.index')
            ->with('success', 'Data rapor siswa berhasil dihapus!');
    }
}
