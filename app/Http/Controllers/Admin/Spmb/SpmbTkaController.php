<?php

namespace App\Http\Controllers\Admin\Spmb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SpmbTka;

class SpmbTkaController extends Controller
{
    public function index()
    {
        $data = SpmbTka::with('spmbApplicant')->get();
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'spmb_applicant_id' => 'required|exists:spmb_applicants,id',
            'nilai_tka' => 'required|numeric',
            'jumlah_soal' => 'nullable|integer',
            'waktu_pengerjaan' => 'nullable|string',
        ]);

        $tka = SpmbTka::create($validated);
        return response()->json($tka, 201);
    }

    public function show(string $id)
    {
        $tka = SpmbTka::with('spmbApplicant')->findOrFail($id);
        return response()->json($tka);
    }

    public function update(Request $request, string $id)
    {
        $tka = SpmbTka::findOrFail($id);
        $validated = $request->validate([
            'nilai_tka' => 'sometimes|numeric',
            'jumlah_soal' => 'sometimes|integer',
            'waktu_pengerjaan' => 'sometimes|string',
        ]);

        $tka->update($validated);
        return response()->json($tka);
    }

    public function destroy(string $id)
    {
        $tka = SpmbTka::findOrFail($id);
        $tka->delete();
        return response()->json(['message' => 'Deleted']);
    }
}