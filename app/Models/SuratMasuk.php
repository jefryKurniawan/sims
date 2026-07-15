<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SuratMasuk extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'surat_masuk';

    protected $fillable = [
        'no_agenda',
        'tanggal_terima',
        'no_surat',
        'tanggal_surat',
        'asal_surat',
        'perihal',
        'ringkasan',
        'file_scan',
        'disposisi_kepada',
        'disposisi_instruksi',
        'disposisi_batas_waktu',
        'status',
        'status_disposisi',
        'created_by',
    ];

    protected $casts = [
        'tanggal_terima' => 'date',
        'tanggal_surat' => 'date',
        'disposisi_batas_waktu' => 'date',
    ];

    public function disposisiKepada()
    {
        return $this->belongsTo(User::class, 'disposisi_kepada');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['status']) && $filters['status']) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('no_surat', 'like', "%{$search}%")
                  ->orWhere('asal_surat', 'like', "%{$search}%")
                  ->orWhere('perihal', 'like', "%{$search}%");
            });
        }

        if (isset($filters['tanggal_dari']) && $filters['tanggal_dari']) {
            $query->where('tanggal_terima', '>=', $filters['tanggal_dari']);
        }

        if (isset($filters['tanggal_sampai']) && $filters['tanggal_sampai']) {
            $query->where('tanggal_terima', '<=', $filters['tanggal_sampai']);
        }

        return $query;
    }
}
