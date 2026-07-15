<?php

namespace App\Policies;

use App\Models\SuratMasuk;
use App\Models\User;

class SuratMasukPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'TU', 'Staf']);
    }

    public function view(User $user, SuratMasuk $suratMasuk): bool
    {
        return $user->hasAnyRole(['Admin', 'TU', 'Staf']);
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'TU']);
    }

    public function update(User $user, SuratMasuk $suratMasuk): bool
    {
        return $user->hasRole('Admin') || $user->id === $suratMasuk->created_by;
    }

    public function delete(User $user, SuratMasuk $suratMasuk): bool
    {
        return $user->hasRole('Admin');
    }

    public function disposisi(User $user, SuratMasuk $suratMasuk): bool
    {
        return $user->hasAnyRole(['Admin', 'TU', 'Staf']);
    }

    public function arsipkan(User $user, SuratMasuk $suratMasuk): bool
    {
        return $user->hasAnyRole(['Admin', 'TU']);
    }
}
