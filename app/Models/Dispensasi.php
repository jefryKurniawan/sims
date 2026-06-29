<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dispensasi extends Model
{
    use HasFactory;

    protected $table = 'dispensasi';

    protected $fillable = [
        'siswa_id',
        'jenis',
        'nominal',
        'tanggal_mulai',
        'tanggal_selesai',
        'keterangan',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}