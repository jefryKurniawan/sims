<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\CalonSiswa;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PpdbController extends Controller
{
    /**
     * Show registration form (no login required)
     */
    public function register()
    {
        return Inertia::render('Ppdb/Register');
    }

    /**
     * Store new registration
     */
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'nisn' => 'required|unique:calon_siswa,nisn',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'no_hp' => 'required|string',
            'email' => 'nullable|email|max:255',
            'nama_ortu' => 'required|string|max:255',
            'no_hp_ortu' => 'required|string',
            'asal_sekolah' => 'required|string|max:255',
            'prestasi' => 'nullable|string',
            'biaya_pendaftaran' => 'required|numeric|min:0',
            'bukti_bayar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('bukti_bayar')) {
            $validated['bukti_bayar'] = $request->file('bukti_bayar')->store('calon_siswa/bukti', 'public');
        }

        $validated['status'] = 'submitted';
        $validated['keputusan'] = 'belum';
        $validated['tanggal_daftar'] = now();

        $calonSiswa = CalonSiswa::create($validated);

        // Log the registration
        AuditLog::log(
            $calonSiswa,
            'registered',
            null,
            $calonSiswa->only($calonSiswa->getFillable()),
            'Pendaftaran baru (guest): ' . $calonSiswa->nama_lengkap
        );

        return redirect()
            ->route('ppdb.frontend.success', ['token' => $calonSiswa->edit_token])
            ->with('success', 'Pendaftaran berhasil! Simpan kode edit untuk melakukan perubahan data.');
    }

    /**
     * Show success page with edit token
     */
    public function success($token)
    {
        $calonSiswa = CalonSiswa::where('edit_token', $token)->firstOrFail();

        return Inertia::render('Ppdb/Success', [
            'calonSiswa' => [
                'id' => $calonSiswa->id,
                'nama_lengkap' => $calonSiswa->nama_lengkap,
                'nisn' => $calonSiswa->nisn,
                'status' => $calonSiswa->status,
                'keputusan' => $calonSiswa->keputusan,
                'edit_token' => $calonSiswa->edit_token,
            ],
        ]);
    }

    /**
     * Show edit form for guest users
     */
    public function edit($token)
    {
        $calonSiswa = CalonSiswa::where('edit_token', $token)
            ->where('guest_token_expires_at', '>=', now())
            ->firstOrFail();

        return Inertia::render('Ppdb/Edit', [
            'calonSiswa' => $calonSiswa,
            'editToken' => $token,
        ]);
    }

    /**
     * Update registration data
     */
    public function update(Request $request, $token)
    {
        $calonSiswa = CalonSiswa::where('edit_token', $token)
            ->where('guest_token_expires_at', '>=', now())
            ->firstOrFail();

        $validated = $request->validate([
            'nisn' => 'required|unique:calon_siswa,nisn,' . $calonSiswa->id,
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'no_hp' => 'required|string',
            'email' => 'nullable|email|max:255',
            'nama_ortu' => 'required|string|max:255',
            'no_hp_ortu' => 'required|string',
            'asal_sekolah' => 'required|string|max:255',
            'prestasi' => 'nullable|string',
            'bukti_bayar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $oldValues = $calonSiswa->only(array_keys($validated));

        if ($request->hasFile('bukti_bayar')) {
            if ($calonSiswa->bukti_bayar) {
                Storage::disk('public')->delete($calonSiswa->bukti_bayar);
            }
            $validated['bukti_bayar'] = $request->file('bukti_bayar')->store('calon_siswa/bukti', 'public');
        }

        $calonSiswa->update($validated);

        // Log the update
        AuditLog::log(
            $calonSiswa,
            'updated_by_guest',
            $oldValues,
            $calonSiswa->getChanges(),
            'Data diperbarui oleh calon siswa (guest): ' . $calonSiswa->nama_lengkap
        );

        return redirect()
            ->route('ppdb.frontend.success', ['token' => $calonSiswa->edit_token])
            ->with('success', 'Data berhasil diperbarui!');
    }

    /**
     * Check registration status by token
     */
    public function checkStatus($token)
    {
        $calonSiswa = CalonSiswa::where('edit_token', $token)->firstOrFail();

        return Inertia::render('Ppdb/CheckStatus', [
            'calonSiswa' => $calonSiswa,
        ]);
    }
}