import { useRef, useMemo } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import {
  Users, UserPlus, BookOpen, CreditCard, TrendingUp, TrendingDown,
  School, Library, Globe, BarChart3,
  ChevronRight, Calendar, Clock, ArrowUpRight, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  return new Intl.NumberFormat('id-ID').format(n);
}

function formatRupiah(n: number): string {
  if (n >= 1_000_000) return 'Rp ' + (n / 1_000_000).toFixed(1) + 'jt';
  if (n >= 1_000) return 'Rp ' + (n / 1_000).toFixed(1) + 'rb';
  return 'Rp ' + formatNumber(n);
}

interface QuickAccess {
  title: string;
  desc: string;
  href: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
}

export default function Dashboard({ auth, stats, latestActivities }: DashboardProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: true },
      fontFamily: 'inherit',
    },
    colors: ['#003366'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
      },
    },
    stroke: { curve: 'smooth', width: 2 },
    tooltip: { enabled: false },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
  }), []);

  const chartSeries = useMemo(() => [{
    name: 'Pembayaran',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 85, 95, 110, stats.pembayaranBulanIni / 10000],
  }], [stats.pembayaranBulanIni]);

  const barOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: ['#003366', '#28a745', '#E31E24', '#f59e0b'],
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '60%',
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ['Siswa', 'PPDB', 'Buku', 'SPP'],
      labels: { style: { fontSize: '12px', fontWeight: 600 } },
    },
    yaxis: {
      labels: { style: { fontSize: '12px' } },
    },
    tooltip: { enabled: true },
  }), []);

  const barSeries = useMemo(() => [{
    name: 'Total',
    data: [stats.siswaAktif, stats.totalPendaftar, stats.totalPeminjaman, stats.pembayaranBulanIni / 100000],
  }], [stats]);

  const statCards = [
    {
      label: 'Total Siswa Aktif',
      value: formatNumber(stats.siswaAktif),
      change: '-',
      trend: 'up' as const,
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'PPDB Mendaftar',
      value: formatNumber(stats.totalPendaftar),
      change: stats.pendaftarChange > 0
        ? '+' + stats.pendaftarChange + '%'
        : stats.pendaftarChange < 0
          ? stats.pendaftarChange + '%'
          : '-',
      trend: stats.pendaftarChange >= 0 ? ('up' as const) : ('down' as const),
      icon: <UserPlus className="w-6 h-6" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Peminjaman Buku',
      value: formatNumber(stats.totalPeminjaman),
      change: '-',
      trend: 'up' as const,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Pembayaran SPP',
      value: formatRupiah(stats.pembayaranBulanIni),
      change: stats.pembayaranChange > 0
        ? '+' + stats.pembayaranChange + '%'
        : stats.pembayaranChange < 0
          ? stats.pembayaranChange + '%'
          : '-',
      trend: stats.pembayaranChange >= 0 ? ('up' as const) : ('down' as const),
      icon: <CreditCard className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const quickAccess: QuickAccess[] = [
    {
      title: 'Data Siswa',
      desc: 'Kelola data seluruh siswa aktif',
      href: route('users.murid.index'),
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'PPDB',
      desc: 'Pendaftaran & seleksi siswa baru',
      href: route('ppdb.index'),
      icon: <UserPlus className="w-6 h-6" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'SPP & Pembayaran',
      desc: 'Tagihan dan riwayat pembayaran',
      href: route('spp.index'),
      icon: <CreditCard className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'GTK',
      desc: 'Data guru & tenaga kependidikan',
      href: route('gtk.index'),
      icon: <School className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Perpustakaan',
      desc: 'Katalog buku & peminjaman',
      href: '#',
      icon: <Library className="w-6 h-6" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      title: 'Website / Berita',
      desc: 'Kelola konten website sekolah',
      href: route('berita-admin.index'),
      icon: <Globe className="w-6 h-6" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  const activityColors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-rose-500', 'bg-cyan-500', 'bg-amber-500', 'bg-indigo-500'];

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
            href={route('ppdb.index')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
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
          <Card key={index} className="p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg ${
                  stat.trend === 'up'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 font-heading tracking-tight mb-0.5">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 font-body">{stat.label}</p>
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
            <Chart options={chartOptions} series={chartSeries} type="area" height={120} />
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
            <Chart options={barOptions} series={barSeries} type="bar" height={160} />
          </CardContent>
        </Card>
      </div>

      {/* PPDB Promo */}
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-navy-deep via-navy-medium to-navy-deep border border-blue-800/30 overflow-hidden">
        <div className="relative p-6 lg:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-school-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-red/15 text-school-red text-xs font-semibold font-label mb-3">
                <BarChart3 className="w-3.5 h-3.5" />
                PPDB 2025/2026
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-white font-heading mb-2">
                Pendaftaran Peserta Didik Baru
              </h3>
              <p className="text-blue-200/70 text-sm font-body max-w-xl">
                Total <span className="text-white font-semibold">{formatNumber(stats.totalPendaftar)}</span> pendaftar telah masuk.
                Kelola seleksi, verifikasi berkas, dan pengumuman kelulusan dari sini.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-white font-heading">{formatNumber(stats.totalPendaftar)}</p>
                <p className="text-[10px] text-blue-300/50 font-label uppercase tracking-wider">Pendaftar</p>
              </div>
              <Link
                href={route('ppdb.index')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-school-red text-white text-sm font-bold rounded-xl hover:bg-school-red/90 transition-all shadow-lg shadow-school-red/25"
              >
                Kelola PPDB
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickAccess.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-gray-900 font-body group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-sm text-gray-500 font-body">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 font-heading mb-4">
            Aktivitas Terbaru
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="space-y-0">
              {latestActivities.map((activity, index) => (
                <div key={index} className="flex gap-4 pb-5 last:pb-0 relative">
                  {index < latestActivities.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gray-100" />
                  )}
                  <div className="flex-shrink-0 relative z-10 mt-1">
                    <div className={`w-[22px] h-[22px] rounded-full ${activityColors[index % activityColors.length]} flex items-center justify-center shadow-sm`}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-body leading-snug">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 font-label mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full py-2.5 text-sm font-semibold text-primary hover:text-primary-dark hover:bg-blue-50 rounded-xl transition-all">
              Lihat Semua Aktivitas
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
