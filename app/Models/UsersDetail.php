<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersDetail extends Model
{
    use HasFactory;

    protected $table = 'users_details';

    protected $fillable = [
        'user_id',
        'role',
        'nip',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat',
        'no_hp',
        'email',
        'linkidln',
        'instagram',
        'website',
        'facebook',
        'twitter',
        'youtube',
        'foto_profile',
        'is_active',
    ];
}
