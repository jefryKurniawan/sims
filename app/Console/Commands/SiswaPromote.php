<?php

namespace App\Console\Commands;

use App\Models\Siswa;
use App\Models\Kelas;
use App\Models\SiswaKelas;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SiswaPromote extends Command
{
    protected $signature = 'siswa:promote {tahunAjaran? : Tahun ajaran baru, default YYYY/YYYY+1}';
    protected $description = 'Naikkan semua siswa aktif ke tingkat+1. Kelas 12 -> lulus.';

    public function handle(): int
    {
        $tahunAjaran = $this->argument('tahunAjaran') ?? (date('Y') . '/' . (date('Y') + 1));

        $this->info("Memulai promosi siswa untuk tahun ajaran {$tahunAjaran}...");

        DB::transaction(function () use ($tahunAjaran) {
            $total = 0;
            $lulus = 0;

            $kelasAktif = SiswaKelas::with(['siswa', 'kelas'])
                ->where('status', 'aktif')
                ->get();

            $bar = $this->output->createProgressBar($kelasAktif->count());
            $bar->start();

            foreach ($kelasAktif as $enrollment) {
                $kelas = $enrollment->kelas;
                $tingkatSekarang = (int) $kelas->tingkat;
                $tingkatBaru = $tingkatSekarang + 1;

                // Tutup enrollment lama
                $enrollment->update([
                    'status' => 'naik_kelas',
                    'tanggal_keluar_kelas' => now(),
                ]);

                if ($tingkatSekarang >= 12) {
                    // Lulus
                    $enrollment->siswa->update(['status' => 'lulus']);
                    $lulus++;
                } else {
                    // Cari kelas tujuan
                    $kelasBaru = Kelas::where('tingkat', $tingkatBaru)
                        ->where('jurusan_id', $kelas->jurusan_id)
                        ->where('nama_kelas', $kelas->nama_kelas)
                        ->first();

                    if ($kelasBaru) {
                        SiswaKelas::create([
                            'siswa_id' => $enrollment->siswa_id,
                            'kelas_id' => $kelasBaru->id,
                            'status' => 'aktif',
                            'tanggal_masuk_kelas' => now(),
                        ]);
                    } else {
                        $this->warn("Kelas tingkat {$tingkatBaru} untuk {$kelas->nama_kelas} jurusan {$kelas->jurusan_id} tidak ditemukan.");
                    }
                }

                $total++;
                $bar->advance();
            }

            $bar->finish();
            $this->newLine();
            $this->info("Selesai! {$total} siswa diproses, {$lulus} siswa dinyatakan lulus.");
        });

        return Command::SUCCESS;
    }
}