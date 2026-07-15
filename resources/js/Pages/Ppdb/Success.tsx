import { Head, Link } from "@inertiajs/inertia-react";
import Header from "@/Components/Frontend/Header";
import Footer from "@/Components/Frontend/Footer";

interface Props {
    calonSiswa: {
        id: number;
        nama_lengkap: string;
        nisn: string;
        status: string;
        keputusan: string;
        edit_token: string;
    };
}

export default function Success({ calonSiswa }: Props) {
    const editUrl = `${window.location.origin}/ppdb/edit/${calonSiswa.edit_token}`;
    const statusUrl = `${window.location.origin}/ppdb/cek-status/${calonSiswa.edit_token}`;

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <Head title="Pendaftaran Berhasil" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[200px] bg-gradient-to-br from-emerald-500 to-emerald-700 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-10 h-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold">
                                Pendaftaran Berhasil!
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Success Content */}
                <section className="py-12 -mt-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            {/* Main Success Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
                                        <svg
                                            className="w-10 h-10 text-emerald-500"
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
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        Terima kasih, {calonSiswa.nama_lengkap}!
                                    </h2>
                                    <p className="text-gray-600">
                                        Pendaftaran Anda telah berhasil dikirim.
                                        Simpan kode edit di bawah ini dengan
                                        baik.
                                    </p>
                                </div>

                                {/* Edit Token Card */}
                                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 mb-6">
                                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
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
                                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                            />
                                        </svg>
                                        Kode Edit Anda
                                    </h3>
                                    <p className="text-white/80 text-sm mb-4">
                                        Gunakan kode ini untuk mengedit data
                                        atau mengecek status pendaftaran
                                    </p>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between gap-4">
                                        <code className="text-white font-mono text-lg break-all">
                                            {calonSiswa.edit_token}
                                        </code>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    calonSiswa.edit_token,
                                                )
                                            }
                                            className="flex-shrink-0 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition"
                                            title="Salin kode edit"
                                        >
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Info Grid */}
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg
                                                className="w-5 h-5 text-primary"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                                />
                                            </svg>
                                            <span className="font-semibold text-gray-700">
                                                NISN
                                            </span>
                                        </div>
                                        <p className="text-gray-900 font-mono">
                                            {calonSiswa.nisn}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg
                                                className="w-5 h-5 text-primary"
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
                                            <span className="font-semibold text-gray-700">
                                                Status
                                            </span>
                                        </div>
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                            {calonSiswa.status === "submitted"
                                                ? "Terverifikasi"
                                                : calonSiswa.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={editUrl}
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all hover:shadow-lg text-center flex items-center justify-center gap-2"
                                    >
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
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                        Edit Data
                                    </a>
                                    <a
                                        href={statusUrl}
                                        className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all hover:shadow-lg text-center flex items-center justify-center gap-2"
                                    >
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
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                        Cek Status
                                    </a>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 text-amber-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-amber-800 mb-2">
                                            Penting!
                                        </h3>
                                        <ul className="text-amber-700 text-sm space-y-1">
                                            <li>
                                                • Kode edit hanya berlaku untuk
                                                3 hari ke depan
                                            </li>
                                            <li>
                                                • Jangan bagikan kode edit
                                                kepada siapapun
                                            </li>
                                            <li>
                                                • Simpan kode edit di tempat
                                                yang aman
                                            </li>
                                            <li>
                                                • Jika lupa kode edit, hubungi
                                                admin sekolah
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* What's Next */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Langkah Selanjutnya
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            1
                                        </span>
                                        <p className="text-gray-600 text-sm">
                                            Administrasi akan memverifikasi
                                            berkas pendaftaran Anda
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            2
                                        </span>
                                        <p className="text-gray-600 text-sm">
                                            Pantau status pendaftaran melalui
                                            halaman "Cek Status"
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            3
                                        </span>
                                        <p className="text-gray-600 text-sm">
                                            Jika diterima, Anda akan mendapat
                                            notifikasi dan dapat melakukan
                                            daftar ulang
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
