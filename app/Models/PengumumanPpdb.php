<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengumumanPpdb extends Model
{
    use HasFactory;

    protected $table = 'pengumuman_ppdb';

    protected $fillable = [
        'judul',
        'isi',
        'tanggal_publish',
        'status',
    ];

    protected $casts = [
        'tanggal_publish' => 'datetime',
    ];
}
