import { useForm, Head, Link } from "@inertiajs/inertia-react";
import { useState } from "react";
import FrontendLayout from "@/Layout/FrontendLayout";

function Register() {
    const { data, setData, post, processing, errors, progress } = useForm({
        nisn: "",
        nama_lengkap: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "L",
        alamat: "",
        no_hp: "",
        email: "",
        nama_ortu: "",
        no_hp_ortu: "",
        asal_sekolah: "",
        prestasi: "",
        biaya_pendaftaran: "0",
        bukti_bayar: null as File | null,
    });

    const [previewFile, setPreviewFile] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post("/ppdb/daftar");
    }

    function handleFileChange(
        field: string,
        e: React.ChangeEvent<HTMLInputElement>,
    ) {
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
            <Head title="PPDB - Pendaftaran" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[300px] bg-gradient-to-br from-primary via-primary-dark to-emerald-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    🎓 Pendaftaran Siswa Baru
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                PPDB Online
                            </h1>
                            <p className="text-xl text-white/90">
                                Tanpa Login - Daftar Langsung
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Form Section */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Info Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-emerald-500">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-6 h-6 text-emerald-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-primary mb-2">
                                            Panduan Pendaftaran
                                        </h3>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            <li>
                                                ✅ Isi formulir di bawah ini
                                                dengan data yang benar
                                            </li>
                                            <li>
                                                ✅ Upload bukti pembayaran (jika
                                                ada)
                                            </li>
                                            <li>
                                                ✅{" "}
                                                <strong>
                                                    Simpan kode edit
                                                </strong>{" "}
                                                yang akan diberikan setelah
                                                pendaftaran
                                            </li>
                                            <li>
                                                ✅ Gunakan kode edit untuk
                                                mengubah data atau cek status
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
                            >
                                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                                    Data Calon Siswa
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* NISN */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            NISN{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nisn}
                                            onChange={(e) =>
                                                setData("nisn", e.target.value)
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.nisn ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="Nomor Induk Siswa Nasional"
                                            required
                                        />
                                        {errors.nisn && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.nisn}
                                            </p>
                                        )}
                                    </div>

                                    {/* Nama Lengkap */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_lengkap}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_lengkap",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.nama_lengkap ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="Nama lengkap calon siswa"
                                            required
                                        />
                                        {errors.nama_lengkap && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.nama_lengkap}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tempat & Tanggal Lahir */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tempat Lahir{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.tempat_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    "tempat_lahir",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.tempat_lahir ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="Kota/Kabupaten"
                                            required
                                        />
                                        {errors.tempat_lahir && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.tempat_lahir}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Lahir{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.tanggal_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_lahir",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.tanggal_lahir ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            required
                                        />
                                        {errors.tanggal_lahir && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.tanggal_lahir}
                                            </p>
                                        )}
                                    </div>

                                    {/* Jenis Kelamin */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Kelamin{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="jenis_kelamin"
                                                    value="L"
                                                    checked={
                                                        data.jenis_kelamin ===
                                                        "L"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "jenis_kelamin",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-4 h-4 text-emerald-600 focus:ring-ring"
                                                />
                                                <span className="text-gray-700">
                                                    Laki-laki
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="jenis_kelamin"
                                                    value="P"
                                                    checked={
                                                        data.jenis_kelamin ===
                                                        "P"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "jenis_kelamin",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-4 h-4 text-emerald-600 focus:ring-ring"
                                                />
                                                <span className="text-gray-700">
                                                    Perempuan
                                                </span>
                                            </label>
                                        </div>
                                        {errors.jenis_kelamin && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.jenis_kelamin}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email (Opsional)
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="email@contoh.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* No HP */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            No. HP Calon Siswa{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.no_hp}
                                            onChange={(e) =>
                                                setData("no_hp", e.target.value)
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.no_hp ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="08xxxxxxxxxx"
                                            required
                                        />
                                        {errors.no_hp && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.no_hp}
                                            </p>
                                        )}
                                    </div>

                                    {/* Alamat */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat Lengkap{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData(
                                                    "alamat",
                                                    e.target.value,
                                                )
                                            }
                                            rows={3}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.alamat ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, ..."
                                            required
                                        />
                                        {errors.alamat && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.alamat}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-primary mb-6 mt-8 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-blue-500 rounded-full" />
                                    Data Orang Tua/Wali
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Nama Orang Tua */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Orang Tua/Wali{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_ortu}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_ortu",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.nama_ortu ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="Nama lengkap orang tua/wali"
                                            required
                                        />
                                        {errors.nama_ortu && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.nama_ortu}
                                            </p>
                                        )}
                                    </div>

                                    {/* No HP Orang Tua */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            No. HP Orang Tua/Wali{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.no_hp_ortu}
                                            onChange={(e) =>
                                                setData(
                                                    "no_hp_ortu",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.no_hp_ortu ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="08xxxxxxxxxx"
                                            required
                                        />
                                        {errors.no_hp_ortu && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.no_hp_ortu}
                                            </p>
                                        )}
                                    </div>

                                    {/* Asal Sekolah */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Asal Sekolah{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.asal_sekolah}
                                            onChange={(e) =>
                                                setData(
                                                    "asal_sekolah",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.asal_sekolah ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="Nama sekolah asal"
                                            required
                                        />
                                        {errors.asal_sekolah && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.asal_sekolah}
                                            </p>
                                        )}
                                    </div>

                                    {/* Prestasi */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prestasi (Opsional)
                                        </label>
                                        <textarea
                                            value={data.prestasi}
                                            onChange={(e) =>
                                                setData(
                                                    "prestasi",
                                                    e.target.value,
                                                )
                                            }
                                            rows={3}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.prestasi ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                            placeholder="Prestasi akademik/non-akademik yang pernah diraih"
                                        />
                                        {errors.prestasi && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.prestasi}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-primary mb-6 mt-8 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-purple-500 rounded-full" />
                                    Berkas Pendaftaran
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Biaya Pendaftaran */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Biaya Pendaftaran
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                                Rp
                                            </span>
                                            <input
                                                type="number"
                                                value={data.biaya_pendaftaran}
                                                onChange={(e) =>
                                                    setData(
                                                        "biaya_pendaftaran",
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full pl-12 pr-4 py-3 rounded-lg border ${errors.biaya_pendaftaran ? "border-destructive" : "border-gray-300"} focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition`}
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        {errors.biaya_pendaftaran && (
                                            <p className="mt-1 text-sm text-destructive">
                                                {errors.biaya_pendaftaran}
                                            </p>
                                        )}
                                    </div>

                                    {/* Upload Bukti Bayar */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bukti Pembayaran (Opsional)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleFileChange(
                                                    "bukti_bayar",
                                                    e,
                                                )
                                            }
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ring focus:border-emerald-500 outline-none transition"
                                        />
                                        {progress && (
                                            <div className="mt-2">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-emerald-500 h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${Math.min(progress.percentage || 0, 100)}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {previewFile && (
                                            <div className="mt-3">
                                                <img
                                                    src={previewFile}
                                                    alt="Preview"
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-10">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Kirim Pendaftaran
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Help Card */}
                            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-6 text-white">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">
                                            Butuh Bantuan?
                                        </h3>
                                        <p className="text-white/90 text-sm">
                                            Jika mengalami kesulitan dalam
                                            pendaftaran, silakan hubungi admin
                                            sekolah melalui telepon atau email
                                            yang tersedia di halaman kontak.
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

Register.layout = FrontendLayout;
