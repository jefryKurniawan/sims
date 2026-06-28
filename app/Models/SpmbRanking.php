<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpmbRanking extends Model
{
    use HasFactory;

    protected $table = 'spmb_ranking';

    protected $fillable = [
        'spmb_applicant_id',
        'skor_nilai_rapor',
        'skor_tka',
        'skor_prestasi',
        'skor_afirmasi',
        'skor_total',
        'ranking',
        'jalur_seleksi',
        'lulus_seleksi',
    ];

    protected $casts = [
        'skor_nilai_rapor' => 'decimal:2',
        'skor_tka' => 'decimal:2',
        'skor_prestasi' => 'decimal:2',
        'skor_afirmasi' => 'decimal:2',
        'skor_total' => 'decimal:2',
        'ranking' => 'integer',
        'lulus_seleksi' => 'boolean',
    ];

    public function applicant()
    {
        return $this->belongsTo(SpmbApplicant::class, 'spmb_applicant_id');
    }
}
