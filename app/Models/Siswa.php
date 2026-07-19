<?php

namespace App\Models;

use App\Models\AuditLog;
use App\Models\NisnSyncLog;
use AppModelsAbsensi;
use AppModelsPelanggaran;
use AppModelsKonseling;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Siswa extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'siswa';

    protected $fillable = [
        'user_id',
        'nisn',
        'nis',
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
        'status',
        'tanggal_masuk',
        'jurusan_id',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'tanggal_masuk' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($siswa) {
            if (!$siswa->user_id) {
                $siswa->user_id = null;
            }

            // Auto-generate NISN if empty
            if (empty($siswa->nisn)) {
                $siswa->nisn = static::generateNisn();
            }

            // Auto-generate NIS if empty
            if (empty($siswa->nis)) {
                $siswa->nis = static::generateNis();
            }
        });

        static::created(function ($siswa) {
            AuditLog::log(
                $siswa,
                'created',
                null,
                $siswa->only($siswa->getFillable()),
                'Siswa baru dibuat: ' . $siswa->nama_lengkap
            );
        });

        static::updated(function ($siswa) {
            AuditLog::log(
                $siswa,
                'updated',
                $siswa->getOriginal(),
                $siswa->getChanges(),
                'Data siswa diperbarui: ' . $siswa->nama_lengkap
            );
        });
    }

    /**
     * Generate unique 10-digit NISN
     * Format: 4-digit year + 6-digit sequence
     * Example: 2025000001
     */
    public static function generateNisn(): string
    {
        $year = now()->format('Y');
        $prefix = $year;
        
        $last = static::where('nisn', 'like', $prefix . '%')
            ->orderBy('nisn', 'desc')
            ->first();
        
        if ($last) {
            $lastNumber = (int) substr($last->nisn, 4);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }
        
        return $prefix . Str::padLeft((string) $nextNumber, 6, '0');
    }

    /**
     * Generate unique NIS (local school number)
     * Format: 6-digit sequence
     */
    public static function generateNis(): string
    {
        $last = static::max('nis');
        $nextNumber = $last ? (int) $last + 1 : 1;
        return Str::padLeft((string) $nextNumber, 6, '0');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function kelasHistory()
    {
        return $this->hasMany(SiswaKelas::class)->with('kelas');
    }

    public function kelasAktif()
    {
        return $this->hasOne(SiswaKelas::class)
            ->where('siswa_kelas.status', 'aktif');
    }

    public function auditLogs()
    {
        return $this->morphMany(AuditLog::class, 'auditable');
    }

    public function sppTagihans()
    {
        return $this->hasMany(SppTagihan::class);
    }

    public function raporSiswa()
    {
        return $this->hasMany(RaporSiswa::class, 'siswa_id');
    }

    // === Buku Induk Digital (PRD Section 23) ===
    public function bukuInduk()
    {
        return $this->hasOne(BukuIndukSiswa::class);
    }

    public function rekamMedis()
    {
        return $this->hasOne(RekamMedisSiswa::class);
    }

    public function orangTuaDetails()
    {
        return $this->hasMany(OrangTuaDetail::class);
    }

    public function mutasis()
    {
        return $this->hasMany(MutasiSiswa::class);
    }

    public function nisnSyncLogs()
    {
        return $this->hasMany(NisnSyncLog::class);
    }

    public function absensis()
    {
        return $this->hasMany(Absensi::class);
    }

    public function pelanggaran()
    {
        return $this->hasMany(Pelanggaran::class);
    }

    public function konseling()
    {
        return $this->hasMany(Konseling::class);
    }

    public function absensiToday()
    {
        return $this->hasOne(Absensi::class)->where('tanggal', now()->toDateString());
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['status']) && $filters['status']) {
            $query->where('status', $filters['status']);
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
