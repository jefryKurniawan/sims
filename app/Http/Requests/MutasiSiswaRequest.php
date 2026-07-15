<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MutasiSiswaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'jenis' => ['required', 'in:masuk,keluar'],
            'tanggal_mutasi' => ['required', 'date'],
            'asal_sekolah' => ['nullable', 'string', 'max:200'],
            'sekolah_tujuan' => ['nullable', 'string', 'max:200'],
            'alasan' => ['required', 'string'],
            'no_sk' => ['nullable', 'string', 'max:100'],
            'dokumen_scan' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:2048'],
        ];
    }
}
