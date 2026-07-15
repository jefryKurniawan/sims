<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesImport;
use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Models\SiswaKelas;
use App\Models\Jurusan;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SiswaController extends Controller
{
    use HandlesImport;

    /**
     * Header template import Siswa.
     */
    protected function siswaHeaders(): array
    {
        return [
            'nama_lengkap',
            'nisn',
            'nis',
            'tempat_lahir',
            'tanggal_lahir',
            'jenis_kelamin',
            'alamat',
            'no_hp',
            'email',
            'nama_ortu',
            'no_hp_ortu',
            'asal_sekolah',
            'status',
            'tanggal_masuk',
            'jurusan_id',
            'kelas_id',
        ];
    }

    public function template(Request $request)
    {
        $sample = [
            'nama_lengkap' => 'Ani Suryani',
            'nisn' => '1234567890',
            'nis' => '2025001',
            'tempat_lahir' => 'Jakarta',
            'tanggal_lahir' => '2008-05-12',
            'jenis_kelamin' => 'Perempuan',
            'alamat' => 'Jl. Merdeka No. 10, Jakarta',
            'no_hp' => '081234567890',
            'email' => 'ani.suryani@example.com',
            'nama_ortu' => 'Budi Santoso',
            'no_hp_ortu' => '081234567891',
            'asal_sekolah' => 'SD Negeri 1 Jakarta',
            'status' => 'Aktif',
            'tanggal_masuk' => '2023-07-01',
            'jurusan_id' => '1',
            'kelas_id' => '1',
        ];

        return $this->downloadTemplate('siswa', $this->siswaHeaders(), $sample, $request->get('format', 'xlsx'));
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240',
        ]);

        $rows = Excel::toCollection(new GenericImport(), $request->file('file'))->first();

        $jurusanMap = Jurusan::pluck('id', 'nama');
        $kelasMap = Kelas::pluck('id', 'nama_kelas');

        $imported = 0;
        $skipped = 0;
        $errors = [];

        foreach ($rows as $index => $row) {
            try {
                $nama = trim((string) ($row['nama_lengkap'] ?? ''));
                if ($nama === '') {
                    $skipped++;
                    continue;
                }

                $data = [
                    'nama_lengkap' => $nama,
                    'nisn' => $this->nullable($row['nisn'] ?? null),
                    'nis' => $this->nullable($row['nis'] ?? null),
                    'tempat_lahir' => (string) ($row['tempat_lahir'] ?? ''),
                    'tanggal_lahir' => $this->nullable($row['tanggal_lahir'] ?? null),
                    'jenis_kelamin' => in_array($row['jenis_kelamin'] ?? '', ['Laki-laki', 'Perempuan'], true) ? $row['jenis_kelamin'] : 'Laki-laki',
                    'alamat' => (string) ($row['alamat'] ?? ''),
                    'no_hp' => $this->nullable($row['no_hp'] ?? null),
                    'email' => $this->nullable($row['email'] ?? null),
                    'nama_ortu' => (string) ($row['nama_ortu'] ?? ''),
                    'no_hp_ortu' => $this->nullable($row['no_hp_ortu'] ?? null),
                    'asal_sekolah' => (string) ($row['asal_sekolah'] ?? ''),
                    'status' => in_array($row['status'] ?? '', ['Aktif', 'Pindah', 'Lulus', 'Dropout'], true) ? $row['status'] : 'Aktif',
                    'tanggal_masuk' => $this->nullable($row['tanggal_masuk'] ?? null),
                    'jurusan_id' => $row['jurusan_id'] && isset($jurusanMap[(string) $row['jurusan_id']]) ? $jurusanMap[(string) $row['jurusan_id']] : null,
                    'kelas_id' => $row['kelas_id'] && isset($kelasMap[(string) $row['kelas_id']]) ? (int) $row['kelas_id'] : null,
                ];

                $validator = \Validator::make($data, [
                    'nama_lengkap' => 'required|string|max:255',
                    'nisn' => 'required|string|max:20|unique:siswa,nisn',
                    'nis' => 'nullable|string|max:20',
                    'tempat_lahir' => 'nullable|string|max:255',
                    'tanggal_lahir' => 'nullable|date',
                    'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
                    'alamat' => 'nullable|string',
                    'no_hp' => 'nullable|string|max:20',
                    'email' => 'nullable|email|max:255',
                    'nama_ortu' => 'nullable|string|max:255',
                    'no_hp_ortu' => 'nullable|string|max:20',
                    'asal_sekolah' => 'nullable|string|max:255',
                    'status' => 'required|in:Aktif,Pindah,Lulus,Dropout',
                    'tanggal_masuk' => 'nullable|date',
                    'jurusan_id' => 'nullable|exists:jurusan,id',
                    'kelas_id' => 'required|exists:kelas,id',
                ]);

                if ($validator->fails()) {
                    throw new \RuntimeException($validator->errors()->first());
                }

                // Create siswa
                $siswa = Siswa::create($data);

                // Create initial enrollment
                SiswaKelas::create([
                    'siswa_id' => $siswa->id,
                    'kelas_id' => $data['kelas_id'],
                    'status' => 'aktif',
                    'tanggal_masuk_kelas' => $data['tanggal_masuk'] ? $this->nullable($data['tanggal_masuk']) : now(),
                    'tanggal_keluar_kelas' => null,
                ]);

                $imported++;
            } catch (\Throwable $e) {
                $skipped++;
                $errors[] = 'Baris ' . ($index + 2) . ': ' . $e->getMessage();
            }
        }

        // Build flash message
        $msg = "Import selesai: {$imported} berhasil";
        if ($skipped) {
            $msg .= ", {$skipped} dilewati";
        }
        if ($errors) {
            $prefix = implode('; ', array_slice($errors, 0, 3));
            $more = count($errors) > 3 ? ' …' : '';
            return back()->with(['error' => "{$msg}. {$prefix}{$more}"]);
        }

        return back()->with(['success' => $msg]);
    }

    private function nullable($v)
    {
        $v = trim((string) $v);
        return $v === '' ? null : $v;
    }

    /**
     * Display a listing of the resource — landing page with 3 angkatan cards.
     */
    public function index(Request $request)
    {
        $angkatan = collect(['10', '11', '12'])->map(function ($tingkat) {
            $kelas = Kelas::where('tingkat', $tingkat)->orderBy('nama_kelas')->get();
            $siswaCount = $kelas->isEmpty() ? 0 : SiswaKelas::whereIn('kelas_id', $kelas->pluck('id'))
                ->where('status', 'aktif')
                ->whereHas('siswa', fn ($q) => $q->whereNull('deleted_at'))
                ->count();
            $variants = $kelas
                ->map(fn ($k) => strtoupper(substr((string) $k->nama_kelas, 0, 1))) // first character
                ->filter()
                ->unique()
                ->sort()
                ->values();

            return [
                'tingkat' => $tingkat,
                'kelas_count' => $kelas->count(),
                'siswa_count' => $siswaCount,
                'variants' => $variants,
            ];
        })->values();

        return Inertia::render('Admin/Siswa/Landing', [
            'angkatan' => $angkatan,
        ]);
    }

    /**
     * Halaman per-angkatan (Kelas 10/11/12) dengan filter variant dinamis.
     */
    public function tingkat(Request $request, int $tingkat)
    {
        $tingkatStr = (string) $tingkat;
        if (!in_array($tingkatStr, ['10', '11', '12'], true)) {
            abort(404);
        }

        $kelas = Kelas::with('jurusan')->where('tingkat', $tingkatStr)->orderBy('nama_kelas')->get();
        $variants = $kelas
            ->map(fn ($k) => strtoupper(substr((string) $k->nama_kelas, 0, 1))) // first character
            ->filter()
            ->unique()
            ->sort()
            ->values();

        $kelasIds = $kelas->pluck('id');

        $query = Siswa::with(['kelasAktif.kelas', 'jurusan'])
            ->whereHas('kelasAktif.kelas', fn ($q) => $q->whereIn('kelas_id', $kelasIds));

        // Filter variant (first character of kelas.nama_kelas)
        if ($request->filled('variant')) {
            $query->whereHas('kelasAktif.kelas', function ($q) use ($request, $kelasIds) {
                $q->whereIn('kelas_id', $kelasIds)
                    ->whereRaw('UPPER(SUBSTRING(nama_kelas, 1, 1)) = ?', [strtoupper($request->variant)]);
            });
        }
        // Filter search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('no_hp', 'like', "%{$search}%");
            });
        }

        $siswa = $query->orderBy('nama_lengkap')->paginate(15)->withQueryString();

        return Inertia::render('Admin/Siswa/Tingkat', [
            'tingkat' => $tingkatStr,
            'siswa' => $siswa,
            'variants' => $variants,
            'kelasList' => $kelas,
        ]);
    }

    /**
     * Bulk pindah siswa ke kelas lain (lintas angkatan 10/11 atau ganti varian).
     * Multi-select siswa → pilih kelas tujuan → siswa_kelas lama ditutup, baru dibuat aktif.
     */
    public function promote(Request $request)
    {
        $validated = $request->validate([
            'siswa_ids' => 'required|array|min:1',
            'siswa_ids.*' => 'integer|exists:siswa,id',
            'target_kelas_id' => 'required|integer|exists:kelas,id',
        ]);

        $targetKelas = Kelas::findOrFail($validated['target_kelas_id']);
        $count = count($validated['siswa_ids']);

        DB::transaction(function () use ($validated, $targetKelas) {
            foreach ($validated['siswa_ids'] as $siswaId) {
                // Tutup enrollment aktif sebelumnya
                SiswaKelas::where('siswa_id', $siswaId)
                    ->where('status', 'aktif')
                    ->update([
                        'status' => 'pindah',
                        'tanggal_keluar_kelas' => now(),
                    ]);

                // Buat enrollment aktif baru
                SiswaKelas::create([
                    'siswa_id' => $siswaId,
                    'kelas_id' => $targetKelas->id,
                    'status' => 'aktif',
                    'tanggal_masuk_kelas' => now(),
                ]);
            }
        });

        return back()->with('success', "{$count} siswa berhasil dipindahkan ke kelas {$targetKelas->nama_kelas}.");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $jurusanList = Jurusan::select('id', 'nama')->orderBy('nama')->get();
        $kelasList = Kelas::select('id', 'nama_kelas')->orderBy('nama_kelas')->get();
        return Inertia::render('Admin/Siswa/Create', [
            'jurusanList' => $jurusanList,
            'kelasList' => $kelasList,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nisn' => 'required|string|max:20|unique:siswa,nisn',
            'nis' => 'nullable|string|max:20',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => ['required', 'in:Laki-laki,Perempuan'],
            'alamat' => 'nullable|string',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'nama_ortu' => 'nullable|string|max:255',
            'no_hp_ortu' => 'nullable|string|max:20',
            'asal_sekolah' => 'nullable|string|max:255',
            'status' => ['required', 'in:Aktif,Pindah,Lulus,Dropout'],
            'tanggal_masuk' => 'nullable|date',
            'jurusan_id' => 'nullable|exists:jurusan,id',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        $siswa = Siswa::create($validated);

        // Create initial enrollment
        SiswaKelas::create([
            'siswa_id' => $siswa->id,
            'kelas_id' => $validated['kelas_id'],
            'status' => 'aktif',
            'tanggal_masuk_kelas' => $validated['tanggal_masuk'] ? $this->nullable($validated['tanggal_masuk']) : now(),
            'tanggal_keluar_kelas' => null,
        ]);

        return redirect()->route('users.murid.index')->with('success', 'Data siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
   public function show($id)
   {
        $siswa = Siswa::with(['jurusan', 'kelasAktif.kelas'])->findOrFail($id);
       return Inertia::render('Admin/Siswa/Detail', [
           'siswa' => $siswa,
       ]);
   }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $siswa = Siswa::with(['jurusan', 'kelasAktif.kelas'])->findOrFail($id);
        $jurusanList = Jurusan::select('id', 'nama')->orderBy('nama')->get();
        $kelasList = Kelas::select('id', 'nama_kelas')->orderBy('nama_kelas')->get();
        return Inertia::render('Admin/Siswa/Edit', [
            'siswa' => $siswa,
            'jurusanList' => $jurusanList,
            'kelasList' => $kelasList,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $siswa = Siswa::findOrFail($id);

        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nisn' => ["required|string|max:20|unique:siswa,nisn,{$id}"],
            'nis' => 'nullable|string|max:20',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => ['required', 'in:Laki-laki,Perempuan'],
            'alamat' => 'nullable|string',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'nama_ortu' => 'nullable|string|max:255',
            'no_hp_ortu' => 'nullable|string|max:20',
            'asal_sekolah' => 'nullable|string|max:255',
            'status' => ['required', 'in:Aktif,Pindah,Lulus,Dropout'],
            'tanggal_masuk' => 'nullable|date',
            'jurusan_id' => 'nullable|exists:jurusan,id',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        // Update siswa fields
        $siswa->update($validated);

        // Handle kelas change: end current active enrollment and create new if kelas changed
        $activeKelas = SiswaKelas::where('siswa_id', $siswa->id)
            ->where('status', 'aktif')
            ->first();

        if ($activeKelas && $activeKelas->kelas_id != $validated['kelas_id']) {
            // End current active
            $activeKelas->update([
                'status' => 'pindah',
                'tanggal_keluar_kelas' => now(),
            ]);

            // Create new active enrollment
            SiswaKelas::create([
                'siswa_id' => $siswa->id,
                'kelas_id' => $validated['kelas_id'],
                'status' => 'aktif',
                'tanggal_masuk_kelas' => $validated['tanggal_masuk'] ? $this->nullable($validated['tanggal_masuk']) : now(),
                'tanggal_keluar_kelas' => null,
            ]);
        } elseif (!$activeKelas) {
            // No active enrollment (should not happen), create one
            SiswaKelas::create([
                'siswa_id' => $siswa->id,
                'kelas_id' => $validated['kelas_id'],
                'status' => 'aktif',
                'tanggal_masuk_kelas' => $validated['tanggal_masuk'] ? $this->nullable($validated['tanggal_masuk']) : now(),
                'tanggal_keluar_kelas' => null,
            ]);
        }

        return redirect()->route('users.murid.index')->with('success', 'Data siswa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy($id)
    {
        $siswa = Siswa::findOrFail($id);
        $siswa->delete(); // soft delete
        return redirect()->route('users.murid.index')->with('success', 'Data siswa berhasil dihapus.');
    }
}
