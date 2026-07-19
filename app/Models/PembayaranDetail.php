<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PembayaranDetail extends Model
{
    protected $table = 'pembayaran_detail';

    protected $fillable = [
        'pembayaran_id', 'jumlah', 'tanggal_bayar', 'metode',
        'bukti_pembayaran', 'dicatat_oleh',
        'status_verifikasi', 'catatan_verifikasi', 'diverifikasi_pada',
    ];

    public function pembayaran()
    {
        return $this->belongsTo(Pembayaran::class);
    }

    public function pencatat()
    {
        return $this->belongsTo(User::class, 'dicatat_oleh');
    }
}