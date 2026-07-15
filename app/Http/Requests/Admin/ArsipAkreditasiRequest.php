<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ArsipAkreditasiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->canAny(['arsip-akreditasi.create', 'arsip-akreditasi.edit']);
    }

    public function rules(): array
    {
        return [
            'standar' => ['required', 'integer', 'between:1,8'],
            'sub_standar' => 'required|string|max:20',
            'butir' => 'required|string|max:20',
            'nama_dokumen' => 'required|string|max:255',
            'file_path' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'tahun_ajaran' => 'required|string|max:20',
            'status' => ['required', Rule::in(['lengkap', 'belum'])],
            'penanggung_jawab' => 'nullable|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'standar.required' => 'Standar wajib diisi (1-8).',
            'standar.between' => 'Standar harus antara 1 hingga 8.',
            'sub_standar.required' => 'Sub standar wajib diisi (misal: 1.1).',
            'butir.required' => 'Butir wajib diisi (misal: 1.1.1).',
            'nama_dokumen.required' => 'Nama dokumen wajib diisi.',
            'file_path.required' => 'File dokumen wajib diupload.',
            'file_path.mimes' => 'File harus berformat PDF, JPG, JPEG, atau PNG.',
            'file_path.max' => 'Ukuran file maksimal 10MB.',
            'tahun_ajaran.required' => 'Tahun ajaran wajib diisi.',
            'status.required' => 'Status wajib diisi.',
        ];
    }
}
