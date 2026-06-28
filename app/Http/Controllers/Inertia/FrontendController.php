<?php

namespace App\Http\Controllers\Inertia;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Events;
use App\Models\ImageSlider;
use App\Models\About;
use App\Models\Video;
use App\Models\Footer;
use App\Models\Jurusan;
use App\Models\Kegiatan;
use App\Models\User;
use App\Models\Alumni;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {
        $berita = Berita::with('kategori', 'user')
            ->active()
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        $event = Events::orderBy('acara', 'asc')
            ->limit(3)
            ->get();

        $slider = ImageSlider::orderBy('created_at', 'desc')->get();
        $about = About::first();
        $video = Video::first();
        $footer = Footer::first();
        $jurusanM = Jurusan::with('dataJurusan')->get();
        $kegiatanM = Kegiatan::all();
        $pengajar = User::with('userDetail')
            ->whereHas('userDetail')
            ->where('role', 'guru')
            ->get();

        return Inertia::render('Frontend/Index', [
            'berita' => $berita,
            'event' => $event,
            'slider' => $slider,
            'about' => $about,
            'video' => $video,
            'footer' => $footer,
            'jurusanM' => $jurusanM,
            'kegiatanM' => $kegiatanM,
            'pengajar' => $pengajar,
        ]);
    }

    public function profileSekolah()
    {
        return Inertia::render('Frontend/ProfileSekolah');
    }

    public function visimisi()
    {
        return Inertia::render('Frontend/Visimisi');
    }

    public function programStudi($slug)
    {
        $jurusan = Jurusan::with('dataJurusan')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Frontend/ProgramStudi', [
            'jurusan' => $jurusan,
        ]);
    }

    public function kegiatan($slug)
    {
        $kegiatan = Kegiatan::where('slug', $slug)->firstOrFail();

        return Inertia::render('Frontend/Kegiatan', [
            'kegiatan' => $kegiatan,
        ]);
    }

    public function berita()
    {
        $beritas = Berita::with('kategori', 'user')
            ->active()
            ->orderBy('created_at', 'desc')
            ->paginate(9);

        return Inertia::render('Frontend/Berita', [
            'beritas' => $beritas,
        ]);
    }

    public function detailBerita($slug)
    {
        $berita = Berita::with('kategori', 'user')
            ->active()
            ->where('slug', $slug)
            ->firstOrFail();

        $recentBeritas = Berita::with('kategori')
            ->active()
            ->where('id', '!=', $berita->id)
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get();

        return Inertia::render('Frontend/DetailBerita', [
            'berita' => $berita,
            'recentBeritas' => $recentBeritas,
        ]);
    }

    public function events()
    {
        $events = Events::orderBy('acara', 'desc')
            ->paginate(9);

        return Inertia::render('Frontend/Events', [
            'events' => $events,
        ]);
    }

    public function detailEvent($slug)
    {
        $event = Events::where('slug', $slug)->firstOrFail();

        $relatedEvents = Events::where('id', '!=', $event->id)
            ->orderBy('acara', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Frontend/DetailEvent', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }

    public function alumni()
    {
        $alumni = Alumni::with('user')
            ->orderBy('tahun_lulus', 'desc')
            ->paginate(12);

        // Get stats
        $totalAlumni = Alumni::count();
        $alumniByYear = Alumni::selectRaw('tahun_lulus, COUNT(*) as count')
            ->groupBy('tahun_lulus')
            ->orderBy('tahun_lulus', 'desc')
            ->get();

        return Inertia::render('Frontend/Alumni', [
            'alumni' => $alumni,
            'stats' => [
                'total' => $totalAlumni,
                'byYear' => $alumniByYear,
            ],
        ]);
    }

    public function tracerStudy()
    {
        return Inertia::render('Frontend/TracerStudy');
    }

    public function forum()
    {
        return Inertia::render('Frontend/Forum');
    }

    public function donasi()
    {
        return Inertia::render('Frontend/Donasi');
    }
}