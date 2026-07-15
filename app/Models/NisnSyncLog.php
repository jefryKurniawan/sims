<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NisnSyncLog extends Model
{
    use HasFactory;

    protected $table = 'nisn_sync_logs';

    protected $fillable = [
        'siswa_id',
        'action',
        'old_nisn',
        'new_nisn',
        'status',
        'message',
        'executor_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }

    public function executor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'executor_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['status']) && $filters['status']) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['action']) && $filters['action']) {
            $query->where('action', $filters['action']);
        }

        if (isset($filters['siswa_id']) && $filters['siswa_id']) {
            $query->where('siswa_id', $filters['siswa_id']);
        }

        if (isset($filters['date_from']) && $filters['date_from']) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to']) && $filters['date_to']) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
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