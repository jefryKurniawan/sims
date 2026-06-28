<?php

namespace App\Policies;

use App\Models\Berita;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BeritaPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasRole(['Admin', 'Guru', 'Staf', 'Murid', 'Orang Tua', 'Alumni']);
    }

    public function view(User $user, Berita $berita)
    {
        // All roles can view active news; Admin can view any
        if ($user->hasRole('Admin')) {
            return true;
        }
        return $berita->is_active == '0'; // assuming '0' means active per model scope
    }

    public function create(User $user)
    {
        return $user->hasRole(['Admin', 'Guru']);
    }

    public function update(User $user, Berita $berita)
    {
        return $user->hasRole(['Admin', 'Guru']);
    }

    public function delete(User $user, Berita $berita)
    {
        return $user->hasRole('Admin');
    }
}
