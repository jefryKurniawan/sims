<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class P5Projek extends Model
{
    use HasFactory;

    protected $table = 'p5_projek';

    protected $fillable = [
        'nama_projek',
        'tema',
        'deskripsi',
        'tingkat',
        'jurusan_id',
        'tanggal_mulai',
        'tanggal_selesai',
        'nama_guru_pengampu',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
    ];

    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function p5Nilai()
    {
        return $this->hasMany(P5Nilai::class);
    }

    public static function dimensiChoices(): array
    {
        return [
            'beriman_bertaqwa' => 'Beriman, Bertaqwa kepada Tuhan YME, dan Berakhlak Mulia',
            'berkebinekaan_global' => 'Berkebinekaan Global',
            'bergotong_royong' => 'Bergotong Royong',
            'mandiri' => 'Mandiri',
            'bernalar_kritis' => 'Bernalar Kritis',
            'kreatif' => 'Kreatif',
        ];
    }
}
