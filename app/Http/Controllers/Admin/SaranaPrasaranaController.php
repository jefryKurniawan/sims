<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesImport;
use App\Http\Controllers\Controller;
use App\Models\SaranaPrasarana;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaranaPrasaranaController extends Controller
{
    use HandlesImport;

    /** Header template import Sarana & Prasarana. */
    protected function saranaHeaders(): array
    {
        return ['nama', 'kategori', 'deskripsi', 'lokasi', 'kapasitas', 'kondisi', 'tahun_pengadaan', 'sumber_dana'];
    }

    public function template(Request $request)
    {
        $sample = [
            'nama' => 'Laboratorium Kimia',
            'kategori' => 'laboratorium',
            'deskripsi' => 'Lab kimia lengkap dengan peralatan standar',
            'lokasi' => 'Gedung Science Lab Lantai 2',
            'kapasitas' => '20',
            'kondisi' => 'baik',
            'tahun_pengadaan' => '2020',
            'sumber_dana' => 'BOS',
        ];

        return $this->downloadTemplate('sarana', $this->saranaHeaders(), $sample, $request->get('format', 'xlsx'));
    }

    public function import(Request $request)
    {
        $kategoriValid = ['ruangan', 'laboratorium', 'perpustakaan', 'olahraga', 'ibadah', 'sanitasi', 'teknologi', 'lainnya'];
        $kondisiValid = ['baik', 'rusak_ringan', 'rusak_berat'];

        $result = $this->runImport($request, SaranaPrasarana::class, function ($row) use ($kategoriValid, $kondisiValid) {
            $nama = trim((string) ($row['nama'] ?? ''));
            if ($nama === '') {
                return null;
            }

            $kategori = strtolower(trim((string) ($row['kategori'] ?? '')));
            $kondisi = strtolower(trim((string) ($row['kondisi'] ?? '')));
            $kapasitas = (int) ($row['kapasitas'] ?? 0);

            return [
                'nama'         => $nama,
                'kategori'     => in_array($kategori, $kategoriValid, true) ? $kategori : 'lainnya',
                'deskripsi'    => $this->nullable($row['deskripsi'] ?? null),
                'lokasi'       => $this->nullable($row['lokasi'] ?? null),
                'kapasitas'    => $kapasitas > 0 ? $kapasitas : null,
                'kondisi'      => in_array($kondisi, $kondisiValid, true) ? $kondisi : 'baik',
                'tahun_pengadaan' => (int) ($row['tahun_pengadaan'] ?? 0) ?: null,
                'sumber_dana'  => $this->nullable($row['sumber_dana'] ?? null),
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

        $sarana = SaranaPrasarana::paginate($perPage)->withQueryString();

        return Inertia::render('Admin/SaranaPrasarana/Index', [
            'sarana' => $sarana,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/SaranaPrasarana/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:200',
            'kategori' => 'required|in:ruangan,laboratorium,perpustakaan,olahraga,ibadah,sanitasi,teknologi,lainnya',
            'deskripsi' => 'nullable|string',
            'lokasi' => 'nullable|string|max:200',
            'kapasitas' => 'nullable|integer|min:0',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'foto' => 'nullable|string|max:255',
            'tahun_pengadaan' => 'nullable|integer|min:1900|max:2100',
            'sumber_dana' => 'nullable|string|max:100',
        ]);

        SaranaPrasarana::create($validated);

        return redirect()->route('sarana.index')
            ->with('success', 'Sarana prasarana berhasil ditambahkan.');
    }

    public function show(SaranaPrasarana $sarana)
    {
        return Inertia::render('Admin/SaranaPrasarana/Show', [
            'sarana' => $sarana,
        ]);
    }

    public function edit(SaranaPrasarana $sarana)
    {
        return Inertia::render('Admin/SaranaPrasarana/Edit', [
            'sarana' => $sarana,
        ]);
    }

    public function update(Request $request, SaranaPrasarana $sarana)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:200',
            'kategori' => 'required|in:ruangan,laboratorium,perpustakaan,olahraga,ibadah,sanitasi,teknologi,lainnya',
            'deskripsi' => 'nullable|string',
            'lokasi' => 'nullable|string|max:200',
            'kapasitas' => 'nullable|integer|min:0',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'foto' => 'nullable|string|max:255',
            'tahun_pengadaan' => 'nullable|integer|min:1900|max:2100',
            'sumber_dana' => 'nullable|string|max:100',
        ]);

        $sarana->update($validated);

        return redirect()->route('sarana.index')
            ->with('success', 'Sarana prasarana berhasil diperbarui.');
    }

    public function destroy(SaranaPrasarana $sarana)
    {
        $sarana->delete();

        return redirect()->route('sarana.index')
            ->with('success', 'Sarana prasarana berhasil dihapus.');
    }
}