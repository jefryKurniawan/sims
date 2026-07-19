<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\PembayaranDetail;
use App\Models\Siswa;
use App\Models\SppTagihan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

/**
 * Generic polymorphic pembayaran controller.
 * ponytail: satu controller untuk semua jenis tagihan (SPP, UKS, Seragam, dll).
 * Tagihan morph ke model apapun (SppTagihan, model baru). Untuk tagihan tanpa
 * model khusus, tagihan_type/id null.
 */
class PembayaranController extends Controller
{
    public function index(Request $request)
    {
        $query = Pembayaran::with(['siswa:id,nama_lengkap,nisn,nis', 'details']);

        if ($jenis = $request->input('jenis')) {
            $query->where('jenis_pembayaran', $jenis);
        }
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }
        if ($q = $request->input('q')) {
            $query->whereHas('siswa', fn($s) => $s
                ->where('nama_lengkap', 'like', "%{$q}%")
                ->orWhere('nisn', 'like', "%{$q}%"));
        }

        $perPage = (int) $request->input('per_page', 15);
        $pembayaran = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Pembayaran/Index', [
            'pembayaran' => $pembayaran,
            'filters' => $request->only(['jenis', 'status', 'q']),
            'jenisOptions' => $this->jenisOptions(),
        ]);
    }

    public function create(Request $request)
    {
        $siswa = Siswa::select('id', 'nama_lengkap', 'nisn', 'nis')->orderBy('nama_lengkap')->get();

        $tagihanType = $request->input('tagihan_type');
        $tagihanList = [];
        if ($tagihanType === 'SppTagihan') {
            $tagihanList = SppTagihan::with('siswa:id,nama_lengkap')
                ->select('id', 'siswa_id', 'jumlah', 'bulan', 'tahun_ajaran', 'status')
                ->latest()->limit(100)->get();
        }

        return Inertia::render('Admin/Pembayaran/Create', [
            'siswaList' => $siswa,
            'jenisOptions' => $this->jenisOptions(),
            'tagihanType' => $tagihanType,
            'tagihanList' => $tagihanList,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'jenis_pembayaran' => 'required|string|max:50',
            'jumlah_tagihan' => 'required|numeric|min:0',
            'jatuh_tempo' => 'nullable|date',
            'keterangan' => 'nullable|string|max:500',
            'tagihan_type' => 'nullable|string|max:100',
            'tagihan_id' => 'nullable|integer',
        ]);

        DB::transaction(function () use ($validated, &$pembayaran) {
            $pembayaran = Pembayaran::create([
                'siswa_id' => $validated['siswa_id'],
                'jenis_pembayaran' => $validated['jenis_pembayaran'],
                'jumlah_tagihan' => $validated['jumlah_tagihan'],
                'jumlah_dibayar' => 0,
                'sisa' => $validated['jumlah_tagihan'],
                'status' => 'belum_lunas',
                'jatuh_tempo' => $validated['jatuh_tempo'] ?? null,
                'keterangan' => $validated['keterangan'] ?? null,
                'tagihan_type' => $validated['tagihan_type'] ?: null,
                'tagihan_id' => $validated['tagihan_type'] ? ($validated['tagihan_id'] ?? null) : null,
            ]);
        });

        return redirect()
            ->route('pembayaran.show', $pembayaran->id)
            ->with('success', 'Tagihan pembayaran berhasil dibuat.');
    }

    public function show($id)
    {
        $pembayaran = Pembayaran::with(['siswa', 'details.pencatat'])->findOrFail($id);
        return Inertia::render('Admin/Pembayaran/Show', ['pembayaran' => $pembayaran]);
    }

    public function bayar(Request $request, $id)
    {
        $pembayaran = Pembayaran::with('details')->findOrFail($id);

        $validated = $request->validate([
            'jumlah' => 'required|numeric|min:0.01',
            'tanggal_bayar' => 'required|date',
            'metode' => 'required|string|max:30',
            'bukti_pembayaran' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'catatan' => 'nullable|string|max:500',
        ]);

        $buktiPath = null;
        if ($request->hasFile('bukti_pembayaran')) {
            $buktiPath = $request->file('bukti_pembayaran')->store('pembayaran-bukti', 'public');
        }

        DB::transaction(function () use ($pembayaran, $validated, $buktiPath) {
            $detail = PembayaranDetail::create([
                'pembayaran_id' => $pembayaran->id,
                'jumlah' => $validated['jumlah'],
                'tanggal_bayar' => $validated['tanggal_bayar'],
                'metode' => $validated['metode'],
                'bukti_pembayaran' => $buktiPath,
                'dicatat_oleh' => auth()->id(),
                'status_verifikasi' => auth()->user()?->hasRole('Admin') ? 'terverifikasi' : 'pending',
                'diverifikasi_pada' => auth()->user()?->hasRole('Admin') ? now() : null,
            ]);

            $totalDibayar = $pembayaran->details()->sum('jumlah') + $validated['jumlah'];
            $sisa = max(0, $pembayaran->jumlah_tagihan - $totalDibayar);
            $status = $sisa <= 0.01 ? 'lunas' : ($totalDibayar > 0 ? 'angsuran' : 'belum_lunas');

            $pembayaran->update([
                'jumlah_dibayar' => $totalDibayar,
                'sisa' => $sisa,
                'status' => $status,
            ]);
        });

        return back()->with('success', 'Pembayaran berhasil dicatat.');
    }

    public function verifyDetail(Request $request, $detailId)
    {
        $detail = PembayaranDetail::findOrFail($detailId);
        $validated = $request->validate([
            'status_verifikasi' => 'required|in:terverifikasi,ditolak',
            'catatan_verifikasi' => 'nullable|string|max:500',
        ]);

        $detail->update([
            'status_verifikasi' => $validated['status_verifikasi'],
            'catatan_verifikasi' => $validated['catatan_verifikasi'] ?? null,
            'diverifikasi_pada' => now(),
        ]);

        return back()->with('success', 'Status verifikasi diperbarui.');
    }

    public function destroy($id)
    {
        $pembayaran = Pembayaran::findOrFail($id);
        $pembayaran->delete();
        return redirect()->route('pembayaran.index')->with('success', 'Tagihan dihapus.');
    }

    private function jenisOptions(): array
    {
        return ['SPP', 'UKS', 'Seragam', 'Ekstrakurikuler', 'Kegiatan', 'Lainnya'];
    }
}
