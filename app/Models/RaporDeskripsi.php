<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RaporDeskripsi extends Model
{
    use HasFactory;

    protected $table = 'rapor_deskripsi';

    protected $fillable = [
        'rapor_siswa_id',
        'rapor_mapel_id',
        'deskripsi_pengetahuan',
        'deskripsi_keterampilan',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($deskripsi) {
            AuditLog::log(
                $deskripsi,
                'created',
                null,
                $deskripsi->toArray(),
                'Deskripsi rapor dibuat'
            );
        });

        static::updated(function ($deskripsi) {
            AuditLog::log(
                $deskripsi,
                'updated',
                $deskripsi->getOriginal(),
                $deskripsi->getChanges(),
                'Deskripsi rapor diupdate'
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

        return $query;
    }
}
