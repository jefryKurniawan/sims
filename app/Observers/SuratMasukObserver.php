<?php

namespace App\Observers;

use App\Models\SuratMasuk;

class SuratMasukObserver
{
    /**
     * Handle the SuratMasuk "creating" event.
     */
    public function creating(SuratMasuk $suratMasuk): void
    {
        // Auto-generate no_agenda if empty
        if (empty($suratMasuk->no_agenda)) {
            $suratMasuk->no_agenda = $this->generateNoAgenda($suratMasuk->tanggal_terima);
        }
    }

    /**
     * Generate no_agenda per year (auto-increment)
     */
    private function generateNoAgenda($tanggalTerima): int
    {
        $year = $tanggalTerima instanceof \Carbon\CarbonInterface
            ? $tanggalTerima->format('Y')
            : date('Y', strtotime($tanggalTerima));

        $last = SuratMasuk::whereYear('tanggal_terima', $year)
            ->max('no_agenda');

        return ($last ?? 0) + 1;
    }
}
