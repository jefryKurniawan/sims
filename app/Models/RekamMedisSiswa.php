<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekamMedisSiswa extends Model
{
    use HasFactory;

    protected $table = 'rekam_medis_siswa';

    protected $fillable = [
        'siswa_id',
        'golongan_darah',
        'alergi',
        'penyakit_terdahulu',
        'obat_rutin',
        'nama_dokter',
        'rumah_sakit_rujukan',
        'kontak_darurat_nama',
        'kontak_darurat_hp',
        'kontak_darurat_hubungan',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
