<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsesmenSumatif extends Model
{
    use HasFactory;

    protected $table = 'asesmen_sumatif';

    protected $fillable = [
        'rapor_siswa_id',
        'rapor_mapel_id',
        'jenis',
        'tanggal',
        'nilai',
        'soal_file_url',
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
}
