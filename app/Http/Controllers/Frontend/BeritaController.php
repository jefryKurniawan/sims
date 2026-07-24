<?php

namespace App\Http\Controllers\Frontend;
use Illuminate\Support\Str;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeritaController extends Controller
{
    /**
     * Public list of published berita
     */
    public function index(Request $request)
    {
        $kategori = $request->input('kategori');
        $search = $request->input('search');

        $query = Berita::published()
            ->with(['penulis', 'approvedBy'])
            ->orderBy('published_at', 'desc');

        if ($kategori) {
            $query->where('kategori', $kategori);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $berita = $query->paginate(12)->withQueryString();

        return Inertia::render('Frontend/Berita/Index', [
            'berita' => $berita,
            'kategoriFilter' => $kategori,
            'search' => $search,
            'kategoriOptions' => ['pengumuman', 'kegiatan', 'artikel'],
        ]);
    }

    /**
     * Public detail page for published berita
     */
    public function show(string $slug)
    {
        $berita = Berita::published()
            ->where('slug', $slug)
            ->with(['penulis', 'approvedBy'])
            ->firstOrFail();

        // Get related articles (same category, published, not current)
        $related = Berita::published()
            ->where('kategori', $berita->kategori)
            ->where('id', '!=', $berita->id)
            ->with('penulis')
            ->latest('published_at')
            ->take(3)
            ->get();

        // SEO meta
        $meta = [
            'title' => $berita->title,
            'description' => Str::limit(strip_tags($berita->content), 160),
            'image' => $berita->thumbnail ? asset('storage/images/berita/' . $berita->thumbnail) : asset('images/default-og.jpg'),
            'url' => url('/berita/' . $berita->slug),
            'published_at' => $berita->published_at?->toISOString(),
        ];

        return Inertia::render('Frontend/Berita/Show', [
            'berita' => $berita,
            'related' => $related,
            'meta' => $meta,
        ]);
    }
}