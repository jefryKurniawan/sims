<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\TracerStudy;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TracerStudyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TracerStudy::with(['alumni', 'alumni.user'])
            ->orderBy('created_at', 'desc');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search by nama atau instansi
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('nama_instansi', 'like', "%{$search}%");
            });
        }

        $tracerStudies = $query->paginate(15);

        // Stats
        $stats = [
            'total' => TracerStudy::count(),
            'bekerja' => TracerStudy::where('status', 'bekerja')->count(),
            'kuliah' => TracerStudy::where('status', 'kuliah')->count(),
            'wirausaha' => TracerStudy::where('status', 'wirausaha')->count(),
            'tidak_bekerja' => TracerStudy::where('status', 'tidak_bekerja')->count(),
        ];

        return inertia('Admin/TracerStudy/Index', [
            'tracerStudies' => $tracerStudies,
            'filters' => [
                'status' => $request->status,
                'search' => $request->search,
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $alumis = Alumni::with('user')->orderBy('nama_lengkap')->get();

        return inertia('Admin/TracerStudy/Create', [
            'alumis' => $alumis,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'alumni_id' => 'required|exists:alumni,id',
            'nama_lengkap' => 'required|string|max:255',
            'jenjang_pendidikan' => 'nullable|string|max:100',
            'nama_instansi' => 'nullable|string|max:255',
            'bidang_studi' => 'nullable|string|max:100',
            'tahun_lulus' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'status' => ['required', Rule::in(['kuliah', 'bekerja', 'wirausaha', 'tidak_bekerja'])],
            'alamat' => 'nullable|string|max:500',
            'no_telp' => 'nullable|string|max:20',
            'linkedin' => 'nullable|url|max:255',
        ]);

        TracerStudy::create($validated);

        return redirect()->route('admin.tracer-study.index')
            ->with('success', 'Data tracer study berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TracerStudy $tracerStudy)
    {
        $tracerStudy->load(['alumni', 'alumni.user']);

        return inertia('Admin/TracerStudy/Show', [
            'tracerStudy' => $tracerStudy,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TracerStudy $tracerStudy)
    {
        $tracerStudy->load('alumni');
        $alumis = Alumni::with('user')->orderBy('nama_lengkap')->get();

        return inertia('Admin/TracerStudy/Edit', [
            'tracerStudy' => $tracerStudy,
            'alumis' => $alumis,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TracerStudy $tracerStudy)
    {
        $validated = $request->validate([
            'alumni_id' => 'required|exists:alumni,id',
            'nama_lengkap' => 'required|string|max:255',
            'jenjang_pendidikan' => 'nullable|string|max:100',
            'nama_instansi' => 'nullable|string|max:255',
            'bidang_studi' => 'nullable|string|max:100',
            'tahun_lulus' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'status' => ['required', Rule::in(['kuliah', 'bekerja', 'wirausaha', 'tidak_bekerja'])],
            'alamat' => 'nullable|string|max:500',
            'no_telp' => 'nullable|string|max:20',
            'linkedin' => 'nullable|url|max:255',
        ]);

        $tracerStudy->update($validated);

        return redirect()->route('admin.tracer-study.index')
            ->with('success', 'Data tracer study berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TracerStudy $tracerStudy)
    {
        $tracerStudy->delete();

        return redirect()->route('admin.tracer-study.index')
            ->with('success', 'Data tracer study berhasil dihapus.');
    }
}