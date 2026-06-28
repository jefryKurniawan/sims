<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TracerStudy extends Model
{
    use HasFactory;

    protected $fillable = [
        'alumni_id',
        'nama_lengkap',
        'jenjang_pendidikan',
        'nama_instansi',
        'bidang_studi',
        'tahun_lulus',
        'status',
        'alamat',
        'no_telp',
        'linkedin',
    ];

    public function alumni()
    {
        return $this->belongsTo(Alumni::class);
    }
}