<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

/**
 * Export template import: header + 1 baris contoh (opsional).
 */
class TemplateExport implements FromCollection
{
    public function __construct(
        protected array $headers,
        protected ?array $sampleRow = null,
    ) {}

    public function collection(): Collection
    {
        $rows = [$this->headers];
        if ($this->sampleRow !== null) {
            $rows[] = $this->sampleRow;
        }
        return collect($rows);
    }
}
