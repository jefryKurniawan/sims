<?php

namespace App\Policies;

use App\Models\Berita;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BeritaPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'Humas', 'Penulis']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Berita $berita): bool
    {
        // Public can view published
        if ($berita->status === 'published') {
            return true;
        }

        // Admin/Humas can view all
        if ($user->hasAnyRole(['Admin', 'Humas'])) {
            return true;
        }

        // Penulis can view own
        return $berita->penulis_id === $user->id || $berita->created_by === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'Humas', 'Penulis']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Berita $berita): bool
    {
        // Admin/Humas can update any
        if ($user->hasAnyRole(['Admin', 'Humas'])) {
            return true;
        }

        // Penulis can update own drafts/pending
        return ($berita->penulis_id === $user->id || $berita->created_by === $user->id)
            && in_array($berita->status, ['draft', 'pending']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Berita $berita): bool
    {
        // Admin can delete any
        if ($user->hasRole('Admin')) {
            return true;
        }

        // Humas/Penulis can delete own drafts
        return ($berita->penulis_id === $user->id || $berita->created_by === $user->id)
            && $berita->status === 'draft';
    }

    /**
     * Determine whether the user can submit for approval.
     */
    public function submit(User $user, Berita $berita): bool
    {
        // Only Penulis can submit (Admin/Humas publish directly)
        if (!$user->hasRole('Penulis')) {
            return false;
        }

        // Can only submit own drafts
        return ($berita->penulis_id === $user->id || $berita->created_by === $user->id)
            && $berita->status === 'draft';
    }

    /**
     * Determine whether the user can approve the model.
     */
    public function approve(User $user, Berita $berita): bool
    {
        return $user->hasAnyRole(['Admin', 'Humas'])
            && $berita->status === 'pending';
    }

    /**
     * Determine whether the user can reject the model.
     */
    public function reject(User $user, Berita $berita): bool
    {
        return $user->hasAnyRole(['Admin', 'Humas'])
            && $berita->status === 'pending';
    }
}