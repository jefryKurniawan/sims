<?php

namespace App\Observers;

use App\Models\Berita;
use Illuminate\Support\Facades\Auth;

class BeritaObserver
{
    /**
     * Handle the Berita "created" event.
     */
    public function created(Berita $berita): void
    {
        $user = Auth::user();

        if (!$user) {
            return;
        }

        // Set penulis_id to current user if not set
        if (!$berita->penulis_id) {
            $berita->penulis_id = $user->id;
            $berita->withoutEvents(fn() => $berita->save());
        }

        // Auto-publish if creator has Admin or Humas role
        if ($user->hasAnyRole(['Admin', 'Humas'])) {
            $berita->status = 'published';
            $berita->published_at = now();
            $berita->approved_by = $user->id;
            $berita->withoutEvents(fn() => $berita->save());
        } else {
            // Penulis role -> draft (default)
            $berita->status = 'draft';
            $berita->withoutEvents(fn() => $berita->save());
        }
    }

    /**
     * Handle the Berita "saved" event (fires after create/update).
     * Use wasChanged() to detect status changes after save.
     */
    public function saved(Berita $berita): void
    {
        // If status changed to published, set published_at and approved_by
        if ($berita->wasChanged('status') && $berita->status === 'published') {
            // Only update if not already set (prevent recursion)
            if (!$berita->published_at || !$berita->approved_by) {
                $berita->published_at = $berita->published_at ?? now();
                $berita->approved_by = $berita->approved_by ?? Auth::id();
                $berita->withoutEvents(fn() => $berita->save());
            }
        }

        // If status changed from published to draft/rejected, clear publish fields
        if ($berita->wasChanged('status') && in_array($berita->status, ['draft', 'rejected'])) {
            if ($berita->published_at || $berita->approved_by) {
                $berita->published_at = null;
                $berita->approved_by = null;
                $berita->withoutEvents(fn() => $berita->save());
            }
        }
    }
}