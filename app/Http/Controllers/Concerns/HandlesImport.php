<?php

namespace App\Http\Controllers\Concerns;

use App\Exports\TemplateExport;
use App\Imports\GenericImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

/**
 * ponytail: satu trait untuk download template (header-only) + import excel/csv
 * untuk modul CRUD. Tidak perlu 1 Export/Import class per modul.
 *
 * Pakai di controller:
 *   public function template() { return $this->downloadTemplate('gtk', ['Nama', 'NUPTK', ...]); }
 *   public function import(Request $r) {
 *       return $this->runImport($r, Guru::class, function ($row) {
 *           return ['nama_lengkap' => $row['nama_lengkap'] ?? null, ...] ;
 *       });
 *   }
 */
trait HandlesImport
{
    protected function downloadTemplate(string $baseName, array $headers, ?array $sampleRow = null, string $format = 'xlsx')
    {
        $format = in_array($format, ['xlsx', 'csv'], true) ? $format : 'xlsx';
        $filename = "template-{$baseName}.{$format}";
        $writer = $format === 'csv' ? \Maatwebsite\Excel\Excel::CSV : \Maatwebsite\Excel\Excel::XLSX;

        return Excel::download(new TemplateExport($headers, $sampleRow), $filename, $writer);
    }

    /**
     * @param callable(array $row, int $index): ?array   $map  kembalikan atribut, atau null untuk skip baris.
     * @return array{imported:int,skipped:int,errors:array<int,string>}
     */
    protected function runImport(Request $request, string $modelClass, callable $map): array
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240',
        ]);

        $rows = Excel::toCollection(new GenericImport(), $request->file('file'))->first();

        $imported = 0;
        $skipped = 0;
        $errors = [];

        foreach ($rows as $index => $row) {
            try {
                $attributes = $map($row, $index);
                if (empty($attributes)) {
                    $skipped++;
                    continue;
                }
                $modelClass::create($attributes);
                $imported++;
            } catch (\Throwable $e) {
                $skipped++;
                $errors[] = 'Baris ' . ($index + 2) . ': ' . $e->getMessage();
            }
        }

        return ['imported' => $imported, 'skipped' => $skipped, 'errors' => $errors];
    }

    /**
     * Bangun flash message standar dari hasil runImport.
     */
    protected function importFlash(array $result): array
    {
        $msg = "Import selesai: {$result['imported']} berhasil";
        if ($result['skipped']) {
            $msg .= ", {$result['skipped']} dilewati";
        }
        if ($result['errors']) {
            $prefix = implode('; ', array_slice($result['errors'], 0, 3));
            $more = count($result['errors']) > 3 ? ' …' : '';
            return ['error' => "{$msg}. {$prefix}{$more}"];
        }
        return ['success' => $msg];
    }
}
