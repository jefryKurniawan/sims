<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumReply extends Model
{
    use HasFactory;

    protected $table = 'forum_replies';

    protected $fillable = [
        'thread_id',
        'alumni_id',
        'body',
    ];

    public function thread()
    {
        return $this->belongsTo(ForumThread::class, 'thread_id');
    }

    public function alumni()
    {
        return $this->belongsTo(Alumni::class);
    }
}
