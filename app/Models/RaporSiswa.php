<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaporSiswa extends Model
{
    use HasFactory;

    protected $table = 'rapor_siswa';

    protected $fillable = [
        'siswa_id',
        'rapor_kelas_id',
        'semester',
        'tahun_ajaran',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($raporSiswa) {
            AuditLog::log(
                $raporSiswa,
                'created',
                null,
                $raporSiswa->toArray(),
                'Rapor siswa baru'
            );
        });

        static::updated(function ($raporSiswa) {
            AuditLog::log(
                $raporSiswa,
                'updated',
                $raporSiswa->getOriginal(),
                $raporSiswa->getChanges(),
                'Rapor siswa diupdate'
            );
        });
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function raporKelas()
    {
        return $this->belongsTo(RaporKelas::class, 'rapor_kelas_id');
    }

    public function raporNilai()
    {
        return $this->hasMany(RaporNilai::class, 'rapor_siswa_id');
    }

    public function raporDeskripsi()
    {
        return $this->hasMany(RaporDeskripsi::class, 'rapor_siswa_id');
    }

    public function raporEkstrakurikuler()
    {
        return $this->hasMany(RaporEkstrakurikuler::class, 'rapor_siswa_id');
    }

    public function raporCatatan()
    {
        return $this->hasOne(RaporCatatan::class, 'rapor_siswa_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['siswa_id']) && $filters['siswa_id']) {
            $query->where('siswa_id', $filters['siswa_id']);
        }

        if (isset($filters['rapor_kelas_id']) && $filters['rapor_kelas_id']) {
            $query->where('rapor_kelas_id', $filters['rapor_kelas_id']);
        }

        if (isset($filters['semester']) && $filters['semester']) {
            $query->where('semester', $filters['semester']);
        }

        if (isset($filters['tahun_ajaran']) && $filters['tahun_ajaran']) {
            $query->where('tahun_ajaran', $filters['tahun_ajaran']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->whereHas('siswa', function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%");
            });
        }

        return $query;
    }
}
