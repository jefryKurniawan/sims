<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaporNilai extends Model
{
    use HasFactory;

    protected $table = 'rapor_nilai';

    protected $fillable = [
        'rapor_siswa_id',
        'rapor_mapel_id',
        'nilai_pengetahuan',
        'predikat_pengetahuan',
        'nilai_keterampilan',
        'predikat_keterampilan',
        'nilai_akhir',
    ];

    protected $casts = [
        'nilai_pengetahuan' => 'decimal:2',
        'nilai_keterampilan' => 'decimal:2',
        'nilai_akhir' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($nilai) {
            AuditLog::log(
                $nilai,
                'created',
                null,
                $nilai->toArray(),
                'Nilai rapor dibuat'
            );
        });

        static::updated(function ($nilai) {
            AuditLog::log(
                $nilai,
                'updated',
                $nilai->getOriginal(),
                $nilai->getChanges(),
                'Nilai rapor diupdate'
            );
        });
    }

    public function raporSiswa()
    {
        return $this->belongsTo(RaporSiswa::class, 'rapor_siswa_id');
    }

    public function raporMapel()
    {
        return $this->belongsTo(RaporMapel::class, 'rapor_mapel_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['rapor_siswa_id']) && $filters['rapor_siswa_id']) {
            $query->where('rapor_siswa_id', $filters['rapor_siswa_id']);
        }

        if (isset($filters['rapor_mapel_id']) && $filters['rapor_mapel_id']) {
            $query->where('rapor_mapel_id', $filters['rapor_mapel_id']);
        }

        return $query;
    }
}
