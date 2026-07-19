<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SppTagihan extends Model
{
    use HasFactory;
    use SoftDeletes;

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

    public function pembayaran()
    {
        return $this->hasMany(SppPembayaran::class, 'spp_tagihan_id');
    }
}
