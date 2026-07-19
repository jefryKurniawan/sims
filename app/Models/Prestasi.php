<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prestasi extends Model
{
    protected $table = 'prestasi';
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'jenis',
        'kategori',
        'prestasi',
        'tingkat',
        'poin_prestasi',
        'verified_by_bk',
        'verified_by',
        'tanggal',
        'bukti',
        'keterangan',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'verified_by_bk' => 'boolean',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function verifikator()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
