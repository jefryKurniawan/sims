<?php

namespace App\Services;

use App\Models\SpmbApplicant;
use App\Models\SpmbAfirmasi;
use App\Models\SpmbPrestasi;
use App\Models\SpmbNilaiAkademik;
use App\Models\AuditLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SpmbRegistrationService
{
    public function register(array $data): SpmbApplicant
    {
        $data['status'] = 'submitted';
        $data['status_pendaftaran'] = 'submitted';
        $data['submitted_at'] = now();

        return DB::transaction(function () use ($data) {
            $applicant = SpmbApplicant::create($data);

            if (!empty($data['afirmasi'])) {
                $applicant->afirmasi()->create($data['afirmasi']);
            }

            if (!empty($data['prestasi'])) {
                foreach ($data['prestasi'] as $prestasi) {
                    $applicant->prestasi()->create($prestasi);
                }
            }

            return $applicant;
        });
    }

    public function update(int $id, array $data): SpmbApplicant
    {
        $applicant = SpmbApplicant::findOrFail($id);

        if (!in_array($applicant->status_pendaftaran, ['draft', 'submitted'])) {
            throw new \RuntimeException('Pendaftaran sudah diproses, tidak dapat diubah.');
        }

        DB::transaction(function () use ($applicant, $data) {
            $applicant->update($data);

            if (isset($data['afirmasi'])) {
                $applicant->afirmasi()->updateOrCreate(
                    ['spmb_applicant_id' => $applicant->id],
                    $data['afirmasi']
                );
            }

            if (isset($data['prestasi'])) {
                $applicant->prestasi()->delete();
                foreach ($data['prestasi'] as $prestasi) {
                    $applicant->prestasi()->create($prestasi);
                }
            }
        });

        return $applicant->fresh();
    }

    public function verifikasiBerkas(int $id): SpmbApplicant
    {
        $applicant = SpmbApplicant::findOrFail($id);

        if ($applicant->status_pendaftaran !== 'submitted') {
            throw new \RuntimeException('Hanya pendaftar dengan status submitted yang bisa diverifikasi.');
        }

        $applicant->update([
            'status' => 'verified',
            'status_pendaftaran' => 'verifikasi_berkas',
            'verified_at' => now(),
        ]);

        return $applicant->fresh();
    }

    public function uploadBerkas(int $id, string $field, string $path): SpmbApplicant
    {
        $applicant = SpmbApplicant::findOrFail($id);

        $allowedFields = ['bukti_bayar', 'ijazah', 'akte', 'foto', 'kartu_keluarga'];

        if (!in_array($field, $allowedFields)) {
            throw new \InvalidArgumentException("Field {$field} tidak valid untuk upload berkas.");
        }

        $applicant->update([$field => $path]);

        return $applicant->fresh();
    }

    public function cekStatus(string $nomorRegistrasi): ?SpmbApplicant
    {
        $applicant = SpmbApplicant::where('nomor_registrasi', $nomorRegistrasi)->first();

        if (!$applicant) {
            return null;
        }

        $applicant->load(['afirmasi', 'prestasi', 'ranking']);

        return $applicant;
    }

    public function getStatistik(?int $configId = null): array
    {
        $query = SpmbApplicant::query();

        $total = (clone $query)->count();
        $submitted = (clone $query)->where('status_pendaftaran', 'submitted')->count();
        $verified = (clone $query)->where('status_pendaftaran', 'verifikasi_berkas')->count();
        $lulus = (clone $query)->where('status_pendaftaran', 'lulus_seleksi')->count();
        $diterima = (clone $query)->where('status_pendaftaran', 'diterima')->count();

        return [
            'total' => $total,
            'submitted' => $submitted,
            'verified' => $verified,
            'lulus_seleksi' => $lulus,
            'diterima' => $diterima,
        ];
    }
}
