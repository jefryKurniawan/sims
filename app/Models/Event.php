<?php

// app/Models/Event.php
// Sudah ada tapi disinkronkan ulang ke fillable
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'content', 'thumbnail', 'acara', 'lokasi', 'is_active'];
    protected $casts = [
        'acara' => 'datetime',
        'is_active' => 'integer',
    ];
}