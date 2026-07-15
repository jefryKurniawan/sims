<?php

namespace App\Http\Controllers\Frontend;

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
use App\Models\ProfileSekolah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    private function commonData(): array
    {
        return [
            'footer' => Footer::first(),
            'jurusanM' => Jurusan::with('dataJurusan')->get(),
            'kegiatanM' => Kegiatan::all(),
        ];
    }

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
        $pengajar = User::with('userDetail')
            ->whereHas('userDetail')
            ->whereRaw('LOWER(role) = ?', ['guru'])
            ->get();

        return Inertia::render('Frontend/Index', array_merge([
            'berita' => $berita,
            'event' => $event,
            'slider' => $slider,
            'about' => $about,
            'video' => $video,
            'pengajar' => $pengajar,
        ], $this->commonData()));
    }

    public function profileSekolah()
    {
        $profile = \App\Models\ProfileSekolah::first(); // retrieve the single profile record

        return Inertia::render('Frontend/ProfileSekolah', array_merge(
            $this->commonData(),
            ['profileSekolah' => $profile]
        ));
    }

    public function visimisi()
    {
        $profile = \App\Models\ProfileSekolah::first();
        $visimisi = $profile ? [
            'visi' => $profile->visi,
            'misi' => $profile->misi,
            'moto' => $profile->moto ?? null,
        ] : null;

        return Inertia::render('Frontend/Visimisi', array_merge(
            $this->commonData(),
            ['visimisi' => $visimisi]
        ));
    }

    public function programStudi($slug)
    {
        $jurusan = Jurusan::with('dataJurusan')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Frontend/ProgramStudi', array_merge([
            'jurusan' => $jurusan,
        ], $this->commonData()));
    }

    public function programStudiIndex()
    {
        return Inertia::render('Frontend/ProgramStudiIndex', $this->commonData());
    }

    public function kegiatan($slug)
    {
        $kegiatan = Kegiatan::where('slug', $slug)->firstOrFail();

        return Inertia::render('Frontend/Kegiatan', array_merge([
            'kegiatan' => $kegiatan,
        ], $this->commonData()));
    }

    public function berita()
    {
        $beritas = Berita::with('kategori', 'user')
            ->active()
            ->orderBy('created_at', 'desc')
            ->paginate(9);

        return Inertia::render('Frontend/Berita', array_merge([
            'beritas' => $beritas,
        ], $this->commonData()));
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

        return Inertia::render('Frontend/DetailBerita', array_merge([
            'berita' => $berita,
            'recentBeritas' => $recentBeritas,
        ], $this->commonData()));
    }

    public function events()
    {
        $events = Events::orderBy('acara', 'desc')
            ->paginate(9);

        return Inertia::render('Frontend/Events', array_merge([
            'events' => $events,
        ], $this->commonData()));
    }

    public function detailEvent($slug)
    {
        $event = Events::where('slug', $slug)->firstOrFail();

        $relatedEvents = Events::where('id', '!=', $event->id)
            ->orderBy('acara', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Frontend/DetailEvent', array_merge([
            'event' => $event,
            'relatedEvents' => $relatedEvents,
        ], $this->commonData()));
    }

    public function alumni()
    {
        $alumni = Alumni::with('user')
            ->orderBy('tahun_lulus', 'desc')
            ->paginate(12);

        $totalAlumni = Alumni::count();
        $alumniByYear = Alumni::selectRaw('tahun_lulus, COUNT(*) as count')
            ->groupBy('tahun_lulus')
            ->orderBy('tahun_lulus', 'desc')
            ->get();

        return Inertia::render('Frontend/Alumni', array_merge([
            'alumni' => $alumni,
            'stats' => [
                'total' => $totalAlumni,
                'byYear' => $alumniByYear,
            ],
        ], $this->commonData()));
    }

    public function tracerStudy()
    {
        return Inertia::render('Frontend/TracerStudy', $this->commonData());
    }

    public function forum()
    {
        return Inertia::render('Frontend/Forum', $this->commonData());
    }

    public function donasi()
    {
        return Inertia::render('Frontend/Donasi', $this->commonData());
    }
}