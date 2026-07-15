<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $table = 'anggota';

    protected $fillable = [
        'user_id',
        'nama',
        'nik_nisn',
        'alamat',
        'no_hp',
        'email',
        'tanggal_bergabung',
        'foto',
        'status',
        'kode_anggota',
    ];

    protected $casts = [
        'tanggal_bergabung' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class, 'anggota_id');
    }
}
