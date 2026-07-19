<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SppTagihan;
use App\Models\Siswa;
use App\Models\SppPembayaran;
use App\Models\SppSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class SppController extends Controller
{
    /** List tagihan SPP dengan filter. */
    public function index(Request $request)
    {
        // Auto-flag overdue
        SppTagihan::where('status', 'belum_lunas')
            ->where('tanggal_jatuh_tempo', '<', today())
            ->update(['status' => 'overdue']);

        $query = SppTagihan::with('siswa:id,nama_lengkap,nisn,nis');

        if ($request->filled('siswa_id')) {
            $query->where('siswa_id', $request->siswa_id);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('tanggal_from') && $request->filled('tanggal_to')) {
            $query->whereBetween('tanggal_jatuh_tempo', [$request->tanggal_from, $request->tanggal_to]);
        }

        $tagihan = $query->orderBy('tanggal_jatuh_tempo', 'asc')->paginate(15);

        return Inertia::render('Admin/Spp/Index', [
            'tagihan' => $tagihan,
        ]);
    }

    /** Form tambah tagihan. */
    public function create()
    {
        $siswaList = Siswa::select('id', 'nama_lengkap', 'nisn')
            ->whereNull('deleted_at')
            ->orderBy('nama_lengkap')
            ->get();

        return Inertia::render('Admin/Spp/Create', [
            'siswaList' => $siswaList,
        ]);
    }

    /** Simpan tagihan baru. */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'nominal' => 'required|numeric|min:0',
            'tanggal_jatuh_tempo' => 'required|date',
            'keterangan' => 'nullable|string|max:255',
        ]);

        SppTagihan::create([
            'siswa_id' => $validated['siswa_id'],
            'nominal' => $validated['nominal'],
            'tanggal_jatuh_tempo' => $validated['tanggal_jatuh_tempo'],
            'keterangan' => $validated['keterangan'] ?? null,
            'status' => 'belum_lunas',
        ]);

        return redirect()->route('spp.index')->with('success', 'Tagihan SPP berhasil dibuat.');
    }

    /** Detail tagihan + riwayat pembayaran. */
    public function show($id)
    {
        $tagihan = SppTagihan::with('siswa:id,nama_lengkap,nisn,nis', 'pembayaran')->findOrFail($id);
        return Inertia::render('Admin/Spp/Detail', [
            'tagihan' => $tagihan,
        ]);
    }

    /** Form edit tagihan. */
    public function edit($id)
    {
        $tagihan = SppTagihan::with('siswa')->findOrFail($id);
        $siswaList = Siswa::select('id', 'nama_lengkap', 'nisn')
            ->whereNull('deleted_at')
            ->orderBy('nama_lengkap')
            ->get();
        return Inertia::render('Admin/Spp/Edit', [
            'tagihanItem' => $tagihan,
            'siswaList' => $siswaList,
        ]);
    }

    /** Update tagihan. */
    public function update(Request $request, $id)
    {
        $tagihan = SppTagihan::findOrFail($id);

        $validated = $request->validate([
            'siswa_id' => 'sometimes|required|exists:siswa,id',
            'nominal' => 'sometimes|required|numeric|min:0',
            'tanggal_jatuh_tempo' => 'sometimes|required|date',
            'keterangan' => 'nullable|string|max:255',
        ]);

        $tagihan->update($validated);

        return redirect()->route('spp.index')->with('success', 'Tagihan SPP berhasil diperbarui.');
    }

    /** Hapus tagihan (soft delete). */
    public function destroy($id)
    {
        $tagihan = SppTagihan::findOrFail($id);
        $tagihan->delete();

        return redirect()->route('spp.index')->with('success', 'Tagihan SPP berhasil dihapus.');
    }

    /** Catat pembayaran untuk tagihan. */
    public function bayar(Request $request, $id)
    {
        $tagihan = SppTagihan::findOrFail($id);

        $validated = $request->validate([
            'tanggal_pembayaran' => 'required|date',
            'jumlah' => 'required|numeric|min:0',
            'metode' => 'required|in:transfer,cash,qris,debit,kredit',
            'status' => 'required|in:lunas,pending,failed',
            'keterangan' => 'nullable|string|max:255',
            'bukti_pembayaran' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $buktiPath = null;
        if ($request->hasFile('bukti_pembayaran')) {
            $buktiPath = $request->file('bukti_pembayaran')->store('spp-bukti', 'public');
        }

        DB::transaction(function () use ($tagihan, $validated, $buktiPath) {
            SppPembayaran::create([
                'siswa_id' => $tagihan->siswa_id,
                'spp_tagihan_id' => $tagihan->id,
                'nominal' => $validated['jumlah'],
                'tanggal_pembayaran' => $validated['tanggal_pembayaran'],
                'metode' => $validated['metode'],
                'status' => $validated['status'],
                'keterangan' => $validated['keterangan'] ?? null,
                'bukti_pembayaran' => $buktiPath,
            ]);

            $totalPaid = SppPembayaran::where('spp_tagihan_id', $tagihan->id)
                ->where('status', 'lunas')
                ->sum('nominal');

            $tagihan->update(['status' => $totalPaid >= $tagihan->nominal ? 'lunas' : 'belum_lunas']);
        });

        return redirect()->route('spp.show', $tagihan->id)
            ->with('success', 'Pembayaran berhasil dicatat.');
    }

    /** Form generate tagihan massal. */
    public function generateForm()
    {
        $setting = SppSetting::first();
        $activeCount = Siswa::whereNull('deleted_at')->count();

        return Inertia::render('Admin/Spp/Generate', [
            'defaultNominal' => (int) ($setting?->amount ?? 0),
            'activeCount' => $activeCount,
            'setting' => $setting,
        ]);
    }

    /** Generate massal tagihan SPP per siswa. */
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'bulan' => 'required|integer|between:1,12',
            'tahun' => 'required|integer|digits:4',
            'nominal' => 'required|numeric|min:0',
            'tanggal_jatuh_tempo' => 'required|date',
            'keterangan' => 'nullable|string|max:255',
        ]);

        // Unique check: kombinasi siswa + tanggal_jatuh_tempo tidak boleh duplikat
        $inserted = 0;
        $skipped = 0;

        $siswaIds = Siswa::whereNull('deleted_at')->pluck('id');

        DB::transaction(function () use ($siswaIds, $validated, &$inserted, &$skipped) {
            foreach ($siswaIds as $sid) {
                $exists = SppTagihan::where('siswa_id', $sid)
                    ->where('tanggal_jatuh_tempo', $validated['tanggal_jatuh_tempo'])
                    ->exists();

                if ($exists) {
                    $skipped++;
                    continue;
                }

                SppTagihan::create([
                    'siswa_id' => $sid,
                    'nominal' => $validated['nominal'],
                    'tanggal_jatuh_tempo' => $validated['tanggal_jatuh_tempo'],
                    'keterangan' => $validated['keterangan']
                        ?? sprintf('SPP %s %d', $this->bulanNama($validated['bulan']), $validated['tahun']),
                    'status' => 'belum_lunas',
                ]);
                $inserted++;
            }
        });

        $msg = "Berhasil membuat {$inserted} tagihan.";
        if ($skipped > 0) $msg .= " {$skipped} duplikat dilewati.";

        return redirect()->route('spp.index')->with('success', $msg);
    }

    /** Hutang piutang per siswa — query murni SQL, no N+1. */
    public function hutang(Request $request)
    {
        // Auto-flag overdue
        SppTagihan::where('status', 'belum_lunas')
            ->where('tanggal_jatuh_tempo', '<', today())
            ->update(['status' => 'overdue']);

        $rows = DB::table('spp_tagihan as t')
            ->join('siswa as s', 't.siswa_id', '=', 's.id')
            ->whereIn('t.status', ['belum_lunas', 'overdue'])
            ->select([
                's.id as siswa_id',
                's.nama_lengkap',
                's.nisn',
                DB::raw('SUM(t.nominal) as total_tagihan'),
                DB::raw('COUNT(t.id) as jumlah_tagihan'),
                DB::raw("SUM(CASE WHEN t.status = 'overdue' THEN 1 ELSE 0 END) as overdue_count"),
            ])
            ->groupBy('s.id', 's.nama_lengkap', 's.nisn')
            ->orderBy('total_tagihan', 'desc')
            ->get();

        return Inertia::render('Admin/Spp/Hutang', [
            'hutang' => $rows,
        ]);
    }

    /** Riwayat tagihan + pembayaran per siswa. */
    public function siswa($siswaId)
    {
        $siswa = Siswa::with('user')->findOrFail($siswaId);

        // Gunakan leftJoin agar tagihan tanpa pembayaran tetap muncul
        $tagihan = DB::table('spp_tagihan as t')
            ->leftJoin('spp_pembayaran as p', 'p.spp_tagihan_id', '=', 't.id')
            ->where('t.siswa_id', $siswaId)
            ->select([
                't.id',
                't.nominal',
                't.status',
                't.tanggal_jatuh_tempo',
                't.keterangan',
                't.created_at',
                DB::raw('SUM(p.nominal) FILTER (WHERE p.status = \'lunas\') as total_terbayar'),
                DB::raw('COUNT(p.id) as jumlah_pembayaran'),
            ])
            ->groupBy('t.id', 't.nominal', 't.status', 't.tanggal_jatuh_tempo', 't.keterangan', 't.created_at')
            ->orderBy('t.tanggal_jatuh_tempo', 'desc')
            ->get();

        $semuaPembayaran = SppPembayaran::where('spp_tagihan_id', $siswaId)
            ->orWhere('siswa_id', $siswaId)
            ->with('sppTagihan')
            ->orderBy('created_at', 'desc')
            ->get();

        $totalTagihan = $tagihan->sum('nominal');
        $totalTerbayar = $tagihan->sum('total_terbayar') ?? 0;
        $totalSisa = max(0, $totalTagihan - $totalTerbayar);

        return Inertia::render('Admin/Spp/SiswaHistory', [
            'siswa' => $siswa,
            'tagihan' => $tagihan,
            'pembayaran' => $semuaPembayaran,
            'ringkasan' => [
                'total_tagihan' => $totalTagihan,
                'total_terbayar' => $totalTerbayar,
                'total_sisa' => $totalSisa,
            ],
        ]);
    }

    /** Update nominal SPP default di setting. */
    public function updateSetting(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
        ]);

        SppSetting::updateOrCreate(
            ['id' => 1],
            [
                'amount' => $validated['amount'],
                'update_by' => auth()->id(),
            ]
        );

        return redirect()->back()->with('success', 'Pengaturan SPP berhasil disimpan.');
    }

    /** Helper: nama bulan Indonesia. */
    private function bulanNama(int $bulan): string
    {
        $nama = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret',
            4 => 'April', 5 => 'Mei', 6 => 'Juni',
            7 => 'Juli', 8 => 'Agustus', 9 => 'September',
            10 => 'Oktober', 11 => 'November', 12 => 'Desember',
        ];
        return $nama[$bulan] ?? $bulan;
    }
}
