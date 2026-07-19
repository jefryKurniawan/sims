<?php

namespace Database\Seeders;

use App\Models\Konseling;
use App\Models\Siswa;
use App\Models\Guru;
use Illuminate\Database\Seeder;

class KonselingSeeder extends Seeder
{
    public function run(): void
    {
        $siswaIds = Siswa::pluck('id')->toArray();
        $guruIds = Guru::pluck('id')->toArray();

        if (empty($siswaIds)) return;

        $topics = [
            ['Kesulitan belajar Matematika', 'Siswa kesulitan memahami materi trigonometri, nilai di bawah KKM.', 'Bimbingan belajar tambahan tiap Selasa sore.', 'selesai'],
            ['Masalah pertemanan', 'Siswa merasa dikucilkan teman sekelas, sering menyendiri.', 'Mediasi dengan teman-teman sekelas pekan depan.', 'terbuka'],
            ['Kurang percaya diri', 'Siswa tidak mau presentasi karena takut salah.', 'Latihan public speaking bersama guru BK tiap Jumat.', 'terbuka'],
            ['Kecanduan game online', 'Orang tua lapor siswa main game sampai larut malam, prestasi turun.', 'Konseling lanjutan dengan orang tua, batasi waktu gawai.', 'rujukan'],
            ['Konseling karir', 'Siswa bingung memilih jurusan, tidak tahu minat bakat.', 'Tes minat bakat dan diskusi dengan orang tua.', 'selesai'],
            ['Konflik dengan guru', 'Siswa merasa guru tidak adil memberi nilai, sempat adu argumen.', 'Pertemuan tiga arah: siswa, guru BK, guru mapel.', 'terbuka'],
            ['Masalah keluarga', 'Siswa murung sejak orang tua bercerai, sering absen.', 'Konseling rutin 1x seminggu, rujuk psikolog jika perlu.', 'rujukan'],
            ['Membolos sekolah', 'Siswa bolos 3 kali sebulan, berkeliaran di mal.', 'Panggil orang tua, buat surat pernyataan.', 'selesai'],
            ['Perundungan (bullying)', 'Siswa diejek dan didorong kakak kelas, takut masuk sekolah.', 'Investigasi dan mediasi dengan wali kelas.', 'terbuka'],
            ['Motivasi belajar', 'Semangat belajar turun setelah nilai UTS jelek.', 'Buat jadwal belajar harian dan target mingguan.', 'terbuka'],
        ];

        $now = now();

        foreach ($topics as $i => $t) {
            Konseling::create([
                'siswa_id' => $siswaIds[$i % count($siswaIds)],
                'guru_bk_id' => ($i % 3 !== 0) ? $guruIds[$i % count($guruIds)] : null,
                'tanggal' => $now->copy()->subDays(rand(1, 90))->format('Y-m-d'),
                'topik' => $t[0],
                'catatan' => $t[1],
                'tindak_lanjut' => $t[2],
                'status' => $t[3],
            ]);
        }

        $this->command->info('Konseling: ' . count($topics) . ' records seeded.');
    }
}
