<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'title',
        'slug',
        'content',
        'full_content',
        'desc',
        'thumbnail',
        'acara',
        'lokasi',
        'is_active',
    ];

    protected $casts = [
        'acara' => 'datetime',
        'is_active' => 'integer',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($event) {
            if (empty($event->slug)) {
                $event->slug = \Illuminate\Support\Str::slug($event->title);
            }
        });
    }
}
