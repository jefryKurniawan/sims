<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumniController extends Controller
{
    protected function alumniHeaders(): array
    {
        return [
            'user_id',
            'tahun_lulus',
            'pekerjaan',
            'alamat',
            'no_telp',
            'linkedin',
        ];
    }

    public function template(Request $request)
    {
        // ...
    }

    public function import(Request $request)
    {
        $userMap = User::whereHas('roles', fn($q) => $q->whereIn('name', ['Alumni', 'Siswa']))
            ->pluck('id', 'email');

        $result = $this->runImport($request, Alumni::class, function ($row) use ($userMap) {
            $row['user_id'] = $userMap[$row['user_email']] ?? null;
            unset($row['user_email']);
            return 'Alumni';
        });

        return back()->with($this->importFlash($result));
    }

    private function nullable($v)
    {
        return $v === '' || $v === null ? null : $v;
    }

    public function index()
    {
        $alumni = Alumni::with('user:id,name,email')->latest()->paginate(10);
        return Inertia::render('Admin/Alumni/Index', ['alumni' => $alumni]);
    }

    public function create()
    {
        $users = User::whereHas('roles', fn($q) => $q->where('name', 'Alumni'))
            ->orderBy('name')->get(['id', 'name', 'email']);
        return Inertia::render('Admin/Alumni/Create', ['users' => $users]);
    }

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

    public function show(Alumni $alumni)
    {
        $users = User::whereHas('roles', fn($q) => $q->where('name', 'Alumni'))
            ->orderBy('name')->get(['id', 'name', 'email']);

        return Inertia::render('Admin/Alumni/Show', [
            'alumni' => $alumni->load('user:id,name,email'),
            'users' => $users,
        ]);
    }

    public function edit(Alumni $alumni)
    {
        $assignedUserIds = Alumni::where('id', '!=', $alumni->id)->pluck('user_id');
        $users = User::whereHas('roles', fn($q) => $q->where('name', 'Alumni'))
            ->whereNotIn('id', $assignedUserIds)
            ->orWhere('id', $alumni->user_id)
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        return Inertia::render('Admin/Alumni/Edit', [
            'alumni' => $alumni,
            'users' => $users,
        ]);
    }

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

    public function destroy(Alumni $alumni)
    {
        $alumni->delete();
        return redirect()->route('alumni.index')
            ->with('success', 'Alumni berhasil dihapus.');
    }
}
