<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'buku';

    protected $fillable = [
        'judul',
        'penulis',
        'penerbit',
        'isbn',
        'tahun_terbit',
        'jumlah_halaman',
        'stok',
        'kode_rak',
        'deskripsi',
        'cover_image',
    ];

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class, 'buku_id');
    }
}
