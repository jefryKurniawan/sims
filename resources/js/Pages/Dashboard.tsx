import { useRef, useMemo, useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import {
    Users,
    UserPlus,
    BookOpen,
    CreditCard,
    TrendingUp,
    TrendingDown,
    School,
    Library,
    Globe,
    BarChart3,
    Trophy,
    ChevronRight,
    Calendar,
    Clock,
    ArrowUpRight,
    ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
    siswaAktif: number;
    totalPendaftar: number;
    totalPeminjaman: number;
    totalAlumni: number;
    totalBuku: number;
    pembayaranBulanIni: number;
    pembayaranChange: number;
    pendaftarChange: number;
}

interface Activity {
    description: string;
    time: string;
    created_at: string;
    user_type: string;
}

interface DashboardProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            foto_profile: string | null;
        };
    };
    stats: Stats;
    latestActivities: Activity[];
}

function formatNumber(n: number): string {
    return new Intl.NumberFormat("id-ID").format(n);
}

function formatRupiah(n: number): string {
    if (n >= 1_000_000) return "Rp " + (n / 1_000_000).toFixed(1) + "jt";
    if (n >= 1_000) return "Rp " + (n / 1_000).toFixed(1) + "rb";
    return "Rp " + formatNumber(n);
}

// ponytail: count-up animation on first render
function useCountUp(target: number, duration = 800) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (target <= 0) {
            setValue(0);
            return;
        }
        let start = 0;
        const step = Math.max(1, Math.floor(target / (duration / 16)));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setValue(target);
                clearInterval(timer);
            } else setValue(start);
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return value;
}

interface QuickAccess {
    title: string;
    desc: string;
    href: string;
    icon: JSX.Element;
    color: string;
    bgColor: string;
}

// Module-specific semantic colors that work across all themes
const moduleColors = [
    { text: "text-primary", bg: "bg-primary/10" }, // Data Siswa
    { text: "text-emerald-600", bg: "bg-emerald-50" }, // SPMB
    { text: "text-destructive", bg: "bg-destructive/10" }, // SPP
    { text: "text-amber-600", bg: "bg-amber-50" }, // GTK
    { text: "text-rose-600", bg: "bg-rose-50" }, // Perpustakaan
    { text: "text-sky-600", bg: "bg-sky-50" }, // Website/Berita
    { text: "text-amber-600", bg: "bg-amber-50" }, // Galeri Prestasi
];

const activityColors = [
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-amber-500",
    "bg-indigo-500",
];

