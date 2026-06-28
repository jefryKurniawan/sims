<?php

namespace App\Http\Controllers\Admin\Spmb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SpmbAfirmasi;

class SpmbAfirmasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = SpmbAfirmasi::with('spmbApplicant')->get();
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'spmb_applicant_id' => 'required|exists:spmb_applicants,id',
            'jenis' => 'required|in:kip/pkh/kjp_plus/yayasan/kemiskinan',
            'keterangan' => 'nullable|string',
        ]);

        $afirmasi = SpmbAfirmasi::create($validated);
        return response()->json($afirmasi, 201);
    }

    /**
     * Show the specified resource.
     */
    public function show(string $id)
    {
        $afirmasi = SpmbAfirmasi::with('spmbApplicant')->findOrFail($id);
        return response()->json($afirmasi);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $afirmasi = SpmbAfirmasi::findOrFail($id);
        $validated = $request->validate([
            'jenis' => 'sometimes|in:kip/pkh/kjp_plus/yayasan/kemiskinan',
            'keterangan' => 'nullable|string',
        ]);

        $afirmasi->update($validated);
        return response()->json($afirmasi);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $afirmasi = SpmbAfirmasi::findOrFail($id);
        $afirmasi->delete();
        return response()->json(['message' => 'Deleted']);
    }
}