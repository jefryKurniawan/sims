<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasterBank extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama_bank',
        'kode_bank',
        'cabang',
        'rekening_default',
    ];
}
