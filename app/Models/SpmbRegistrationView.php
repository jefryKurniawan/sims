<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpmbRegistrationView extends Model
{
    protected $table = 'spmb_registration_view';

    protected $casts = [
        'tanggal_lahir' => 'date',
        'submitted_at' => 'datetime',
        'verified_at' => 'datetime',
        'nilai_total' => 'decimal:2',
        'skor_total' => 'decimal:2',
        'ranking' => 'integer',
    ];

    public function applicant()
    {
        return $this->belongsTo(SpmbApplicant::class, 'spmb_applicant_id');
    }
}
