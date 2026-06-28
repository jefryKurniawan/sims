<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SpmbApplicant;
use App\Models\SpmbConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpmbApplicantController extends Controller
{
    public function index(Request $request)
    {
        $query = SpmbApplicant::query()
            ->with(['ranking', 'afirmasi']);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%")
                  ->orWhere('nomor_registrasi', 'like', "%{$search}%")
                  ->orWhere('no_hp', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status_pendaftaran')) {
            $query->where('status_pendaftaran', $status);
        }

        if ($jalur = $request->input('jalur')) {
            $query->where('jalur_pendaftaran', $jalur);
        }

        $applicants = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Spmb/Applicant/Index', [
            'applicants' => $applicants,
            'filters' => $request->only(['search', 'status_pendaftaran', 'jalur']),
        ]);
    }

    public function show(SpmbApplicant $spmbApplicant)
    {
        $spmbApplicant->load([
            'afirmasi', 'prestasi', 'nilaiAkademik', 'tka', 'ranking', 'config',
        ]);

        return Inertia::render('Admin/Spmb/Applicant/Show', [
            'applicant' => $spmbApplicant,
        ]);
    }

    public function edit(SpmbApplicant $spmbApplicant)
    {
        $spmbApplicant->load([
            'afirmasi', 'prestasi', 'nilaiAkademik', 'tka', 'ranking', 'config',
        ]);

        return Inertia::render('Admin/Spmb/Applicant/Edit', [
            'applicant' => $spmbApplicant,
            'configs' => SpmbConfig::orderBy('tahun_ajaran', 'desc')->get(),
        ]);
    }

    public function update(Request $request, SpmbApplicant $spmbApplicant)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nisn' => 'required|string|max:20',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'no_hp' => 'required|string',
            'email' => 'nullable|email|max:255',
            'asal_sekolah' => 'required|string|max:255',
            'status_pendaftaran' => 'required|in:draft,submitted,verifikasi_berkas,lulus_seleksi,diterima,ditolak',
            'jalur_pendaftaran' => 'required|in:reguler,afirmasi,prestasi',
        ]);

        $spmbApplicant->update($validated);

        return redirect()->route('spmb.applicant.index')
            ->with('success', 'Data pendaftar berhasil diperbarui.');
    }

    public function destroy(SpmbApplicant $spmbApplicant)
    {
        $spmbApplicant->delete();

        return redirect()->route('spmb.applicant.index')
            ->with('success', 'Data pendaftar berhasil dihapus.');
    }
}
