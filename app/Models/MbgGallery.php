<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MbgGallery extends Model
{
    protected $table = 'mbg_galleries';

    protected $fillable = [
        'judul', 'file_path', 'kategori', 'tanggal_kegiatan', 'deskripsi', 'diupload_oleh',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_kegiatan' => 'date',
        ];
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'diupload_oleh');
    }
}