export default function Dashboard({
    auth,
    stats,
    latestActivities,
}: DashboardProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    // ponytail: animated counters
    const countSiswa = useCountUp(stats.siswaAktif);
    const countPendaftar = useCountUp(stats.totalPendaftar);
    const countPeminjaman = useCountUp(stats.totalPeminjaman);
    const countPembayaran = useCountUp(stats.pembayaranBulanIni);

    const today = new Date();
    const dateStr = today.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const primaryColor = "hsl(var(--primary))"; // CSS variable for chart
    const secondaryColor = "hsl(var(--secondary))";

    const chartOptions: ApexOptions = useMemo(
        () => ({
            chart: {
                type: "area",
                toolbar: { show: false },
                sparkline: { enabled: true },
                fontFamily: "inherit",
            },
            colors: [primaryColor],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0,
                },
            },
            stroke: { curve: "smooth", width: 2 },
            tooltip: { enabled: false },
            grid: { show: false },
            xaxis: {
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: { show: false },
        }),
        [primaryColor],
    );

    const chartSeries = useMemo(
        () => [
            {
                name: "Pembayaran",
                data: [
                    30,
                    40,
                    35,
                    50,
                    49,
                    60,
                    70,
                    91,
                    85,
                    95,
                    110,
                    stats.pembayaranBulanIni / 10000,
                ],
            },
        ],
        [stats.pembayaranBulanIni],
    );

    const barOptions: ApexOptions = useMemo(
        () => ({
            chart: {
                type: "bar",
                toolbar: { show: false },
                fontFamily: "inherit",
            },
            colors: [primaryColor, "#eab308", "#28a745", "#64748b"],
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: "60%",
                    distributed: true,
                },
            },
            dataLabels: { enabled: false },
            grid: {
                borderColor: "hsl(var(--border))",
                strokeDashArray: 4,
            },
            xaxis: {
                categories: ["Siswa", "PPDB", "Buku", "SPP"],
                labels: {
                    style: {
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "hsl(var(--muted-foreground))",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: "12px",
                        color: "hsl(var(--muted-foreground))",
                    },
                },
            },
            tooltip: { enabled: true },
        }),
        [primaryColor],
    );

    const barSeries = useMemo(
        () => [
            {
                name: "Total",
                data: [
                    stats.siswaAktif,
                    stats.totalPendaftar,
                    stats.totalPeminjaman,
                    stats.pembayaranBulanIni / 100000,
                ],
            },
        ],
        [stats],
    );

    const statCards = [
        {
            label: "Total Siswa Aktif",
            value: formatNumber(countSiswa),
            rawTarget: stats.siswaAktif,
            change: "-",
            trend: "up" as const,
            icon: <Users className="w-6 h-6" />,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            label: "SPMB Mendaftar",
            value: formatNumber(countPendaftar),
            rawTarget: stats.totalPendaftar,
            change:
                stats.pendaftarChange > 0
                    ? "+" + stats.pendaftarChange + "%"
                    : stats.pendaftarChange < 0
                      ? stats.pendaftarChange + "%"
                      : "-",
            trend:
                stats.pendaftarChange >= 0
                    ? ("up" as const)
                    : ("down" as const),
            icon: <UserPlus className="w-6 h-6" />,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
        {
            label: "Peminjaman Buku",
            value: formatNumber(countPeminjaman),
            rawTarget: stats.totalPeminjaman,
            change: "-",
            trend: "up" as const,
            icon: <BookOpen className="w-6 h-6" />,
            color: "text-sky-600",
            bgColor: "bg-sky-50",
        },
        {
            label: "Pembayaran SPP",
            value: formatRupiah(countPembayaran),
            rawTarget: stats.pembayaranBulanIni,
            change:
                stats.pembayaranChange > 0
                    ? "+" + stats.pembayaranChange + "%"
                    : stats.pembayaranChange < 0
                      ? stats.pembayaranChange + "%"
                      : "-",
            trend:
                stats.pembayaranChange >= 0
                    ? ("up" as const)
                    : ("down" as const),
            icon: <CreditCard className="w-6 h-6" />,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
        },
    ];

    const quickAccess: QuickAccess[] = [
        {
            title: "Data Siswa",
            desc: "Kelola data seluruh siswa aktif",
            href: route("users.murid.index"),
            icon: <Users className="w-6 h-6" />,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            title: "SPMB",
            desc: "Seleksi & penerimaan murid baru",
            href: route("ppdb.index"),
            icon: <UserPlus className="w-6 h-6" />,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
        {
            title: "SPP & Pembayaran",
            desc: "Tagihan dan riwayat pembayaran",
            href: route("spp.index"),
            icon: <CreditCard className="w-6 h-6" />,
            color: "text-destructive",
            bgColor: "bg-destructive/10",
        },
        {
            title: "GTK",
            desc: "Data guru & tenaga kependidikan",
            href: route("gtk.index"),
            icon: <School className="w-6 h-6" />,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
        },
        {
            title: "Perpustakaan",
            desc: "Katalog buku & peminjaman",
            href: "#",
            icon: <Library className="w-6 h-6" />,
            color: "text-rose-600",
            bgColor: "bg-rose-50",
        },
        {
            title: "Website / Berita",
            desc: "Kelola konten website sekolah",
            href: route("admin.berita.index"),
            icon: <Globe className="w-6 h-6" />,
            color: "text-sky-600",
            bgColor: "bg-sky-50",
        },
        {
            title: "Galeri Prestasi",
            desc: "Prestasi akademik & non-akademik",
            href: route("admin.prestasi.index"),
            icon: <Trophy className="w-6 h-6" />,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            {/* Hero section */}
            <div ref={sectionRef} className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading tracking-tight">
                            Selamat Datang kembali, {auth.user.name}
                        </h1>
                        <p className="text-gray-500 text-sm font-body mt-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {dateStr}
                        </p>
                    </div>
                    <Link
                        href={route("ppdb.index")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Lihat Laporan
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-8">
                {statCards.map((stat, index) => (
                    <Card
                        key={index}
                        className="p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}
                            >
                                {stat.icon}
                            </div>
                            <span
                                className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg ${
                                    stat.trend === "up"
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-destructive/10 text-destructive"
                                }`}
                            >
                                {stat.trend === "up" ? (
                                    <TrendingUp className="w-3 h-3" />
                                ) : (
                                    <TrendingDown className="w-3 h-3" />
                                )}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 font-heading tracking-tight mb-0.5">
                            {stat.value}
                        </p>
                        <p className="text-sm text-gray-500 font-body">
                            {stat.label}
                        </p>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <Card>
                    <CardHeader className="pb-0">
                        <CardTitle className="text-sm font-bold text-gray-900 font-heading">
                            Tren Pembayaran
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                            height={120}
                        />
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-400 font-label">
                            <span>Jan</span>
                            <span>Des</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-0">
                        <CardTitle className="text-sm font-bold text-gray-900 font-heading">
                            Ringkasan Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Chart
                            options={barOptions}
                            series={barSeries}
                            type="bar"
                            height={160}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* PPDB Promo - uses theme-aware gradient */}
            <div className="mb-8 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/40 border border-primary/20 overflow-hidden">
                <div className="relative p-6 lg:p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-semibold font-label mb-3">
                                <BarChart3 className="w-3.5 h-3.5" />
                                SPMB 2025/2026
                            </span>
                            <h3 className="text-xl lg:text-2xl font-bold text-white font-heading mb-2">
                                Seleksi Penerimaan Murid Baru
                            </h3>
                            <p className="text-primary-foreground/70 text-sm font-body max-w-xl">
                                Total{" "}
                                <span className="text-white font-semibold">
                                    {formatNumber(stats.totalPendaftar)}
                                </span>{" "}
                                pendaftar telah masuk. Kelola seleksi,
                                verifikasi berkas, dan pengumuman kelulusan dari
                                sini.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-2xl font-bold text-white font-heading">
                                    {formatNumber(stats.totalPendaftar)}
                                </p>
                                <p className="text-[10px] text-primary-foreground/50 font-label uppercase tracking-wider">
                                    Pendaftar
                                </p>
                            </div>
                            <Link
                                href={route("ppdb.index")}
                                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                            >
                                Kelola SPMB
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Access + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Quick Access */}
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-bold text-gray-900 font-heading mb-4">
                        Akses Cepat
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickAccess.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} flex-shrink-0`}
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-semibold text-gray-900 font-body group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                        <p className="text-sm text-gray-500 font-body">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                    <h2 className="text-lg font-bold text-gray-900 font-heading mb-4">
                        Aktivitas Terbaru
                    </h2>
                    <div className="rounded-2xl border border-primary/10 bg-white shadow-sm overflow-hidden">
                        {latestActivities.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>Belum ada aktivitas</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {latestActivities
                                    .slice(0, 8)
                                    .map((activity, idx) => (
                                        <li
                                            key={activity.created_at + idx}
                                            className="p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${activityColors[idx % activityColors.length]}`}
                                                >
                                                    <Clock className="w-4.5 h-4.5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 font-body line-clamp-1">
                                                        {activity.description}
                                                    </p>
                                                    <p className="text-xs text-gray-400 font-label mt-0.5 flex items-center gap-1">
                                                        {activity.time}
                                                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded">
                                                            {activity.user_type}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
