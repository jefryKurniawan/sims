<?php

namespace App\Observers;

use App\Models\Siswa;
use Illuminate\Support\Facades\Log;

class SiswaObserver
{
    /**
     * Handle the Siswa "creating" event.
     */
    public function creating(Siswa $siswa): void
    {
        // Auto-generate NISN if empty
        if (empty($siswa->nisn)) {
            $siswa->nisn = $this->generateNisn();
        }

        // Auto-generate NIS if empty
        if (empty($siswa->nis)) {
            $siswa->nis = $this->generateNis();
        }

        // Ensure user_id is null if not set
        if (!$siswa->user_id) {
            $siswa->user_id = null;
        }
    }

    /**
     * Generate unique 10-digit NISN
     * Format: YYYYNNNNNN (4-digit year + 6-digit sequence)
     * Example: 2025000001
     */
    private function generateNisn(): string
    {
        $year = now()->format('Y');
        $prefix = $year;

        $last = Siswa::where('nisn', 'like', $prefix . '%')
            ->orderBy('nisn', 'desc')
            ->first();

        if ($last) {
            $lastNumber = (int) substr($last->nisn, 4);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return $prefix . str_pad((string) $nextNumber, 6, '0', STR_PAD_LEFT);
    }

    /**
     * Generate unique 6-digit NIS
     * Format: NNNNNN
     * Example: 000001
     */
    private function generateNis(): string
    {
        $last = Siswa::max('nis');
        $nextNumber = $last ? (int) $last + 1 : 1;
        return str_pad((string) $nextNumber, 6, '0', STR_PAD_LEFT);
    }
}
