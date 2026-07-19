<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $fillable = [
        'tagihan_type', 'tagihan_id',
        'siswa_id', 'jenis_pembayaran',
        'jumlah_tagihan', 'jumlah_dibayar', 'sisa',
        'status', 'jatuh_tempo', 'keterangan',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function tagihan()
    {
        return $this->morphTo();
    }

    public function details()
    {
        return $this->hasMany(PembayaranDetail::class);
    }
}