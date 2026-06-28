<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaporMapel extends Model
{
    use HasFactory;

    protected $table = 'rapor_mapel';

    protected $fillable = [
        'nama_mapel',
        'kkm',
        'kelompok',
        'rapor_kelas_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($mapel) {
            AuditLog::log(
                $mapel,
                'created',
                null,
                $mapel->toArray(),
                'Mata pelajaran baru: ' . $mapel->nama_mapel
            );
        });

        static::updated(function ($mapel) {
            AuditLog::log(
                $mapel,
                'updated',
                $mapel->getOriginal(),
                $mapel->getChanges(),
                'Mata pelajaran diupdate: ' . $mapel->nama_mapel
            );
        });
    }

    public function raporKelas()
    {
        return $this->belongsTo(RaporKelas::class, 'rapor_kelas_id');
    }

    public function raporNilai()
    {
        return $this->hasMany(RaporNilai::class, 'rapor_mapel_id');
    }

    public function raporDeskripsi()
    {
        return $this->hasMany(RaporDeskripsi::class, 'rapor_mapel_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where('nama_mapel', 'like', "%{$search}%");
        }

        if (isset($filters['kelompok']) && $filters['kelompok']) {
            $query->where('kelompok', $filters['kelompok']);
        }

        if (isset($filters['rapor_kelas_id']) && $filters['rapor_kelas_id']) {
            $query->where('rapor_kelas_id', $filters['rapor_kelas_id']);
        }

        return $query;
    }
}
