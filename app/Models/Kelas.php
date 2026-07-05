<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $table = 'kelas';

    protected $fillable = [
        'nama_kelas',
        'tingkat',
        'jurusan_id',
        'wali_kelas_id',
        'ruangan',
        'kapasitas',
        'tahun_ajaran',
    ];

    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function waliKelas()
    {
        return $this->belongsTo(Guru::class, 'wali_kelas_id');
    }

    public function siswa()
    {
        return $this->hasMany(SiswaKelas::class)->with('siswa');
    }

    public function siswaAktif()
    {
        return $this->hasMany(SiswaKelas::class)
            ->where('siswa_kelas.status', 'aktif')
            ->with('siswa');
    }
}