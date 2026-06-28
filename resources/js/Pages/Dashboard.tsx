import { useEffect, useRef } from 'react';
import { usePage, Link } from '@inertiajs/inertia-react';
import Head from '@/Layout/Head';
import {
    Users,
    UserPlus,
    BookOpen,
    CreditCard,
    TrendingUp,
    Calendar,
    FileText,
    Megaphone,
    ChevronRight,
    Sparkles,
    GraduationCap,
    Library
} from 'lucide-react';
import gsap from 'gsap';
import type { PageProps } from '@/types';

export default function Dashboard() {
    const { auth } = usePage().props as unknown as PageProps;
    const user = auth?.user;
    const dashboardRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered entrance animation for stat cards
            gsap.fromTo('.stat-card',
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.7)'
                }
            );

            // Quick actions animation
            gsap.fromTo('.quick-action',
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: 'power3.out'
                }
            );

            // Content sections animation
            gsap.fromTo('.content-section',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    delay: 0.6,
                    ease: 'power3.out'
                }
            );

            // List items animation
            gsap.fromTo('.list-item',
                { opacity: 0, x: -10 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    delay: 0.8,
                    ease: 'power2.out'
                }
            );
        }, dashboardRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        {
            title: 'Total Siswa',
            value: '1,234',
            change: '+12%',
            changeType: 'positive',
            icon: Users,
            gradient: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            title: 'Calon Siswa',
            value: '45',
            change: '+8',
            changeType: 'positive',
            icon: UserPlus,
            gradient: 'from-amber-500 to-amber-600',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            iconBg: 'bg-amber-500/10',
            iconColor: 'text-amber-600 dark:text-amber-400'
        },
        {
            title: 'Total Buku',
            value: '856',
            change: '+24',
            changeType: 'positive',
            icon: BookOpen,
            gradient: 'from-emerald-500 to-emerald-600',
            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-600 dark:text-emerald-400'
        },
        {
            title: 'Pembayaran SPP',
            value: 'Rp 12.5M',
            change: '+18%',
            changeType: 'positive',
            icon: CreditCard,
            gradient: 'from-violet-500 to-violet-600',
            bg: 'bg-violet-50 dark:bg-violet-900/20',
            iconBg: 'bg-violet-500/10',
            iconColor: 'text-violet-600 dark:text-violet-400'
        }
    ];

    const quickActions = [
        {
            title: 'Tambah Calon Siswa',
            href: route('ppdb.create'),
            icon: UserPlus,
            color: 'blue',
            gradient: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Laporan Keuangan',
            href: route('settings'),
            icon: FileText,
            color: 'emerald',
            gradient: 'from-emerald-500 to-emerald-600'
        },
        {
            title: 'Kelola Berita',
            href: route('berita-admin.index'),
            icon: Megaphone,
            color: 'violet',
            gradient: 'from-violet-500 to-violet-600'
        },
        {
            title: 'Statistik PPDB',
            href: route('ppdb.index'),
            icon: TrendingUp,
            color: 'amber',
            gradient: 'from-amber-500 to-amber-600'
        }
    ];

    const recentRegistrations = [
        { name: 'Ahmad Rizki', time: '2 jam yang lalu', status: 'Verifikasi', statusColor: 'amber' },
        { name: 'Siti Nurhaliza', time: '4 jam yang lalu', status: 'Lulus', statusColor: 'emerald' },
        { name: 'Budi Santoso', time: '5 jam yang lalu', status: 'Verifikasi', statusColor: 'amber' },
        { name: 'Dewi Lestari', time: '1 hari yang lalu', status: 'Lulus', statusColor: 'emerald' },
        { name: 'Eko Prasetyo', time: '2 hari yang lalu', status: 'Draft', statusColor: 'gray' }
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div ref={dashboardRef} className="space-y-8">
                {/* Welcome Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-dark to-violet-900 rounded-3xl shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="relative p-8 md:p-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-white/80 text-sm font-medium px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                                        Dashboard Admin
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    Selamat Datang, {user?.name || 'Admin'}!
                                </h1>
                                <p className="text-white/70 text-base">
                                    Berikut adalah ringkasan aktivitas sekolah hari ini.
                                </p>
                            </div>

                            <div className="hidden lg:block">
                                <div className="w-32 h-32 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center">
                                    <GraduationCap className="w-16 h-16 text-white/60" />
                                </div>
                            </div>
                        </div>

                        {/* Date Display */}
                        <div className="mt-6 flex items-center gap-4 text-white/60 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.title}
                            ref={el => cardsRef.current[index] = el}
                            className="stat-card group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-14 h-14 ${stat.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                        stat.changeType === 'positive'
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {stat.change}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                        {stat.title}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                                        {stat.value}
                                    </p>
                                </div>

                                {/* Hover gradient effect */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                    <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
                                    Quick Actions
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-4">
                                    Akses cepat fitur yang sering digunakan
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <Link
                                key={action.title}
                                href={action.href}
                                className={`quick-action group relative p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 overflow-hidden`}
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                <div className="relative flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors duration-300">
                                        <action.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors duration-300">
                                            {action.title}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Registrations */}
                    <div className="content-section bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                        <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                                            Pendaftaran Terbaru
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            5 pendaftar terakhir
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={route('ppdb.index')}
                                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
                                >
                                    Lihat Semua
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 space-y-3">
                            {recentRegistrations.map((registration, index) => (
                                <div
                                    key={index}
                                    className="list-item flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700 rounded-xl hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-xs font-bold text-white">
                                                {registration.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                {registration.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {registration.time}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                        registration.statusColor === 'emerald'
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            : registration.statusColor === 'amber'
                                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                                    }`}>
                                        {registration.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Statistics This Month */}
                    <div className="content-section bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                                        <Library className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                                            Statistik Bulan Ini
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Progress pencapaian target
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="group">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Calon Siswa Baru
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                            Target: 100 siswa
                                        </p>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        45%
                                    </span>
                                </div>
                                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                                        style={{ width: '45%' }}
                                    ></div>
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Target Pendaftar
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                            Kuota tersedia
                                        </p>
                                    </div>
                                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                        85%
                                    </span>
                                </div>
                                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000"
                                        style={{ width: '85%' }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Pembayaran SPP
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                            120 dari 150 siswa
                                        </p>
                                    </div>
                                    <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                                        80%
                                    </span>
                                </div>
                                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full transition-all duration-1000"
                                        style={{ width: '80%' }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Rata-rata Pencapaian
                                        </p>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                            70%
                                        </p>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <TrendingUp className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}