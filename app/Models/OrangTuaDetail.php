<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrangTuaDetail extends Model
{
    use HasFactory;

    protected $table = 'orang_tua_detail';

    protected $fillable = [
        'siswa_id',
        'hubungan',
        'nama_lengkap',
        'nik',
        'npwp',
        'tanggal_lahir',
        'pendidikan_terakhir',
        'pekerjaan',
        'penghasilan_bulanan',
        'status_pernikahan',
        'jumlah_tanggungan',
        'no_hp',
        'email',
        'alamat',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
