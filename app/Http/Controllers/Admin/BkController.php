<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pelanggaran;
use App\Models\Konseling;
use App\Models\Prestasi;
use App\Models\Siswa;
use App\Models\Guru;
use App\Models\User;
use App\Models\SuratRekomendasi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class BkController extends Controller
{
    // ──────────────────────────────────────────────
    // Dashboard BK
    // ──────────────────────────────────────────────
    public function index()
    {
        $totalPelanggaranAktif = Pelanggaran::aktif()->count();
        $totalKonselingTerbuka = Konseling::where('status', 'terbuka')->count();
        $totalPrestasi = Prestasi::count();
        $siswaPoinTertinggi = Siswa::where('poin_total', '>', 0)
            ->orderBy('poin_total', 'desc')
            ->take(10)
            ->get(['id', 'nama_lengkap', 'nisn', 'poin_total']);

        return Inertia::render('Admin/Bk/Dashboard', [
            'stats' => [
                'pelanggaran_aktif' => $totalPelanggaranAktif,
                'konseling_terbuka' => $totalKonselingTerbuka,
                'total_prestasi' => $totalPrestasi,
            ],
            'siswaPoinTertinggi' => $siswaPoinTertinggi,
        ]);
    }

    // ──────────────────────────────────────────────
    // Pelanggaran CRUD
    // ──────────────────────────────────────────────
    public function pelanggaranIndex(Request $request)
    {
        $query = Pelanggaran::with(['siswa', 'pelapor'])
            ->orderBy('created_at', 'desc');

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }
        if ($request->filled('status_filter')) {
            $query->where('status', $request->status_filter);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('siswa', fn($q) => $q->where('nama_lengkap', 'like', "%{$search}%"));
        }

        return Inertia::render('Admin/Bk/Pelanggaran/Index', [
            'pelanggaran' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['kategori', 'status_filter', 'search']),
        ]);
    }

    public function pelanggaranCreate()
    {
        return Inertia::render('Admin/Bk/Pelanggaran/Form', [
            'siswa' => Siswa::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']),
        ]);
    }

    public function pelanggaranStore(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'kategori' => ['required', Rule::in(['ringan', 'sedang', 'berat'])],
            'poin' => 'required|integer|min:0|max:200',
            'deskripsi' => 'required|string|max:500',
            'tanggal' => 'required|date',
            'bukti_file' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
            'semester' => 'nullable|string|max:20',
        ]);

        $validated['pelapor_id'] = auth()->id();
        $validated['status'] = 'aktif';

        if ($request->hasFile('bukti_file')) {
            $validated['bukti_file'] = $request->file('bukti_file')->store('pelanggaran-bukti', 'public');
        }

        Pelanggaran::create($validated);

        return redirect()->route('bk.pelanggaran.index')
            ->with('success', 'Pelanggaran berhasil dicatat.');
    }

    public function pelanggaranEdit(Pelanggaran $pelanggaran)
    {
        $pelanggaran->load('siswa');
        return Inertia::render('Admin/Bk/Pelanggaran/Form', [
            'pelanggaran' => $pelanggaran,
            'siswa' => Siswa::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']),
        ]);
    }

    public function pelanggaranUpdate(Request $request, Pelanggaran $pelanggaran)
    {
        $validated = $request->validate([
            'kategori' => ['required', Rule::in(['ringan', 'sedang', 'berat'])],
            'poin' => 'required|integer|min:0|max:200',
            'deskripsi' => 'required|string|max:500',
            'tanggal' => 'required|date',
            'status' => ['required', Rule::in(['aktif', 'ditindaklanjuti', 'selesai'])],
            'bukti_file' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
            'semester' => 'nullable|string|max:20',
        ]);

        if ($request->hasFile('bukti_file')) {
            $validated['bukti_file'] = $request->file('bukti_file')->store('pelanggaran-bukti', 'public');
        }

        $pelanggaran->update($validated);

        return redirect()->route('bk.pelanggaran.index')
            ->with('success', 'Pelanggaran berhasil diperbarui.');
    }

    public function pelanggaranDestroy(Pelanggaran $pelanggaran)
    {
        $pelanggaran->delete();
        return redirect()->route('bk.pelanggaran.index')
            ->with('success', 'Pelanggaran berhasil dihapus.');
    }

    // ──────────────────────────────────────────────
    // Prestasi (dengan kategori baru)
    // ──────────────────────────────────────────────
    public function prestasiIndex(Request $request)
    {
        $query = Prestasi::with('siswa')->orderBy('created_at', 'desc');

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }
        if ($request->filled('tingkat')) {
            $query->where('tingkat', $request->tingkat);
        }
        if ($request->filled('verified')) {
            $query->where('verified_by_bk', $request->verified === 'true');
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('prestasi', 'like', "%{$search}%")
                  ->orWhereHas('siswa', fn($sq) => $sq->where('nama_lengkap', 'like', "%{$search}%"));
            });
        }

        return Inertia::render('Admin/Bk/Prestasi/Index', [
            'prestasi' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['kategori', 'tingkat', 'verified', 'search']),
        ]);
    }

    public function prestasiCreate()
    {
        return Inertia::render('Admin/Bk/Prestasi/Form', [
            'siswa' => Siswa::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']),
        ]);
    }

    public function prestasiStore(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'kategori' => ['required', Rule::in(['akademik', 'non-akademik', 'olahraga', 'seni'])],
            'prestasi' => 'required|string|max:255',
            'tingkat' => ['required', Rule::in(['sekolah', 'kabupaten', 'provinsi', 'nasional', 'internasional'])],
            'tanggal' => 'required|date',
            'bukti' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
            'keterangan' => 'nullable|string|max:500',
            'poin_prestasi' => 'nullable|integer|min:0|max:500',
            'verified_by_bk' => 'nullable|boolean',
        ]);

        // Set jenis based on kategori for backward compat
        $validated['jenis'] = in_array($validated['kategori'], ['akademik', 'non-akademik'])
            ? $validated['kategori']
            : 'nonakademik';

        if ($request->hasFile('bukti')) {
            $validated['bukti'] = $request->file('bukti')->store('prestasi-bukti', 'public');
        }

        if ($request->filled('verified_by_bk') && $validated['verified_by_bk']) {
            $validated['verified_by'] = auth()->id();
        }

        Prestasi::create($validated);

        return redirect()->route('bk.prestasi.index')
            ->with('success', 'Prestasi berhasil ditambahkan.');
    }

    public function prestasiEdit(Prestasi $prestasi)
    {
        $prestasi->load('siswa');
        return Inertia::render('Admin/Bk/Prestasi/Form', [
            'prestasi' => $prestasi,
            'siswa' => Siswa::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']),
        ]);
    }

    public function prestasiUpdate(Request $request, Prestasi $prestasi)
    {
        $validated = $request->validate([
            'kategori' => ['required', Rule::in(['akademik', 'non-akademik', 'olahraga', 'seni'])],
            'prestasi' => 'required|string|max:255',
            'tingkat' => ['required', Rule::in(['sekolah', 'kabupaten', 'provinsi', 'nasional', 'internasional'])],
            'tanggal' => 'required|date',
            'bukti' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
            'keterangan' => 'nullable|string|max:500',
            'poin_prestasi' => 'nullable|integer|min:0|max:500',
            'verified_by_bk' => 'nullable|boolean',
        ]);

        $validated['jenis'] = in_array($validated['kategori'], ['akademik', 'non-akademik'])
            ? $validated['kategori']
            : 'nonakademik';

        if ($request->hasFile('bukti')) {
            $validated['bukti'] = $request->file('bukti')->store('prestasi-bukti', 'public');
        }

        if ($request->filled('verified_by_bk') && $validated['verified_by_bk']) {
            $validated['verified_by'] = auth()->id();
        } elseif ($request->filled('verified_by_bk') && !$validated['verified_by_bk']) {
            $validated['verified_by'] = null;
        }

        $prestasi->update($validated);

        return redirect()->route('bk.prestasi.index')
            ->with('success', 'Prestasi berhasil diperbarui.');
    }

    public function prestasiDestroy(Prestasi $prestasi)
    {
        $prestasi->delete();
        return redirect()->route('bk.prestasi.index')
            ->with('success', 'Prestasi berhasil dihapus.');
    }

    // ──────────────────────────────────────────────
    // Konseling CRUD
    // ──────────────────────────────────────────────
    public function konselingIndex(Request $request)
    {
        $query = Konseling::with(['siswa', 'guruBk'])
            ->orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('topik', 'like', "%{$search}%")
                  ->orWhereHas('siswa', fn($sq) => $sq->where('nama_lengkap', 'like', "%{$search}%"));
            });
        }

        return Inertia::render('Admin/Bk/Konseling/Index', [
            'konseling' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function konselingCreate()
    {
        return Inertia::render('Admin/Bk/Konseling/Form', [
            'siswa' => Siswa::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']),
            'guruBk' => Guru::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nuptk']),
        ]);
    }

    public function konselingStore(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'guru_bk_id' => 'nullable|exists:guru,id',
            'tanggal' => 'required|date',
            'topik' => 'required|string|max:255',
            'catatan' => 'nullable|string|max:2000',
            'tindak_lanjut' => 'nullable|string|max:2000',
        ]);

        $validated['status'] = 'terbuka';

        Konseling::create($validated);

        return redirect()->route('bk.konseling.index')
            ->with('success', 'Konseling berhasil dicatat.');
    }

    public function konselingEdit(Konseling $konseling)
    {
        $konseling->load(['siswa', 'guruBk']);
        return Inertia::render('Admin/Bk/Konseling/Form', [
            'konseling' => $konseling,
            'siswa' => Siswa::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']),
            'guruBk' => Guru::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nuptk']),
        ]);
    }

    public function konselingUpdate(Request $request, Konseling $konseling)
    {
        $validated = $request->validate([
            'guru_bk_id' => 'nullable|exists:guru,id',
            'tanggal' => 'required|date',
            'topik' => 'required|string|max:255',
            'catatan' => 'nullable|string|max:2000',
            'tindak_lanjut' => 'nullable|string|max:2000',
            'status' => ['required', Rule::in(['terbuka', 'selesai', 'rujukan'])],
        ]);

        $konseling->update($validated);

        return redirect()->route('bk.konseling.index')
            ->with('success', 'Konseling berhasil diperbarui.');
    }

    public function konselingDestroy(Konseling $konseling)
    {
        $konseling->delete();
        return redirect()->route('bk.konseling.index')
            ->with('success', 'Konseling berhasil dihapus.');
    }

    // ──────────────────────────────────────────────
    // Surat Rekomendasi / Panggilan Ortu / Pernyataan
    // ──────────────────────────────────────────────
    public function suratIndex(Request $request)
    {
        $query = SuratRekomendasi::with(['siswa', 'pembuat', 'penyetuju'])
            ->orderBy('created_at', 'desc');

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('siswa', fn($q) => $q->where('nama_lengkap', 'like', "%{$search}%"));
        }

        return Inertia::render('Admin/Bk/Surat/Index', [
            'surat' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['jenis', 'status', 'search']),
        ]);
    }

    public function suratCreate()
    {
        return Inertia::render('Admin/Bk/Surat/Form', [
            'siswa' => Siswa::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']),
        ]);
    }

    public function suratStore(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'jenis' => ['required', Rule::in(['panggilan_ortu', 'pernyataan', 'rekomendasi_pkl', 'rekomendasi_kuliah', 'lainnya'])],
            'isi_surat' => 'nullable|string',
            'tanggal_surat' => 'nullable|date',
            'catatan' => 'nullable|string|max:500',
        ]);

        $validated['dibuat_oleh'] = auth()->id();
        $validated['status'] = 'draft';

        SuratRekomendasi::create($validated);

        return redirect()->route('bk.surat.index')
            ->with('success', 'Surat berhasil dibuat.');
    }

    public function suratShow(SuratRekomendasi $surat)
    {
        $surat->load(['siswa', 'pembuat', 'penyetuju']);
        return Inertia::render('Admin/Bk/Surat/Show', [
            'surat' => $surat,
        ]);
    }

    public function suratEdit(SuratRekomendasi $surat)
    {
        $surat->load('siswa');
        return Inertia::render('Admin/Bk/Surat/Form', [
            'surat' => $surat,
            'siswa' => Siswa::orderBy('nama_lengkap')->get(['id', 'nama_lengkap', 'nisn']),
        ]);
    }

    public function suratUpdate(Request $request, SuratRekomendasi $surat)
    {
        $validated = $request->validate([
            'jenis' => ['required', Rule::in(['panggilan_ortu', 'pernyataan', 'rekomendasi_pkl', 'rekomendasi_kuliah', 'lainnya'])],
            'isi_surat' => 'nullable|string',
            'tanggal_surat' => 'nullable|date',
            'status' => ['required', Rule::in(['draft', 'diajukan', 'disetujui', 'ditolak'])],
            'catatan' => 'nullable|string|max:500',
        ]);

        if ($request->filled('status') && $validated['status'] === 'disetujui') {
            $validated['disetujui_oleh'] = auth()->id();
        }

        $surat->update($validated);

        return redirect()->route('bk.surat.index')
            ->with('success', 'Surat berhasil diperbarui.');
    }

    public function suratDestroy(SuratRekomendasi $surat)
    {
        $surat->delete();
        return redirect()->route('bk.surat.index')
            ->with('success', 'Surat berhasil dihapus.');
    }

    public function suratCetakPdf(SuratRekomendasi $surat)
    {
        $surat->load(['siswa', 'pembuat', 'penyetuju'], 'siswa.kelasAktif.kelas', 'siswa.jurusan');

        if (!$surat->isi_surat) {
            $surat->isi_surat = $this->getDefaultSuratContent($surat->jenis, $surat->siswa);
        }

        $html = $this->generateSuratHtml($surat);

        $filename = "surat-{$surat->jenis}-{$surat->siswa->nama_lengkap}-" . date('Ymd') . ".pdf";

        return Inertia::render('Admin/Bk/Surat/Pdf', [
            'html' => $html,
            'filename' => $filename,
        ]);
    }

    private function generateSuratHtml(SuratRekomendasi $surat): string
    {
        $jenisLabels = [
            'panggilan_ortu' => 'SURAT PANGGILAN ORANG TUA/WALI',
            'pernyataan' => 'SURAT PERNYATAAN',
            'rekomendasi_pkl' => 'SURAT REKOMENDASI PKL / PRAKERIN',
            'rekomendasi_kuliah' => 'SURAT REKOMENDASI KULIAH',
            'lainnya' => 'SURAT KETERANGAN',
        ];

        $namaSekolah = config('school.nama_sekolah') ?? 'NAMA SEKOLAH';
        $alamatSekolah = config('school.alamat') ?? 'Alamat Sekolah';
        $teleponSekolah = config('school.telepon') ?? '-';
        $emailSekolah = config('school.email') ?? '-';
        $kepalaSekolah = config('school.kepala_sekolah') ?? 'Nama Kepala Sekolah';
        $nipKepalaSekolah = config('school.nip_kepala_sekolah') ?? '-';
        $logoPath = config('school.logo_url') ?? '';

        $jenisLabel = $jenisLabels[$surat->jenis] ?? 'SURAT KETERANGAN';
        $tanggalSurat = $surat->tanggal_surat ? date('d F Y', strtotime($surat->tanggal_surat)) : date('d F Y');
        $guruBkNama = $surat->pembuat?->name ?? 'Nama Guru BK';
        $guruBkNip = $surat->pembuat?->nip ?? '-';

        $html = "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 3cm 2.5cm; }
        .header { text-align: center; margin-bottom: 1.5cm; }
        .header img { max-height: 80px; margin-bottom: 0.5cm; }
        .header h3 { margin: 0.2cm 0; font-size: 14pt; font-weight: bold; }
        .header p { margin: 0.1cm 0; font-size: 10pt; }
        .title { text-align: center; font-weight: bold; text-decoration: underline; margin: 1cm 0; font-size: 13pt; }
        .nomor { text-align: center; margin-bottom: 1cm; }
        .content { text-align: justify; text-indent: 1cm; margin-bottom: 0.5cm; }
        .closing { margin-top: 2cm; }
        .ttd { float: right; width: 45%; }
        .left-col { float: left; width: 45%; }
        .clear { clear: both; }
    </style>
</head>
<body>
    <div class='header'>";

        if ($logoPath) {
            $html .= "<img src='" . asset('storage/' . $logoPath) . "' alt='Logo Sekolah'><br>";
        }

        $html .= "
        <h3>" . $namaSekolah . "</h3>
        <p>" . $alamatSekolah . "</p>
        <p>Telp: " . $teleponSekolah . " | Email: " . $emailSekolah . "</p>
    </div>

    <div class='title'>" . $jenisLabel . "</div>

    <div class='nomor'>
        Nomor: " . ($surat->no_surat ?? '-') . "/" . date('Y') . "
    </div>

    <div class='content'>
        " . $surat->isi_surat . "
    </div>

    <div class='closing'>
        <p class='content'>Demikian surat ini kami buat untuk dapat dipergunakan sebagaimana mestinya.</p>
        
        <div class='left-col'>
            <p>Hormat kami,</p>
            <p>Guru Bimbingan Konseling</p>
            <br><br><br>
            <p><u>" . $guruBkNama . "</u></p>
            <p>NIP. " . $guruBkNip . "</p>
        </div>
        
        <div class='ttd'>
            <p>" . $tanggalSurat . "</p>
            <p>Kepala Sekolah</p>
            <br><br><br>
            <p><u>" . $kepalaSekolah . "</u></p>
            <p>NIP. " . $nipKepalaSekolah . "</p>
        </div>
        
        <div class='clear'></div>
    </div>
</body>
</html>";

        return $html;
    }

    private function getDefaultSuratContent(string $jenis, $siswa): string
    {
        $nama = $siswa->nama_lengkap ?? 'Siswa';
        $ortu = $siswa->nama_ortu ?? 'Orang Tua/Wali';
        
        $contents = [
            'panggilan_ortu' => "Bahwa <strong>$nama</strong> (NISN: " . ($siswa->nisn ?? '-') . ") saat ini mengalami perkembangan perilaku/akademik yang perlu mendapat perhatian khusus dari orang tua/wali. Oleh karena itu, kami memohon kehadiran Bapak/Ibu $ortu di sekolah pada hari/tanggal yang akan ditentukan lebih lanjut untuk berdiskusi bersama guru BK/wali kelas demi penanganan yang tepat.",
            'pernyataan' => "Bahwa <strong>$nama</strong> (NISN: " . ($siswa->nisn ?? '-') . ") benar-benar siswa dari sekolah ini dan bersedia menunaikan kewajiban serta mematuhi peraturan yang berlaku di sekolah. Surat pernyataan ini dibuat untuk keperluan administrasi.",
            'rekomendasi_pkl' => "Bahwa <strong>$nama</strong> (NISN: " . ($siswa->nisn ?? '-') . ") adalah siswa kelas " . ($siswa->kelasAktif?->kelas?->nama_kelas ?? '-') . " jurusan " . ($siswa->jurusan?->nama ?? '-') . " yang bermaksud melaksanakan Praktik Kerja Lapangan (PKL) / Praktik Kerja Industri (PRAKERIN). Sekolah memberikan rekomendasi dan dukungan penuh agar siswa dapat melaksanakan PKL dengan baik di instansi/perusahaan yang bersangkutan.",
            'rekomendasi_kuliah' => "Bahwa <strong>$nama</strong> (NISN: " . ($siswa->nisn ?? '-') . ") adalah siswa kelas 12 jurusan " . ($siswa->jurusan?->nama ?? '-') . " Tahun Ajaran " . date('Y') . "/" . (date('Y')+1) . " yang bermaksud melanjutkan pendidikan ke jenjang perguruan tinggi. Berdasarkan prestasi akademik dan non-akademik selama bersekolah, sekolah memberikan rekomendasi untuk diterima di perguruan tinggi yang bersangkutan.",
            'lainnya' => "Surat ini dibuat atas permintaan yang bersangkutan untuk keperluan administrasi.",
        ];
        
        return $contents[$jenis] ?? $contents['lainnya'];
    }
}
