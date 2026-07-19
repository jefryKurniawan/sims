<?php

namespace App\Observers;

use App\Models\Pelanggaran;
use App\Models\Siswa;

class PelanggaranObserver
{
    private function updatePoinTotal(Siswa $siswa): void
    {
        $total = Pelanggaran::where('siswa_id', $siswa->id)->aktif()->sum('poin');
        $siswa->updateQuietly(['poin_total' => $total]);
    }

    private function updatePoinSemester(Siswa $siswa, ?string $semester): void
    {
        if (!$semester) return;
        // This is for display purposes; semester-specific total can be calculated on query
    }

    public function created(Pelanggaran $pelanggaran): void
    {
        if ($pelanggaran->siswa) {
            $this->updatePoinTotal($pelanggaran->siswa);
            $this->updatePoinSemester($pelanggaran->siswa, $pelanggaran->semester);
        }
    }

    public function updated(Pelanggaran $pelanggaran): void
    {
        if ($pelanggaran->siswa) {
            $this->updatePoinTotal($pelanggaran->siswa);
            $this->updatePoinSemester($pelanggaran->siswa, $pelanggaran->semester);
        }
    }

    public function deleted(Pelanggaran $pelanggaran): void
    {
        if ($pelanggaran->siswa) {
            $this->updatePoinTotal($pelanggaran->siswa);
            $this->updatePoinSemester($pelanggaran->siswa, $pelanggaran->semester);
        }
    }
}
