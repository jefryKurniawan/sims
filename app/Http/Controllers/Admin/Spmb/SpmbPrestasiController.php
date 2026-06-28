<?php

namespace App\Http\Controllers\Admin\Spmb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SpmbPrestasi;

class SpmbPrestasiController extends Controller
{
    public function index()
    {
        $data = SpmbPrestasi::with('spmbApplicant')->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'spmb_applicant_id' => 'required|exists:spmb_applicants,id',
            'jenis_prestasi' => 'required|string',
            'prestasi' => 'required|string',
            'tingkat' => 'required|string',
            'tanggal' => 'nullable|date',
            'berkas' => 'nullable|string',
        ]);

        $prestasi = SpmbPrestasi::create($validated);
        return response()->json($prestasi, 201);
    }

    public function show(string $id)
    {
        $prestasi = SpmbPrestasi::with('spmbApplicant')->findOrFail($id);
        return response()->json($prestasi);
    }

    public function update(Request $request, string $id)
    {
        $prestasi = SpmbPrestasi::findOrFail($id);
        $validated = $request->validate([
            'jenis_prestasi' => 'sometimes|string',
            'prestasi' => 'sometimes|string',
            'tingkat' => 'sometimes|string',
            'tanggal' => 'sometimes|date',
            'berkas' => 'sometimes|string',
        ]);

        $prestasi->update($validated);
        return response()->json($prestasi);
    }

    public function destroy(string $id)
    {
        $prestasi = SpmbPrestasi::findOrFail($id);
        $prestasi->delete();
        return response()->json(['message' => 'Deleted']);
    }
}