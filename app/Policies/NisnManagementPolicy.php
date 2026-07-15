<?php

namespace App\Policies;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class NisnManagementPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->can('nisn-management.view');
    }

    public function view(User $user, Siswa $siswa): bool
    {
        return $user->can('nisn-management.view');
    }

    public function edit(User $user, Siswa $siswa): bool
    {
        return $user->can('nisn-management.edit');
    }

    public function regenerate(User $user, Siswa $siswa): bool
    {
        return $user->can('nisn-management.regenerate');
    }

    public function sync(User $user): bool
    {
        return $user->can('nisn-management.sync');
    }
}