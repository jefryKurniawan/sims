<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SuratKeluarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->canAny(['surat-keluar.create', 'surat-keluar.edit']);
    }

    public function rules(): array
    {
        return [
            'tanggal_kirim' => 'required|date',
            'tujuan' => 'required|string|max:255',
            'perihal' => 'required|string|max:255',
            'ringkasan' => 'nullable|string',
            'file_scan' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'penandatangan' => 'required|string|max:255',
            'status' => ['required', Rule::in(['draf', 'terkirim', 'arsip'])],
        ];
    }

    public function messages(): array
    {
        return [
            'tanggal_kirim.required' => 'Tanggal kirim wajib diisi.',
            'tujuan.required' => 'Tujuan surat wajib diisi.',
            'perihal.required' => 'Perihal wajib diisi.',
            'penandatangan.required' => 'Penandatangan wajib diisi.',
            'file_scan.mimes' => 'File scan harus berformat PDF, JPG, JPEG, atau PNG.',
            'file_scan.max' => 'Ukuran file scan maksimal 5MB.',
        ];
    }
}
