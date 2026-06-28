<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpmbAfirmasi extends Model
{
    use HasFactory;

    protected $table = 'spmb_afirmasi';

    protected $fillable = [
        'spmb_applicant_id',
        'jenis_afirmasi',
        'nomor_kartu',
        'nama_penerima_kartu',
        'penghasilan_ortu_per_bulan',
        'keterangan',
        'bukti_file_path',
        'terverifikasi',
    ];

    protected $casts = [
        'penghasilan_ortu_per_bulan' => 'decimal:2',
        'terverifikasi' => 'boolean',
    ];

    public function applicant()
    {
        return $this->belongsTo(SpmbApplicant::class, 'spmb_applicant_id');
    }
}
