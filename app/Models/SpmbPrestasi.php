<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpmbPrestasi extends Model
{
    use HasFactory;

    protected $table = 'spmb_prestasi';

    protected $fillable = [
        'spmb_applicant_id',
        'jenis_prestasi',
        'nama_prestasi',
        'jenis_lomba',
        'tingkat_prestasi',
        'peringkat',
        'jenis_penghargaan',
        'tanggal_prestasi',
        'penyelenggara',
        'keterangan',
        'bukti_file_path',
    ];

    protected $casts = [
        'tanggal_prestasi' => 'date',
        'peringkat' => 'integer',
    ];

    public function applicant()
    {
        return $this->belongsTo(SpmbApplicant::class, 'spmb_applicant_id');
    }
}
