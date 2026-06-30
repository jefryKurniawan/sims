<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prestasi extends Model
{    protected $table = 'prestasi'; // ponytail: explicit table name to match migration
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'jenis',
        'prestasi',
        'tingkat',
        'tanggal',
        'bukti',
        'keterangan',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
