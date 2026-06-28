<?php

namespace App\Http\Controllers\Admin\Spmb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SpmbRanking;
use App\Models\SpmbApplicant;

class SpmbRankingController extends Controller
{
    public function index()
    {
        $data = SpmbRanking::with('spmbApplicant.user')->orderBy('rank', 'asc')->get();
        return response()->json($data);
    }

    public function show(string $id)
    {
        $rank = SpmbRanking::with('spmbApplicant.user')->findOrFail($id);
        return response()->json($rank);
    }

    // Optional: store/update if needed; but ranking is usually calculated.
}