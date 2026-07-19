<?php

namespace App\Observers;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SiswaObserver
{
    public function creating(Siswa $siswa): void
    {
        // handled in model boot creating
    }

    public function created(Siswa $siswa): void
    {
        if ($siswa->user_id) {
            return;
        }

        $username = $siswa->nisn ?? 'siswa' . $siswa->id;
        $password = Str::random(8);

        $user = User::create([
            'name' => $siswa->nama_lengkap,
            'email' => $siswa->email ?? $username . '@sekolah.com',
            'password' => Hash::make($password),
            'username' => $username,
        ]);

        $user->assignRole('murid');

        $siswa->user_id = $user->id;
        $siswa->saveQuietly();

        // ponytail: langsung simpan password di log sebagai temp workaround
        // TODO: kirim email kredensial via SendCredentialsMail job
        \Log::info('Akun siswa dibuat', [
            'siswa_id' => $siswa->id,
            'user_id' => $user->id,
            'username' => $username,
            'password' => $password,
        ]);
    }
}