<?php

namespace App\Http\Controllers\Erapor;

use App\Http\Controllers\Controller;
use App\Models\DapodikSyncLog;
use App\Models\DapodikIdMapping;
use App\Services\DapodikSyncService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DapodikSyncController extends Controller
{
    protected DapodikSyncService $syncService;

    public function __construct(DapodikSyncService $syncService)
    {
        $this->syncService = $syncService;
    }

    public function index()
    {
        $syncLogs = DapodikSyncLog::latest()
            ->limit(50)
            ->get()
            ->map(fn($log) => [
                'id' => $log->id,
                'entity_type' => $log->entity_type,
                'entity_id' => $log->entity_id,
                'action' => $log->action,
                'status' => $log->status,
                'synced_at' => $log->synced_at?->diffForHumans(),
                'created_at' => $log->created_at->diffForHumans(),
            ]);

        $stats = [
            'pending' => DapodikSyncLog::where('status', 'pending')->count(),
            'success' => DapodikSyncLog::where('status', 'success')->whereDate('created_at', today())->count(),
            'failed' => DapodikSyncLog::where('status', 'failed')->whereDate('created_at', today())->count(),
            'total_mappings' => DapodikIdMapping::count(),
        ];

        $mappings = DapodikIdMapping::withCount(['syncLogs' => function($q) {
            $q->where('status', 'success');
        }])
        ->latest('last_sync_at')
        ->limit(20)
        ->get()
        ->map(fn($m) => [
            'entity_type' => $m->entity_type,
            'local_id' => $m->local_id,
            'dapodik_id' => $m->dapodik_id,
            'last_sync_at' => $m->last_sync_at?->diffForHumans(),
        ]);

        return Inertia::render('Erapor/DapodikSync', [
            'syncLogs' => $syncLogs,
            'stats' => $stats,
            'mappings' => $mappings,
        ]);
    }

    public function syncManual(Request $request)
    {
        $request->validate([
            'entity_type' => 'required|in:siswa,guru,rombongan_belajar',
            'entity_id' => 'required_if:entity_type,siswa,guru|integer',
        ]);

        try {
            $log = $this->syncService->logSyncRequest(
                $request->entity_type,
                $request->entity_id ?? 0,
                'create'
            );

            // Process immediately (for demo, should be queued in production)
            $this->syncService->processPendingSyncs(1);
            
            $log->refresh();

            return back()->with('success', 'Sinkronisasi berhasil');
        } catch (\Exception $e) {
            return back()->with('error', 'Sinkronisasi gagal: ' . $e->getMessage());
        }
    }

    public function pullData(Request $request)
    {
        $request->validate([
            'entity_type' => 'required|in:siswa,guru,rombongan_belajar',
        ]);

        try {
            $data = $this->syncService->pullData($request->entity_type);
            
            return back()->with('success', "Data {$request->entity_type} berhasil ditarik dari Dapodik");
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menarik data: ' . $e->getMessage());
        }
    }
}
