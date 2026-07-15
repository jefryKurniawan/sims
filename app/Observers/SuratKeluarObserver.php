<?php

namespace App\Observers;

use App\Models\SuratKeluar;
use Illuminate\Support\Str;

class SuratKeluarObserver
{
    /**
     * Handle the SuratKeluar "creating" event.
     */
    public function creating(SuratKeluar $suratKeluar): void
    {
        // Auto-generate no_agenda if empty
        if (empty($suratKeluar->no_agenda)) {
            $suratKeluar->no_agenda = $this->generateNoAgenda($suratKeluar->tanggal_kirim);
        }

        // Auto-generate no_surat if empty (format: 001/TU/SK/2025)
        if (empty($suratKeluar->no_surat)) {
            $suratKeluar->no_surat = $this->generateNomorSurat($suratKeluar->tanggal_kirim);
        }
    }

    /**
     * Generate nomor surat: 001/TU/SK/2025
     * Sequence per year, reset every Jan 1
     */
    private function generateNomorSurat($tanggalKirim): string
    {
        $year = $tanggalKirim instanceof \Carbon\CarbonInterface
            ? $tanggalKirim->format('Y')
            : date('Y', strtotime($tanggalKirim));

        $last = SuratKeluar::whereYear('tanggal_kirim', $year)
            ->orderBy('no_agenda', 'desc')
            ->first();

        $sequence = $last ? $last->no_agenda : 1;

        return Str::padLeft((string) $sequence, 3, '0') . "/TU/SK/{$year}";
    }

    /**
     * Generate no_agenda per year (auto-increment)
     */
    private function generateNoAgenda($tanggalKirim): int
    {
        $year = $tanggalKirim instanceof \Carbon\CarbonInterface
            ? $tanggalKirim->format('Y')
            : date('Y', strtotime($tanggalKirim));

        $last = SuratKeluar::whereYear('tanggal_kirim', $year)
            ->max('no_agenda');

        return ($last ?? 0) + 1;
    }
}
