<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsesmenFormatif extends Model
{
    use HasFactory;

    protected $table = 'asesmen_formatif';

    protected $fillable = [
        'rapor_siswa_id',
        'rapor_mapel_id',
        'tujuan_pembelajaran_id',
        'jenis',
        'tanggal',
        'nilai',
        'catatan',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'nilai' => 'decimal:2',
    ];

    public function raporSiswa()
    {
        return $this->belongsTo(RaporSiswa::class);
    }

    public function raporMapel()
    {
        return $this->belongsTo(RaporMapel::class);
    }

    public function tujuanPembelajaran()
    {
        return $this->belongsTo(TujuanPembelajaran::class);
    }
}
