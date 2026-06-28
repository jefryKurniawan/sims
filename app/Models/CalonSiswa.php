<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CalonSiswa extends Model
{
    use HasFactory;

    protected $table = 'calon_siswa';

    protected $fillable = [
        'nisn',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'no_hp',
        'email',
        'nama_ortu',
        'no_hp_ortu',
        'asal_sekolah',
        'prestasi',
        'status',
        'tanggal_daftar',
        'biaya_pendaftaran',
        'bukti_bayar',
        'keputusan',
        'catatan',
        'guest_token',
        'edit_token',
        'guest_token_expires_at',
        'jurusan_id',
        'gelombang_id',
        'pilihan_jurusan_2',
        'nilai_rapot',
        'nilai_wawancara',
        'nilai_akhir',
        'tanggal_wawancara',
        'catatan_admin',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'tanggal_daftar' => 'date',
        'biaya_pendaftaran' => 'decimal:2',
        'nilai_rapot' => 'decimal:2',
        'nilai_wawancara' => 'decimal:2',
        'nilai_akhir' => 'decimal:2',
        'tanggal_wawancara' => 'datetime',
        'guest_token_expires_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($calonSiswa) {
            $calonSiswa->guest_token = Str::random(32);
            $calonSiswa->edit_token = Str::random(32);
            $calonSiswa->guest_token_expires_at = now()->addDays(3);
        });

        static::created(function ($calonSiswa) {
            AuditLog::log(
                $calonSiswa,
                'created',
                null,
                $calonSiswa->only($calonSiswa->getFillable()),
                'Pendaftaran baru: ' . $calonSiswa->nama_lengkap
            );
        });

        static::updated(function ($calonSiswa) {
            AuditLog::log(
                $calonSiswa,
                'updated',
                $calonSiswa->getOriginal(),
                $calonSiswa->getChanges(),
                'Data diperbarui: ' . $calonSiswa->nama_lengkap
            );
        });
    }

    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function gelombang()
    {
        return $this->belongsTo(Gelombang::class);
    }

    public function auditLogs()
    {
        return $this->morphMany(AuditLog::class, 'auditable');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['status']) && $filters['status']) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['keputusan']) && $filters['keputusan']) {
            $query->where('keputusan', $filters['keputusan']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%")
                  ->orWhere('no_hp', 'like', "%{$search}%");
            });
        }

        return $query;
    }
}