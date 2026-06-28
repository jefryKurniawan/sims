<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SpmbConfig;
use App\Models\SpmbApplicant;
use App\Services\SpmbScoringService;
use App\Services\SpmbRankingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpmbRankingController extends Controller
{
    public function __construct(
        private SpmbScoringService $scoringService,
        private SpmbRankingService $rankingService,
    ) {}

    public function index(Request $request)
    {
        $configs = SpmbConfig::orderBy('tahun_ajaran', 'desc')->get();
        $jalur = $request->input('jalur');

        $rankings = $this->rankingService->getRankingByJalur($jalur);
        $statistik = $this->getStatistik();

        return Inertia::render('Admin/Spmb/Ranking/Index', [
            'rankings' => $rankings,
            'configs' => $configs,
            'filters' => $request->only(['jalur']),
            'statistik' => $statistik,
        ]);
    }

    public function proses(Request $request)
    {
        $validated = $request->validate([
            'config_id' => 'required|exists:spmb_config,id',
        ]);

        $result = $this->rankingService->prosesScoringDanRanking((int) $validated['config_id']);

        $this->rankingService->generateBeritaPengumuman((int) $validated['config_id']);

        return redirect()->route('spmb.ranking.index')
            ->with('success', "Scoring & ranking selesai: {$result['processed']} diproses, {$result['lulus']} lulus.");
    }

    public function hitungSkorIndividual(SpmbApplicant $spmbApplicant)
    {
        $skor = $this->scoringService->hitungSkorTotal($spmbApplicant->id);

        return response()->json($skor);
    }

    private function getStatistik(): array
    {
        $total = SpmbApplicant::count();
        $submitted = SpmbApplicant::where('status_pendaftaran', 'submitted')->count();
        $verifikasi = SpmbApplicant::where('status_pendaftaran', 'verifikasi_berkas')->count();
        $lulus = SpmbApplicant::where('status_pendaftaran', 'lulus_seleksi')->count();
        $diterima = SpmbApplicant::where('status_pendaftaran', 'diterima')->count();
        $ditolak = SpmbApplicant::where('status_pendaftaran', 'ditolak')->count();

        return [
            'total' => $total,
            'submitted' => $submitted,
            'verifikasi_berkas' => $verifikasi,
            'lulus_seleksi' => $lulus,
            'diterima' => $diterima,
            'ditolak' => $ditolak,
        ];
    }
}
