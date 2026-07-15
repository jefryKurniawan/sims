<?php

namespace App\Policies;

use App\Models\ArsipAkreditasi;
use App\Models\User;

class ArsipAkreditasiPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'TU', 'Staf']);
    }

    public function view(User $user, ArsipAkreditasi $arsipAkreditasi): bool
    {
        return $user->hasAnyRole(['Admin', 'TU', 'Staf']);
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['Admin', 'TU']);
    }

    public function update(User $user, ArsipAkreditasi $arsipAkreditasi): bool
    {
        return $user->hasRole('Admin') || $user->id === $arsipAkreditasi->penanggung_jawab;
    }

    public function delete(User $user, ArsipAkreditasi $arsipAkreditasi): bool
    {
        return $user->hasRole('Admin');
    }
}
