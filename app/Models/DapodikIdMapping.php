<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DapodikIdMapping extends Model
{
    use HasFactory;

    protected $table = 'dapodik_id_mapping';

    protected $fillable = [
        'entity_type',
        'local_id',
        'dapodik_id',
        'last_sync_at',
    ];

    protected $casts = [
        'last_sync_at' => 'datetime',
    ];

    public static function entityTypes(): array
    {
        return [
            'siswa' => 'Siswa',
            'guru' => 'Guru',
            'rombongan_belajar' => 'Rombongan Belajar',
        ];
    }

    public static function findByLocalId(string $entityType, int $localId): ?self
    {
        return static::where('entity_type', $entityType)
            ->where('local_id', $localId)
            ->first();
    }

    public static function findByDapodikId(string $entityType, string $dapodikId): ?self
    {
        return static::where('entity_type', $entityType)
            ->where('dapodik_id', $dapodikId)
            ->first();
    }

    public function updateSyncTime()
    {
        $this->update(['last_sync_at' => now()]);
    }
}
