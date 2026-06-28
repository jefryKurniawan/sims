<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class P5Nilai extends Model
{
    use HasFactory;

    protected $table = 'p5_nilai';

    protected $fillable = [
        'p5_projek_id',
        'rapor_siswa_id',
        'dimensi',
        'predikat',
        'catatan',
    ];

    public static function predikatChoices(): array
    {
        return [
            'A' => 'Sangat Baik',
            'B' => 'Baik',
            'C' => 'Cukup',
            'D' => 'Perlu Bimbingan',
        ];
    }

    public static function dimensiChoices(): array
    {
        return P5Projek::dimensiChoices();
    }

    public function p5Projek()
    {
        return $this->belongsTo(P5Projek::class);
    }

    public function raporSiswa()
    {
        return $this->belongsTo(RaporSiswa::class);
    }
}
