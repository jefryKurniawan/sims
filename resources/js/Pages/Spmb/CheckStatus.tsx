import { useEffect, useRef } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/inertia-react";
import gsap from "gsap";
import Header from "@/Components/Frontend/Header";
import Footer from "@/Components/Frontend/Footer";
import {
    Search,
    AlertCircle,
    CheckCircle,
    XCircle,
    Clock,
    FileText,
    Mail,
    Calendar,
    User,
    ChevronRight,
} from "lucide-react";

interface SpmbApplicant {
    id: number;
    nomor_registrasi: string;
    nama_lengkap: string;
    nisn: string;
    email: string | null;
    asal_sekolah: string;
    jalur_pendaftaran: string;
    status: string | null;
    status_pendaftaran: string;
    submitted_at: string | null;
    verified_at: string | null;
    ranking?: {
        skor_total: number;
        peringkat: number;
        lulus_seleksi: boolean | null;
    } | null;
}

interface Props {
    applicant: SpmbApplicant | null;
    error: string | null;
}

export default function CheckStatus({ applicant, error }: Props) {
    const { errors } = usePage().props as any;
    const { data, setData, post, processing, reset } = useForm({
        nomor_registrasi: "",
    });
    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (applicant && resultRef.current) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    ".result-item",
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.06,
                        ease: "power2.out",
                    },
                );
            }, resultRef);

            return () => ctx.revert();
        }
    }, [applicant]);

    const statusConfig: Record<
        string,
        { label: string; color: string; bg: string; icon: any }
    > = {
        draft: {
            label: "Draft",
            color: "text-gray-600",
            bg: "bg-gray-100",
            icon: Clock,
        },
        submitted: {
            label: "Terkirim",
            color: "text-blue-600",
            bg: "bg-blue-100",
            icon: FileText,
        },
        verified: {
            label: "Terverifikasi",
            color: "text-emerald-600",
            bg: "bg-emerald-100",
            icon: CheckCircle,
        },
        rejected: {
            label: "Ditolak",
            color: "text-destructive",
            bg: "bg-red-100",
            icon: XCircle,
        },
    };

    const jalurLabels: Record<string, string> = {
        reguler: "Reguler",
        afirmasi: "Afirmasi",
        prestasi: "Prestasi",
    };

    const getStatusBadge = (status: string | null) => {
        if (!status) return null;
        const cfg = statusConfig[status] || {
            label: status,
            color: "text-gray-600",
            bg: "bg-gray-100",
            icon: Clock,
        };
        const Icon = cfg.icon;
        return (
            <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${cfg.color} ${cfg.bg}`}
            >
                <Icon className="w-4 h-4" />
                {cfg.label}
            </span>
        );
    };

    return (
        <>
            <Head title="Cek Status Pendaftaran - SPMB" />
            <Header />

            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                Cek Status Pendaftaran
                            </h1>
                            <p className="text-gray-500">
                                Masukkan nomor registrasi untuk mengecek status
                                pendaftaran Anda
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route("spmb.cek-status.post"));
                                }}
                                className="flex gap-3"
                            >
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="nomor_registrasi"
                                        value={data.nomor_registrasi}
                                        onChange={(e) =>
                                            setData({
                                                nomor_registrasi:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="Masukkan nomor registrasi..."
                                        className={`w-full px-4 py-3 border ${errors.nomor_registrasi ? "border-destructive focus:ring-destructive" : "border-gray-300 focus:ring-ring"} rounded-xl focus:outline-none focus:ring-2 transition-all`}
                                        required
                                    />
                                    {errors.nomor_registrasi && (
                                        <p className="text-destructive text-xs mt-1">
                                            {errors.nomor_registrasi}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-300 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2"
                                >
                                    <Search className="w-5 h-5" />
                                    {processing ? "Mencari..." : "Cari"}
                                </button>
                            </form>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 mb-6">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        )}

                        {applicant && (
                            <div
                                ref={resultRef}
                                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 result-item">
                                    <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Hasil Pencarian
                                    </h2>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="result-item flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Nomor Registrasi
                                            </p>
                                            <p className="font-bold text-gray-800 text-lg">
                                                {applicant.nomor_registrasi}
                                            </p>
                                        </div>
                                        {getStatusBadge(
                                            applicant.status_pendaftaran,
                                        )}
                                    </div>

                                    <div className="result-item grid md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3 p-3">
                                            <User className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Nama Lengkap
                                                </p>
                                                <p className="font-medium text-gray-800">
                                                    {applicant.nama_lengkap}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3">
                                            <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    NISN
                                                </p>
                                                <p className="font-medium text-gray-800">
                                                    {applicant.nisn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3">
                                            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Email
                                                </p>
                                                <p className="font-medium text-gray-800">
                                                    {applicant.email || "-"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3">
                                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Jalur Pendaftaran
                                                </p>
                                                <p className="font-medium text-gray-800">
                                                    {jalurLabels[
                                                        applicant
                                                            .jalur_pendaftaran
                                                    ] ||
                                                        applicant.jalur_pendaftaran}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="result-item p-4 bg-emerald-50 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-2">
                                            Asal Sekolah
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {applicant.asal_sekolah}
                                        </p>
                                    </div>

                                    {applicant.ranking && (
                                        <div className="result-item border border-gray-100 rounded-xl p-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">
                                                Hasil Seleksi
                                            </h3>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-2xl font-bold text-emerald-600">
                                                        {
                                                            applicant.ranking
                                                                .skor_total
                                                        }
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Skor Total
                                                    </p>
                                                </div>
                                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-2xl font-bold text-primary">
                                                        {
                                                            applicant.ranking
                                                                .peringkat
                                                        }
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Peringkat
                                                    </p>
                                                </div>
                                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                    {applicant.ranking
                                                        .lulus_seleksi ===
                                                    true ? (
                                                        <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                                                    ) : applicant.ranking
                                                          .lulus_seleksi ===
                                                      false ? (
                                                        <XCircle className="w-8 h-8 text-destructive mx-auto" />
                                                    ) : (
                                                        <Clock className="w-8 h-8 text-amber-500 mx-auto" />
                                                    )}
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {applicant.ranking
                                                            .lulus_seleksi ===
                                                        true
                                                            ? "Lulus"
                                                            : applicant.ranking
                                                                    .lulus_seleksi ===
                                                                false
                                                              ? "Tidak Lulus"
                                                              : "Menunggu"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="result-item flex justify-between pt-4 border-t border-gray-100">
                                        <Link
                                            href="/"
                                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-all text-sm"
                                        >
                                            Kembali ke Beranda
                                        </Link>
                                        <Link
                                            href={`/spmb/daftar`}
                                            className="text-emerald-600 hover:text-emerald-500 font-medium text-sm flex items-center gap-1 transition-all"
                                        >
                                            Daftar Baru
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
