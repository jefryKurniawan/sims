<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konseling extends Model
{
    use HasFactory;

    protected $table = 'konseling';

    protected $fillable = [
        'siswa_id',
        'guru_bk_id',
        'tanggal',
        'topik',
        'catatan',
        'tindak_lanjut',
        'status',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function guruBk()
    {
        return $this->belongsTo(Guru::class, 'guru_bk_id');
    }
}
