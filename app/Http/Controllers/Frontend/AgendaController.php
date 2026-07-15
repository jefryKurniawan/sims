<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{
    /**
     * Public agenda calendar - shows 'kegiatan' kategori berita grouped by month
     */
    public function index(Request $request)
    {
        $month = $request->input('month'); // format: Y-m
        $year = $request->input('year');   // format: Y

        $query = Berita::published()
            ->where('kategori', 'kegiatan')
            ->select('id', 'title', 'slug', 'content', 'thumbnail', 'published_at')
            ->orderBy('published_at', 'asc');

        // Filter by month if provided
        if ($month) {
            $query->whereMonth('published_at', (int) $month);
        }

        if ($year) {
            $query->whereYear('published_at', (int) $year);
        }

        $agenda = $query->get();

        // Group by month
        $grouped = $agenda->groupBy(function ($item) {
            return Carbon::parse($item->published_at)->format('Y-m');
        })->map(function ($items, $monthKey) {
            $date = Carbon::parse($monthKey . '-01');
            return [
                'month' => $monthKey,
                'month_name' => $date->translatedFormat('F Y'),
                'items' => $items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'slug' => $item->slug,
                        'thumbnail' => $item->thumbnail,
                        'excerpt' => Str::limit(strip_tags($item->content), 150),
                        'date' => Carbon::parse($item->published_at)->format('d M Y'),
                        'date_raw' => Carbon::parse($item->published_at)->format('Y-m-d'),
                    ];
                }),
            ];
        })->values();

        // Get available months for filter
        $months = Berita::published()
            ->where('kategori', 'kegiatan')
            ->select('published_at')
            ->orderBy('published_at')
            ->get()
            ->map(fn($item) => Carbon::parse($item->published_at)->format('Y-m'))
            ->unique()
            ->values();

        return Inertia::render('Frontend/Agenda/Index', [
            'agenda' => $grouped,
            'months' => $months,
            'currentMonth' => $month,
            'currentYear' => $year,
        ]);
    }
}