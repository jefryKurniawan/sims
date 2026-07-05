<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

/**
 * Import generik: baca file ke dalam Collection baris asosiatif (key = header).
 * Dipakai bersama Excel::toCollection() di trait HandlesImport.
 */
class GenericImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        // no-op: hasil dibaca langsung via Excel::toCollection()
    }
}
