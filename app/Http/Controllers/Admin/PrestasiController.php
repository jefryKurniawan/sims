<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PrestasiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prestasi = Prestasi::with('siswa.user')->paginate(10);
        return response()->json($prestasi);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // For API, we can return metadata like list of siswa for dropdown.
        $siswa = Siswa::select('id', 'nama_lengkap')->get();
        return response()->json(['siswa_options' => $siswa]);
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
            'jenis' => ['required', Rule::in(['akademik', 'nonakademik'])],
            'prestasi' => 'required|string|max:255',
            'tingkat' => 'required|string|max:100',
            'tanggal' => 'required|date',
            'bukti' => 'nullable|string|max:255', // path to file
            'keterangan' => 'nullable|string',
        ]);

        $prestasi = Prestasi::create($validated);

        return response()->json($prestasi, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $prestasi = Prestasi::with('siswa.user')->findOrFail($id);
        return response()->json($prestasi);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $prestasi = Prestasi::findOrFail($id);
        return response()->json($prestasi);
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
        $prestasi = Prestasi::findOrFail($id);

        $validated = $request->validate([
            'siswa_id' => 'sometimes|required|exists:siswa,id',
            'jenis' => ['sometimes', Rule::in(['akademik', 'nonakademik'])],
            'prestasi' => 'sometimes|string|max:255',
            'tingkat' => 'sometimes|string|max:100',
            'tanggal' => 'sometimes|date',
            'bukti' => 'sometimes|nullable|string|max:255',
            'keterangan' => 'sometimes|nullable|string',
        ]);

        $prestasi->update($validated);

        return response()->json($prestasi);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $prestasi = Prestasi::findOrFail($id);
        $prestasi->delete();

        return response()->json(['message' => 'Prestasi deleted']);
    }
}
