<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\SpmbApplicant;
use App\Models\SpmbConfig;
use App\Services\SpmbRegistrationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SpmbController extends Controller
{
    public function __construct(
        private SpmbRegistrationService $registrationService,
    ) {}

    public function index()
    {
        // Ambil SPMB config yang sedang aktif (untuk banner & info)
        $config = SpmbConfig::where('aktif', true)
            ->orderBy('tahun_ajaran', 'desc')
            ->first();

        return Inertia::render('Spmb/Index', [
            'config' => $config,
        ]);
    }

    public function pendaftaran()
    {
        $config = SpmbConfig::where('aktif', true)
            ->whereDate('tanggal_buka', '<=', now())
            ->whereDate('tanggal_tutup', '>=', now())
            ->first();

        if (!$config) {
            return Inertia::render('Spmb/Register', [
                'config' => null,
                'error' => 'Pendaftaran SPMB sedang tidak dibuka.',
            ]);
        }

        if ($config->sisaKuota() <= 0) {
            return Inertia::render('Spmb/Register', [
                'config' => $config,
                'error' => 'Maaf, kuota pendaftaran sudah penuh.',
            ]);
        }

        return Inertia::render('Spmb/Register', [
            'config' => $config,
            'error' => null,
        ]);
    }

    public function store(Request $request)
    {
        $config = SpmbConfig::where('aktif', true)
            ->whereDate('tanggal_buka', '<=', now())
            ->whereDate('tanggal_tutup', '>=', now())
            ->first();

        if (!$config) {
            return redirect()->route('spmb.pendaftaran')
                ->with('error', 'Pendaftaran SPMB sedang tidak dibuka.');
        }

        $validated = $request->validate([
            'nisn' => 'required|string|max:20|unique:spmb_applicants,nisn',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'no_hp' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'asal_sekolah' => 'required|string|max:255',
            'npsn_sekolah' => 'nullable|string|max:20',
            'jurusan_sekolah' => 'nullable|string|max:255',
            'tahun_lulus' => 'nullable|integer|min:2020|max:2030',
            'jalur_pendaftaran' => 'required|in:reguler,afirmasi,prestasi',
            'nama_ayah' => 'nullable|string|max:255',
            'nama_ibu' => 'nullable|string|max:255',
            'pekerjaan_ayah' => 'nullable|string|max:255',
            'pekerjaan_ibu' => 'nullable|string|max:255',
            'penghasilan_ortu' => 'nullable|string|max:255',
            'no_hp_ortu' => 'nullable|string|max:20',
        ]);

        $validated['tahun_ajaran_id'] = $config->id;

        $result = $this->registrationService->register($validated);

        $token = $result->token_pendaftaran;

        return redirect()->route('spmb.berhasil', [
            'token' => $token,
            'nomor' => $result->nomor_registrasi,
        ]);
    }

    public function berhasil(Request $request)
    {
        $token = $request->input('token');
        $nomor = $request->input('nomor');

        return Inertia::render('Spmb/Success', [
            'token' => $token,
            'nomor_registrasi' => $nomor,
        ]);
    }

    public function cekStatus()
    {
        return Inertia::render('Spmb/CheckStatus', [
            'applicant' => null,
            'error' => null,
        ]);
    }

    public function cekStatusPost(Request $request)
    {
        $validated = $request->validate([
            'nomor_registrasi' => 'required|string|max:30',
        ]);

        $applicant = $this->registrationService->cekStatus($validated['nomor_registrasi']);

        if (!$applicant) {
            return Inertia::render('Spmb/CheckStatus', [
                'applicant' => null,
                'error' => 'Nomor registrasi tidak ditemukan.',
            ]);
        }

        return Inertia::render('Spmb/CheckStatus', [
            'applicant' => $applicant,
            'error' => null,
        ]);
    }
}
