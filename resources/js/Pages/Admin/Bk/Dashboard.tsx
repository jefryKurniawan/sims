import { Head, Link } from "@inertiajs/inertia-react";
import { AlertTriangle, MessageSquare, Trophy, Users } from "lucide-react";

interface Stats {
    pelanggaran_aktif: number;
    konseling_terbuka: number;
    total_prestasi: number;
}

interface SiswaPoin {
    id: number;
    nama_lengkap: string;
    nisn: string;
    poin_total: number;
}

interface Props {
    stats: Stats;
    siswaPoinTertinggi: SiswaPoin[];
}

const statConfig = [
    {
        label: "Pelanggaran Aktif",
        key: "pelanggaran_aktif" as const,
        icon: AlertTriangle,
        bg: "bg-red-50",
        color: "text-red-600",
        iconBg: "bg-red-100",
    },
    {
        label: "Konseling Terbuka",
        key: "konseling_terbuka" as const,
        icon: MessageSquare,
        bg: "bg-amber-50",
        color: "text-amber-600",
        iconBg: "bg-amber-100",
    },
    {
        label: "Total Prestasi",
        key: "total_prestasi" as const,
        icon: Trophy,
        bg: "bg-emerald-50",
        color: "text-emerald-600",
        iconBg: "bg-emerald-100",
    },
];

const actionLinks = [
    {
        label: "Catat Pelanggaran",
        href: "bk.pelanggaran.create",
        icon: AlertTriangle,
        bg: "hover:bg-red-50",
        color: "text-red-500",
        textHover: "hover:text-red-700",
    },
    {
        label: "Tambah Konseling",
        href: "bk.konseling.create",
        icon: MessageSquare,
        bg: "hover:bg-amber-50",
        color: "text-amber-500",
        textHover: "hover:text-amber-700",
    },
    {
        label: "Catat Prestasi",
        href: "bk.prestasi.create",
        icon: Trophy,
        bg: "hover:bg-emerald-50",
        color: "text-emerald-500",
        textHover: "hover:text-emerald-700",
    },
];

export default function Dashboard({ stats, siswaPoinTertinggi }: Props) {
    return (
        <>
            <Head title="Dashboard BK" />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                    Dashboard BK
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Bimbingan Konseling - Ringkasan
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-6 lg:mb-8">
                {statConfig.map((s) => {
                    const Icon = s.icon;
                    const value = stats[s.key];
                    return (
                        <div
                            key={s.key}
                            className={`${s.bg} border border-transparent rounded-xl p-5 flex items-center gap-4`}
                        >
                            <div
                                className={`p-3 ${s.iconBg} ${s.color} rounded-xl flex-shrink-0`}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    {s.label}
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Aksi Cepat */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">
                        Aksi Cepat
                    </h2>
                    <div className="space-y-1.5">
                        {actionLinks.map((a) => {
                            const Icon = a.icon;
                            return (
                                <Link
                                    key={a.label}
                                    href={route(a.href)}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-gray-700 ${a.bg} ${a.textHover} transition-all duration-200 group`}
                                >
                                    <span
                                        className={`${a.color} transition-transform duration-200 group-hover:scale-110`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <span>{a.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Siswa Poin Pelanggaran Tertinggi */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        Siswa Poin Pelanggaran Tertinggi
                    </h2>
                    {siswaPoinTertinggi.length === 0 ? (
                        <p className="text-sm text-gray-400 py-8 text-center">
                            Belum ada pelanggaran tercatat.
                        </p>
                    ) : (
                        <div className="space-y-1.5">
                            {siswaPoinTertinggi.map((s) => {
                                const badgeColor =
                                    s.poin_total >= 50
                                        ? "bg-red-50 text-red-700"
                                        : s.poin_total >= 25
                                          ? "bg-amber-50 text-amber-700"
                                          : "bg-gray-50 text-gray-600";
                                return (
                                    <div
                                        key={s.id}
                                        className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {s.nama_lengkap}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                NISN: {s.nisn}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-3 ${badgeColor}`}
                                        >
                                            {s.poin_total} poin
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
