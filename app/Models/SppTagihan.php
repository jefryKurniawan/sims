<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SppTagihan extends Model
{
    use HasFactory;

    protected $table = 'spp_tagihan';

    protected $fillable = [
        'siswa_id',
        'nominal',
        'status',
        'tanggal_jatuh_tempo',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_jatuh_tempo' => 'date',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}