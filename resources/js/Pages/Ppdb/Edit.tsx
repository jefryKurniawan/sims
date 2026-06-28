import { useForm, Head } from '@inertiajs/inertia-react';
import { useState } from 'react';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';

interface CalonSiswa {
    id: number;
    nisn: string;
    nama_lengkap: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: 'L' | 'P';
    alamat: string;
    no_hp: string;
    email: string | null;
    nama_ortu: string;
    no_hp_ortu: string;
    asal_sekolah: string;
    prestasi: string | null;
    biaya_pendaftaran: number;
    bukti_bayar: string | null;
    status: string;
    keputusan: string;
}

interface Props {
    calonSiswa: CalonSiswa;
    editToken: string;
}

export default function Edit({ calonSiswa, editToken }: Props) {
    const { data, setData, put, processing, errors, progress } = useForm({
        nisn: calonSiswa.nisn,
        nama_lengkap: calonSiswa.nama_lengkap,
        tempat_lahir: calonSiswa.tempat_lahir,
        tanggal_lahir: calonSiswa.tanggal_lahir,
        jenis_kelamin: calonSiswa.jenis_kelamin,
        alamat: calonSiswa.alamat,
        no_hp: calonSiswa.no_hp,
        email: calonSiswa.email || '',
        nama_ortu: calonSiswa.nama_ortu,
        no_hp_ortu: calonSiswa.no_hp_ortu,
        asal_sekolah: calonSiswa.asal_sekolah,
        prestasi: calonSiswa.prestasi || '',
        bukti_bayar: null as File | null,
    });

    const [previewFile, setPreviewFile] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(`/ppdb/edit/${editToken}`);
    }

    function handleFileChange(field: string, e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData(field as any, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Head title="Edit Data Pendaftaran" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[250px] bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    ✏️ Edit Data Pendaftaran
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Perbarui Data Anda</h1>
                            <p className="text-white/90">Pastikan semua data sudah benar sebelum menyimpan</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Form Section */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Status Alert */}
                            <div className={`rounded-xl p-4 mb-6 flex items-start gap-3 ${
                                calonSiswa.status === 'submitted'
                                    ? 'bg-blue-50 border border-blue-200'
                                    : 'bg-gray-50 border border-gray-200'
                            }`}>
                                <svg className={`w-5 h-5 flex-shrink-0 ${calonSiswa.status === 'submitted' ? 'text-blue-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className={`font-medium ${calonSiswa.status === 'submitted' ? 'text-blue-800' : 'text-gray-800'}`}>
                                        Status: <span className="font-bold">{calonSiswa.status}</span>
                                    </p>
                                    <p className={`text-sm ${calonSiswa.status === 'submitted' ? 'text-blue-600' : 'text-gray-600'}`}>
                                        {calonSiswa.status === 'submitted'
                                            ? 'Data Anda sedang dalam proses verifikasi oleh admin.'
                                            : 'Data Anda belum disubmit.'}
                                    </p>
                                </div>
                            </div>

                            {/* Edit Form */}
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-blue-500 rounded-full" />
                                    Data Calon Siswa
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* NISN */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            NISN <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nisn}
                                            onChange={(e) => setData('nisn', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.nisn ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.nisn && <p className="mt-1 text-sm text-red-500">{errors.nisn}</p>}
                                    </div>

                                    {/* Nama Lengkap */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_lengkap}
                                            onChange={(e) => setData('nama_lengkap', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.nama_lengkap ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.nama_lengkap && <p className="mt-1 text-sm text-red-500">{errors.nama_lengkap}</p>}
                                    </div>

                                    {/* Tempat & Tanggal Lahir */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tempat Lahir <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.tempat_lahir}
                                            onChange={(e) => setData('tempat_lahir', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.tempat_lahir ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.tempat_lahir && <p className="mt-1 text-sm text-red-500">{errors.tempat_lahir}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Lahir <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.tanggal_lahir}
                                            onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.tanggal_lahir ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.tanggal_lahir && <p className="mt-1 text-sm text-red-500">{errors.tanggal_lahir}</p>}
                                    </div>

                                    {/* Jenis Kelamin */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Kelamin <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="jenis_kelamin"
                                                    value="L"
                                                    checked={data.jenis_kelamin === 'L'}
                                                    onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-gray-700">Laki-laki</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="jenis_kelamin"
                                                    value="P"
                                                    checked={data.jenis_kelamin === 'P'}
                                                    onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-gray-700">Perempuan</span>
                                            </label>
                                        </div>
                                        {errors.jenis_kelamin && <p className="mt-1 text-sm text-red-500">{errors.jenis_kelamin}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email (Opsional)
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            placeholder="email@contoh.com"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                    </div>

                                    {/* No HP */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            No. HP Calon Siswa <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.no_hp}
                                            onChange={(e) => setData('no_hp', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.no_hp ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.no_hp && <p className="mt-1 text-sm text-red-500">{errors.no_hp}</p>}
                                    </div>

                                    {/* Alamat */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={(e) => setData('alamat', e.target.value)}
                                            rows={3}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.alamat ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-primary mb-6 mt-8 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-purple-500 rounded-full" />
                                    Data Orang Tua/Wali
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Nama Orang Tua */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Orang Tua/Wali <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_ortu}
                                            onChange={(e) => setData('nama_ortu', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.nama_ortu ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.nama_ortu && <p className="mt-1 text-sm text-red-500">{errors.nama_ortu}</p>}
                                    </div>

                                    {/* No HP Orang Tua */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            No. HP Orang Tua/Wali <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.no_hp_ortu}
                                            onChange={(e) => setData('no_hp_ortu', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.no_hp_ortu ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.no_hp_ortu && <p className="mt-1 text-sm text-red-500">{errors.no_hp_ortu}</p>}
                                    </div>

                                    {/* Asal Sekolah */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Asal Sekolah <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.asal_sekolah}
                                            onChange={(e) => setData('asal_sekolah', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.asal_sekolah ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                            required
                                        />
                                        {errors.asal_sekolah && <p className="mt-1 text-sm text-red-500">{errors.asal_sekolah}</p>}
                                    </div>

                                    {/* Prestasi */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prestasi (Opsional)
                                        </label>
                                        <textarea
                                            value={data.prestasi}
                                            onChange={(e) => setData('prestasi', e.target.value)}
                                            rows={3}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.prestasi ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                                        />
                                        {errors.prestasi && <p className="mt-1 text-sm text-red-500">{errors.prestasi}</p>}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-primary mb-6 mt-8 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                                    Berkas Pendaftaran
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Biaya Pendaftaran */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Biaya Pendaftaran (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.biaya_pendaftaran}
                                            onChange={(e) => setData('biaya_pendaftaran', e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.biaya_pendaftaran ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition`}
                                            required
                                        />
                                        {errors.biaya_pendaftaran && <p className="mt-1 text-sm text-red-500">{errors.biaya_pendaftaran}</p>}
                                    </div>

                                    {/* Upload Bukti Bayar */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Upload Bukti Pembayaran Baru
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange('bukti_bayar', e)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                                        />
                                        {progress && (
                                            <div className="mt-2">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-emerald-500 h-2 rounded-full transition-all"
                                                        style={{ width: `${Math.min((progress.percentage || 0), 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {previewFile && (
                                            <div className="mt-3">
                                                <img src={previewFile} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                                            </div>
                                        )}
                                        {calonSiswa.bukti_bayar && !previewFile && (
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-500 mb-2">Bukti pembayaran saat ini:</p>
                                                <img src={`/storage/${calonSiswa.bukti_bayar}`} alt="Bukti Bayar" className="w-full h-32 object-cover rounded-lg" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-10 flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                                </svg>
                                                Simpan Perubahan
                                            </>
                                        )}
                                    </button>
                                    <a
                                        href={`/ppdb/sukses/${editToken}`}
                                        className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Kembali
                                    </a>
                                </div>
                            </form>

                            {/* Help Card */}
                            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-6 text-white">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">Butuh Bantuan?</h3>
                                        <p className="text-white/90 text-sm">
                                            Jika mengalami kesulitan dalam mengedit data, silakan hubungi admin sekolah melalui telepon atau email yang tersedia di halaman kontak.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}