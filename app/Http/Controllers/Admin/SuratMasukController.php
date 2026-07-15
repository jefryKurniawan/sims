<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SuratMasuk;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Admin\SuratMasukRequest;
use App\Notifications\SuratDisposisiNotification;

class SuratMasukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', SuratMasuk::class);

        $query = SuratMasuk::with(['createdBy', 'disposisiKepada'])
            ->latest('tanggal_terima');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no_surat', 'like', "%{$search}%")
                  ->orWhere('asal_surat', 'like', "%{$search}%")
                  ->orWhere('perihal', 'like', "%{$search}%");
            });
        }

        // Date range filter
        if ($request->filled('tanggal_terima_from')) {
            $query->where('tanggal_terima', '>=', $request->tanggal_terima_from);
        }
        if ($request->filled('tanggal_terima_to')) {
            $query->where('tanggal_terima', '<=', $request->tanggal_terima_to);
        }

        $suratMasuk = $query->paginate(10)->withQueryString();

        $statuses = ['baru', 'diproses', 'selesai', 'arsip'];

        return inertia('Admin/TU/SuratMasuk/Index', [
            'suratMasuk' => $suratMasuk,
            'filters' => $request->only(['status', 'search', 'tanggal_terima_from', 'tanggal_terima_to']),
            'statuses' => $statuses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', SuratMasuk::class);
        return inertia('Admin/TU/SuratMasuk/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SuratMasukRequest $request)
    {
        $this->authorize('create', SuratMasuk::class);

        $data = $request->validated();
        $data['created_by'] = auth()->id();

        if ($request->hasFile('file_scan')) {
            $data['file_scan'] = $request->file('file_scan')->store('surat-masuk', 'public');
        }

        SuratMasuk::create($data);

        return redirect()->route('tu.surat-masuk.index')
            ->with('success', 'Surat masuk berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SuratMasuk $suratMasuk)
    {
        $this->authorize('view', $suratMasuk);
        $suratMasuk->load(['createdBy', 'disposisiKepada']);
        return inertia('Admin/TU/SuratMasuk/Show', ['suratMasuk' => $suratMasuk]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SuratMasuk $suratMasuk)
    {
        $this->authorize('update', $suratMasuk);
        return inertia('Admin/TU/SuratMasuk/Edit', ['suratMasuk' => $suratMasuk]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SuratMasukRequest $request, SuratMasuk $suratMasuk)
    {
        $this->authorize('update', $suratMasuk);

        $data = $request->validated();

        if ($request->hasFile('file_scan')) {
            if ($suratMasuk->file_scan) {
                Storage::disk('public')->delete($suratMasuk->file_scan);
            }
            $data['file_scan'] = $request->file('file_scan')->store('surat-masuk', 'public');
        }

        $suratMasuk->update($data);

        return redirect()->route('tu.surat-masuk.index')
            ->with('success', 'Surat masuk berhasil diperbarui.');
    }

    /**
     * Show disposisi form.
     */
    public function disposisi(SuratMasuk $suratMasuk)
    {
        $this->authorize('disposisi', $suratMasuk);

        $stafTu = User::role(['Admin', 'Staf', 'TU'])->get(['id', 'name', 'email']);

        return inertia('Admin/TU/SuratMasuk/DisposisiModal', [
            'suratMasuk' => $suratMasuk,
            'stafTu' => $stafTu,
        ]);
    }

    /**
     * Store disposisi.
     */
    public function disposisiStore(Request $request, SuratMasuk $suratMasuk)
    {
        $this->authorize('disposisi', $suratMasuk);

        $validated = $request->validate([
            'disposisi_kepada' => 'required|exists:users,id',
            'disposisi_instruksi' => 'required|string',
            'disposisi_batas_waktu' => 'required|date',
        ]);

        $suratMasuk->update([
            'disposisi_kepada' => $validated['disposisi_kepada'],
            'disposisi_instruksi' => $validated['disposisi_instruksi'],
            'disposisi_batas_waktu' => $validated['disposisi_batas_waktu'],
            'status' => 'diproses',
            'status_disposisi' => 'dibaca',
        ]);

        // Send notification to disposisi recipient
        $recipient = User::find($validated['disposisi_kepada']);
        if ($recipient) {
            $recipient->notify(new SuratDisposisiNotification($suratMasuk));
        }

        return redirect()->route('tu.surat-masuk.show', $suratMasuk)
            ->with('success', 'Disposisi berhasil dikirim.');
    }

    /**
     * Arsipkan surat.
     */
    public function arsipkan(SuratMasuk $suratMasuk)
    {
        $this->authorize('arsipkan', $suratMasuk);
        $suratMasuk->update(['status' => 'arsip']);
        return redirect()->route('tu.surat-masuk.index')
            ->with('success', 'Surat masuk berhasil diarsipkan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SuratMasuk $suratMasuk)
    {
        $this->authorize('delete', $suratMasuk);

        if ($suratMasuk->file_scan) {
            Storage::disk('public')->delete($suratMasuk->file_scan);
        }

        $suratMasuk->delete();

        return redirect()->route('tu.surat-masuk.index')
            ->with('success', 'Surat masuk berhasil dihapus.');
    }
}
