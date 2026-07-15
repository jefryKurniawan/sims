<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArsipAkreditasi extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'arsip_akreditasi';

    protected $fillable = [
        'standar',
        'sub_standar',
        'butir',
        'nama_dokumen',
        'file_path',
        'tahun_ajaran',
        'status',
        'penanggung_jawab',
    ];

    protected $casts = [
        'standar' => 'integer',
    ];

    public function penanggungJawab(): BelongsTo
    {
        return $this->belongsTo(User::class, 'penanggung_jawab');
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['standar']) && $filters['standar']) {
            $query->where('standar', $filters['standar']);
        }

        if (isset($filters['sub_standar']) && $filters['sub_standar']) {
            $query->where('sub_standar', $filters['sub_standar']);
        }

        if (isset($filters['status']) && $filters['status']) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['tahun_ajaran']) && $filters['tahun_ajaran']) {
            $query->where('tahun_ajaran', $filters['tahun_ajaran']);
        }

        if (isset($filters['search']) && $filters['search']) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('nama_dokumen', 'like', "%{$search}%")
                  ->orWhere('butir', 'like', "%{$search}%");
            });
        }

        return $query;
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('standar')
            ->orderBy('sub_standar')
            ->orderBy('butir');
    }

    /**
     * Get tree structure for Akreditasi view
     */
    public static function getTree(string $tahunAjaran): array
    {
        $dokumen = static::where('tahun_ajaran', $tahunAjaran)
            ->orderBy('standar')
            ->orderBy('sub_standar')
            ->orderBy('butir')
            ->get();

        $tree = [];
        foreach ($dokumen as $doc) {
            $tree[$doc->standar][$doc->sub_standar][$doc->butir][] = $doc;
        }

        return $tree;
    }
}
