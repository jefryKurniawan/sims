<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BeritaRequest;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BeritaController extends Controller
{
    /**
     * Admin Index - with tabs for status filtering
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Berita::class);

        $status = $request->input('status', 'all');
        $search = $request->input('search');
        $kategori = $request->input('kategori');

        $query = Berita::with(['penulis', 'approvedBy', 'createdBy'])
            ->orderBy('created_at', 'desc');

        // Role-based filtering
        if (!$request->user()->hasAnyRole(['Admin', 'Humas'])) {
            $query->where(function ($q) use ($request) {
                $q->where('penulis_id', $request->user()->id)
                  ->orWhere('created_by', $request->user()->id);
            });
        }

        // Status filter
        if ($status !== 'all') {
            $query->where('status', $status);
        }

        // Search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Kategori filter
        if ($kategori) {
            $query->where('kategori', $kategori);
        }

        $berita = $query->paginate(15)->withQueryString();

        // Stats for tabs
        $stats = [
            'all' => Berita::count(),
            'draft' => Berita::where('status', 'draft')->count(),
            'pending' => Berita::where('status', 'pending')->count(),
            'published' => Berita::where('status', 'published')->count(),
            'rejected' => Berita::where('status', 'rejected')->count(),
        ];

        // Filter stats based on role
        if (!$request->user()->hasAnyRole(['Admin', 'Humas'])) {
            $userId = $request->user()->id;
            $stats = [
                'all' => Berita::where(function ($q) use ($userId) {
                    $q->where('penulis_id', $userId)->orWhere('created_by', $userId);
                })->count(),
                'draft' => Berita::where(function ($q) use ($userId) {
                    $q->where('penulis_id', $userId)->orWhere('created_by', $userId);
                })->where('status', 'draft')->count(),
                'pending' => Berita::where(function ($q) use ($userId) {
                    $q->where('penulis_id', $userId)->orWhere('created_by', $userId);
                })->where('status', 'pending')->count(),
                'published' => Berita::where(function ($q) use ($userId) {
                    $q->where('penulis_id', $userId)->orWhere('created_by', $userId);
                })->where('status', 'published')->count(),
                'rejected' => Berita::where(function ($q) use ($userId) {
                    $q->where('penulis_id', $userId)->orWhere('created_by', $userId);
                })->where('status', 'rejected')->count(),
            ];
        }

        $kategoriOptions = ['pengumuman', 'kegiatan', 'artikel'];

        return Inertia::render('Admin/Website/Berita/Index', [
            'berita' => $berita,
            'filters' => $request->only(['status', 'search', 'kategori']),
            'stats' => $stats,
            'kategoriOptions' => $kategoriOptions,
            'statusOptions' => ['all', 'draft', 'pending', 'published', 'rejected'],
        ]);
    }

    /**
     * Show form for creating new berita
     */
    public function create()
    {
        $this->authorize('create', Berita::class);

        return Inertia::render('Admin/Website/Berita/Create', [
            'kategoriOptions' => ['pengumuman', 'kegiatan', 'artikel'],
            'isPenulis' => auth()->user()->hasRole('Penulis'),
        ]);
    }

    /**
     * Store new berita
     */
    public function store(BeritaRequest $request)
    {
        $this->authorize('create', Berita::class);

        $data = $request->validated();
        $data['slug'] = Str::slug($request->title);
        $data['created_by'] = auth()->id();
        $data['penulis_id'] = auth()->id(); // Set penulis for all roles

        // Status handling based on role
        if (auth()->user()->hasAnyRole(['Admin', 'Humas'])) {
            $data['status'] = $request->input('status', 'published');
            if ($data['status'] === 'published') {
                $data['published_at'] = now();
                $data['approved_by'] = auth()->id();
            }
        } else {
            // Penulis always creates as draft
            $data['status'] = 'draft';
        }

        if ($request->hasFile('thumbnail')) {
            $image = $request->file('thumbnail');
            $name = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/images/berita', $name);
            $data['thumbnail'] = $name;
        }

        Berita::create($data);

        return redirect()->route('admin.berita.index')
            ->with('message', 'Berita berhasil ditambahkan.')
            ->with('type', 'success');
    }

    /**
     * Show form for editing berita
     */
    public function edit(Berita $berita)
    {
        $this->authorize('update', $berita);

        return Inertia::render('Admin/Website/Berita/Edit', [
            'berita' => $berita->load(['penulis', 'approvedBy']),
            'kategoriOptions' => ['pengumuman', 'kegiatan', 'artikel'],
            'isPenulis' => auth()->user()->hasRole('Penulis'),
            'canSubmit' => auth()->user()->hasRole('Penulis') && $berita->status === 'draft',
            'canApprove' => auth()->user()->hasAnyRole(['Admin', 'Humas']) && $berita->status === 'pending',
            'canReject' => auth()->user()->hasAnyRole(['Admin', 'Humas']) && $berita->status === 'pending',
        ]);
    }

    /**
     * Update berita
     */
    public function update(BeritaRequest $request, Berita $berita)
    {
        $this->authorize('update', $berita);

        $data = $request->validated();
        $data['slug'] = Str::slug($request->title);

        // Handle status for Admin/Humas
        if (auth()->user()->hasAnyRole(['Admin', 'Humas'])) {
            if ($request->filled('status')) {
                $data['status'] = $request->status;
                if ($data['status'] === 'published' && $berita->status !== 'published') {
                    $data['published_at'] = now();
                    $data['approved_by'] = auth()->id();
                } elseif ($berita->status === 'published' && $data['status'] !== 'published') {
                    $data['published_at'] = null;
                    $data['approved_by'] = null;
                }
            }
        }

        if ($request->hasFile('thumbnail')) {
            if ($berita->thumbnail) {
                Storage::delete('public/images/berita/' . $berita->thumbnail);
            }
            $image = $request->file('thumbnail');
            $name = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/images/berita', $name);
            $data['thumbnail'] = $name;
        } else {
            unset($data['thumbnail']);
        }

        $berita->update($data);

        return redirect()->route('admin.berita.index')
            ->with('message', 'Berita berhasil diperbarui.')
            ->with('type', 'success');
    }

    /**
     * Submit berita for approval (Penulis only)
     */
    public function submit(Request $request, Berita $berita)
    {
        $this->authorize('submit', $berita);

        $berita->update([
            'status' => 'pending',
        ]);

        return back()->with('message', 'Berita dikirim untuk persetujuan Humas.')
            ->with('type', 'success');
    }

    /**
     * Approve berita (Admin/Humas only)
     */
    public function approve(Request $request, Berita $berita)
    {
        $this->authorize('approve', $berita);

        $berita->update([
            'status' => 'published',
            'published_at' => now(),
            'approved_by' => auth()->id(),
            'rejection_reason' => null,
        ]);

        return back()->with('message', 'Berita berhasil disetujui dan dipublish.')
            ->with('type', 'success');
    }

    /**
     * Reject berita (Admin/Humas only)
     */
    public function reject(Request $request, Berita $berita)
    {
        $this->authorize('reject', $berita);

        $validated = $request->validate([
            'rejection_reason' => 'required|string|max:1000',
        ]);

        $berita->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['rejection_reason'],
            'published_at' => null,
            'approved_by' => null,
        ]);

        return back()->with('message', 'Berita ditolak.')
            ->with('type', 'success');
    }

    /**
     * Delete berita
     */
    public function destroy(Berita $berita)
    {
        $this->authorize('delete', $berita);

        if ($berita->thumbnail) {
            Storage::delete('public/images/berita/' . $berita->thumbnail);
        }

        $berita->delete();

        return redirect()->route('admin.berita.index')
            ->with('message', 'Berita berhasil dihapus.')
            ->with('type', 'success');
    }

    /**
     * Export berita to CSV (Admin only)
     */
    public function export(Request $request)
    {
        $this->authorize('viewAny', Berita::class);

        $query = Berita::with(['penulis', 'approvedBy'])
            ->orderBy('created_at', 'desc');

        if (!$request->user()->hasAnyRole(['Admin', 'Humas'])) {
            $query->where(function ($q) use ($request) {
                $q->where('penulis_id', $request->user()->id)
                  ->orWhere('created_by', $request->user()->id);
            });
        }

        $berita = $query->get();

        $filename = 'berita_export_' . now()->format('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($berita) {
            $file = fopen('php://output', 'w');
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF)); // UTF-8 BOM

            fputcsv($file, ['ID', 'Judul', 'Slug', 'Kategori', 'Status', 'Penulis', 'Disetujui Oleh', 'Dipublish Pada', 'Dibuat Pada']);

            foreach ($berita as $item) {
                fputcsv($file, [
                    $item->id,
                    $item->title,
                    $item->slug,
                    $item->kategori,
                    $item->status,
                    $item->penulis?->name ?? $item->createdBy?->name ?? '-',
                    $item->approvedBy?->name ?? '-',
                    $item->published_at?->format('Y-m-d H:i:s') ?? '-',
                    $item->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}