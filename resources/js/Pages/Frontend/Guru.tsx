import { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/inertia-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { Pagination } from '@/Components/Frontend/Pagination';
import {
  GraduationCap,
  Briefcase,
  Search,
  X,
  User,
  Mail,
  BookOpen,
  Users,
  Filter,
  Hash,
} from 'lucide-react';

// ─── Color scheme ───
const primaryColor = '#FFD700';
const secondaryColor = '#E31E24';

// ─── Custom hook: animated counter ───
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else cancelAnimationFrame(rafRef.current!);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [target, duration]);

  return count;
}

// ─── Types ───
interface GuruUser {
  id: number;
  name: string;
  email: string;
  foto_profile: string | null;
}

interface Guru {
  id: number;
  nama_lengkap: string;
  nip_nuptk: string;
  jenis: string;
  jabatan: string;
  bidang_studi: string;
  foto: string | null;
  user: GuruUser;
}

interface Props {
  gurus: {
    data: Guru[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: {
    jenis: string;
    bidang_studi: string;
    search: string;
  };
  bidangStudiList: string[];
  stats: {
    total: number;
    guru: number;
    tendik: number;
  };
}

// ─── Animation variants ───
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Component ───
export default function Guru({ gurus, filters, bidangStudiList, stats }: Props) {
  const totalCount = useCountUp(stats.total, 1800);
  const guruCount = useCountUp(stats.guru, 1800);
  const tendikCount = useCountUp(stats.tendik, 1800);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    router.get('/guru', params.toString());
  };

  const clearFilters = () => router.get('/guru');

  const hasActiveFilters = filters.jenis || filters.bidang_studi || filters.search;

  return (
    <>
      <Head title="Guru & Tenaga Kependidikan - SMAS St. Bonaventura" />
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key="guru-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gray-50 pt-20"
        >
          {/* ═══ Hero ═══ */}
          <div
            className="relative h-[380px] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor}DD 40%, ${primaryColor}60 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-15" />

            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
              style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }} />
            <div className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full opacity-10"
              style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }} />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-center text-white px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-5"
                >
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Tenaga Pendidik & Kependidikan
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                  Guru & Staf
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light">
                  Para pendidik profesional yang membimbing siswa menuju kesuksesan
                </p>

                {/* Quick stat */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-5 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full"
                >
                  <Hash className="w-4 h-4" style={{ color: primaryColor }} />
                  <span className="text-white font-semibold tabular-nums">
                    {totalCount.toLocaleString('id-ID')}
                  </span>
                  <span className="text-white/70 text-sm">tenaga pendidik & staf</span>
                </motion.div>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
          </div>

          {/* ═══ Stats + Filter Section ═══ */}
          <section className="py-12 -mt-8">
            <div className="container mx-auto px-4 max-w-7xl">
              {/* Stats cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto"
              >
                {/* Total */}
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
                  <Users className="w-7 h-7 mx-auto mb-1" style={{ color: secondaryColor }} strokeWidth={1.5} />
                  <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
                    {totalCount.toLocaleString('id-ID')}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">Total Guru & Staf</p>
                </div>

                {/* Guru */}
                <div className="rounded-2xl shadow-lg p-6 text-center text-white" style={{ backgroundColor: secondaryColor }}>
                  <GraduationCap className="w-7 h-7 mx-auto mb-1" strokeWidth={1.5} />
                  <p className="text-3xl font-extrabold tabular-nums">{guruCount.toLocaleString('id-ID')}</p>
                  <p className="text-white/80 text-xs mt-0.5">Guru</p>
                </div>

                {/* Tendik */}
                <div className="rounded-2xl shadow-lg p-6 text-center border border-gray-100"
                  style={{ backgroundColor: `${primaryColor}25` }}>
                  <Briefcase className="w-7 h-7 mx-auto mb-1" style={{ color: secondaryColor }} strokeWidth={1.5} />
                  <p className="text-3xl font-extrabold text-gray-900 tabular-nums">{tendikCount.toLocaleString('id-ID')}</p>
                  <p className="text-gray-500 text-xs mt-0.5">Tenaga Admin</p>
                </div>
              </motion.div>

              {/* Filter bar */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" style={{ color: secondaryColor }} />
                    Filter & Pencarian
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm flex items-center gap-1 transition-colors hover:underline"
                      style={{ color: secondaryColor }}
                    >
                      <X className="w-4 h-4" />
                      Reset Filter
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cari Nama</label>
                    <input
                      type="text"
                      placeholder="Ketik nama guru..."
                      value={filters.search}
                      onChange={(e) => handleFilter('search', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                      style={{ ['--tw-ring-color' as any]: `${secondaryColor}40` }}
                    />
                  </div>

                  {/* Jenis */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Pegawai</label>
                    <select
                      value={filters.jenis}
                      onChange={(e) => handleFilter('jenis', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                      style={{ ['--tw-ring-color' as any]: `${secondaryColor}40` }}
                    >
                      <option value="">Semua</option>
                      <option value="Guru">Guru</option>
                      <option value="Tenaga Kependidikan">Tenaga Kependidikan</option>
                    </select>
                  </div>

                  {/* Bidang Studi */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bidang Studi</label>
                    <select
                      value={filters.bidang_studi}
                      onChange={(e) => handleFilter('bidang_studi', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                      style={{ ['--tw-ring-color' as any]: `${secondaryColor}40` }}
                    >
                      <option value="">Semua Bidang Studi</option>
                      {bidangStudiList.map((bidang) => (
                        <option key={bidang} value={bidang}>{bidang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Guru Grid */}
              {gurus.data.length > 0 ? (
                <>
                  <motion.div
                    variants={cardContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {gurus.data.map((guru) => (
                      <motion.div
                        key={guru.id}
                        variants={cardVariants}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
                      >
                        {/* Header gradient */}
                        <div className="relative h-28 overflow-hidden"
                          style={{ background: `linear-gradient(135deg, ${secondaryColor}30, ${primaryColor}30)` }}>
                          {guru.user.foto_profile ? (
                            <img
                              src={`/storage/images/profile/${guru.user.foto_profile}`}
                              alt={guru.user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-14 h-14 text-gray-400" strokeWidth={1} />
                            </div>
                          )}
                        </div>

                        {/* Avatar */}
                        <div className="px-5 -mt-12 relative">
                          <div className="w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden mx-auto shadow-md">
                            {guru.user.foto_profile ? (
                              <img
                                src={`/storage/images/profile/${guru.user.foto_profile}`}
                                alt={guru.user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
                                style={{ background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})` }}>
                                {guru.user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 text-center mt-3 mb-1">
                            {guru.user.name}
                          </h3>

                          {/* Type badge */}
                          <div className="flex justify-center mb-3">
                            <span
                              className="px-3 py-1 rounded-full text-xs font-semibold"
                              style={
                                guru.jenis === 'Guru'
                                  ? { backgroundColor: `${secondaryColor}15`, color: secondaryColor }
                                  : { backgroundColor: `${primaryColor}25`, color: '#b45309' }
                              }
                            >
                              {guru.jenis === 'Guru' ? 'Guru' : 'Staf'}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2 text-gray-600">
                              <Briefcase className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: secondaryColor }} strokeWidth={2} />
                              <span className="line-clamp-1">{guru.jabatan || '-'}</span>
                            </div>
                            <div className="flex items-start gap-2 text-gray-600">
                              <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: secondaryColor }} strokeWidth={2} />
                              <span className="line-clamp-1">{guru.bidang_studi || '-'}</span>
                            </div>
                            <p className="text-xs text-gray-400 pl-6">{guru.nip_nuptk}</p>
                          </div>

                          {/* Contact */}
                          <div className="flex justify-center mt-4 pt-4 border-t border-gray-100">
                            <a
                              href={`mailto:${guru.user.email}`}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition hover:scale-110"
                              style={{ backgroundColor: secondaryColor, color: '#fff' }}
                              title="Kirim Email"
                            >
                              <Mail className="w-4 h-4" strokeWidth={2} />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-14"
                  >
                    <Pagination paginator={gurus} />
                  </motion.div>
                </>
              ) : (
                /* Empty state */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100"
                >
                  <motion.div
                    animate={{ rotate: [0, -3, 2, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${secondaryColor}10` }}>
                    <Users className="w-14 h-14" style={{ color: secondaryColor }} strokeWidth={1} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {hasActiveFilters ? 'Tidak Ditemukan' : 'Belum Ada Data'}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-4">
                    {hasActiveFilters
                      ? 'Tidak ada guru yang sesuai dengan filter yang dipilih.'
                      : 'Belum ada data guru yang terdaftar.'}
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2.5 rounded-xl font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      Reset Filter
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
}