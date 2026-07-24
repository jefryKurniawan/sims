<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KalenderAkademik extends Model
{
    protected $table = "kalender_akademik";
    protected $fillable = ['tanggal', 'kegiatan', 'keterangan', 'semester', 'tahun_ajaran'];

    protected function casts(): array
    {
        return ['tanggal' => 'date'];
    }
}