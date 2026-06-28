import { useEffect, useRef, useState, FormEvent } from 'react';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import gsap from 'gsap';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { AlertCircle, CheckCircle, ChevronRight, User, BookOpen, DollarSign, Calendar, Users } from 'lucide-react';

interface SpmbConfig {
    id: number;
    tahun_ajaran: string;
    kuota_total: number;
    kuota_reguler: number;
    kuota_afirmasi: number;
    kuota_prestasi: number;
    biaya_pendaftaran: string;
    uang_pendaftaran: string;
    tanggal_buka: string;
    tanggal_tutup: string;
    tanggal_pengumuman: string;
    tanggal_daftar_ulang: string;
    aktif: boolean;
}

interface Props {
    config: SpmbConfig | null;
    error: string | null;
}

export default function Register({ config, error }: Props) {
    const { errors, flash } = usePage().props as any;
    const [submitting, setSubmitting] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    const [form, setForm] = useState({
        nisn: '',
        nama_lengkap: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        alamat: '',
        no_hp: '',
        email: '',
        asal_sekolah: '',
        npsn_sekolah: '',
        jurusan_sekolah: '',
        tahun_lulus: '',
        jalur_pendaftaran: '',
        nama_ayah: '',
        nama_ibu: '',
        pekerjaan_ayah: '',
        pekerjaan_ibu: '',
        penghasilan_ortu: '',
        no_hp_ortu: '',
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.form-section',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
            );
        }, formRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        setSubmitting(true);
    };

    if (error) {
        return (
            <>
                <Head title="Pendaftaran SPMB" />
                <Header footer={null as any} jurusanM={[]} kegiatanM={[]} />
                <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-12">
                                <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                                    <AlertCircle className="w-10 h-10 text-red-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                    Pendaftaran Ditutup
                                </h1>
                                <p className="text-gray-600 mb-8">{error}</p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer footer={null as any} />
            </>
        );
    }

    if (!config) {
        return (
            <>
                <Head title="Pendaftaran SPMB" />
                <Header footer={null as any} jurusanM={[]} kegiatanM={[]} />
                <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-12">
                                <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
                                    <AlertCircle className="w-10 h-10 text-amber-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                    Pendaftaran Belum Dibuka
                                </h1>
                                <p className="text-gray-500">
                                    Informasi pendaftaran akan diumumkan kemudian.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer footer={null as any} />
            </>
        );
    }

    const jalurLabels: Record<string, string> = {
        reguler: 'Reguler',
        afirmasi: 'Afirmasi',
        prestasi: 'Prestasi',
    };

    const jalurDescriptions: Record<string, string> = {
        reguler: 'Jalur pendaftaran umum berdasarkan nilai akademik',
        afirmasi: 'Khusus pendaftar dari keluarga kurang mampu dengan bukti valid',
        prestasi: 'Pendaftar dengan prestasi akademik/non-akademik tingkat kabupaten ke atas',
    };

    return (
        <>
            <Head title="Pendaftaran SPMB" />
            <Header footer={null as any} jurusanM={[]} kegiatanM={[]} />

            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-8 lg:py-16">
                <div className="container mx-auto px-4">
                    <div ref={formRef} className="max-4xl mx-auto">
                        <div className="form-section text-center mb-10">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                                Pendaftaran Siswa Baru
                            </h1>
                            <p className="text-gray-500">
                                Tahun Ajaran {config.tahun_ajaran}
                            </p>
                        </div>

                        <div className="form-section grid md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
                                <Calendar className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">Pendaftaran</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {new Date(config.tanggal_buka).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    {' '}-{' '}
                                    {new Date(config.tanggal_tutup).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
                                <DollarSign className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">Biaya Pendaftaran</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    Rp {parseInt(config.biaya_pendaftaran).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
                                <Users className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">Kuota Tersedia</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    1-{config.kuota_total} Siswa
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
                                <BookOpen className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">Pengumuman</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {new Date(config.tanggal_pengumuman).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        <div className="form-section">
                            <form method="POST" action="/spmb/daftar" onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-10">
                                <input type="hidden" name="_token" value={(usePage().props as any).csrf_token} />

                                {flash?.error && (
                                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        {flash.error}
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                        <User className="w-5 h-5 text-emerald-500" />
                                        Data Pribadi
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                NISN <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nisn"
                                                value={form.nisn}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className={`w-full px-4 py-2.5 border ${errors?.nisn ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors?.nisn && <p className="text-red-500 text-xs mt-1">{errors.nisn}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nama Lengkap <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nama_lengkap"
                                                value={form.nama_lengkap}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.nama_lengkap ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors?.nama_lengkap && <p className="text-red-500 text-xs mt-1">{errors.nama_lengkap}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tempat Lahir <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="tempat_lahir"
                                                value={form.tempat_lahir}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.tempat_lahir ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors?.tempat_lahir && <p className="text-red-500 text-xs mt-1">{errors.tempat_lahir}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tanggal Lahir <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="tanggal_lahir"
                                                value={form.tanggal_lahir}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 border ${errors?.tanggal_lahir ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors?.tanggal_lahir && <p className="text-red-500 text-xs mt-1">{errors.tanggal_lahir}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Jenis Kelamin <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="jenis_kelamin"
                                                value={form.jenis_kelamin}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 border ${errors?.jenis_kelamin ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="L">Laki-laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                            {errors?.jenis_kelamin && <p className="text-red-500 text-xs mt-1">{errors.jenis_kelamin}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                No. HP <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="no_hp"
                                                value={form.no_hp}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className={`w-full px-4 py-2.5 border ${errors?.no_hp ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors?.no_hp && <p className="text-red-500 text-xs mt-1">{errors.no_hp}</p>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Alamat <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                name="alamat"
                                                value={form.alamat}
                                                onChange={handleChange}
                                                rows={3}
                                                className={`w-full px-4 py-2.5 border ${errors?.alamat ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors?.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 pt-8 border-t border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                        <BookOpen className="w-5 h-5 text-emerald-500" />
                                        Data Pendidikan
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Asal Sekolah <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="asal_sekolah"
                                                value={form.asal_sekolah}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.asal_sekolah ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors?.asal_sekolah && <p className="text-red-500 text-xs mt-1">{errors.asal_sekolah}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                NPSN Sekolah
                                            </label>
                                            <input
                                                type="text"
                                                name="npsn_sekolah"
                                                value={form.npsn_sekolah}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className={`w-full px-4 py-2.5 border ${errors?.npsn_sekolah ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.npsn_sekolah && <p className="text-red-500 text-xs mt-1">{errors.npsn_sekolah}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Jurusan Sekolah
                                            </label>
                                            <input
                                                type="text"
                                                name="jurusan_sekolah"
                                                value={form.jurusan_sekolah}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.jurusan_sekolah ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.jurusan_sekolah && <p className="text-red-500 text-xs mt-1">{errors.jurusan_sekolah}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tahun Lulus
                                            </label>
                                            <input
                                                type="number"
                                                name="tahun_lulus"
                                                value={form.tahun_lulus}
                                                onChange={handleChange}
                                                min={2020}
                                                max={2030}
                                                className={`w-full px-4 py-2.5 border ${errors?.tahun_lulus ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.tahun_lulus && <p className="text-red-500 text-xs mt-1">{errors.tahun_lulus}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 pt-8 border-t border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                                        Jalur Pendaftaran
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        {Object.entries(jalurLabels).map(([key, label]) => (
                                            <label
                                                key={key}
                                                className={`relative block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                                    form.jalur_pendaftaran === key
                                                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                                                        : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="jalur_pendaftaran"
                                                    value={key}
                                                    checked={form.jalur_pendaftaran === key}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                    required
                                                />
                                                <p className="font-semibold text-gray-800 mb-1">{label}</p>
                                                <p className="text-xs text-gray-500">{jalurDescriptions[key]}</p>
                                            </label>
                                        ))}
                                    </div>
                                    {errors?.jalur_pendaftaran && <p className="text-red-500 text-xs mt-1">{errors.jalur_pendaftaran}</p>}
                                </div>

                                <div className="mb-8 pt-8 border-t border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                        <User className="w-5 h-5 text-emerald-500" />
                                        Data Orang Tua
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
                                            <input
                                                type="text"
                                                name="nama_ayah"
                                                value={form.nama_ayah}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.nama_ayah ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.nama_ayah && <p className="text-red-500 text-xs mt-1">{errors.nama_ayah}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
                                            <input
                                                type="text"
                                                name="nama_ibu"
                                                value={form.nama_ibu}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.nama_ibu ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.nama_ibu && <p className="text-red-500 text-xs mt-1">{errors.nama_ibu}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Ayah</label>
                                            <input
                                                type="text"
                                                name="pekerjaan_ayah"
                                                value={form.pekerjaan_ayah}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.pekerjaan_ayah ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.pekerjaan_ayah && <p className="text-red-500 text-xs mt-1">{errors.pekerjaan_ayah}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Ibu</label>
                                            <input
                                                type="text"
                                                name="pekerjaan_ibu"
                                                value={form.pekerjaan_ibu}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors?.pekerjaan_ibu ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.pekerjaan_ibu && <p className="text-red-500 text-xs mt-1">{errors.pekerjaan_ibu}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Penghasilan Orang Tua</label>
                                            <input
                                                type="text"
                                                name="penghasilan_ortu"
                                                value={form.penghasilan_ortu}
                                                onChange={handleChange}
                                                maxLength={255}
                                                placeholder="Contoh: Rp 2.000.000 - Rp 5.000.000"
                                                className={`w-full px-4 py-2.5 border ${errors?.penghasilan_ortu ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.penghasilan_ortu && <p className="text-red-500 text-xs mt-1">{errors.penghasilan_ortu}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">No. HP Orang Tua</label>
                                            <input
                                                type="tel"
                                                name="no_hp_ortu"
                                                value={form.no_hp_ortu}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className={`w-full px-4 py-2.5 border ${errors?.no_hp_ortu ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors?.no_hp_ortu && <p className="text-red-500 text-xs mt-1">{errors.no_hp_ortu}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-xs text-gray-400">
                                            <span className="text-red-500">*</span> Field wajib diisi
                                        </p>
                                        <div className="flex gap-3">
                                            <Link
                                                href="/"
                                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                                            >
                                                Batal
                                            </Link>
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-300 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2"
                                            >
                                                {submitting ? 'Menyimpan...' : (
                                                    <>
                                                        Daftar Sekarang
                                                        <ChevronRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer footer={null as any} />
        </>
    );
}
