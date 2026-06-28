<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class WebserviceConfig extends Model
{
    use HasFactory;

    protected $table = 'webservice_config';

    protected $fillable = [
        'server_url',
        'username',
        'password_encrypted',
        'token',
        'token_expires_at',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
        'token_expires_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if (isset($model->password_encrypted) && !str_starts_with($model->password_encrypted, 'base64:')) {
                $model->password_encrypted = Crypt::encryptString($model->password_encrypted);
            }
        });
    }

    public function getPasswordAttribute(): ?string
    {
        try {
            return $this->password_encrypted ? Crypt::decryptString($this->password_encrypted) : null;
        } catch (\Exception $e) {
            return null;
        }
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function hasValidToken(): bool
    {
        return $this->token !== null 
            && $this->token_expires_at !== null 
            && $this->token_expires_at->isFuture();
    }
}
