<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gelombang extends Model
{
    use HasFactory;

    protected $table = 'gelombang';

    protected $fillable = [
        'nama',
        'tanggal_mulai',
        'tanggal_selesai',
        'kuota',
        'biaya_pendaftaran',
        'is_active',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
        'biaya_pendaftaran' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function calonSiswa()
    {
        return $this->hasMany(CalonSiswa::class);
    }
}
