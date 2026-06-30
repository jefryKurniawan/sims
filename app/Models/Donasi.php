<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donasi extends Model
{
    use HasFactory;

    protected $table = 'donasis';

    protected $fillable = [
        'alumni_id',
        'nama_pendonor',
        'email',
        'no_telp',
        'nominal',
        'metode_pembayaran',
        'status',
        'tanggal_donasi',
        'keterangan',
        'anonym',
        'verified_at',
        'verified_by',
    ];

    protected $casts = [
        'nominal' => 'decimal:2',
        'tanggal_donasi' => 'date',
        'verified_at' => 'datetime',
        'anonym' => 'boolean',
    ];

    public function alumni()
    {
        return $this->belongsTo(Alumni::class);
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function scopeVerified($query)
    {
        return $query->where('status', 'verified');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeTotalDonasi($query)
    {
        return $query->selectRaw('SUM(nominal) as total')->where('status', 'verified');
    }
}
