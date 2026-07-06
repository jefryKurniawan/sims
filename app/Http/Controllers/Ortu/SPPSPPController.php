<?php

namespace App\Http\Controllers\Ortu;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SppTagihan;
use App\Models\Siswa;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SPPSPPController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // Get the authenticated user's siswa record
        $user = Auth::user();
        if (!$user || $user->role !== 'ortu') {
            return redirect()->route('login')->with('error', 'Unauthorized access.');
        }

        $siswa = Siswa::where('user_id', $user->id)->firstOrFail();

        // Find the SPP tagihan and verify it belongs to this user's siswa
        $tagihan = SppTagihan::where('id', $id)
            ->where('siswa_id', $siswa->id)
            ->firstOrFail();

        return Inertia::render('Ortu/Spp/Edit', [
            'tagihan' => $tagihan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Get the authenticated user's siswa record
        $user = Auth::user();
        if (!$user || $user->role !== 'ortu') {
            return redirect()->route('login')->with('error', 'Unauthorized access.');
        }

        $siswa = Siswa::where('user_id', $user->id)->firstOrFail();

        // Find the SPP tagihan and verify it belongs to this user's siswa
        // Using firstOrFail to prevent the "call to member function on null" error
        $tagihan = SppTagihan::where('id', $id)
            ->where('siswa_id', $siswa->id)
            ->firstOrFail();

        // Validate the request
        $validated = $request->validate([
            'bukti_pembayaran' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            // Add other validation rules as needed
        ]);

        // Handle file upload if present
        if ($request->hasFile('bukti_pembayaran')) {
            $path = $request->file('bukti_pembayaran')->store('spp_payments', 'public');
            $validated['bukti_pembayaran'] = $path;
        }

        // Update the tagihan
        $tagihan->update($validated);

        return redirect()->route('orangtua.spp.index')
            ->with('success', 'Pembayaran SPP berhasil diperbarui.');
    }
}
