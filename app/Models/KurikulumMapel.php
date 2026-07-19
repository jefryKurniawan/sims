<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KurikulumMapel extends Model
{
    protected $fillable = ['kurikulum_id', 'rapor_mapel_id', 'fase', 'jam_mengajar_mingguan', 'semester'];

    public function kurikulum()
    {
        return $this->belongsTo(Kurikulum::class);
    }

    public function raporMapel()
    {
        return $this->belongsTo(RaporMapel::class, 'rapor_mapel_id');
    }
}