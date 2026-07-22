<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MbgSpecialCondition extends Model
{
    protected $table = 'mbg_special_conditions';

    protected $fillable = [
        'nama', 'kategori', 'deskripsi', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
