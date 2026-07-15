<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Absensi extends Model
{
    use HasFactory;

    protected $table = 'absensis';

    protected $fillable = [
        'siswa_id', 'kelas_id', 'tanggal',
        'jam_masuk', 'jam_pulang',
        'status_masuk', 'status_pulang',
        'metode', 'lat', 'lng', 'keterangan', 'dicatat_oleh',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jam_masuk' => 'datetime:H:i',
        'jam_pulang' => 'datetime:H:i',
        'lat' => 'decimal:7',
        'lng' => 'decimal:7',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class);
    }

    public function dicatatOleh(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dicatat_oleh');
    }

    // Scope for today
    public function scopeToday($query)
    {
        return $query->where('tanggal', now()->toDateString());
    }

    // Scope for date range
    public function scopeDateRange($query, $from, $to)
    {
        return $query->whereBetween('tanggal', [$from, $to]);
    }

    // Scope for kelas
    public function scopeForKelas($query, $kelasId)
    {
        return $query->where('kelas_id', $kelasId);
    }

    // Auto-calculate status based on jam_masuk
    public static function calculateStatusMasuk($jamMasuk): string
    {
        $batasMasuk = '07:00'; // configurable via settings later
        return $jamMasuk && $jamMasuk > $batasMasuk ? 'terlambat' : 'hadir';
    }
}