<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaporKelas extends Model
{
    use HasFactory;

    protected $table = 'rapor_kelas';

    protected $fillable = [
        'nama_kelas',
        'tingkat',
        'jurusan_id',
        'tahun_ajaran',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($kelas) {
            AuditLog::log(
                $kelas,
                'created',
                null,
                $kelas->toArray(),
                'Kelas rapor baru: ' . $kelas->nama_kelas
            );
        });

        static::updated(function ($kelas) {
            AuditLog::log(
                $kelas,
                'updated',
                $kelas->getOriginal(),
                $kelas->getChanges(),
                'Kelas rapor diupdate: ' . $kelas->nama_kelas
            );
        });
    }

    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class, 'jurusan_id');
    }

    public function raporSiswa()
    {
        return $this->hasMany(RaporSiswa::class, 'rapor_kelas_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where('nama_kelas', 'like', "%{$search}%");
        }

        if (isset($filters['tingkat']) && $filters['tingkat']) {
            $query->where('tingkat', $filters['tingkat']);
        }

        if (isset($filters['tahun_ajaran']) && $filters['tahun_ajaran']) {
            $query->where('tahun_ajaran', $filters['tahun_ajaran']);
        }

        return $query;
    }
}
