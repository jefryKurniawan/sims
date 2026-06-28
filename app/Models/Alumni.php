<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    use HasFactory;

    protected $table = 'alumni';

    protected $fillable = [
        'user_id',
        'tahun_lulus',
        'pekerjaan',
        'alamat',
        'no_telp',
        'linkedin',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}