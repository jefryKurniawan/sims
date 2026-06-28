<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class GktController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $gurus = Guru::with('user')->paginate(10);
        return response()->json($gurus);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // For API, we can return empty or metadata; not used.
        return response()->json(['message' => 'Use POST to store']);
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
            'nama' => 'required|string|max:255',
            'nip' => 'nullable|string|max:20|unique:guru,nip',
            'nuptk' => 'nullable|string|max:20|unique:guru,nuptk',
            'pendidikan' => 'nullable|string',
            'jabatan' => 'nullable|string',
            'bidang_studi' => 'nullable|string',
            'user_id' => ['nullable', 'exists:users,id'],
        ]);

        $guru = Guru::create($validated);

        return response()->json($guru, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $guru = Guru::with('user')->findOrFail($id);
        return response()->json($guru);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // For API, return the resource for edit form.
        $guru = Guru::findOrFail($id);
        return response()->json($guru);
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
        $guru = Guru::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'nip' => ['sometimes', 'nullable', 'string', 'max:20', Rule::unique('guru')->ignore($guru->id, 'nip')],
            'nuptk' => ['sometimes', 'nullable', 'string', 'max:20', Rule::unique('guru')->ignore($guru->id, 'nuptk')],
            'pendidikan' => 'sometimes|nullable|string',
            'jabatan' => 'sometimes|nullable|string',
            'bidang_studi' => 'sometimes|nullable|string',
            'user_id' => ['sometimes', 'nullable', 'exists:users,id'],
        ]);

        $guru->update($validated);

        return response()->json($guru);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $guru = Guru::findOrFail($id);
        $guru->delete();

        return response()->json(['message' => 'Guru deleted']);
    }
}
