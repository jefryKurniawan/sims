<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BukuIndukSiswa extends Model
{
    use HasFactory;

    protected $table = 'buku_induk_siswa';

    protected $fillable = [
        'siswa_id',
        'agama',
        'anak_ke',
        'jumlah_saudara',
        'bahasa_sehari_hari',
        'transportasi',
        'jarak_rumah_sekolah_km',
        'hobi',
        'cita_cita',
        'berat_badan_kg',
        'tinggi_badan_cm',
        'kebutuhan_khusus',
    ];

    protected $casts = [
        'jarak_rumah_sekolah_km' => 'decimal:2',
        'berat_badan_kg' => 'decimal:2',
        'tinggi_badan_cm' => 'decimal:2',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
