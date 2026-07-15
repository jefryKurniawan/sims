<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\KategoriBerita;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'beritas';

    protected $fillable = [
        'title',
        'slug',
        'content',
        'kategori_id', // legacy FK - deprecated for MVP
        'thumbnail',
        'is_active',
        'created_by',
        'sumber',
        'status',
        'kategori', // enum: pengumuman, kegiatan, artikel
        'rejection_reason',
        'approved_by',
        'published_at',
        'penulis_id',
    ];

    protected $casts = [
        'is_active' => 'string',
        'published_at' => 'datetime',
    ];

    /**
     * Legacy relation - deprecated for MVP
     */
    public function kategoriRelation()
    {
        return $this->belongsTo(KategoriBerita::class, 'kategori_id', 'id');
    }

    /**
     * Author who created the record
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    /**
     * Author who wrote the content (Penulis role)
     */
    public function penulis()
    {
        return $this->belongsTo(User::class, 'penulis_id', 'id');
    }

    /**
     * User who approved the article
     */
    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by', 'id');
    }

    /**
     * Scope: only published articles
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope: pending approval
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope: draft articles
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    /**
     * Scope: rejected articles
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope: by kategori
     */
    public function scopeKategori($query, $kategori)
    {
        return $query->where('kategori', $kategori);
    }

    /**
     * Accessor: is published?
     */
    public function getIsPublishedAttribute(): bool
    {
        return $this->status === 'published';
    }

    /**
     * Scope: filter by user role for index
     */
    public function scopeForRole($query, $role, $userId = null)
    {
        if (in_array($role, ['Admin', 'Humas'])) {
            return $query; // Admin/Humas see all
        }

        // Penulis only sees their own
        return $query->where('penulis_id', $userId ?? auth()->id());
    }

    /**
     * Check if article can be edited by user
     */
    public function canEditBy($user): bool
    {
        if ($user->hasAnyRole(['Admin', 'Humas'])) {
            return true;
        }

        // Penulis can edit own draft/pending
        return $this->penulis_id === $user->id && in_array($this->status, ['draft', 'pending']);
    }

    /**
     * Check if article can be submitted by user
     */
    public function canSubmitBy($user): bool
    {
        return $this->penulis_id === $user->id && $this->status === 'draft';
    }

    /**
     * Check if article can be approved/rejected by user
     */
    public function canModerateBy($user): bool
    {
        return $user->hasAnyRole(['Admin', 'Humas']) && $this->status === 'pending';
    }
}