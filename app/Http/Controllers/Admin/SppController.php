<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SppTagihan;
use App\Models\Siswa;
use App\Models\SppPembayaran;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SppController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = SppTagihan::with('siswa.user');

        // Optional filters
        if ($request->filled('siswa_id')) {
            $query->where('siswa_id', $request->siswa_id);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('tanggal_from') && $request->filled('tanggal_to')) {
            $query->whereBetween('tanggal_jatuh_tempo', [$request->tanggal_from, $request->tanggal_to]);
        }

        $tagihan = $query->orderBy('tanggal_jatuh_tempo', 'asc')
                         ->paginate(15);

        return Inertia::render('Admin/Spp/Index', [
            'tagihan' => $tagihan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $siswaList = Siswa::select('id', 'nama_lengkap', 'nisn')->orderBy('nama_lengkap')->get();
        return Inertia::render('Admin/Spp/Create', [
            'siswaList' => $siswaList,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'nominal' => 'required|numeric|min:0',
            'tanggal_jatuh_tempo' => 'required|date',
            'keterangan' => 'nullable|string',
            // optional payment data
            'pembayaran' => 'sometimes|array',
            'pembayaran.tanggal_bayar' => 'required_if:pembayaran.==array|date',
            'pembayaran.jumlah' => 'required_if:pembayaran.==array|numeric|min:0',
            'pembayaran.metode' => ['sometimes', 'required_if:pembayaran.==array', 'in:transfer,cash,qris,debit,kredit'],
            'pembayaran.status' => ['sometimes', 'required_if:pembayaran.==array', 'in:lunas,pending,gagal'],
            'pembayaran.keterangan' => 'nullable|string',
        ]);

        // Create tagihan
        $tagihan = SppTagihan::create([
            'siswa_id' => $validated['siswa_id'],
            'nominal' => $validated['nominal'],
            'tanggal_jatuh_tempo' => $validated['tanggal_jatuh_tempo'],
            'keterangan' => $validated['keterangan'] ?? null,
            'status' => 'belum_lunas', // default
        ]);

        // If payment data provided, record payment and possibly update status
        if (!empty($validated['pembayaran'])) {
            $pembayaran = $validated['pembayaran'];
            $payment = SppPembayaran::create([
                'siswa_id' => $validated['siswa_id'],
                'spp_tagihan_id' => $tagihan->id,
                'nominal' => $pembayaran['jumuan'] ?? $pembayaran['jumlah'], // handle typo
                'tanggal_bayar' => $pembayaran['tanggal_bayar'],
                'metode' => $pembayaran['metode'] ?? 'transfer',
                'status' => $pembayaran['status'] ?? 'lunas',
                'keterangan' => $pembayaran['keterangan'] ?? null,
            ]);

            // Update tagihan status based on payment
            if ($payment->status === 'lunas' && $payment->nominal >= $tagihan->nominal) {
                $tagihan->update(['status' => 'lunas']);
            } elseif ($payment->status === 'lunas' && $payment->nominal < $tagihan->nominal) {
                $tagihan->update(['status' => 'belum_lunas']); // partially paid
            }
        }

        return redirect()->route('spp.index')->with('success', 'Tagihan SPP berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tagihan = SppTagihan::with(['siswa.user', 'pembayaran'])->findOrFail($id);
        return Inertia::render('Admin/Spp/Detail', [
            'tagihan' => $tagihan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tagihan = SppTagihan::with('siswa')->findOrFail($id);
        $siswaList = Siswa::select('id', 'nama_lengkap', 'nisn')->orderBy('nama_lengkap')->get();
        return Inertia::render('Admin/Spp/Edit', [
            'tagihanItem' => $tagihan,
            'siswaList' => $siswaList,
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
        $tagihan = SppTagihan::findOrFail($id);

        $validated = $request->validate([
            'siswa_id' => 'sometimes|required|exists:siswa,id',
            'nominal' => 'sometimes|required|numeric|min:0',
            'tanggal_jatuh_tempo' => 'sometimes|required|date',
            'keterangan' => 'nullable|string',
        ]);

        $tagihan->update($validated);

        return redirect()->route('spp.index')->with('success', 'Tagihan SPP berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tagihan = SppTagihan::findOrFail($id);
        $tagihan->delete();

        return redirect()->route('spp.index')->with('success', 'Tagihan SPP berhasil dihapus.');
    }

    /**
     * Record a payment for a specific invoice.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function bayar(Request $request, $id)
    {
        $tagihan = SppTagihan::findOrFail($id);

        $validated = $request->validate([
            'tanggal_bayar' => 'required|date',
            'jumlah' => 'required|numeric|min:0',
            'metode' => ['required', 'in:transfer,cash,qris,debit,kredit'],
            'status' => ['required', 'in:lunas,pending,gagal'],
            'keterangan' => 'nullable|string',
        ]);

        $pembayaran = SppPembayaran::create([
            'siswa_id' => $tagihan->siswa_id,
            'spp_tagihan_id' => $tagihan->id,
            'nominal' => $validated['jumlah'],
            'tanggal_bayar' => $validated['tanggal_bayar'],
            'metode' => $validated['metode'],
            'status' => $validated['status'],
            'keterangan' => $validated['keterangan'] ?? null,
        ]);

        // Update tagihan status based on total paid vs nominal
        $totalPaid = $tagihan->pembayaran()->sum('nominal');
        if ($totalPaid >= $tagihan->nominal) {
            $tagihan->update(['status' => 'lunas']);
        } else {
            $tagihan->update(['status' => 'belum_lunas']);
        }

        return response()->json([
            'tagihan' => $tagihan->fresh(['siswa.user']),
            'pembayaran' => $pembayaran,
        ], 201);
    }

    /**
     * Get summary of outstanding (unpaid) invoices.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function outstanding(Request $request)
    {
        $query = SppTagihan::where('status', '!=', 'lunas')
            ->with('siswa.user');

        if ($request->filled('siswa_id')) {
            $query->where('siswa_id', $request->siswa_id);
        }

        $outstanding = $query->get();

        $summary = [
            'total_nominal' => $outstanding->sum('nominal'),
            'total_due_count' => $outstanding->count(),
            'details' => $outstanding,
        ];

        return response()->json($summary);
    }
}
