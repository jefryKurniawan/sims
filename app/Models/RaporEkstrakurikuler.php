<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaporEkstrakurikuler extends Model
{
    use HasFactory;

    protected $table = 'rapor_ekstrakurikuler';

    protected $fillable = [
        'rapor_siswa_id',
        'nama_ekskul',
        'nilai',
        'deskripsi',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($ekskul) {
            AuditLog::log(
                $ekskul,
                'created',
                null,
                $ekskul->toArray(),
                'Ekstrakurikuler rapor dibuat: ' . $ekskul->nama_ekskul
            );
        });

        static::updated(function ($ekskul) {
            AuditLog::log(
                $ekskul,
                'updated',
                $ekskul->getOriginal(),
                $ekskul->getChanges(),
                'Ekstrakurikuler rapor diupdate: ' . $ekskul->nama_ekskul
            );
        });
    }

    public function raporSiswa()
    {
        return $this->belongsTo(RaporSiswa::class, 'rapor_siswa_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['rapor_siswa_id']) && $filters['rapor_siswa_id']) {
            $query->where('rapor_siswa_id', $filters['rapor_siswa_id']);
        }

        return $query;
    }
}
