<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesImport;
use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GtkController extends Controller
{
    use HandlesImport;

    /** Header template import GTK. */
    protected function gtkHeaders(): array
    {
        return [
            'nama_lengkap', 'nuptk', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir',
            'agama', 'alamat', 'no_telp', 'email', 'jenis', 'bidang_studi', 'jabatan',
            'status_kepegawaian', 'tanggal_masuk',
        ];
    }

    public function template(Request $request)
    {
        $sample = [
            'nama_lengkap'       => 'Dr. Andi Setiawan, M.Pd.',
            'nuptk'              => '1234567890123456',
            'jenis_kelamin'      => 'L',
            'tempat_lahir'       => 'Jakarta',
            'tanggal_lahir'      => '1985-03-15',
            'agama'              => 'Islam',
            'alamat'             => 'Jl. Merdeka No. 10, Jakarta Selatan',
            'no_telp'            => '081234567890',
            'email'              => 'andi.setiawan@sekolah.sch.id',
            'jenis'              => 'Guru',
            'bidang_studi'       => 'Matematika',
            'jabatan'            => 'Guru Mapel',
            'status_kepegawaian' => 'Tetap Yayasan',
            'tanggal_masuk'      => '2020-07-01',
        ];

        return $this->downloadTemplate('gtk', $this->gtkHeaders(), $sample, $request->get('format', 'xlsx'));
    }

    public function import(Request $request)
    {
        $result = $this->runImport($request, Guru::class, function ($row) {
            $nama = trim((string) ($row['nama_lengkap'] ?? ''));
            if ($nama === '') {
                return null;
            }

            // validasi baris dengan rules yang sama seperti store()
            $data = [
                'nama_lengkap'       => $nama,
                'nuptk'              => $this->nullable($row['nuptk'] ?? null),
                'jenis_kelamin'      => strtoupper((string) ($row['jenis_kelamin'] ?? '')) === 'P' ? 'P' : 'L',
                'tempat_lahir'       => (string) ($row['tempat_lahir'] ?? ''),
                'tanggal_lahir'      => $this->nullable($row['tanggal_lahir'] ?? null),
                'agama'              => (string) ($row['agama'] ?? 'Islam'),
                'alamat'             => (string) ($row['alamat'] ?? ''),
                'no_telp'            => (string) ($row['no_telp'] ?? ''),
                'email'              => $this->nullable($row['email'] ?? null),
                'jenis'              => in_array($row['jenis'] ?? '', ['Guru', 'Tenaga Kependidikan'], true) ? $row['jenis'] : 'Guru',
                'bidang_studi'       => $this->nullable($row['bidang_studi'] ?? null),
                'jabatan'            => (string) ($row['jabatan'] ?? 'Guru'),
                'status_kepegawaian' => in_array($row['status_kepegawaian'] ?? '', ['Tetap Yayasan', 'Kontrak', 'Honorer'], true) ? $row['status_kepegawaian'] : 'Tetap Yayasan',
                'tanggal_masuk'      => $this->nullable($row['tanggal_masuk'] ?? null) ?? date('Y-m-d'),
            ];

            $validator = \Validator::make($data, [
                'nama_lengkap'       => 'required|string|max:255',
                'nuptk'              => 'nullable|string|max:30',
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
            ]);

            if ($validator->fails()) {
                throw new \RuntimeException($validator->errors()->first());
            }

            return $data;
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
