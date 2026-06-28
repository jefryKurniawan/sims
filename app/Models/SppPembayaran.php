<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SppPembayaran extends Model
{
    use HasFactory;

    protected $table = 'spp_pembayaran';

    protected $fillable = [
        'siswa_id',
        'spp_tagihan_id',
        'nominal',
        'tanggal_pembayaran',
        'metode',
        'status',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_pembayaran' => 'date',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function sppTagihan()
    {
        return $this->belongsTo(SppTagihan::class);
    }
}