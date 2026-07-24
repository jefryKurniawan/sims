<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Models\NisnSyncLog;
use App\Services\DapodikSyncService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NisnManagementController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Siswa::class);

        $query = Siswa::with(['jurusan', 'kelasAktif.kelas'])
            ->latest('created_at');

        // Filter by NISN status
        if ($request->filled('nisn_status')) {
            switch ($request->nisn_status) {
                case 'empty':
                    $query->whereNull('nisn')
                        ->orWhere('nisn', '');
                    break;
                case 'duplicate':
                    $query->whereRaw('nisn IN (
                        SELECT nisn FROM siswa WHERE nisn IS NOT NULL AND nisn != ""
                        GROUP BY nisn HAVING COUNT(*) > 1
                    )');
                    break;
                case 'invalid_format':
                    $query->whereRaw('(nisn IS NOT NULL AND nisn != "" AND (LENGTH(nisn) != 10 OR nisn NOT REGEXP "^[0-9]{10}$"))');
                    break;
                case 'valid':
                    $query->whereRaw('nisn IS NOT NULL AND nisn != "" AND LENGTH(nisn) = 10 AND nisn REGEXP "^[0-9]{10}$"')
                        ->whereRaw('nisn NOT IN (
                            SELECT nisn FROM siswa WHERE nisn IS NOT NULL AND nisn != ""
                            GROUP BY nisn HAVING COUNT(*) > 1
                        )');
                    break;
            }
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('nis', 'like', "%{$search}%")
                    ->orWhere('no_hp', 'like', "%{$search}%");
            });
        }

        // Jurusan filter
        if ($request->filled('jurusan_id')) {
            $query->where('jurusan_id', $request->jurusan_id);
        }

        $siswa = $query->paginate(20)->withQueryString();

        // Stats
        $stats = [
            'total' => Siswa::count(),
            'empty' => Siswa::whereNull('nisn')->orWhere('nisn', '')->count(),
            'duplicate' => Siswa::whereRaw('nisn IN (
                SELECT nisn FROM siswa WHERE nisn IS NOT NULL AND nisn != ""
                GROUP BY nisn HAVING COUNT(*) > 1
            )')->count(),
            'invalid_format' => Siswa::whereRaw('(nisn IS NOT NULL AND nisn != "" AND (LENGTH(nisn) != 10 OR nisn NOT REGEXP "^[0-9]{10}$"))')->count(),
        ];

        $jurusanList = \App\Models\Jurusan::where('is_active', '1')->get(['id', 'nama']);

        return inertia('Admin/TU/NisnManagement/Index', [
            'siswa' => $siswa,
            'filters' => $request->only(['search', 'nisn_status', 'jurusan_id']),
            'stats' => $stats,
            'jurusanList' => $jurusanList,
        ]);
    }

    public function show(Siswa $siswa)
    {
        $this->authorize('view', $siswa);

        $siswa->load(['jurusan', 'kelasAktif.kelas', 'nisnSyncLogs' => fn($q) => $q->latest()->limit(10)]);

        return inertia('Admin/TU/NisnManagement/Show', [
            'siswa' => $siswa,
        ]);
    }

    public function verify(Request $request, Siswa $siswa)
    {
        $this->authorize('update', $siswa);

        $issues = [];

        // Check if NISN is empty
        if (empty($siswa->nisn)) {
            $issues[] = 'NISN kosong';
        }

        // Check format
        if (!empty($siswa->nisn) && (!preg_match('/^[0-9]{10}$/', $siswa->nisn) || strlen($siswa->nisn) !== 10)) {
            $issues[] = 'Format NISN tidak valid (harus 10 digit angka)';
        }

        // Check duplicate
        if (!empty($siswa->nisn)) {
            $duplicateCount = Siswa::where('nisn', $siswa->nisn)
                ->where('id', '!=', $siswa->id)
                ->count();
            if ($duplicateCount > 0) {
                $issues[] = "NISN duplikat dengan {$duplicateCount} siswa lain";
            }
        }

        return response()->json([
            'valid' => empty($issues),
            'issues' => $issues,
            'nisn' => $siswa->nisn,
        ]);
    }

    public function regenerate(Request $request, Siswa $siswa)
    {
        $this->authorize('update', $siswa);

        $request->validate([
            'reason' => 'required|string|max:255',
        ]);

        $oldNisn = $siswa->nisn;
        $newNisn = Siswa::generateNisn();

        DB::transaction(function () use ($siswa, $oldNisn, $newNisn, $request) {
            // Log the change
            NisnSyncLog::create([
                'siswa_id' => $siswa->id,
                'old_nisn' => $oldNisn,
                'new_nisn' => $newNisn,
                'action' => 'regenerate',
                'reason' => $request->reason,
                'performed_by' => auth()->id(),
            ]);

            $siswa->update(['nisn' => $newNisn]);
        });

        return redirect()->back()->with('success', "NISN siswa {$siswa->nama_lengkap} berhasil digenerate: {$oldNisn} → {$newNisn}");
    }

    public function bulkRegenerate(Request $request)
    {
        $this->authorize('update', Siswa::class);

        $request->validate([
            'siswa_ids' => 'required|array|min:1',
            'siswa_ids.*' => 'exists:siswa,id',
            'reason' => 'required|string|max:255',
        ]);

        $siswaList = Siswa::whereIn('id', $request->siswa_ids)->get();
        $updated = 0;

        DB::transaction(function () use ($siswaList, $request, &$updated) {
            foreach ($siswaList as $siswa) {
                $oldNisn = $siswa->nisn;
                $newNisn = Siswa::generateNisn();

                NisnSyncLog::create([
                    'siswa_id' => $siswa->id,
                    'old_nisn' => $oldNisn,
                    'new_nisn' => $newNisn,
                    'action' => 'bulk_regenerate',
                    'reason' => $request->reason,
                    'performed_by' => auth()->id(),
                ]);

                $siswa->update(['nisn' => $newNisn]);
                $updated++;
            }
        });

        return redirect()->back()->with('success', "Berhasil regenerate NISN untuk {$updated} siswa");
    }

    public function syncDapodik(Request $request)
    {
        $this->authorize('update', Siswa::class);

        $service = app(DapodikSyncService::class);

        try {
            // Pull student data from Dapodik
            $response = $service->pullData('siswa');

            // Dapodik API may return array directly or wrapped in 'data' key
            $siswaData = is_array($response) && isset($response['data']) ? $response['data'] : $response;

            if (!is_array($siswaData) || empty($siswaData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada data siswa yang diterima dari Dapodik. Periksa koneksi dan kredensial.',
                    'data' => $response,
                ], 400);
            }

            $synced = 0;
            $errors = [];

            foreach ($siswaData as $dapodikSiswa) {
                try {
                    // Match by NISN
                    $nisn = $dapodikSiswa['nisn'] ?? null;
                    $npsn = $dapodikSiswa['npsn'] ?? null;
                    $nama = $dapodikSiswa['nama'] ?? null;

                    if (!$nisn || !$nama) {
                        continue;
                    }

                    // Find local student by NISN
                    $localSiswa = Siswa::where('nisn', $nisn)->first();

                    if ($localSiswa) {
                        // Update NISN if different (Dapodik is source of truth)
                        if ($localSiswa->nisn !== $nisn) {
                            $oldNisn = $localSiswa->nisn;
                            $localSiswa->update(['nisn' => $nisn]);

                            NisnSyncLog::create([
                                'siswa_id' => $localSiswa->id,
                                'old_nisn' => $oldNisn,
                                'new_nisn' => $nisn,
                                'action' => 'dapodik_sync',
                                'reason' => 'Sinkronisasi dari Dapodik',
                                'performed_by' => auth()->id(),
                            ]);
                        }
                        $synced++;
                    } else {
                        // Log unmapped students for review
                        $errors[] = "NISN {$nisn} ({$nama}) tidak ditemukan di sistem lokal";
                    }
                } catch (\Exception $e) {
                    $errors[] = "Error processing " . ($dapodikSiswa['nama'] ?? 'unknown') . ": {$e->getMessage()}";
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Sinkronisasi Dapodik selesai. {$synced} siswa disinkronisasi.",
                'syncResult' => [
                    'synced' => $synced,
                    'total_received' => count($siswaData),
                    'unmapped' => $errors,
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Dapodik NISN sync failed: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Sinkronisasi gagal: ' . $e->getMessage(),
            ], 500);
        }
    }
}