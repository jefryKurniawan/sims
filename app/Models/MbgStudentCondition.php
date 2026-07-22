<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MbgStudentCondition extends Model
{
    protected $table = 'mbg_student_conditions';

    protected $fillable = [
        'siswa_id', 'condition_id', 'catatan',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function condition(): BelongsTo
    {
        return $this->belongsTo(MbgSpecialCondition::class, 'condition_id');
    }
}
