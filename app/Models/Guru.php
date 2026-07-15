<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    use HasFactory;

    protected $table = 'guru';

    protected $fillable = [
        'nama_lengkap',
        'nuptk',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'agama',
        'alamat',
        'no_telp',
        'email',
        'jenis',
        'bidang_studi',
        'jabatan',
        'status_kepegawaian',
        'tanggal_masuk',
        'foto',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function absensis()
    {
        return $this->hasMany(AbsensiGuru::class);
    }

    public function absensiToday()
    {
        return $this->hasOne(AbsensiGuru::class)->where('tanggal', now()->toDateString());
    }
}
