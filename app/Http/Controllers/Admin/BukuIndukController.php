<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BukuIndukProfilRequest;
use App\Http\Requests\MutasiSiswaRequest;
use App\Http\Requests\OrangTuaDetailRequest;
use App\Http\Requests\RekamMedisRequest;
use App\Models\BukuIndukSiswa;
use App\Models\Kelas;
use App\Models\MutasiSiswa;
use App\Models\OrangTuaDetail;
use App\Models\RekamMedisSiswa;
use App\Models\Siswa;
use App\Models\ProfileSekolah;
use App\Models\Setting;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BukuIndukController extends Controller
{
    /**
     * Landing: list siswa + status kelengkapan buku induk.
     */
    public function index(Request $request)
    {
        $query = Siswa::query()->with(['bukuInduk', 'rekamMedis', 'orangTuaDetails', 'mutasis', 'kelasAktif.kelas']);

        if ($request->filled('search')) {
            $q = $request->search;
            $query->where(function ($sub) use ($q) {
                $sub->where('nama_lengkap', 'like', "%{$q}%")
                    ->orWhere('nis', 'like', "%{$q}%")
                    ->orWhere('nisn', 'like', "%{$q}%");
            });
        }

        if ($request->filled('tingkat')) {
            $query->whereHas('kelasAktif.kelas', function ($q) use ($request) {
                $q->where('tingkat', $request->tingkat);
            });
        }

        $siswa = $query->orderBy('nama_lengkap')->paginate(15)->withQueryString();

        $tingkatList = Kelas::select('tingkat')->distinct()->orderBy('tingkat')->pluck('tingkat');

        return Inertia::render('Admin/BukuInduk/Index', [
            'siswa' => $siswa,
            'filters' => $request->only(['search', 'tingkat']),
            'tingkatList' => $tingkatList,
        ]);
    }

    /**
     * Show buku induk untuk 1 siswa (4 tab).
     */
    public function show(Siswa $siswa)
    {
        $siswa->load([
            'bukuInduk',
            'rekamMedis',
            'orangTuaDetails',
            'mutasis.pencatat',
            'jurusan',
        ]);

        $bukuInduk = $siswa->bukuInduk ?? new BukuIndukSiswa(['siswa_id' => $siswa->id]);
        $rekamMedis = $siswa->rekamMedis ?? new RekamMedisSiswa(['siswa_id' => $siswa->id]);

        return Inertia::render('Admin/BukuInduk/Show', [
            'siswa' => $siswa,
            'bukuInduk' => $bukuInduk,
            'rekamMedis' => $rekamMedis,
            'orangTua' => $siswa->orangTuaDetails,
            'mutasi' => $siswa->mutasis,
            'pendidikanOptions' => ['Tidak Sekolah', 'SD', 'SMP', 'SMA/SMK', 'Diploma', 'S1', 'S2', 'S3'],
            'penghasilanOptions' => ['<1JT', '1-3JT', '3-5JT', '5-10JT', '>10JT'],
            'agamaOptions' => ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya'],
            'transportasiOptions' => ['Jalan Kaki', 'Sepeda', 'Motor', 'Mobil Pribadi', 'Angkot', 'Bus Sekolah', 'Lainnya'],
            'golonganDarahOptions' => ['A', 'B', 'AB', 'O', 'Tidak Tahu'],
            'hubunganOptions' => ['Ayah', 'Ibu', 'Wali'],
            'statusPernikahanOptions' => ['Menikah', 'Cerai Hidup', 'Cerai Mati', 'Belum Menikah'],
        ]);
    }

    /**
     * Cetak buku induk (browser print-to-PDF / window.print).
     */
    public function cetak(Siswa $siswa)
    {
        $siswa->load([
            'bukuInduk',
            'rekamMedis',
            'orangTuaDetails',
            'mutasis',
            'jurusan',
        ]);

        $profile = ProfileSekolah::first();
        $setting = Setting::where('user_id', auth()->id())->first();

        return Inertia::render('Admin/BukuInduk/Cetak', [
            'siswa' => $siswa,
            'bukuInduk' => $siswa->bukuInduk,
            'rekamMedis' => $siswa->rekamMedis,
            'orangTua' => $siswa->orangTuaDetails,
            'mutasi' => $siswa->mutasis,
            'namaSekolah' => $profile?->nama_sekolah,
            'namaKepalaSekolah' => $setting?->nama_kepala_sekolah,
        ]);
    }

    /**
     * Download PDF buku induk via mPDF (server-side).
     */
    public function cetakPdf(Siswa $siswa)
    {
        $siswa->load([
            'bukuInduk',
            'rekamMedis',
            'orangTuaDetails',
            'mutasis',
            'jurusan',
        ]);

        $profile = ProfileSekolah::first();
        $setting = Setting::where('user_id', auth()->id())->first();

        $filename = 'buku-induk-' . $siswa->nisn . '-' . now()->format('Ymd') . '.pdf';

        return PdfService::download('pdf.buku-induk', [
            'siswa' => $siswa,
            'bukuInduk' => $siswa->bukuInduk,
            'rekamMedis' => $siswa->rekamMedis,
            'orangTua' => $siswa->orangTuaDetails,
            'mutasi' => $siswa->mutasis,
            'namaSekolah' => $profile?->nama_sekolah,
            'namaKepalaSekolah' => $setting?->nama_kepala_sekolah,
        ], $filename);
    }

    /**
     * Cetak semua buku induk (filtered, print-friendly).
     */
    public function cetakSemua(Request $request)
    {
        $query = Siswa::query()->with(['bukuInduk', 'rekamMedis', 'orangTuaDetails', 'kelasAktif.kelas']);

        if ($request->filled('tingkat')) {
            $query->whereHas('kelasAktif.kelas', function ($q) use ($request) {
                $q->where('tingkat', $request->tingkat);
            });
        }

        $semuaSiswa = $query->orderBy('nama_lengkap')->get();

        $profile = ProfileSekolah::first();
        $setting = Setting::where('user_id', auth()->id())->first();

        return Inertia::render('Admin/BukuInduk/CetakSemua', [
            'siswa' => $semuaSiswa,
            'filters' => $request->only(['tingkat']),
            'namaSekolah' => $profile?->nama_sekolah ?? 'Sekolahku',
            'namaKepalaSekolah' => $setting?->nama_kepala_sekolah ?? 'Kepala Sekolah',
        ]);
    }

    /**
     * Download massal PDF buku induk per kelas dalam ZIP.
     */
    public function cetakPdfMassal(Request $request)
    {
        $kelasId = $request->input('kelas_id');
        $tingkat = $request->input('tingkat');

        $query = Siswa::query()->with(['bukuInduk', 'rekamMedis', 'orangTuaDetails', 'mutasis', 'jurusan', 'kelasAktif.kelas']);

        if ($kelasId) {
            $query->whereHas('kelasAktif', function ($q) use ($kelasId) {
                $q->where('kelas_id', $kelasId);
            });
        } elseif ($tingkat) {
            $query->whereHas('kelasAktif.kelas', function ($q) use ($tingkat) {
                $q->where('tingkat', $tingkat);
            });
        }

        $siswaList = $query->orderBy('nama_lengkap')->get();

        if ($siswaList->isEmpty()) {
            return back()->with('error', 'Tidak ada siswa ditemukan.');
        }

        $profile = ProfileSekolah::first();
        $setting = Setting::where('user_id', auth()->id())->first();

        $zipFileName = 'buku-induk-massal-' . now()->format('YmdHis') . '.zip';
        $zipPath = storage_path('app/tmp/' . $zipFileName);

        if (!is_dir(storage_path('app/tmp'))) {
            mkdir(storage_path('app/tmp'), 0755, true);
        }

        $zip = new \ZipArchive();
        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== true) {
            return back()->with('error', 'Gagal membuat file ZIP.');
        }

        foreach ($siswaList as $siswa) {
            try {
                $mpdf = new \Mpdf\Mpdf([
                    'mode' => 'utf-8',
                    'format' => 'A4',
                    'margin_left' => 15,
                    'margin_right' => 15,
                    'margin_top' => 15,
                    'margin_bottom' => 20,
                    'default_font' => 'dejavusans',
                    'tempDir' => storage_path('app/tmp/mpdf'),
                ]);

                $html = view('pdf.buku-induk', [
                    'siswa' => $siswa,
                    'bukuInduk' => $siswa->bukuInduk,
                    'rekamMedis' => $siswa->rekamMedis,
                    'orangTua' => $siswa->orangTuaDetails,
                    'mutasi' => $siswa->mutasis,
                    'namaSekolah' => $profile?->nama_sekolah,
                    'namaKepalaSekolah' => $setting?->nama_kepala_sekolah,
                ])->render();

                $mpdf->WriteHTML($html);
                $pdfContent = $mpdf->Output('', 'S');

                $pdfFilename = 'buku-induk-' . $siswa->nama_lengkap . '-' . $siswa->nisn . '.pdf';
                $zip->addFromString($pdfFilename, $pdfContent);
            } catch (\Exception $e) {
                \Log::error('Gagal generate PDF untuk siswa ' . $siswa->id . ': ' . $e->getMessage());
                continue;
            }
        }

        $zip->close();

        return response()->download($zipPath, $zipFileName)->deleteFileAfterSend(true);
    }

    // === Profil (buku_induk_siswa) ===

    public function updateProfil(BukuIndukProfilRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $data['siswa_id'] = $siswa->id;

        BukuIndukSiswa::updateOrCreate(['siswa_id' => $siswa->id], $data);

        return back()->with('success', 'Profil buku induk disimpan.');
    }

    // === Rekam Medis ===

    public function updateRekamMedis(RekamMedisRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $data['siswa_id'] = $siswa->id;

        RekamMedisSiswa::updateOrCreate(['siswa_id' => $siswa->id], $data);

        return back()->with('success', 'Rekam medis disimpan.');
    }

    // === Orang Tua / Wali (1:N) ===

    public function storeOrangTua(OrangTuaDetailRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $data['siswa_id'] = $siswa->id;
        OrangTuaDetail::create($data);

        return back()->with('success', 'Data orang tua/wali ditambahkan.');
    }

    public function updateOrangTua(OrangTuaDetailRequest $request, Siswa $siswa, OrangTuaDetail $orangTua)
    {
        abort_unless($orangTua->siswa_id === $siswa->id, 404);
        $orangTua->update($request->validated());

        return back()->with('success', 'Data orang tua/wali diperbarui.');
    }

    public function destroyOrangTua(Siswa $siswa, OrangTuaDetail $orangTua)
    {
        abort_unless($orangTua->siswa_id === $siswa->id, 404);
        $orangTua->delete();

        return back()->with('success', 'Data orang tua/wali dihapus.');
    }

    // === Mutasi (1:N) ===

    public function storeMutasi(MutasiSiswaRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $data['siswa_id'] = $siswa->id;
        $data['dicatat_oleh'] = Auth::id();

        if ($request->hasFile('dokumen_scan')) {
            $file = $request->file('dokumen_scan');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/images/mutasi', $filename);
            $data['dokumen_scan'] = $filename;
        }

        MutasiSiswa::create($data);

        return back()->with('success', 'Mutasi siswa dicatat.');
    }

    public function destroyMutasi(Siswa $siswa, MutasiSiswa $mutasi)
    {
        abort_unless($mutasi->siswa_id === $siswa->id, 404);
        $mutasi->delete();

        return back()->with('success', 'Mutasi dihapus.');
    }
}
