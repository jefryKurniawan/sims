<?php

namespace App\Policies;

use App\Models\SuratKeluar;
use App\Models\User;

class SuratKeluarPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'TU', 'Staf']);
    }

    public function view(User $user, SuratKeluar $suratKeluar): bool
    {
        return $user->hasAnyRole(['Admin', 'TU', 'Staf']);
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'TU']);
    }

    public function update(User $user, SuratKeluar $suratKeluar): bool
    {
        return $user->hasRole('Admin') || $user->id === $suratKeluar->created_by;
    }

    public function delete(User $user, SuratKeluar $suratKeluar): bool
    {
        return $user->hasRole('Admin');
    }

    public function arsipkan(User $user, SuratKeluar $suratKeluar): bool
    {
        return $user->hasAnyRole(['Admin', 'TU']);
    }
}
