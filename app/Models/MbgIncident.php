<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MbgIncident extends Model
{
    protected $table = 'mbg_incidents';

    protected $fillable = [
        'tanggal', 'kategori', 'deskripsi', 'foto_bukti',
        'severity', 'status', 'tindak_lanjut', 'dilapor_oleh', 'ditangani_oleh',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
        ];
    }

    public function pelapor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dilapor_oleh');
    }

    public function penangan(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ditangani_oleh');
    }
}
