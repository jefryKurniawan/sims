<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MbgOrganoleptik extends Model
{
    protected $table = 'mbg_organoleptics';

    protected $fillable = [
        'bast_id', 'warna', 'aroma', 'rasa', 'suhu', 'tekstur',
        'hasil', 'catatan', 'foto_kerusakan', 'diuji_oleh',
    ];

    public function bast(): BelongsTo
    {
        return $this->belongsTo(MbgBast::class, 'bast_id');
    }

    public function penguji(): BelongsTo
    {
        return $this->belongsTo(User::class, 'diuji_oleh');
    }
}
