import { useEffect, useRef } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/inertia-react";
import gsap from "gsap";
import Header from "@/Components/Frontend/Header";
import Footer from "@/Components/Frontend/Footer";
import {
    AlertCircle,
    CheckCircle,
    ChevronRight,
    User,
    BookOpen,
    DollarSign,
    Calendar,
    Users,
} from "lucide-react";

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
    const { props } = usePage();
    const errors = props.errors ?? {};
    const flash = props.flash ?? {};
    const { data, setData, post, processing, reset } = useForm({
        nisn: "",
        nama_lengkap: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        alamat: "",
        no_hp: "",
        email: "",
        asal_sekolah: "",
        npsn_sekolah: "",
        jurusan_sekolah: "",
        tahun_lulus: "",
        jalur_pendaftaran: "",
        nama_ayah: "",
        nama_ibu: "",
        pekerjaan_ayah: "",
        pekerjaan_ibu: "",
        penghasilan_ortu: "",
        no_hp_ortu: "",
    });

    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run animation when form is actually visible (config loaded and no error)
        if (config && !error) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    ".form-section",
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "power2.out",
                    },
                );
            }, formRef);

            return () => ctx.revert();
        }
    }, [config, error]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        setData({ [e.target.name]: e.target.value });
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
                                    <AlertCircle className="w-10 h-10 text-destructive" />
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
                                    Informasi pendaftaran akan diumumkan
                                    kemudian.
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
        reguler: "Reguler",
        afirmasi: "Afirmasi",
        prestasi: "Prestasi",
    };

    const jalurDescriptions: Record<string, string> = {
        reguler: "Jalur pendaftaran umum berdasarkan nilai akademik",
        afirmasi:
            "Khusus pendaftar dari keluarga kurang mampu dengan bukti valid",
        prestasi:
            "Pendaftar dengan prestasi akademik/non-akademik tingkat kabupaten ke atas",
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
                                <p className="text-xs text-gray-500">
                                    Pendaftaran
                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {new Date(
                                        config.tanggal_buka,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}{" "}
                                    -{" "}
                                    {new Date(
                                        config.tanggal_tutup,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
                                <DollarSign className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">
                                    Biaya Pendaftaran
                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                    Rp{" "}
                                    {parseInt(
                                        config.biaya_pendaftaran,
                                    ).toLocaleString("id-ID")}
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
                                <Users className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">
                                    Kuota Tersedia
                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                    1-{config.kuota_total} Siswa
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
                                <BookOpen className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">
                                    Pengumuman
                                </p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {new Date(
                                        config.tanggal_pengumuman,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="form-section">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route("spmb.store"));
                                }}
                                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-10"
                            >
                                {flash?.error && (
                                    <div className="mb-6 bg-destructive/10 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
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
                                                NISN{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nisn"
                                                value={data.nisn}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className={`w-full px-4 py-2.5 border ${errors.nisn ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors.nisn && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.nisn}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nama Lengkap{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nama_lengkap"
                                                value={data.nama_lengkap}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors.nama_lengkap ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors.nama_lengkap && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.nama_lengkap}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tempat Lahir{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="tempat_lahir"
                                                value={data.tempat_lahir}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors.tempat_lahir ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors.tempat_lahir && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.tempat_lahir}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Jenis Kelamin{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                name="jenis_kelamin"
                                                value={data.jenis_kelamin}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 border ${errors.jenis_kelamin ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            >
                                                <option value="">
                                                    Pilih Jenis Kelamin
                                                </option>
                                                <option value="L">
                                                    Laki-laki
                                                </option>
                                                <option value="P">
                                                    Perempuan
                                                </option>
                                            </select>
                                            {errors.jenis_kelamin && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.jenis_kelamin}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors.email ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.email && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                No. HP{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="no_hp"
                                                value={data.no_hp}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className={`w-full px-4 py-2.5 border ${errors.no_hp ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors.no_hp && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.no_hp}
                                                </p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Alamat{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </label>
                                            <textarea
                                                name="alamat"
                                                value={data.alamat}
                                                onChange={handleChange}
                                                rows={3}
                                                className={`w-full px-4 py-2.5 border ${errors.alamat ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors.alamat && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.alamat}
                                                </p>
                                            )}
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
                                                Asal Sekolah{" "}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="asal_sekolah"
                                                value={data.asal_sekolah}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors.asal_sekolah ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                                required
                                            />
                                            {errors.asal_sekolah && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.asal_sekolah}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                NPSN Sekolah
                                            </label>
                                            <input
                                                type="text"
                                                name="npsn_sekolah"
                                                value={data.npsn_sekolah}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className={`w-full px-4 py-2.5 border ${errors.npsn_sekolah ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.npsn_sekolah && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.npsn_sekolah}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Jurusan Sekolah
                                            </label>
                                            <input
                                                type="text"
                                                name="jurusan_sekolah"
                                                value={data.jurusan_sekolah}
                                                onChange={handleChange}
                                                maxLength={255}
                                                className={`w-full px-4 py-2.5 border ${errors.jurusan_sekolah ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.jurusan_sekolah && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.jurusan_sekolah}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tahun Lulus
                                            </label>
                                            <input
                                                type="number"
                                                name="tahun_lulus"
                                                value={data.tahun_lulus}
                                                onChange={handleChange}
                                                min={2020}
                                                max={2030}
                                                className={`w-full px-4 py-2.5 border ${errors.tahun_lulus ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.tahun_lulus && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.tahun_lulus}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 pt-8 border-t border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                                        Jalur Pendaftaran
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        {Object.entries(jalurLabels).map(
                                            ([key, label]) => (
                                                <label
                                                    key={key}
                                                    className={`relative block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                                        data.jalur_pendaftaran ===
                                                        key
                                                            ? "border-emerald-500 bg-emerald-50 shadow-md"
                                                            : "border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50"
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="jalur_pendaftaran"
                                                        value={key}
                                                        checked={
                                                            data.jalur_pendaftaran ===
                                                            key
                                                        }
                                                        onChange={handleChange}
                                                        className="sr-only"
                                                        required
                                                    />
                                                    <p className="font-semibold text-gray-800 mb-1">
                                                        {label}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {jalurDescriptions[key]}
                                                    </p>
                                                </label>
                                            ),
                                        )}
                                    </div>
                                    {errors.jalur_pendaftaran && (
                                        <p className="text-destructive text-xs mt-1">
                                            {errors.jalur_pendaftaran}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-8 pt-8 border-t border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                        <User className="w-5 h-5 text-emerald-500" />
                                        Data Orang Tua
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nama Ayah
                                            </label>
                                            <input
                                                type="text"
                                                name="nama_ayah"
                                                value={data.nama_ayah}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 border ${errors.nama_ayah ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.nama_ayah && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.nama_ayah}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nama Ibu
                                            </label>
                                            <input
                                                type="text"
                                                name="nama_ibu"
                                                value={data.nama_ibu}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 border ${errors.nama_ibu ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.nama_ibu && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.nama_ibu}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Pekerjaan Ayah
                                            </label>
                                            <input
                                                type="text"
                                                name="pekerjaan_ayah"
                                                value={data.pekerjaan_ayah}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 border ${errors.pekerjaan_ayah ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.pekerjaan_ayah && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.pekerjaan_ayah}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Pekerjaan Ibu
                                            </label>
                                            <input
                                                type="text"
                                                name="pekerjaan_ibu"
                                                value={data.pekerjaan_ibu}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 border ${errors.pekerjaan_ibu ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.pekerjaan_ibu && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.pekerjaan_ibu}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Penghasilan Orang Tua
                                            </label>
                                            <input
                                                type="text"
                                                name="penghasilan_ortu"
                                                value={data.penghasilan_ortu}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2.5 border ${errors.penghasilan_ortu ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.penghasilan_ortu && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.penghasilan_ortu}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                No. HP Orang Tua
                                            </label>
                                            <input
                                                type="tel"
                                                name="no_hp_ortu"
                                                value={data.no_hp_ortu}
                                                onChange={handleChange}
                                                maxLength={20}
                                                className={`w-full px-4 py-2.5 border ${errors.no_hp_ortu ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-lg focus:outline-none focus:ring-2 transition-all`}
                                            />
                                            {errors.no_hp_ortu && (
                                                <p className="text-destructive text-xs mt-1">
                                                    {errors.no_hp_ortu}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark disabled:opacity-50 transition-all"
                                    >
                                        {processing
                                            ? "Mengirim..."
                                            : "Daftar Sekarang"}
                                    </button>
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
