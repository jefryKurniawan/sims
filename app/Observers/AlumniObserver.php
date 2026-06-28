<?php

namespace App\Observers;

use App\Models\Alumni;
use App\Models\Berita;
use Carbon\Carbon;

class AlumniObserver
{
    /**
     * Handle the Alumni "created" event.
     */
    public function created(Alumni $alumni)
    {
        // Create a berita when an alumni data is added
        $tahunLulus = $alumni->tahun_lulus ?? date('Y');
        $nama = optional($alumni->user)->name ?? 'Alumni';
        Berita::create([
            'judul' => 'Alumni Baru Tambah Daftar: ' . $nama . ' Lulus ' . $tahunLulus,
            'isi' => '<p>Selamat kepada ' . $nama . ' yang telah lulus tahun ' . $tahunLulus . ' dan resmi bergabung sebagai alumni sekolah.</p>',
            'tanggal' => now(),
            'sumber' => 'alumni',
            'status' => 'publish',
        ]);
    }
}