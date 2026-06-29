<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumniController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alumni = Alumni::with('user')->get();

        return Inertia::render('Admin/Alumni/Index', [
            'alumni' => $alumni,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $assignedUserIds = Alumni::pluck('user_id');
        $users = User::where('role', 'Alumni')
            ->orWhereNotIn('id', $assignedUserIds)
            ->get(['id', 'name', 'email']);

        return Inertia::render('Admin/Alumni/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'tahun_lulus' => 'required|integer|between:1900,2100',
            'pekerjaan' => 'required|string|max:255',
            'alamat' => 'required|string',
            'no_telp' => 'required|string|max:20',
            'linkedin' => 'nullable|url|max:255',
        ]);

        Alumni::create($validated);

        return redirect()->route('alumni.index')
            ->with('success', 'Alumni berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alumni $alumni)
    {
        $assignedUserIds = Alumni::where('id', '!=', $alumni->id)->pluck('user_id');
        $users = User::where('id', $alumni->user_id)
            ->orWhereNotIn('id', $assignedUserIds)
            ->get(['id', 'name', 'email']);

        return Inertia::render('Admin/Alumni/Edit', [
            'alumni' => $alumni,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alumni $alumni)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'tahun_lulus' => 'required|integer|between:1900,2100',
            'pekerjaan' => 'required|string|max:255',
            'alamat' => 'required|string',
            'no_telp' => 'required|string|max:20',
            'linkedin' => 'nullable|url|max:255',
        ]);

        $alumni->update($validated);

        return redirect()->route('alumni.index')
            ->with('success', 'Alumni berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alumni $alumni)
    {
        $alumni->delete();

        return redirect()->route('alumni.index')
            ->with('success', 'Alumni berhasil dihapus.');
    }
}