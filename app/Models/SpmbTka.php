<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpmbTka extends Model
{
    use HasFactory;

    protected $table = 'spmb_tka';

    protected $fillable = [
        'spmb_applicant_id',
        'tanggal_tes',
        'nilai_matematika',
        'nilai_ipa',
        'nilai_ips',
        'nilai_bahasa_indonesia',
        'nilai_bahasa_inggris',
        'nilai_iq',
        'nilai_total',
        'ruangan',
        'peserta_nomor',
    ];

    protected $casts = [
        'tanggal_tes' => 'date',
        'nilai_matematika' => 'decimal:2',
        'nilai_ipa' => 'decimal:2',
        'nilai_ips' => 'decimal:2',
        'nilai_bahasa_indonesia' => 'decimal:2',
        'nilai_bahasa_inggris' => 'decimal:2',
        'nilai_iq' => 'decimal:2',
        'nilai_total' => 'decimal:2',
    ];

    public function applicant()
    {
        return $this->belongsTo(SpmbApplicant::class, 'spmb_applicant_id');
    }
}
