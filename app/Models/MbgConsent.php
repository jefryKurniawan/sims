<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MbgConsent extends Model
{
    protected $table = 'mbg_consents';

    protected $fillable = [
        'siswa_id', 'status', 'tanggal_persetujuan', 'file_path', 'catatan_ortu',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_persetujuan' => 'datetime',
        ];
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }
}
