<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Absensi;
use App\Models\AbsensiGuru;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsensiController extends Controller
{
    public function index(Request $request)
    {
        $kelasList = Kelas::orderBy('tingkat')->orderBy('nama_kelas')->get(['id', 'nama_kelas', 'tingkat']);

        return Inertia::render('Admin/Absensi/Index', [
            'kelasList' => $kelasList,
            'today' => now()->toDateString(),
        ]);
    }

    // Form absensi per kelas per tanggal
    public function kelas(Request $request, Kelas $kelas, $tanggal = null)
    {
        $tanggal = $tanggal ?? now()->toDateString();

        $siswaList = Siswa::with('kelasAktif.kelas')
            ->whereHas('kelasAktif', fn($q) => $q->where('kelas_id', $kelas->id))
            ->orderBy('nama_lengkap')
            ->get(['id', 'nama_lengkap', 'nisn', 'nis']);

        // Load existing absensi for this date
        $absensiMap = Absensi::where('kelas_id', $kelas->id)
            ->where('tanggal', $tanggal)
            ->whereIn('siswa_id', $siswaList->pluck('id'))
            ->get()
            ->keyBy('siswa_id');

        return Inertia::render('Admin/Absensi/Kelas', [
            'kelas' => $kelas->load('jurusan'),
            'tanggal' => $tanggal,
            'siswa' => $siswaList->map(fn($s) => [
                'id' => $s->id,
                'nama_lengkap' => $s->nama_lengkap,
                'nisn' => $s->nisn,
                'nis' => $s->nis,
                'absensi' => $absensiMap->has($s->id) ? [
                    'jam_masuk' => $absensiMap[$s->id]->jam_masuk?->format('H:i'),
                    'jam_pulang' => $absensiMap[$s->id]->jam_pulang?->format('H:i'),
                    'status_masuk' => $absensiMap[$s->id]->status_masuk,
                    'status_pulang' => $absensiMap[$s->id]->status_pulang,
                    'metode' => $absensiMap[$s->id]->metode,
                    'keterangan' => $absensiMap[$s->id]->keterangan,
                ] : null,
            ]),
            'statusOptions' => ['hadir', 'terlambat', 'izin', 'sakit', 'alpa'],
            'statusPulangOptions' => ['hadir', 'pulang_cepat', 'izin', 'sakit', 'alpa'],
        ]);
    }

    // Bulk save absensi for a kelas
    public function storeKelas(Request $request, Kelas $kelas)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'siswa' => 'required|array',
            'siswa.*.status_masuk' => 'required|in:hadir,terlambat,izin,sakit,alpa',
            'siswa.*.status_pulang' => 'required|in:hadir,pulang_cepat,izin,sakit,alpa',
            'siswa.*.jam_masuk' => 'nullable|date_format:H:i',
            'siswa.*.jam_pulang' => 'nullable|date_format:H:i',
            'siswa.*.keterangan' => 'nullable|string',
        ]);

        $tanggal = $validated['tanggal'];
        $saved = 0;

        foreach ($validated['siswa'] as $siswaId => $data) {
            $siswa = Siswa::find($siswaId);
            if (!$siswa || !$siswa->kelasAktif || $siswa->kelasAktif->kelas_id !== $kelas->id) {
                continue;
            }

            // Auto-set jam_masuk if hadir/terlambat and not provided
            $jamMasuk = $data['jam_masuk'] ?? (in_array($data['status_masuk'], ['hadir', 'terlambat']) ? now()->format('H:i') : null);
            $jamPulang = $data['jam_pulang'] ?? null;

            Absensi::updateOrCreate(
                ['siswa_id' => $siswaId, 'tanggal' => $tanggal],
                [
                    'kelas_id' => $kelas->id,
                    'jam_masuk' => $jamMasuk,
                    'jam_pulang' => $jamPulang,
                    'status_masuk' => $data['status_masuk'],
                    'status_pulang' => $data['status_pulang'],
                    'metode' => 'manual',
                    'keterangan' => $data['keterangan'] ?? null,
                    'dicatat_oleh' => auth()->id(),
                ]
            );
            $saved++;
        }

        return back()->with('success', "Absensi {$saved} siswa kelas {$kelas->nama_kelas} tanggal {$tanggal} berhasil disimpan.");
    }

    // Rekap absensi
    public function rekap(Request $request)
    {
        $query = Siswa::with(['kelasAktif.kelas', 'jurusan'])
            ->whereHas('kelasAktif');

        // Filters
        if ($request->filled('kelas_id')) {
            $query->whereHas('kelasAktif', fn($q) => $q->where('kelas_id', $request->kelas_id));
        }

        if ($request->filled('tanggal_from')) {
            $query->whereHas('absensis', fn($q) => $q->where('tanggal', '>=', $request->tanggal_from));
        }

        if ($request->filled('tanggal_to')) {
            $query->whereHas('absensis', fn($q) => $q->where('tanggal', '<=', $request->tanggal_to));
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('nis', 'like', "%{$search}%");
            });
        }

        $siswa = $query->orderBy('nama_lengkap')->paginate(20)->withQueryString();

        // Load absensi for each siswa in date range
        $tanggalFrom = $request->filled('tanggal_from') ? $request->tanggal_from : now()->startOfMonth()->toDateString();
        $tanggalTo = $request->filled('tanggal_to') ? $request->tanggal_to : now()->toDateString();

        $siswaIds = $siswa->pluck('id');
        $absensiMap = Absensi::whereIn('siswa_id', $siswaIds)
            ->whereBetween('tanggal', [$tanggalFrom, $tanggalTo])
            ->get()
            ->groupBy('siswa_id');

        // Summary stats
        $summary = $this->getSummaryStats($siswaIds->toArray(), $tanggalFrom, $tanggalTo);

        return Inertia::render('Admin/Absensi/Rekap', [
            'siswa' => $siswa,
            'filters' => $request->only(['kelas_id', 'tanggal_from', 'tanggal_to', 'search']),
            'kelasList' => Kelas::orderBy('tingkat')->orderBy('nama_kelas')->get(['id', 'nama_kelas', 'tingkat']),
            'absensiMap' => $absensiMap,
            'tanggalRange' => [$tanggalFrom, $tanggalTo],
            'summary' => $summary,
        ]);
    }

    // Export rekap to CSV
    public function export(Request $request)
    {
        $tanggalFrom = $request->filled('tanggal_from') ? $request->tanggal_from : now()->startOfMonth()->toDateString();
        $tanggalTo = $request->filled('tanggal_to') ? $request->tanggal_to : now()->toDateString();

        $query = Siswa::with(['kelasAktif.kelas']);
        if ($request->filled('kelas_id')) {
            $query->whereHas('kelasAktif', fn($q) => $q->where('kelas_id', $request->kelas_id));
        }
        $siswa = $query->orderBy('nama_lengkap')->get();

        $absensiMap = Absensi::whereIn('siswa_id', $siswa->pluck('id'))
            ->whereBetween('tanggal', [$tanggalFrom, $tanggalTo])
            ->get()
            ->groupBy('siswa_id');

        $filename = "rekap_absensi_{$tanggalFrom}_sd_{$tanggalTo}.csv";

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($siswa, $absensiMap, $tanggalFrom, $tanggalTo) {
            $file = fopen('php://output', 'w');
            // BOM for UTF-8
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));

            // Header row
            $header = ['NISN', 'NIS', 'Nama', 'Kelas'];
            $dates = [];
            $current = \Carbon\Carbon::parse($tanggalFrom);
            $end = \Carbon\Carbon::parse($tanggalTo);
            while ($current <= $end) {
                $dates[] = $current->format('Y-m-d');
                $header[] = $current->format('d/m');
                $current->addDay();
            }
            $header[] = 'Hadir';
            $header[] = 'Terlambat';
            $header[] = 'Izin';
            $header[] = 'Sakit';
            $header[] = 'Alpa';
            $header[] = 'Total';

            fputcsv($file, $header);

            foreach ($siswa as $s) {
                $row = [$s->nisn, $s->nis, $s->nama_lengkap, $s->kelasAktif?->kelas?->nama_kelas ?? '-'];
                $absensiSiswa = $absensiMap->get($s->id) ?? collect();

                $hitung = ['hadir' => 0, 'terlambat' => 0, 'izin' => 0, 'sakit' => 0, 'alpa' => 0];

                foreach ($dates as $date) {
                    $a = $absensiSiswa->firstWhere('tanggal', $date);
                    if ($a) {
                        $status = $a->status_masuk;
                        $row[] = $status;
                        if (isset($hitung[$status])) {
                            $hitung[$status]++;
                        }
                    } else {
                        $row[] = '-';
                        $hitung['alpa']++;
                    }
                }

                $row[] = $hitung['hadir'];
                $row[] = $hitung['terlambat'];
                $row[] = $hitung['izin'];
                $row[] = $hitung['sakit'];
                $row[] = $hitung['alpa'];
                $row[] = array_sum($hitung);

                fputcsv($file, $row);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    // Guru absensi index - paginated list with filters
    public function guruIndex(Request $request)
    {
        $tanggal = $request->get('tanggal', now()->toDateString());

        $query = Guru::orderBy('nama_lengkap');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', "%{$search}%")
                    ->orWhere('mapel', 'like', "%{$search}%");
            });
        }

        $guru = $query->paginate(20)->withQueryString();

        // Load absensi for the selected date
        $absensiGuru = AbsensiGuru::where('tanggal', $tanggal)
            ->whereIn('guru_id', $guru->pluck('id'))
            ->get()
            ->keyBy('guru_id');

        $absensiMap = [];
        foreach ($absensiGuru as $ag) {
            $absensiMap[$ag->guru_id] = [
                'jam_masuk' => $ag->jam_masuk?->format('H:i'),
                'jam_pulang' => $ag->jam_pulang?->format('H:i'),
                'status_masuk' => $ag->status,
                'status_pulang' => $ag->status_pulang ?? 'alpa',
            ];
        }

        return Inertia::render('Admin/Absensi/GuruIndex', [
            'guru' => $guru,
            'filters' => $request->only(['tanggal', 'search']),
            'absensiMap' => $absensiMap,
            'today' => now()->toDateString(),
        ]);
    }

    // Export guru absensi to CSV
    public function guruExport(Request $request)
    {
        $tanggal = $request->get('tanggal', now()->toDateString());

        $query = Guru::orderBy('nama_lengkap');
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', "%{$search}%")
                    ->orWhere('mapel', 'like', "%{$search}%");
            });
        }
        $guru = $query->get();

        $absensiGuru = AbsensiGuru::where('tanggal', $tanggal)
            ->whereIn('guru_id', $guru->pluck('id'))
            ->get()
            ->keyBy('guru_id');

        $filename = "rekap_absensi_guru_{$tanggal}.csv";

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($guru, $absensiGuru, $tanggal) {
            $file = fopen('php://output', 'w');
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));

            fputcsv($file, ['NIP', 'Nama Guru', 'Mata Pelajaran', 'Status Masuk', 'Jam Masuk', 'Status Pulang', 'Jam Pulang', 'Keterangan']);

            foreach ($guru as $g) {
                $ag = $absensiGuru->get($g->id);
                fputcsv($file, [
                    $g->nip,
                    $g->nama_lengkap,
                    $g->mapel ?? '-',
                    $ag?->status ?? '-',
                    $ag?->jam_masuk?->format('H:i') ?? '-',
                    $ag && $ag->status_pulang ? $ag->status_pulang : '-',
                    $ag?->jam_pulang?->format('H:i') ?? '-',
                    $ag?->keterangan ?? '-',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    private function getSummaryStats(array $siswaIds, string $from, string $to): array
    {
        $absensi = Absensi::whereIn('siswa_id', $siswaIds)
            ->whereBetween('tanggal', [$from, $to])
            ->get();

        $totalRecords = $absensi->count();
        $totalSiswa = count($siswaIds);
        $totalDays = \Carbon\Carbon::parse($from)->diffInDays(\Carbon\Carbon::parse($to)) + 1;
        $expectedRecords = $totalSiswa * $totalDays;

        return [
            'total_siswa' => $totalSiswa,
            'total_hari' => $totalDays,
            'expected_records' => $expectedRecords,
            'actual_records' => $totalRecords,
            'hadir' => $absensi->where('status_masuk', 'hadir')->count(),
            'terlambat' => $absensi->where('status_masuk', 'terlambat')->count(),
            'izin' => $absensi->where('status_masuk', 'izin')->count(),
            'sakit' => $absensi->where('status_masuk', 'sakit')->count(),
            'alpa' => $absensi->where('status_masuk', 'alpa')->count(),
            'persentase_kehadiran' => $expectedRecords > 0
                ? round((($absensi->whereIn('status_masuk', ['hadir', 'terlambat'])->count()) / $expectedRecords) * 100, 1)
                : 0,
        ];
    }
}