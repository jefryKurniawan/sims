<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MbgMeeting extends Model
{
    protected $table = 'mbg_meetings';

    protected $fillable = [
        'tanggal_rapat', 'tempat', 'agenda', 'notulensi',
        'kesimpulan', 'file_notulen', 'file_daftar_hadir', 'dibuat_oleh',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_rapat' => 'date',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dibuat_oleh');
    }
}
