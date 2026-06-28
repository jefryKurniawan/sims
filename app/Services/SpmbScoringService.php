<?php

namespace App\Services;

use App\Models\SpmbApplicant;
use App\Models\SpmbRanking;
use App\Models\SpmbConfig;
use Illuminate\Support\Facades\DB;

class SpmbScoringService
{
    const BOBOT_RAPOR = 0.4;
    const BOBOT_TKA = 0.4;
    const BOBOT_PRESTASI = 0.2;

    const POIN_AFIRMASI_KIP = 15;
    const POIN_AFIRMASI_PKH = 12;
    const POIN_AFIRMASI_KJP = 10;
    const POIN_AFIRMASI_YAYASAN = 8;
    const POIN_AFIRMASI_KEMISKINAN = 10;

    const POIN_PRESTASI_INTERNASIONAL = 100;
    const POIN_PRESTASI_NASIONAL = 80;
    const POIN_PRESTASI_PROVINSI = 60;
    const POIN_PRESTASI_KABUPATEN = 40;
    const POIN_PRESTASI_KECAMATAN = 25;
    const POIN_PRESTASI_SEKOLAH = 15;

    public function hitungSkorRapor(SpmbApplicant $applicant): float
    {
        $nilai = $applicant->nilaiAkademik;

        if ($nilai->isEmpty()) {
            return 0;
        }

        $rataRata = $nilai->avg('nilai_rapor');

        return round($rataRata * self::BOBOT_RAPOR, 2);
    }

    public function hitungSkorTka(SpmbApplicant $applicant): float
    {
        $tka = $applicant->tka;

        if (!$tka || !$tka->nilai_total) {
            return 0;
        }

        return round($tka->nilai_total * self::BOBOT_TKA, 2);
    }

    public function hitungSkorPrestasi(SpmbApplicant $applicant): float
    {
        $prestasi = $applicant->prestasi;

        if ($prestasi->isEmpty()) {
            return 0;
        }

        $totalPoin = 0;

        foreach ($prestasi as $p) {
            $poinTingkat = match ($p->tingkat_prestasi) {
                'internasional' => self::POIN_PRESTASI_INTERNASIONAL,
                'nasional' => self::POIN_PRESTASI_NASIONAL,
                'provinsi' => self::POIN_PRESTASI_PROVINSI,
                'kabupaten_kota' => self::POIN_PRESTASI_KABUPATEN,
                'kecamatan' => self::POIN_PRESTASI_KECAMATAN,
                'sekolah' => self::POIN_PRESTASI_SEKOLAH,
                default => 0,
            };

            $bonusPeringkat = match ($p->peringkat) {
                1 => 1.5,
                2 => 1.25,
                3 => 1.0,
                default => 0.75,
            };

            $totalPoin += $poinTingkat * $bonusPeringkat;
        }

        $skorMentah = min($totalPoin, 100);

        return round($skorMentah * self::BOBOT_PRESTASI, 2);
    }

    public function hitungBonusAfirmasi(SpmbApplicant $applicant): float
    {
        $afirmasi = $applicant->afirmasi;

        if (!$afirmasi) {
            return 0;
        }

        $poinAfirmasi = match ($afirmasi->jenis_afirmasi) {
            'kip' => self::POIN_AFIRMASI_KIP,
            'pkh' => self::POIN_AFIRMASI_PKH,
            'kjp_plus' => self::POIN_AFIRMASI_KJP,
            'yayasan' => self::POIN_AFIRMASI_YAYASAN,
            'kemiskinan' => self::POIN_AFIRMASI_KEMISKINAN,
            default => 0,
        };

        return round($poinAfirmasi, 2);
    }

    public function hitungSkorTotal(int $applicantId): array
    {
        $applicant = SpmbApplicant::with(['nilaiAkademik', 'tka', 'prestasi', 'afirmasi'])
            ->findOrFail($applicantId);

        $skorRapor = $this->hitungSkorRapor($applicant);
        $skorTka = $this->hitungSkorTka($applicant);
        $skorPrestasi = $this->hitungSkorPrestasi($applicant);
        $skorAfirmasi = $this->hitungBonusAfirmasi($applicant);
        $skorTotal = round($skorRapor + $skorTka + $skorPrestasi + $skorAfirmasi, 2);

        return [
            'skor_nilai_rapor' => $skorRapor,
            'skor_tka' => $skorTka,
            'skor_prestasi' => $skorPrestasi,
            'skor_afirmasi' => $skorAfirmasi,
            'skor_total' => $skorTotal,
        ];
    }

    public function tentukanJalurSeleksi(SpmbApplicant $applicant): string
    {
        if ($applicant->afirmasi && $applicant->afirmasi->terverifikasi) {
            return 'afirmasi';
        }

        $prestasi = $applicant->prestasi;

        if ($prestasi->isNotEmpty()) {
            $adaAkademik = $prestasi->contains('jenis_prestasi', 'akademik');
            return $adaAkademik ? 'prestasi_akademik' : 'prestasi_non_akademik';
        }

        return 'reguler';
    }
}
