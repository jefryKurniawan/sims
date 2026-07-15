<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SuratMasukRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->canAny(['surat-masuk.create', 'surat-masuk.edit']);
    }

    public function rules(): array
    {
        return [
            'tanggal_terima' => 'required|date',
            'no_surat' => 'required|string|max:100',
            'tanggal_surat' => 'required|date',
            'asal_surat' => 'required|string|max:255',
            'perihal' => 'required|string|max:255',
            'ringkasan' => 'nullable|string',
            'file_scan' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'disposisi_kepada' => 'nullable|exists:users,id',
            'disposisi_instruksi' => 'nullable|string',
            'disposisi_batas_waktu' => 'nullable|date',
            'status' => ['required', Rule::in(['baru', 'diproses', 'selesai', 'arsip'])],
            'status_disposisi' => ['nullable', Rule::in(['belum', 'dibaca', 'dibalas'])],
        ];
    }

    public function messages(): array
    {
        return [
            'tanggal_terima.required' => 'Tanggal terima wajib diisi.',
            'no_surat.required' => 'Nomor surat wajib diisi.',
            'tanggal_surat.required' => 'Tanggal surat wajib diisi.',
            'asal_surat.required' => 'Asal surat wajib diisi.',
            'perihal.required' => 'Perihal wajib diisi.',
            'file_scan.mimes' => 'File scan harus berformat PDF, JPG, JPEG, atau PNG.',
            'file_scan.max' => 'Ukuran file scan maksimal 5MB.',
        ];
    }
}
