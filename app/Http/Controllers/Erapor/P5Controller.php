<?php

namespace App\Http\Controllers\Erapor;

use App\Http\Controllers\Controller;
use App\Models\P5Projek;
use App\Models\P5Nilai;
use App\Models\RaporSiswa;
use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class P5Controller extends Controller
{
    public function index()
    {
        $projeks = P5Projek::with(['jurusan', 'p5Nilai'])
            ->withCount('p5Nilai')
            ->latest()
            ->paginate(20);

        return Inertia::render('Erapor/P5/Index', [
            'projeks' => $projeks,
        ]);
    }

    public function create()
    {
        return Inertia::render('Erapor/P5/Create', [
            'temaOptions' => [
                'Kebinekaan Global',
                'Gotong Royong',
                'Kreativitas',
                'Gaya Hidup Berkelanjutan',
                'Suara Demokrasi',
                'Bangunlah Jiwa dan Raganya',
            ],
            'tingkatOptions' => ['10', '11', '12'],
            'jurusans' => Jurusan::all(['id', 'nama']),
            'dimensiOptions' => P5Projek::dimensiChoices(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_projek' => 'required|string|max:200',
            'tema' => 'required|string|max:100',
            'deskripsi' => 'required|string',
            'tingkat' => 'required|in:10,11,12',
            'jurusan_id' => 'nullable|exists:jurusans,id',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'nama_guru_pengampu' => 'required|string|max:100',
        ]);

        P5Projek::create($validated);

        return redirect()->route('admin.erapor.p5.index')
            ->with('success', 'Projek P5 berhasil ditambahkan');
    }

    public function edit(P5Projek $p5Projek)
    {
        return Inertia::render('Erapor/P5/Edit', [
            'projek' => $p5Projek,
            'temaOptions' => [
                'Kebinekaan Global',
                'Gotong Royong',
                'Kreativitas',
                'Gaya Hidup Berkelanjutan',
                'Suara Demokrasi',
                'Bangunlah Jiwa dan Raganya',
            ],
            'tingkatOptions' => ['10', '11', '12'],
            'jurusans' => Jurusan::all(['id', 'nama']),
            'dimensiOptions' => P5Projek::dimensiChoices(),
        ]);
    }

    public function update(Request $request, P5Projek $p5Projek)
    {
        $validated = $request->validate([
            'nama_projek' => 'required|string|max:200',
            'tema' => 'required|string|max:100',
            'deskripsi' => 'required|string',
            'tingkat' => 'required|in:10,11,12',
            'jurusan_id' => 'nullable|exists:jurusans,id',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'nama_guru_pengampu' => 'required|string|max:100',
        ]);

        $p5Projek->update($validated);

        return redirect()->route('admin.erapor.p5.index')
            ->with('success', 'Projek P5 berhasil diupdate');
    }

    public function destroy(P5Projek $p5Projek)
    {
        $p5Projek->delete();

        return redirect()->route('admin.erapor.p5.index')
            ->with('success', 'Projek P5 berhasil dihapus');
    }

    public function inputNilai(P5Projek $p5Projek)
    {
        $siswas = RaporSiswa::with('siswa')->get();
        $dimensiOptions = P5Projek::dimensiChoices();
        $predikatOptions = P5Nilai::predikatChoices();

        return Inertia::render('Erapor/P5/InputNilai', [
            'projek' => $p5Projek,
            'siswas' => $siswas,
            'dimensiOptions' => $dimensiOptions,
            'predikatOptions' => $predikatOptions,
        ]);
    }

    public function storeNilai(Request $request, P5Projek $p5Projek)
    {
        $validated = $request->validate([
            'entries' => 'required|array',
            'entries.*.rapor_siswa_id' => 'required|exists:rapor_siswa,id',
            'entries.*.dimensi' => 'required|in:beriman_bertaqwa,berkebinekaan_global,bergotong_royong,mandiri,bernalar_kritis,kreatif',
            'entries.*.predikat' => 'required|in:A,B,C,D',
            'entries.*.catatan' => 'nullable|string',
        ]);

        foreach ($validated['entries'] as $entry) {
            P5Nilai::updateOrCreate(
                [
                    'p5_projek_id' => $p5Projek->id,
                    'rapor_siswa_id' => $entry['rapor_siswa_id'],
                    'dimensi' => $entry['dimensi'],
                ],
                [
                    'predikat' => $entry['predikat'],
                    'catatan' => $entry['catatan'] ?? null,
                ]
            );
        }

        return redirect()->route('admin.erapor.p5.index')
            ->with('success', 'Nilai P5 berhasil disimpan');
    }
}
