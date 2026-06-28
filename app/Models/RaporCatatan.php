<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaporCatatan extends Model
{
    use HasFactory;

    protected $table = 'rapor_catatan';

    protected $fillable = [
        'rapor_siswa_id',
        'catatan_wali_kelas',
        'catatan_ortu',
        'tinggi_badan',
        'berat_badan',
        'jumlah_sakit',
        'jumlah_izin',
        'jumlah_alpha',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($catatan) {
            AuditLog::log(
                $catatan,
                'created',
                null,
                $catatan->toArray(),
                'Catatan rapor dibuat'
            );
        });

        static::updated(function ($catatan) {
            AuditLog::log(
                $catatan,
                'updated',
                $catatan->getOriginal(),
                $catatan->getChanges(),
                'Catatan rapor diupdate'
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
