<?php

namespace App\Models;

use App\Models\AuditLog; // ponytail: added missing import for AuditLog
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Siswa extends Model
{
    use HasFactory;
    use SoftDeletes;

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
            // Generate unique student ID if not provided
            if (!$siswa->user_id) {
                $siswa->user_id = null;
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