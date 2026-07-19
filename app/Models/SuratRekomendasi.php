<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuratRekomendasi extends Model
{
    use HasFactory;

    protected $table = 'surat_rekomendasi';

    protected $fillable = [
        'siswa_id',
        'jenis',
        'isi_surat',
        'file_path',
        'dibuat_oleh',
        'disetujui_oleh',
        'status',
        'tanggal_surat',
        'catatan',
    ];

    protected $casts = [
        'tanggal_surat' => 'date',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function pembuat()
    {
        return $this->belongsTo(User::class, 'dibuat_oleh');
    }

    public function penyetuju()
    {
        return $this->belongsTo(User::class, 'disetujui_oleh');
    }
}
