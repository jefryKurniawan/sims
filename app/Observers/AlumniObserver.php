<?php

namespace App\Observers;

use App\Models\Alumni;
use App\Models\Berita;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\KategoriBerita;
use App\Models\User;

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
        // Assign a system user (admin) as the creator if exists
        $admin = \App\Models\User::role('Admin')->first();
        Berita::create([
            'title' => 'Alumni Baru Tambah Daftar: ' . $nama . ' Lulus ' . $tahunLulus,
            'slug' => \Illuminate\Support\Str::slug('Alumni ' . $nama . ' ' . $tahunLulus),
            'content' => '<p>Selamat kepada ' . $nama . ' yang telah lulus tahun ' . $tahunLulus . ' dan resmi bergabung sebagai alumni sekolah.</p>',
            'is_active' => '0',
            'kategori_id' => \App\Models\KategoriBerita::first()->id ?? 1,
            'sumber' => 'alumni',
            'thumbnail' => 'default.jpg',
            'created_by' => $admin ? $admin->id : null,
            'status' => 'published',
        ]);
    }
}