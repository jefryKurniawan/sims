<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MbgMealMenu extends Model
{
    protected $table = 'mbg_meal_menus';

    protected $fillable = [
        'tanggal', 'menu', 'deskripsi', 'sumber', 'porsi_direncanakan',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
        ];
    }
}
