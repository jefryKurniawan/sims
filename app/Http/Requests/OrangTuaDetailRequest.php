<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrangTuaDetailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'hubungan' => ['required', 'in:Ayah,Ibu,Wali'],
            'nama_lengkap' => ['required', 'string', 'max:150'],
            'nik' => ['nullable', 'string', 'max:16'],
            'npwp' => ['nullable', 'string', 'max:20'],
            'tanggal_lahir' => ['nullable', 'date'],
            'pendidikan_terakhir' => ['nullable', 'in:Tidak Sekolah,SD,SMP,SMA/SMK,Diploma,S1,S2,S3'],
            'pekerjaan' => ['nullable', 'string', 'max:100'],
            'penghasilan_bulanan' => ['nullable', 'in:<1JT,1-3JT,3-5JT,5-10JT,>10JT'],
            'status_pernikahan' => ['nullable', 'in:Menikah,Cerai Hidup,Cerai Mati,Belum Menikah'],
            'jumlah_tanggungan' => ['nullable', 'integer', 'min:0'],
            'no_hp' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:100'],
            'alamat' => ['nullable', 'string'],
        ];
    }
}
