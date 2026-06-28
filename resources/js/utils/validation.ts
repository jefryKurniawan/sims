import { type } from 'arktype';

/**
 * Validator untuk data Calon Siswa menggunakan Arktype
 * Runtime type validation untuk form dan props
 */

export const CalonSiswaSchema = type({
    id: 'number.optional',
    nisn: 'string.required|min:10|max:15',
    nama_lengkap: 'string.required|min:3|max:255',
    tempat_lahir: 'string.required|min:2|max:255',
    tanggal_lahir: 'date.required',
    jenis_kelamin: "'L'|'P'",
    alamat: 'string.required|min:10',
    no_hp: 'string.required|min:10|max:20',
    email: 'string.email.optional | 0..0',
    nama_ortu: 'string.required|min:3|max:255',
    no_hp_ortu: 'string.required|min:10|max:20',
    asal_sekolah: 'string.required|min:3|max:255',
    prestasi: 'string.optional',
    status: "'pendaftaran'|'seleksi'|'lulus'|'tidak_lulus'",
    tanggal_daftar: 'date.optional',
    biaya_pendaftaran: 'number.required|min:0',
    bukti_bayar: 'string.optional|url',
    keputusan: "'belum'|'diterima'|'ditolak'",
    catatan: 'string.optional',
    created_at: 'date.optional',
    updated_at: 'date.optional',
});

export type CalonSiswa = typeof CalderSiswaSchema.infer;

// Export validator function
export const validateCalonSiswa = (data: unknown) => {
    const result = CalonSiswaSchema(data);

    if (result instanceof Array) {
        // Arktype returns errors as array
        return {
            valid: false,
            errors: result.map(err => err.message).join(', '),
        };
    }

    return {
        valid: true,
        data: result,
    };
};

/**
 * Contoh penggunaan:
 *
 * const validation = validateCalonSiswa(formData);
 * if (!validation.valid) {
 *     console.error('Validation failed:', validation.errors);
 * } else {
 *     const safeData = validation.data;
 * }
 */