<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MbgBast extends Model
{
    protected $table = 'mbg_basts';

    protected $fillable = [
        'tanggal', 'waktu_datang', 'waktu_terima',
        'porsi_dipesan', 'porsi_diterima',
        'nama_kurir', 'foto_bukti', 'catatan', 'status', 'created_by',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
            'waktu_datang' => 'datetime:H:i',
            'waktu_terima' => 'datetime:H:i',
        ];
    }

    public function organoleptik(): HasMany
    {
        return $this->hasMany(MbgOrganoleptik::class, 'bast_id');
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(MbgAttendance::class, 'bast_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
