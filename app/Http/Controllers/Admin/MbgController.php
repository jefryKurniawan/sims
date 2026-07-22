<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MbgBast;
use App\Models\MbgOrganoleptik;
use App\Models\MbgAttendance;
use App\Models\MbgConsent;
use App\Models\MbgSpecialCondition;
use App\Models\MbgStudentCondition;
use App\Models\MbgIncident;
use App\Models\MbgMeeting;
use App\Models\MbgMealMenu;
use App\Models\MbgGallery;
use App\Models\Siswa;
use App\Models\Kelas;
use App\Models\Setting;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class MbgController extends Controller
{
    // ──────────────────────────────────────────────
    // DASHBOARD
    // ──────────────────────────────────────────────
    public function index()
    {
        $today = now()->toDateString();
        $bastHariIni = MbgBast::where('tanggal', $today)->get();
        $totalSiswa = Siswa::count();
        $sudahAbsen = MbgAttendance::whereHas('bast', fn($q) => $q->where('tanggal', $today))->count();

        return Inertia::render('Admin/Mbg/Dashboard', [
            'stats' => [
                'bast_hari_ini' => $bastHariIni->count(),
                'bast_diterima' => $bastHariIni->where('status', 'diterima')->count(),
                'total_siswa' => $totalSiswa,
                'sudah_absen' => $sudahAbsen,
                'insiden_aktif' => MbgIncident::where('status', '!=', 'selesai')->count(),
            ],
            'bastHariIni' => $bastHariIni->load('creator'),
            'alerts' => MbgStudentCondition::with(['siswa', 'condition'])
                ->whereHas('siswa', fn($q) => $q->where('status', 'aktif'))
                ->get(),
        ]);
    }

    // ──────────────────────────────────────────────
    // BAST (Bukti Serah Terima)
    // ──────────────────────────────────────────────
    public function bastsIndex(Request $request)
    {
        $query = MbgBast::with('creator')->orderBy('tanggal', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('date_from')) {
            $query->where('tanggal', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->where('tanggal', '<=', $request->date_to);
        }

        return Inertia::render('Admin/Mbg/BAST/Index', [
            'basts' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['status', 'date_from', 'date_to']),
        ]);
    }

    public function bastsCreate()
    {
        return Inertia::render('Admin/Mbg/BAST/Form');
    }

    public function bastsStore(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'waktu_datang' => 'required',
            'porsi_dipesan' => 'required|integer|min:0',
            'porsi_diterima' => 'required|integer|min:0',
            'nama_kurir' => 'nullable|string|max:100',
            'catatan' => 'nullable|string',
            'status' => ['required', Rule::in(['pending', 'diterima', 'ditolak'])],
        ]);

        $validated['created_by'] = auth()->id();
        $validated['waktu_terima'] = $request->status === 'diterima' ? now()->format('H:i') : null;

        MbgBast::create($validated);

        return redirect()->route('admin.mbg.basts.index')
            ->with('flash', ['success' => 'BAST berhasil dicatat.']);
    }

    public function bastsEdit(MbgBast $bast)
    {
        return Inertia::render('Admin/Mbg/BAST/Form', [
            'bast' => $bast->load('creator'),
        ]);
    }

    public function bastsUpdate(Request $request, MbgBast $bast)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'waktu_datang' => 'required',
            'porsi_dipesan' => 'required|integer|min:0',
            'porsi_diterima' => 'required|integer|min:0',
            'nama_kurir' => 'nullable|string|max:100',
            'catatan' => 'nullable|string',
            'status' => ['required', Rule::in(['pending', 'diterima', 'ditolak'])],
        ]);

        $validated['waktu_terima'] = $request->status === 'diterima'
            ? ($bast->waktu_terima ?? now()->format('H:i'))
            : null;

        $bast->update($validated);

        return redirect()->route('admin.mbg.basts.index')
            ->with('flash', ['success' => 'BAST berhasil diperbarui.']);
    }

    public function bastsDestroy(MbgBast $bast)
    {
        $bast->delete();
        return redirect()->route('admin.mbg.basts.index')
            ->with('flash', ['success' => 'BAST berhasil dihapus.']);
    }

    // ──────────────────────────────────────────────
    // ORGANOLEPTIK
    // ──────────────────────────────────────────────
    public function organoleptikIndex(Request $request)
    {
        $query = MbgOrganoleptik::with(['bast', 'penguji'])->orderBy('created_at', 'desc');

        if ($request->filled('hasil')) {
            $query->where('hasil', $request->hasil);
        }

        return Inertia::render('Admin/Mbg/Organoleptik/Index', [
            'organoleptiks' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['hasil']),
        ]);
    }

    public function organoleptikCreate()
    {
        return Inertia::render('Admin/Mbg/Organoleptik/Form', [
            'basts' => MbgBast::whereDate('tanggal', now()->toDateString())
                ->orderBy('created_at', 'desc')
                ->get(['id', 'tanggal', 'status']),
        ]);
    }

    public function organoleptikStore(Request $request)
    {
        $validated = $request->validate([
            'bast_id' => 'required|exists:mbg_basts,id',
            'warna' => ['required', Rule::in(['baik', 'cukup', 'kurang'])],
            'aroma' => ['required', Rule::in(['baik', 'cukup', 'kurang'])],
            'rasa' => ['required', Rule::in(['baik', 'cukup', 'kurang'])],
            'suhu' => ['required', Rule::in(['baik', 'cukup', 'kurang'])],
            'tekstur' => ['required', Rule::in(['baik', 'cukup', 'kurang'])],
            'hasil' => ['required', Rule::in(['layak', 'tidak_layak'])],
            'catatan' => 'nullable|string',
        ]);

        $validated['diuji_oleh'] = auth()->id();

        MbgOrganoleptik::create($validated);

        return redirect()->route('admin.mbg.organoleptik.index')
            ->with('flash', ['success' => 'Uji organoleptik berhasil dicatat.']);
    }

    // ──────────────────────────────────────────────
    // ABSENSI MAKAN
    // ──────────────────────────────────────────────
    public function attendancesIndex(Request $request)
    {
        $query = MbgAttendance::with(['siswa', 'kelas', 'bast', 'inputter'])
            ->orderBy('created_at', 'desc');

        if ($request->filled('kelas_id')) {
            $query->where('kelas_id', $request->kelas_id);
        }
        if ($request->filled('tanggal')) {
            $query->whereHas('bast', fn($q) => $q->where('tanggal', $request->tanggal));
        }

        return Inertia::render('Admin/Mbg/Attendance/Index', [
            'attendances' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only(['kelas_id', 'tanggal']),
            'kelasList' => Kelas::orderBy('tingkat')->orderBy('nama_kelas')->get(['id', 'nama_kelas', 'tingkat']),
        ]);
    }

    public function attendancesCreate()
    {
        $todayBast = MbgBast::where('tanggal', now()->toDateString())
            ->where('status', 'diterima')
            ->latest()
            ->first();

        return Inertia::render('Admin/Mbg/Attendance/Form', [
            'bast' => $todayBast,
            'kelasList' => Kelas::orderBy('tingkat')->orderBy('nama_kelas')->get(['id', 'nama_kelas', 'tingkat']),
        ]);
    }

    public function attendancesByKelas(Request $request)
    {
        $validated = $request->validate([
            'bast_id' => 'required|exists:mbg_basts,id',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        $siswa = Siswa::whereHas('kelasSiswa', fn($q) => $q->where('kelas_id', $validated['kelas_id']))
            ->where('status', 'aktif')
            ->orderBy('nama_lengkap')
            ->get(['id', 'nama_lengkap', 'nisn']);

        $existing = MbgAttendance::where('bast_id', $validated['bast_id'])
            ->where('kelas_id', $validated['kelas_id'])
            ->pluck('status', 'siswa_id');

        return response()->json([
            'siswa' => $siswa,
            'existing' => $existing,
        ]);
    }

    public function attendancesStore(Request $request)
    {
        $validated = $request->validate([
            'bast_id' => 'required|exists:mbg_basts,id',
            'kelas_id' => 'required|exists:kelas,id',
            'attendances' => 'required|array',
            'attendances.*.siswa_id' => 'required|exists:siswa,id',
            'attendances.*.status' => ['required', Rule::in(['hadir_makan', 'tidak_hadir', 'dibawa_pulang', 'tidak_makan'])],
        ]);

        $userId = auth()->id();
        $now = now();

        $data = [];
        foreach ($validated['attendances'] as $att) {
            $data[] = [
                'bast_id' => $validated['bast_id'],
                'kelas_id' => $validated['kelas_id'],
                'siswa_id' => $att['siswa_id'],
                'status' => $att['status'],
                'diinput_oleh' => $userId,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('mbg_attendances')->upsert($data, ['bast_id', 'siswa_id'], ['status', 'updated_at']);

        return redirect()->route('admin.mbg.attendances.index')
            ->with('flash', ['success' => 'Absensi makan berhasil disimpan.']);
    }

    // ──────────────────────────────────────────────
    // PERSETUJUAN ORANG TUA
    // ──────────────────────────────────────────────
    public function consentsIndex(Request $request)
    {
        $query = MbgConsent::with('siswa')->orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/Mbg/Consent/Index', [
            'consents' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['status']),
        ]);
    }

    public function consentsCreate()
    {
        $existing = MbgConsent::pluck('siswa_id')->toArray();

        return Inertia::render('Admin/Mbg/Consent/Form', [
            'siswa' => Siswa::whereNotIn('id', $existing)
                ->where('status', 'aktif')
                ->orderBy('nama_lengkap')
                ->get(['id', 'nama_lengkap', 'nisn']),
        ]);
    }

    public function consentsStore(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id|unique:mbg_consents,siswa_id',
            'status' => ['required', Rule::in(['menunggu', 'setuju', 'tolak'])],
            'catatan_ortu' => 'nullable|string',
        ]);

        if ($validated['status'] === 'setuju') {
            $validated['tanggal_persetujuan'] = now();
        }

        MbgConsent::create($validated);

        return redirect()->route('admin.mbg.consents.index')
            ->with('flash', ['success' => 'Persetujuan berhasil dicatat.']);
    }

    // ──────────────────────────────────────────────
    // KONDISI KHUSUS
    // ──────────────────────────────────────────────
    public function specialConditionsIndex()
    {
        return Inertia::render('Admin/Mbg/SpecialCondition/Index', [
            'conditions' => MbgSpecialCondition::orderBy('kategori')->orderBy('nama')->paginate(20),
        ]);
    }

    public function specialConditionsStore(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'kategori' => ['required', Rule::in(['alergi', 'intoleransi', 'pantangan', 'vegetarian'])],
            'deskripsi' => 'nullable|string',
        ]);

        MbgSpecialCondition::create($validated);

        return redirect()->route('admin.mbg.special-conditions.index')
            ->with('flash', ['success' => 'Kondisi khusus berhasil ditambahkan.']);
    }

    public function specialConditionsUpdate(Request $request, MbgSpecialCondition $condition)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'kategori' => ['required', Rule::in(['alergi', 'intoleransi', 'pantangan', 'vegetarian'])],
            'deskripsi' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $condition->update($validated);

        return redirect()->route('admin.mbg.special-conditions.index')
            ->with('flash', ['success' => 'Kondisi khusus berhasil diperbarui.']);
    }

    // ──────────────────────────────────────────────
    // INSIDEN
    // ──────────────────────────────────────────────
    public function incidentsIndex(Request $request)
    {
        $query = MbgIncident::with(['pelapor', 'penangan'])->orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        return Inertia::render('Admin/Mbg/Incident/Index', [
            'incidents' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['status', 'kategori']),
        ]);
    }

    public function incidentsCreate()
    {
        return Inertia::render('Admin/Mbg/Incident/Form');
    }

    public function incidentsStore(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'kategori' => ['required', Rule::in(['keracunan', 'keterlambatan', 'penolakan_massal', 'kerusakan', 'lainnya'])],
            'deskripsi' => 'required|string',
            'severity' => ['required', Rule::in(['ringan', 'sedang', 'berat'])],
        ]);

        $validated['dilapor_oleh'] = auth()->id();

        MbgIncident::create($validated);

        return redirect()->route('admin.mbg.incidents.index')
            ->with('flash', ['success' => 'Insiden berhasil dilaporkan.']);
    }

    public function incidentsUpdate(Request $request, MbgIncident $incident)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['terlapor', 'ditangani', 'selesai'])],
            'tindak_lanjut' => 'nullable|string',
        ]);

        $validated['ditangani_oleh'] = auth()->id();

        $incident->update($validated);

        return redirect()->route('admin.mbg.incidents.index')
            ->with('flash', ['success' => 'Status insiden berhasil diperbarui.']);
    }

    // ──────────────────────────────────────────────
    // MEETING (NOTULENSI)
    // ──────────────────────────────────────────────
    public function meetingsIndex()
    {
        return Inertia::render('Admin/Mbg/Meeting/Index', [
            'meetings' => MbgMeeting::with('creator')->orderBy('tanggal_rapat', 'desc')->paginate(15),
        ]);
    }

    public function meetingsCreate()
    {
        return Inertia::render('Admin/Mbg/Meeting/Form');
    }

    public function meetingsStore(Request $request)
    {
        $validated = $request->validate([
            'tanggal_rapat' => 'required|date',
            'tempat' => 'nullable|string|max:100',
            'agenda' => 'required|string',
            'notulensi' => 'nullable|string',
            'kesimpulan' => 'nullable|string',
        ]);

        $validated['dibuat_oleh'] = auth()->id();

        MbgMeeting::create($validated);

        return redirect()->route('admin.mbg.meetings.index')
            ->with('flash', ['success' => 'Notulensi rapat berhasil disimpan.']);
    }

    // ──────────────────────────────────────────────
    // LAPORAN
    // ──────────────────────────────────────────────
    public function reportsIndex()
    {
        $bulan = request('bulan', now()->month);
        $tahun = request('tahun', now()->year);

        $basts = MbgBast::whereYear('tanggal', $tahun)
            ->whereMonth('tanggal', $bulan)
            ->get();

        $totalPorsiDipesan = $basts->sum('porsi_dipesan');
        $totalPorsiDiterima = $basts->sum('porsi_diterima');
        $totalInsiden = MbgIncident::whereYear('tanggal', $tahun)
            ->whereMonth('tanggal', $bulan)
            ->count();

        return Inertia::render('Admin/Mbg/Reports/Index', [
            'bulan' => (int) $bulan,
            'tahun' => (int) $tahun,
            'stats' => [
                'total_bast' => $basts->count(),
                'total_porsi_dipesan' => $totalPorsiDipesan,
                'total_porsi_diterima' => $totalPorsiDiterima,
                'total_insiden' => $totalInsiden,
                'rata_harian' => $basts->count() > 0
                    ? round($totalPorsiDiterima / $basts->count(), 0)
                    : 0,
            ],
            'bastsPerHari' => $basts->groupBy('tanggal')->map(fn($items, $date) => [
                'tanggal' => $date,
                'total_porsi' => $items->sum('porsi_diterima'),
                'status' => $items->first()->status,
            ])->values(),
        ]);
    }

    // ──────────────────────────────────────────────
    // CETAK PDF (SAMPLE)
    // ──────────────────────────────────────────────
    public function printReport(Request $request)
    {
        $bulan = $request->bulan ?? now()->month;
        $tahun = $request->tahun ?? now()->year;

        $setting = Setting::first();
        $sekolah = $setting?->nama_sekolah ?? 'SMA Negeri 1 Contoh';
        $alamat = $setting?->alamat ?? 'Jl. Pendidikan No. 1';

        $basts = MbgBast::with('creator')
            ->whereYear('tanggal', $tahun)
            ->whereMonth('tanggal', $bulan)
            ->orderBy('tanggal')
            ->get();


        return PdfService::stream("print.mbg-report", compact("bulan", "tahun", "basts", "sekolah", "alamat"), "laporan-mbg-${bulan}-${tahun}.pdf", ["format" => "A4-L"]);
    }

    // ──────────────────────────────────────────────
    // GALERI
    // ──────────────────────────────────────────────
    public function galleriesIndex()
    {
        return Inertia::render('Admin/Mbg/Gallery/Index', [
            'galleries' => MbgGallery::with('uploader')
                ->orderBy('tanggal_kegiatan', 'desc')
                ->paginate(20),
        ]);
    }

    public function galleriesStore(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:200',
            'file_path' => 'required|string|max:255',
            'kategori' => ['required', Rule::in(['serah_terima', 'uji_kelayakan', 'suasana_makan', 'dokumentasi'])],
            'tanggal_kegiatan' => 'required|date',
            'deskripsi' => 'nullable|string',
        ]);

        $validated['diupload_oleh'] = auth()->id();

        MbgGallery::create($validated);

        return redirect()->route('admin.mbg.galleries.index')
            ->with('flash', ['success' => 'Dokumentasi berhasil ditambahkan.']);
    }
}
