<?php

namespace App\Observers;

use App\Models\CalonSiswa;
use App\Models\User;
use App\Models\Siswa;
use App\Models\SppTagihan;
use App\Models\Berita;
use Modules\SPP\Entities\SppSetting;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Jobs\SendPpdbCredentialsJob;
use App\Mail\PpdbCredentialsMail;
use Carbon\Carbon;

class CalonSiswaObserver
{
    /**
     * Handle the CalonSiswa "updated" event.
     */
    public function updated(CalonSiswa $calonSiswa)
    {
        // Check if status changed to 'lulus' and was not 'lulus' before
        if ($calonSiswa->isDirty('status') && $calonSiswa->status === 'lulus' && $calonSiswa->getOriginal('status') !== 'lulus') {
            // 1. Create User (orang tua) if not exists
            $user = User::where('email', $calonSiswa->email)->first();
            $password = null;
            if (!$user) {
                $password = Str::random(8);
                $user = User::create([
                    'name' => $calonSiswa->nama_ortu ?? $calonSiswa->nama_lengkap,
                    'email' => $calonSiswa->email,
                    'password' => Hash::make($password),
                    'role' => 'ortu',
                ]);
            } else {
                // Ensure role is ortu
                if ($user->role !== 'ortu') {
                    $user->role = 'ortu';
                    $user->save();
                }
                // Generate a new password for email
                $password = Str::random(8);
                $user->password = Hash::make($password);
                $user->save();
            }

            // 2. Create Siswa record if not exists
            $siswa = Siswa::where('user_id', $user->id)->first();
            if (!$siswa) {
                $siswa = Siswa::create([
                    'user_id' => $user->id,
                    'nisn' => $calonSiswa->nisn,
                    'nama_lengkap' => $calonSiswa->nama_lengkap,
                    'tempat_lahir' => $calonSiswa->tempat_lahir,
                    'tanggal_lahir' => $calonSiswa->tanggal_lahir,
                    'jenis_kelamin' => $calonSiswa->jenis_kelamin,
                    'alamat' => $calonSiswa->alamat,
                    'no_hp' => $calonSiswa->no_hp,
                    'email' => $calonSiswa->email,
                    'nama_ortu' => $calonSiswa->nama_ortu,
                    'no_hp_ortu' => $calonSiswa->no_hp_ortu,
                    'asal_sekolah' => $calonSiswa->asal_sekolah,
                    'status' => 'aktif',
                    'tanggal_masuk' => now(),
                    'jurusan_id' => $calonSiswa->jurusan_id,
                ]);
            }

            // 3. Create SPP tagihan (registration fee) if not exists
            // Determine amount: use biaya_pendaftaran from CalonSiswa, fallback to SppSetting amount
            $amount = $calonSiswa->biaya_pendaftaran > 0 ? $calonSiswa->biaya_pendaftaran : 0;
            if ($amount <= 0) {
                $sppSetting = SppSetting::first();
                $amount = $sppSetting ? $sppSetting->amount : 0;
            }

            // Only create tagihan if amount > 0 and there is no existing tagihan for this siswa with keterangan containing 'Uang Pendaftaran PPDB'
            if ($amount > 0) {
                $existing = SppTagihan::where('siswa_id', $siswa->id)
                    ->where('keterangan', 'like', '%Uang Pendaftaran PPDB%')
                    ->exists();
                if (!$existing) {
                    SppTagihan::create([
                        'siswa_id' => $siswa->id,
                        'nominal' => $amount,
                        'status' => 'belum_lunas',
                        'tanggal_jatuh_tempo' => now()->addMonth(), // due next month
                        'keterangan' => 'Uang Pendaftaran PPDB',
                    ]);
                }
            }

            // 4. Send email with credentials via queued job
            if ($password) {
                dispatch(new SendPpdbCredentialsJob($user, $password));
            }

            // 5. Create Berita (news) about graduation
            $tahun = now()->year;
            $nextYear = $tahun + 1;
            Berita::create([
                'judul' => "Pengumuman PPDB {$tahun} – {$siswa->nama_lengkap} Lulus",
                'isi'   => "<p>Kami dengan riwayat pengumuman dapat mengumumkan bahwa calon siswa bernama <strong>{$siswa->nama_lengkap}</strong> (NISN: {$siswa->nisn}) telah lolos dalam penerimaan peserta didik baru (PPDB) untuk tahun pelajaran {$tahun}/{$nextYear}. Selamat kepada siswa dan orang tuanya!</p>",
                'sumber' => 'ppdb',
                'status' => 'published',
            ]);
        }
    }
}