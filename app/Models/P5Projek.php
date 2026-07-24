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
            ['id' => 'beriman_bertaqwa', 'nama_dimensi' => 'Beriman, Bertaqwa kepada Tuhan YME, dan Berakhlak Mulia'],
            ['id' => 'berkebinekaan_global', 'nama_dimensi' => 'Berkebinekaan Global'],
            ['id' => 'bergotong_royong', 'nama_dimensi' => 'Bergotong Royong'],
            ['id' => 'mandiri', 'nama_dimensi' => 'Mandiri'],
            ['id' => 'bernalar_kritis', 'nama_dimensi' => 'Bernalar Kritis'],
            ['id' => 'kreatif', 'nama_dimensi' => 'Kreatif'],
        ];
    }
}
