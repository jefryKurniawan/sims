<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kurikulum extends Model
{
    protected $table = "kurikulum";
    protected $fillable = ['nama', 'aktif', 'keterangan'];

    public function mapels()
    {
        return $this->hasMany(KurikulumMapel::class);
    }

    public function skbms()
    {
        return $this->hasMany(Skbm::class);
    }

    public function scopeAktif($q)
    {
        return $q->where('aktif', true);
    }
}