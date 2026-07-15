<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\SppTagihan;
use App\Models\SppPembayaran;
use App\Models\Alumni;
use App\Models\TracerStudy;
use App\Models\Guru;
use App\Models\PerpustakaanBuku;
use App\Models\Borrowing;
use App\Models\Member;
use App\Models\SaranaPrasarana;
use App\Models\CalonSiswa;
use App\Models\Prestasi;
use App\Models\Dispensasi;
use App\Models\Kelas;
use App\Models\Jurusan;

class LaporanController extends Controller
{
    public function index()
    {
        $reports = [
            ['id' => 'siswa', 'label' => 'Laporan Siswa', 'desc' => 'Data siswa aktif per kelas & jurusan', 'icon' => 'Users', 'count' => Siswa::count(), 'route' => 'laporan.siswa'],
            ['id' => 'spp', 'label' => 'Laporan Keuangan SPP', 'desc' => 'Pembayaran SPP per bulan & rekap tunggakan', 'icon' => 'CreditCard', 'count' => SppTagihan::count(), 'route' => 'laporan.spp'],
            ['id' => 'alumni', 'label' => 'Laporan Alumni', 'desc' => 'Data alumni & tracer study', 'icon' => 'GraduationCap', 'count' => Alumni::count(), 'route' => 'laporan.alumni'],
            ['id' => 'gtk', 'label' => 'Laporan GTK', 'desc' => 'Guru & tenaga kependidikan', 'icon' => 'School', 'count' => Guru::count(), 'route' => 'laporan.gtk'],
            ['id' => 'perpustakaan', 'label' => 'Laporan Perpustakaan', 'desc' => 'Stok buku & peminjaman', 'icon' => 'BookOpen', 'count' => PerpustakaanBuku::count(), 'route' => 'laporan.perpustakaan'],
            ['id' => 'sarana', 'label' => 'Laporan Sarana Prasarana', 'desc' => 'Inventaris sarana & prasarana sekolah', 'icon' => 'Building', 'count' => SaranaPrasarana::count(), 'route' => 'laporan.sarana'],
            ['id' => 'spmb', 'label' => 'Laporan SPMB / PPDB', 'desc' => 'Pendaftar, seleksi & hasil penerimaan', 'icon' => 'UserPlus', 'count' => CalonSiswa::count(), 'route' => 'laporan.spmb'],
            ['id' => 'prestasi', 'label' => 'Laporan Prestasi', 'desc' => 'Prestasi akademik & non-akademik siswa', 'icon' => 'Trophy', 'count' => Prestasi::count(), 'route' => 'laporan.prestasi'],
            ['id' => 'dispensasi', 'label' => 'Laporan Dispensasi', 'desc' => 'Dispensasi SPP & pembayaran', 'icon' => 'Percent', 'count' => Dispensasi::count(), 'route' => 'laporan.dispensasi'],
            ['id' => 'erapor', 'label' => 'Laporan e-Rapor', 'desc' => 'Nilai rapor, capaian & statistik', 'icon' => 'FileText', 'count' => \App\Models\RaporSiswa::count(), 'route' => 'laporan.erapor'],
        ];
        return Inertia::render('Admin/Laporan/Index', ['reports' => $reports]);
    }

    private function applyFilters($query, Request $request)
    {
        $periode = $request->get('periode', 'tahun');
        $tahun = $request->get('tahun', date('Y'));

        if ($periode === 'tahun' && $tahun) {
            $query->whereYear('created_at', $tahun);
        }

        return $query;
    }

