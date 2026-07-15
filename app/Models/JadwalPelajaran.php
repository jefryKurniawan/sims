<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalPelajaran extends Model
{
    use HasFactory;

    protected $table = 'jadwal_pelajaran';

    protected $fillable = [
        'nama_mapel',
        'hari',
        'jam_ke',
        'jam_mulai',
        'jam_selesai',
        'kelas_id',
        'guru_id',
        'ruangan',
        'semester',
        'tahun_ajaran',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }
}
