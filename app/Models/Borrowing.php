<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Borrowing extends Model
{
    protected $table = 'peminjaman';

    protected $fillable = [
        'anggota_id',
        'buku_id',
        'tanggal_pinjam',
        'tanggal_jatuh_tempo',
        'tanggal_kembali',
        'denda',
        'status',
    ];

    protected $casts = [
        'tanggal_pinjam' => 'date',
        'tanggal_jatuh_tempo' => 'date',
        'tanggal_kembali' => 'date',
        'denda' => 'decimal:2',
    ];

    public function anggota()
    {
        return $this->belongsTo(Member::class, 'anggota_id');
    }

    public function book()
    {
        return $this->belongsTo(Book::class, 'buku_id');
    }

    // For backward compatibility with existing code that uses 'members' relation
    public function members()
    {
        return $this->belongsTo(Member::class, 'anggota_id');
    }
}
