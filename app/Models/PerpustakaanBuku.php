<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerpustakaanBuku extends Model
{
    protected $table = 'perpustakaan_buku';

    protected $fillable = [
        'judul', 'penulis', 'penerbit', 'tahun_terbit', 'isbn', 'kategori', 'deskripsi',
        'jumlah_halaman', 'jumalah_stok', 'lokasi_rak', 'file_cover', 'tersedia'
    ];

    protected $casts = [
        'tahun_terbit' => 'integer',
        'jumlah_halaman' => 'integer',
        'jumalah_stok' => 'integer',
        'tersedia' => 'boolean',
    ];
}