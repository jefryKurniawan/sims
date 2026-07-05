<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesImport;
use App\Http\Controllers\Controller;
use App\Models\PerpustakaanBuku;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerpustakaanController extends Controller
{
    use HandlesImport;

    /** Header template import Buku. */
    protected function bukuHeaders(): array
    {
        return ['judul', 'penulis', 'penerbit', 'tahun_terbit', 'isbn', 'kategori', 'deskripsi', 'jumlah_halaman', 'jumalah_stok', 'lokasi_rak', 'tersedia'];
    }

    public function template(Request $request)
    {
        $sample = [
            'judul' => 'Dasar Pemrograman Web',
            'penulis' => 'Andi Wijaya',
            'penerbit' => 'Pusat Pendidikan',
            'tahun_terbit' => '2023',
            'isbn' => '978-602-1234-56-7',
            'kategori' => 'Teknologi',
            'deskripsi' => 'Buku pengantar Pemrograman Web menggunakan HTML, CSS, dan JavaScript.',
            'jumlah_halaman' => '250',
            'jumalah_stok' => '10',
            'lokasi_rak' => 'Rak A1',
            'tersedia' => 'Ya',
        ];

        return $this->downloadTemplate('perpustakaan-buku', $this->bukuHeaders(), $sample, $request->get('format', 'xlsx'));
    }

    public function import(Request $request)
    {
        $result = $this->runImport($request, PerpustakaanBuku::class, function ($row) {
            $judul = trim((string) ($row['judul'] ?? ''));
            if ($judul === '') {
                return null;
            }

            $stok = (int) ($row['jumalah_stok'] ?? 0);
            $tersedia = strtolower(trim((string) ($row['tersedia'] ?? '')));

            return [
                'judul'          => $judul,
                'penulis'        => (string) ($row['penulis'] ?? ''),
                'penerbit'       => $this->nullable($row['penerbit'] ?? null),
                'tahun_terbit'   => (int) ($row['tahun_terbit'] ?? 0) ?: null,
                'isbn'           => $this->nullable($row['isbn'] ?? null),
                'kategori'       => $this->nullable($row['kategori'] ?? null),
                'deskripsi'      => $this->nullable($row['deskripsi'] ?? null),
                'jumlah_halaman' => (int) ($row['jumlah_halaman'] ?? 0) ?: null,
                'jumalah_stok'   => $stok > 0 ? $stok : 1,
                'lokasi_rak'     => $this->nullable($row['lokasi_rak'] ?? null),
                'file_cover'     => $this->nullable($row['file_cover'] ?? null),
                'tersedia'       => in_array($tersedia, ['0', 'false', 'tidak'], true) ? false : true,
            ];
        });

        return back()->with($this->importFlash($result));
    }

    private function nullable($v)
    {
        $v = trim((string) $v);
        return $v === '' ? null : $v;
    }

    public function index(Request $request)
    {
        $query = PerpustakaanBuku::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('penulis', 'like', "%{$search}%")
                  ->orWhere('kategori', 'like', "%{$search}%");
            });
        }

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        if ($request->filled('tersedia')) {
            $query->where('tersedia', $request->boolean('tersedia'));
        }

        $buku = $query->orderBy('judul')->paginate(15);

        return Inertia::render('Admin/Perpustakaan/Index', [
            'buku' => $buku,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Perpustakaan/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'penulis' => 'required|string|max:150',
            'penerbit' => 'nullable|string|max:150',
            'tahun_terbit' => 'nullable|integer|min:1000|max:'.date('Y'),
            'isbn' => 'nullable|string|max:20',
            'kategori' => 'nullable|string|max:100',
            'deskripsi' => 'nullable|string',
            'jumlah_halaman' => 'nullable|integer|min:1',
            'jumalah_stok' => 'required|integer|min:1',
            'lokasi_rak' => 'nullable|string|max:50',
            'file_cover' => 'nullable|string|max:255',
            'tersedia' => 'required|boolean',
        ]);

        PerpustakaanBuku::create($validated);

        return redirect()->route('perpustakaan.index')->with('success', 'Buku berhasil ditambahkan.');
    }

    public function show(PerpustakaanBuku $buku)
    {
        return Inertia::render('Admin/Perpustakaan/Show', [
            'buku' => $buku,
        ]);
    }

    public function edit(PerpustakaanBuku $buku)
    {
        return Inertia::render('Admin/Perpustakaan/Edit', [
            'buku' => $buku,
        ]);
    }

    public function update(Request $request, PerpustakaanBuku $buku)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'penulis' => 'required|string|max:150',
            'penerbit' => 'nullable|string|max:150',
            'tahun_terbit' => 'nullable|integer|min:1000|max:'.date('Y'),
            'isbn' => 'nullable|string|max:20',
            'kategori' => 'nullable|string|max:100',
            'deskripsi' => 'nullable|string',
            'jumlah_halaman' => 'nullable|integer|min:1',
            'jumalah_stok' => 'required|integer|min:1',
            'lokasi_rak' => 'nullable|string|max:50',
            'file_cover' => 'nullable|string|max:255',
            'tersedia' => 'required|boolean',
        ]);

        $buku->update($validated);

        return redirect()->route('perpustakaan.index')->with('success', 'Buku berhasil diperbarui.');
    }

    public function destroy(PerpustakaanBuku $buku)
    {
        $buku->delete();

        return redirect()->route('perpustakaan.index')->with('success', 'Buku berhasil dihapus.');
    }
}