    public function gtk(Request $request)
    {
        try {
            $search = $request->get('search', '');
            $query = Guru::query();
            $query = $this->applyFilters($query, $request);
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nama_lengkap', 'like', "%{$search}%")
                      ->orWhere('nuptk', 'like', "%{$search}%");
                });
            }
            $gtk = $query->orderBy('nama_lengkap')->paginate(20)->withQueryString();
            return Inertia::render('Admin/Laporan/Gtk', [
                'gtk' => $gtk,
                'filters' => [
                    'periode' => $request->get('periode', 'tahun'),
                    'tahun' => (int) $request->get('tahun', date('Y')),
                    'semester' => (int) $request->get('semester', 1),
                    'search' => $search,
                ],
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Gtk', ['error' => 'Data GTK belum tersedia.']);
        }
    }

    public function siswa(Request $request)
    {
        try {
            $search = $request->get('search', '');
            $query = Siswa::query();
            $query = $this->applyFilters($query, $request);
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nama_lengkap', 'like', "%{$search}%")
                      ->orWhere('nisn', 'like', "%{$search}%")
                      ->orWhere('nis', 'like', "%{$search}%");
                });
            }
            $siswa = $query->orderBy('nama_lengkap')->paginate(20)->withQueryString();
            return Inertia::render('Admin/Laporan/Siswa', [
                'siswa' => $siswa,
                'filters' => [
                    'periode' => $request->get('periode', 'tahun'),
                    'tahun' => (int) $request->get('tahun', date('Y')),
                    'search' => $search,
                ],
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Siswa', ['error' => 'Data Siswa belum tersedia.']);
        }
    }

    public function spp(Request $request)
    {
        try {
            $tahun = $request->get('tahun', date('Y'));
            $search = $request->get('search', '');
            $query = SppTagihan::query()->whereYear('periode', $tahun);
            if ($search) {
                $query->whereHas('siswa', function ($qs) use ($search) {
                    $qs->where('nama_lengkap', 'like', "%{$search}%");
                });
            }
            $tagihan = $query->with('siswa')->paginate(20)->withQueryString();
            $rekap = SppTagihan::selectRaw("MONTH(periode) as bulan, COUNT(*) as total_tagihan, SUM(CASE WHEN status = 'lunas' THEN 1 ELSE 0 END) as lunas")
                ->whereYear('periode', $tahun)
                ->groupByRaw('MONTH(periode)')
                ->get();
            return Inertia::render('Admin/Laporan/Spp', [
                'tagihan' => $tagihan,
                'rekapBulanan' => $rekap,
                'tahun' => $tahun,
                'filters' => [
                    'periode' => $request->get('periode', 'tahun'),
                    'tahun' => (int) $tahun,
                    'search' => $search,
                ],
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Spp', ['error' => 'Data SPP belum tersedia.', 'tahun' => date('Y')]);
        }
    }

    public function alumni(Request $request)
    {
        try {
            $search = $request->get('search', '');
            $query = Alumni::query();
            if ($request->get('tahun')) {
                $query->where('tahun_lulus', $request->get('tahun'));
            }
            if ($search) {
                $query->where('nama_lengkap', 'like', "%{$search}%");
            }
            $alumni = $query->orderBy('tahun_lulus', 'desc')->paginate(20)->withQueryString();
            return Inertia::render('Admin/Laporan/Alumni', [
                'alumni' => $alumni,
                'filters' => [
                    'periode' => $request->get('periode', 'tahun'),
                    'tahun' => (int) $request->get('tahun', date('Y')),
                    'search' => $search,
                ],
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Alumni', ['error' => 'Data Alumni belum tersedia.']);
        }
    }

    public function prestasi(Request $request)
    {
        try {
            $search = $request->get('search', '');
            $tahun = $request->get('tahun');
            $query = Prestasi::query();
            if ($tahun) {
                $query->whereYear('tanggal', $tahun);
            }
            if ($request->get('jenis')) {
                $query->where('jenis', $request->get('jenis'));
            }
            if ($request->get('tingkat')) {
                $query->where('tingkat', 'like', '%' . $request->get('tingkat') . '%');
            }
            if ($search) {
                $query->where('prestasi', 'like', '%' . $search . '%');
            }
            $prestasi = $query->with('siswa')->orderBy('tanggal', 'desc')->paginate(20)->withQueryString();

            $byTingkat = Prestasi::selectRaw('tingkat, COUNT(*) as total')
                ->when($tahun, function ($q) use ($tahun) {
                    $q->whereYear('tanggal', $tahun);
                })
                ->groupBy('tingkat')
                ->pluck('total', 'tingkat')
                ->toArray();
            $byJenis = Prestasi::selectRaw('jenis, COUNT(*) as total')
                ->when($tahun, function ($q) use ($tahun) {
                    $q->whereYear('tanggal', $tahun);
                })
                ->groupBy('jenis')
                ->pluck('total', 'jenis')
                ->toArray();

            return Inertia::render('Admin/Laporan/Prestasi', [
                'prestasi' => $prestasi,
                'byTingkat' => $byTingkat,
                'byJenis' => $byJenis,
                'filters' => [
                    'periode' => $request->get('periode', 'tahun'),
                    'tahun' => (int) $request->get('tahun', date('Y')),
                    'search' => $search,
                ],
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Prestasi', ['error' => 'Data Prestasi belum tersedia.']);
        }
    }

    public function dispensasi(Request $request)
    {
        try {
            $search = $request->get('search', '');
            $tahun = $request->get('tahun');
            $query = Dispensasi::query();
            if ($tahun) {
                $query->whereYear('created_at', $tahun);
            }
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('jenis', 'like', '%' . $search . '%')
                      ->orWhereHas('siswa', function ($qs) use ($search) {
                          $qs->where('nama_lengkap', 'like', '%' . $search . '%');
                      });
                });
            }
            $dispensasi = $query->with('siswa')->orderBy('created_at', 'desc')->paginate(20)->withQueryString();

            $byJenis = Dispensasi::selectRaw('jenis, COUNT(*) as total, COALESCE(SUM(nominal), 0) as total_nominal')
                ->when($tahun, function ($q) use ($tahun) {
                    $q->whereYear('created_at', $tahun);
                })
                ->groupBy('jenis')
                ->get()
                ->map(function ($r) {
                    return ['jenis' => $r->jenis, 'total' => $r->total, 'total_nominal' => $r->total_nominal];
                })
                ->toArray();

            return Inertia::render('Admin/Laporan/Dispensasi', [
                'dispensasi' => $dispensasi,
                'byJenis' => $byJenis,
                'filters' => [
                    'periode' => $request->get('periode', 'tahun'),
                    'tahun' => (int) $request->get('tahun', date('Y')),
                    'search' => $search,
                ],
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Dispensasi', ['error' => 'Data Dispensasi belum tersedia.']);
        }
    }

    /**
     * Laporan Perpustakaan.
     */
    public function perpustakaan(Request $request)
    {
        try {
            $buku = PerpustakaanBuku::orderBy('judul')
                ->paginate(20)
                ->withQueryString();

            $totalBuku = PerpustakaanBuku::sum('jumlah_stok');
            $totalJudul = PerpustakaanBuku::count();
            $peminjamanAktif = Borrowing::whereNull('tanggal_kembali')->count();
            $anggotaAktif = Member::where('status', 'aktif')->count();

            $byKategori = PerpustakaanBuku::selectRaw('kategori, COUNT(*) as total, SUM(jumlah_stok) as stok')
                ->whereNotNull('kategori')
                ->groupBy('kategori')
                ->get();

            return Inertia::render('Admin/Laporan/Perpustakaan', [
                'buku' => $buku,
                'totalBuku' => $totalBuku,
                'totalJudul' => $totalJudul,
                'peminjamanAktif' => $peminjamanAktif,
                'anggotaAktif' => $anggotaAktif,
                'byKategori' => $byKategori,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Perpustakaan', ['error' => 'Data Perpustakaan belum tersedia.']);
        }
    }

    /**
     * Laporan Sarana Prasarana.
     */
    public function sarana(Request $request)
    {
        try {
            $sarana = SaranaPrasarana::orderBy('nama_barang')
                ->paginate(20)
                ->withQueryString();

            $byKategori = SaranaPrasarana::selectRaw('kategori, COUNT(*) as total')
                ->whereNotNull('kategori')
                ->groupBy('kategori')
                ->get();

            $totalAset = SaranaPrasarana::sum('jumlah');

            return Inertia::render('Admin/Laporan/Sarana', [
                'sarana' => $sarana,
                'byKategori' => $byKategori,
                'totalAset' => $totalAset,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Sarana', ['error' => 'Data Sarana Prasarana belum tersedia.']);
        }
    }

    /**
     * Laporan SPMB / PPDB.
     */
    public function spmb(Request $request)
    {
        try {
            $pendaftar = CalonSiswa::orderBy('created_at', 'desc')
                ->paginate(20)
                ->withQueryString();

            $byStatus = CalonSiswa::selectRaw('status, COUNT(*) as total')
                ->groupBy('status')
                ->pluck('total', 'status');

            $byGelombang = CalonSiswa::selectRaw('gelombang_id, COUNT(*) as total')
                ->whereNotNull('gelombang_id')
                ->groupBy('gelombang_id')
                ->with('gelombang:id,nama')
                ->get()
                ->map(fn($item) => ['gelombang' => $item->gelombang?->nama ?? '-', 'total' => $item->total]);

            $byJurusan = CalonSiswa::selectRaw('jurusan_id, COUNT(*) as total')
                ->whereNotNull('jurusan_id')
                ->groupBy('jurusan_id')
                ->with('jurusan:id,nama')
                ->get()
                ->map(fn($item) => ['jurusan' => $item->jurusan?->nama ?? '-', 'total' => $item->total]);

            return Inertia::render('Admin/Laporan/Spmb', [
                'pendaftar' => $pendaftar,
                'byStatus' => $byStatus,
                'byGelombang' => $byGelombang,
                'byJurusan' => $byJurusan,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Spmb', ['error' => 'Data SPMB belum tersedia.']);
        }
    }

    /**
     * Laporan e-Rapor.
     */
    public function erapor(Request $request)
    {
        try {
            $raporSiswa = \App\Models\RaporSiswa::with(['siswa', 'raporKelas'])
                ->orderBy('created_at', 'desc')
                ->paginate(20)
                ->withQueryString();

            $byKelas = \App\Models\RaporSiswa::selectRaw('rapor_kelas_id, COUNT(*) as total')
                ->whereNotNull('rapor_kelas_id')
                ->groupBy('rapor_kelas_id')
                ->with('raporKelas:id,nama')
                ->get()
                ->map(fn($item) => ['kelas' => $item->raporKelas?->nama ?? '-', 'total' => $item->total]);

            return Inertia::render('Admin/Laporan/Erapor', [
                'raporSiswa' => $raporSiswa,
                'byKelas' => $byKelas,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Admin/Laporan/Erapor', ['error' => 'Data e-Rapor belum tersedia.']);
        }
    }

    public function export($report, Request $request)
    {
        $data = $this->getReportData($report, $request);
        $schoolName = 'SMK Negeri Contoh';
        $timestamp = now()->format('d-m-Y H:i:s');
        return $this->exportExcel($report, $data, $schoolName, $timestamp);
    }

    public function print($report, Request $request)
    {
        $data = $this->getReportData($report, $request);
        return Inertia::render('Admin/Laporan/PrintView', [
            'report' => $report,
            'data' => $data,
            'schoolName' => 'SMK Negeri Contoh',
            'timestamp' => now()->format('d-m-Y H:i:s'),
        ]);
    }

    private function getReportData($report, Request $request)
    {
        $search = $request->get('search', '');
        $tahun = $request->get('tahun');

        switch ($report) {
            case 'gtk':
                $q = Guru::query();
                if ($tahun) $q->whereYear('created_at', $tahun);
                if ($search) $q->where('nama_lengkap', 'like', "%{$search}%");
                return $q->orderBy('nama_lengkap')->get();
            case 'siswa':
                $q = Siswa::query();
                if ($tahun) $q->whereYear('created_at', $tahun);
                if ($search) $q->where(function ($q2) use ($search) {
                    $q2->where('nama_lengkap', 'like', "%{$search}%")->orWhere('nisn', 'like', "%{$search}%");
                });
                return $q->orderBy('nama_lengkap')->get();
            case 'spp':
                return SppTagihan::with('siswa')->whereYear('periode', $tahun ?: date('Y'))->get();
            case 'alumni':
                $q = Alumni::query();
                if ($tahun) $q->where('tahun_lulus', $tahun);
                if ($search) $q->where('nama_lengkap', 'like', "%{$search}%");
                return $q->orderBy('tahun_lulus', 'desc')->get();
            case 'prestasi':
                $q = Prestasi::query();
                if ($tahun) $q->whereYear('tanggal', $tahun);
                if ($search) $q->where('prestasi', 'like', "%{$search}%");
                return $q->with('siswa')->orderBy('tanggal', 'desc')->get();
            case 'dispensasi':
                $q = Dispensasi::query();
                if ($tahun) $q->whereYear('created_at', $tahun);
                return $q->with('siswa')->orderBy('created_at', 'desc')->get();
            case 'perpustakaan':
                $q = PerpustakaanBuku::query();
                if ($search) $q->where('judul', 'like', "%{$search}%");
                return $q->orderBy('judul')->get();
            case 'sarana':
                $q = SaranaPrasarana::query();
                if ($search) $q->where('nama_barang', 'like', "%{$search}%");
                return $q->orderBy('nama_barang')->get();
            case 'spmb':
                $q = CalonSiswa::query();
                if ($tahun) $q->whereYear('created_at', $tahun);
                if ($search) $q->where(function ($q2) use ($search) {
                    $q2->where('nama_lengkap', 'like', "%{$search}%")->orWhere('nisn', 'like', "%{$search}%");
                });
                return $q->with('gelombang', 'jurusan')->orderBy('created_at', 'desc')->get();
            case 'erapor':
                $q = \App\Models\RaporSiswa::query();
                if ($tahun) $q->whereYear('created_at', $tahun);
                if ($search) $q->whereHas('siswa', fn($q2) => $q2->where('nama_lengkap', 'like', "%{$search}%"));
                return $q->with('siswa', 'raporKelas')->orderBy('created_at', 'desc')->get();
            default:
                return collect();
        }
    }

    private function exportExcel($report, $data, $schoolName, $timestamp)
    {
        $filename = "Laporan_{$report}_" . date('Ymd_His') . '.csv';
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        $output = fopen('php://output', 'w');
        fputcsv($output, [$schoolName]);
        fputcsv($output, ['Laporan ' . ucfirst($report), "Dicetak: {$timestamp}"]);
        fputcsv($output, []);
        $columns = $this->getColumnsForReport($report);
        fputcsv($output, array_values($columns));
        foreach ($data as $row) {
            $rowData = [];
            foreach ($columns as $key => $label) {
                $rowData[] = data_get($row, $key, '-');
            }
            fputcsv($output, $rowData);
        }
        fclose($output);
        exit;
    }

    private function getColumnsForReport($report): array
    {
        $columns = [
            'gtk' => ['nama_lengkap' => 'Nama', 'nuptk' => 'NUPTK', 'jenis' => 'Jenis', 'jabatan' => 'Jabatan'],
            'siswa' => ['nama_lengkap' => 'Nama', 'nisn' => 'NISN', 'status' => 'Status'],
            'spp' => ['periode' => 'Periode', 'jumlah' => 'Nominal', 'status' => 'Status'],
            'alumni' => ['nama_lengkap' => 'Nama', 'tahun_lulus' => 'Tahun Lulus'],
            'prestasi' => ['prestasi' => 'Prestasi', 'jenis' => 'Jenis', 'tingkat' => 'Tingkat', 'tanggal' => 'Tanggal'],
            'dispensasi' => ['jenis' => 'Jenis', 'nominal' => 'Nominal', 'keterangan' => 'Keterangan'],
            'perpustakaan' => ['judul' => 'Judul Buku', 'pengarang' => 'Pengarang', 'penerbit' => 'Penerbit', 'tahun_terbit' => 'Tahun', 'kategori' => 'Kategori', 'jumalah_stok' => 'Stok'],
            'sarana' => ['nama_barang' => 'Nama Barang', 'kategori' => 'Kategori', 'jumlah' => 'Jumlah', 'kondisi' => 'Kondisi', 'tahun_perolehan' => 'Tahun Perolehan'],
            'spmb' => ['nama_lengkap' => 'Nama Lengkap', 'nisn' => 'NISN', 'jenis_kelamin' => 'Jenis Kelamin', 'status' => 'Status', 'gelombang.nama' => 'Gelombang', 'jurusan.nama' => 'Jurusan'],
            'erapor' => ['siswa.nama_lengkap' => 'Nama Siswa', 'raporKelas.nama' => 'Kelas', 'rapor_mapel_id' => 'Mata Pelajaran', 'nilai_angka' => 'Nilai', 'created_at' => 'Tanggal'],
        ];
        return $columns[$report] ?? [];
    }
}
