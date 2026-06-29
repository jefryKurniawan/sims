<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumThread extends Model
{
    use HasFactory;

    protected $table = 'forum_threads';

    protected $fillable = [
        'alumni_id',
        'slug',
        'judul',
        'isi',
        'kategori',
        'status',
        'views',
    ];

    public function alumni()
    {
        return $this->belongsTo(Alumni::class);
    }
}
