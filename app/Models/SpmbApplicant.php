<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SpmbApplicant extends Model
{
    use HasFactory;

    protected $table = 'spmb_applicants';

    protected $fillable = [
        'nomor_registrasi',
        'token_pendaftaran',
        'edit_token',
        'guest_token_expires_at',
        'nama_lengkap',
        'email',
        'nisn',
        'nik',
        'no_kk',
        'nama_ayah',
        'nik_ayah',
        'no_hp_ayah',
        'pekerjaan_ayah',
        'nama_ibu',
        'nik_ibu',
        'no_hp_ibu',
        'pekerjaan_ibu',
        'penghasilan_ortu',
        'no_hp_ortu',
        'nama_wali',
        'no_hp_wali',
        'no_hp',
        'alamat',
        'alamat_jalan',
        'rt',
        'rw',
        'nama_dusun',
        'desa_kelurahan',
        'kecamatan',
        'kode_pos',
        'jenis_kelamin',
        'tanggal_lahir',
        'tempat_lahir',
        'agama',
        'asal_sekolah',
        'npsn_sekolah',
        'jurusan_sekolah',
        'tahun_lulus',
        'jalur_pendaftaran',
        'tahun_ajaran_id',
        'bukti_bayar',
        'biaya_pendaftaran',
        'status_pembayaran',
        'status',
        'status_pendaftaran',
        'submitted_at',
        'verified_at',
        'siswa_id',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'tahun_lulus' => 'integer',
        'submitted_at' => 'datetime',
        'verified_at' => 'datetime',
        'guest_token_expires_at' => 'datetime',
        'biaya_pendaftaran' => 'decimal:2',
        'tahun_ajaran_id' => 'integer',
        'siswa_id' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($applicant) {
            if (!$applicant->nomor_registrasi) {
                $applicant->nomor_registrasi = 'SPMB-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6));
            }
            if (!$applicant->token_pendaftaran) {
                $applicant->token_pendaftaran = strtoupper(Str::random(32));
            }
            if (!$applicant->edit_token) {
                $applicant->edit_token = strtoupper(Str::random(32));
            }
        });

        static::created(function ($applicant) {
            AuditLog::log(
                $applicant,
                'created',
                null,
                $applicant->only($applicant->getFillable()),
                'SPMB registration: ' . $applicant->nama_lengkap
            );
        });
    }

    public function afirmasi()
    {
        return $this->hasOne(SpmbAfirmasi::class, 'spmb_applicant_id');
    }

    public function prestasi()
    {
        return $this->hasMany(SpmbPrestasi::class, 'spmb_applicant_id');
    }

    public function nilaiAkademik()
    {
        return $this->hasMany(SpmbNilaiAkademik::class, 'spmb_applicant_id');
    }

    public function tka()
    {
        return $this->hasOne(SpmbTka::class, 'spmb_applicant_id');
    }

    public function ranking()
    {
        return $this->hasOne(SpmbRanking::class, 'spmb_applicant_id');
    }

    public function config()
    {
        return $this->belongsTo(SpmbConfig::class, 'tahun_ajaran_id');
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['status_pendaftaran']) && $filters['status_pendaftaran']) {
            $query->where('status_pendaftaran', $filters['status_pendaftaran']);
        }

        if (isset($filters['status']) && $filters['status']) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%")
                  ->orWhere('nomor_registrasi', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        if (isset($filters['jalur']) && $filters['jalur']) {
            $query->where('jalur_pendaftaran', $filters['jalur']);
        }

        return $query;
    }
}
