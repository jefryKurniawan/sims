<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AbsensiGuru extends Model
{
    use HasFactory;

    protected $table = 'absensi_guru';

    protected $fillable = [
        'guru_id', 'tanggal',
        'jam_masuk', 'jam_pulang',
        'status', 'metode', 'lat', 'lng', 'keterangan',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jam_masuk' => 'datetime:H:i',
        'jam_pulang' => 'datetime:H:i',
        'lat' => 'decimal:7',
        'lng' => 'decimal:7',
    ];

    public function guru(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }

    public function scopeToday($query)
    {
        return $query->where('tanggal', now()->toDateString());
    }

    public function scopeDateRange($query, $from, $to)
    {
        return $query->whereBetween('tanggal', [$from, $to]);
    }
}