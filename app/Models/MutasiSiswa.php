<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MutasiSiswa extends Model
{
    use HasFactory;

    protected $table = 'mutasi_siswa';

    protected $fillable = [
        'siswa_id',
        'jenis',
        'tanggal_mutasi',
        'asal_sekolah',
        'sekolah_tujuan',
        'alasan',
        'no_sk',
        'dokumen_scan',
        'dicatat_oleh',
    ];

    protected $casts = [
        'tanggal_mutasi' => 'date',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function pencatat()
    {
        return $this->belongsTo(User::class, 'dicatat_oleh');
    }
}
