<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TujuanPembelajaran extends Model
{
    use HasFactory;

    protected $table = 'tujuan_pembelajaran';

    protected $fillable = [
        'rapor_mapel_id',
        'guru_id',
        'kode_tp',
        'deskripsi',
        'fase',
        'semester',
        'tahun_ajaran',
        'aktif',
    ];

    protected $casts = [
        'aktif' => 'boolean',
        'semester' => 'integer',
    ];

    public function raporMapel()
    {
        return $this->belongsTo(RaporMapel::class);
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }

    public function asesmenFormatif()
    {
        return $this->hasMany(AsesmenFormatif::class);
    }

    public function scopeAktif($query)
    {
        return $query->where('aktif', true);
    }

    public function scopeByFase($query, $fase)
    {
        return $query->where('fase', $fase);
    }

    public function scopeByTahunAjaran($query, $tahun)
    {
        return $query->where('tahun_ajaran', $tahun);
    }
}
