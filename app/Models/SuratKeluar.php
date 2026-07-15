<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SuratKeluar extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'surat_keluar';

    protected $fillable = [
        'no_agenda',
        'tanggal_kirim',
        'no_surat',
        'tujuan',
        'perihal',
        'ringkasan',
        'file_scan',
        'penandatangan',
        'status',
        'created_by',
    ];

    protected $casts = [
        'tanggal_kirim' => 'date',
    ];

    public function createdBy(): BelongsTo
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
                  ->orWhere('tujuan', 'like', "%{$search}%")
                  ->orWhere('perihal', 'like', "%{$search}%");
            });
        }

        if (isset($filters['tanggal_kirim_from']) && $filters['tanggal_kirim_from']) {
            $query->where('tanggal_kirim', '>=', $filters['tanggal_kirim_from']);
        }

        if (isset($filters['tanggal_kirim_to']) && $filters['tanggal_kirim_to']) {
            $query->where('tanggal_kirim', '<=', $filters['tanggal_kirim_to']);
        }

        return $query;
    }
}
