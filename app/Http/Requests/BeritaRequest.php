<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BeritaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled by Policy
    }

    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('beritas', 'slug')->ignore($this->route('berita')?->id),
            ],
            'content' => 'required|string',
            'kategori' => ['required', Rule::in(['pengumuman', 'kegiatan', 'artikel'])],
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];

        // Penulis cannot set status/is_active directly
        if (!$this->user()->hasAnyRole(['Admin', 'Humas'])) {
            $rules['status'] = 'prohibited';
            $rules['is_active'] = 'prohibited';
        } else {
            $rules['status'] = ['sometimes', Rule::in(['draft', 'pending', 'published', 'rejected'])];
            $rules['is_active'] = 'sometimes|in:0,1';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul berita wajib diisi.',
            'slug.required' => 'Slug wajib diisi.',
            'slug.unique' => 'Slug sudah digunakan, gunakan slug lain.',
            'content.required' => 'Konten berita wajib diisi.',
            'kategori.required' => 'Kategori wajib dipilih.',
            'kategori.in' => 'Kategori tidak valid.',
            'thumbnail.image' => 'Thumbnail harus berupa gambar.',
            'thumbnail.mimes' => 'Format thumbnail harus jpeg, png, jpg, atau webp.',
            'thumbnail.max' => 'Ukuran thumbnail maksimal 2MB.',
        ];
    }

    protected function prepareForValidation(): void
    {
        // Auto-generate slug from title if not provided
        if ($this->title && !$this->slug) {
            $this->merge([
                'slug' => str($this->title)->slug(),
            ]);
        }
    }
}