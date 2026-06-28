<?php

namespace App\Policies;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SiswaPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any siswa.
     */
    public function viewAny(User $user)
    {
        return $user->hasRole(['Admin', 'Guru', 'Staf', 'Orang Tua']);
    }

    /**
     * Determine whether the user can view the siswa.
     */
    public function view(User $user, Siswa $siswa)
    {
        // Admin can view all, Guru/Staf can view, Orang Tua can view their own child
        if ($user->hasRole('Admin') || $user->hasRole('Guru') || $user->hasRole('Staf')) {
            return true;
        }
        if ($user->hasRole('Orang Tua')) {
            return $siswa->user_id === $user->id;
        }
        return false;
    }

    /**
     * Determine whether the user can create siswa.
     */
    public function create(User $user)
    {
        return $user->hasRole(['Admin', 'Guru']);
    }

    /**
     * Determine whether the user can update the siswa.
     */
    public function update(User $user, Siswa $siswa)
    {
        return $user->hasRole(['Admin', 'Guru']);
    }

    /**
     * Determine whether the user can delete the siswa.
     */
    public function delete(User $user, Siswa $siswa)
    {
        return $user->hasRole('Admin');
    }
}
