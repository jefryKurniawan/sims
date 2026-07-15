<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BukuIndukProfilRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'agama' => ['nullable', 'in:Islam,Kristen,Katolik,Hindu,Budha,Konghucu,Lainnya'],
            'anak_ke' => ['nullable', 'integer', 'min:1'],
            'jumlah_saudara' => ['nullable', 'integer', 'min:0'],
            'bahasa_sehari_hari' => ['nullable', 'string', 'max:50'],
            'transportasi' => ['nullable', 'in:Jalan Kaki,Sepeda,Motor,Mobil Pribadi,Angkot,Bus Sekolah,Lainnya'],
            'jarak_rumah_sekolah_km' => ['nullable', 'numeric', 'min:0', 'max:999'],
            'hobi' => ['nullable', 'string', 'max:100'],
            'cita_cita' => ['nullable', 'string', 'max:100'],
            'berat_badan_kg' => ['nullable', 'numeric', 'min:0', 'max:999'],
            'tinggi_badan_cm' => ['nullable', 'numeric', 'min:0', 'max:999'],
            'kebutuhan_khusus' => ['nullable', 'string'],
        ];
    }
}
