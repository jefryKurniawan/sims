<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpmbConfig extends Model
{
    use HasFactory;

    protected $table = 'spmb_config';

    protected $fillable = [
        'tahun_ajaran',
        'kuota_total',
        'kuota_reguler',
        'kuota_afirmasi',
        'kuota_prestasi',
        'biaya_pendaftaran',
        'uang_pendaftaran',
        'tanggal_buka',
        'tanggal_tutup',
        'tanggal_pengumuman',
        'tanggal_daftar_ulang',
        'aktif',
    ];

    protected $casts = [
        'tanggal_buka' => 'date',
        'tanggal_tutup' => 'date',
        'tanggal_pengumuman' => 'date',
        'tanggal_daftar_ulang' => 'date',
        'aktif' => 'boolean',
        'kuota_total' => 'integer',
        'kuota_reguler' => 'integer',
        'kuota_afirmasi' => 'integer',
        'kuota_prestasi' => 'integer',
        'biaya_pendaftaran' => 'decimal:2',
        'uang_pendaftaran' => 'decimal:2',
    ];

    public function isOpen()
    {
        return $this->aktif
            && now()->between($this->tanggal_buka, $this->tanggal_tutup);
    }

    public function sisaKuota($jalur = null)
    {
        $jalurMap = [
            'reguler' => 'kuota_reguler',
            'afirmasi' => 'kuota_afirmasi',
            'prestasi_akademik' => 'kuota_prestasi',
            'prestasi_non_akademik' => 'kuota_prestasi',
        ];

        if ($jalur && isset($jalurMap[$jalur])) {
            $terisi = SpmbRanking::where('jalur_seleksi', $jalur)
                ->where('lulus_seleksi', true)
                ->count();
            return $this->{$jalurMap[$jalur]} - $terisi;
        }

        return $this->kuota_total - SpmbRanking::where('lulus_seleksi', true)->count();
    }
}
