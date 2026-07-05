<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\HandlesImport;
use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumniController extends Controller
{
    use HandlesImport;

    /** Header template import Alumni. */
    protected function alumniHeaders(): array
    {
        return ['user_email', 'tahun_lulus', 'pekerjaan', 'alamat', 'no_telp', 'linkedin'];
    }

    public function template(Request $request)
    {
        $sample = [
            'user_email' => 'andi@example.com',
            'tahun_lulus' => '2022',
            'pekerjaan' => 'Software Engineer',
            'alamat' => 'Jl. Sudirman No. 12, Jakarta',
            'no_telp' => '081234567890',
            'linkedin' => 'linkedin.com/in/andiwijaya',
        ];

        return $this->downloadTemplate('alumni', $this->alumniHeaders(), $sample, $request->get('format', 'xlsx'));
    }

    public function import(Request $request)
    {
        $userMap = User::pluck('id', 'email');

        $result = $this->runImport($request, Alumni::class, function ($row) use ($userMap) {
            $email = trim(strtolower((string) ($row['user_email'] ?? '')));
            if ($email === '' || !isset($userMap[$email])) {
                return null;
            }
            $tahun = (int) ($row['tahun_lulus'] ?? 0);

            return [
                'user_id'    => $userMap[$email],
                'tahun_lulus' => $tahun > 1900 ? $tahun : null,
                'pekerjaan'  => (string) ($row['pekerjaan'] ?? ''),
                'alamat'     => (string) ($row['alamat'] ?? ''),
                'no_telp'    => (string) ($row['no_telp'] ?? ''),
                'linkedin'   => $this->nullable($row['linkedin'] ?? null),
            ];
        });

        return back()->with($this->importFlash($result));
    }

    private function nullable($v)
    {
        $v = trim((string) $v);
        return $v === '' ? null : $v;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alumni = Alumni::with('user')->paginate(15);

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
        $users = User::where('role', 'alumni')
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
            ->orWhere(function ($query) use ($assignedUserIds) {
                $query->whereNotIn('id', $assignedUserIds)
                      ->where('role', 'alumni');
            })
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