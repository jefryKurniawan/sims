<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MbgAttendance extends Model
{
    protected $table = 'mbg_attendances';

    protected $fillable = [
        'bast_id', 'siswa_id', 'kelas_id', 'status', 'catatan', 'diinput_oleh',
    ];

    public function bast(): BelongsTo
    {
        return $this->belongsTo(MbgBast::class, 'bast_id');
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function inputter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'diinput_oleh');
    }
}
