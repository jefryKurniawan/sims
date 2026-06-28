<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpmbNilaiAkademik extends Model
{
    use HasFactory;

    protected $table = 'spmb_nilai_akademik';

    protected $fillable = [
        'spmb_applicant_id',
        'mata_pelajaran',
        'semester',
        'nilai_rapor',
    ];

    protected $casts = [
        'nilai_rapor' => 'decimal:2',
    ];

    public function applicant()
    {
        return $this->belongsTo(SpmbApplicant::class, 'spmb_applicant_id');
    }
}
