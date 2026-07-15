<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RekamMedisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'golongan_darah' => ['nullable', 'in:A,B,AB,O,Tidak Tahu'],
            'alergi' => ['nullable', 'string'],
            'penyakit_terdahulu' => ['nullable', 'string'],
            'obat_rutin' => ['nullable', 'string'],
            'nama_dokter' => ['nullable', 'string', 'max:100'],
            'rumah_sakit_rujukan' => ['nullable', 'string', 'max:150'],
            'kontak_darurat_nama' => ['nullable', 'string', 'max:100'],
            'kontak_darurat_hp' => ['nullable', 'string', 'max:20'],
            'kontak_darurat_hubungan' => ['nullable', 'string', 'max:50'],
        ];
    }
}
