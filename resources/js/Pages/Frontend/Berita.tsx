import { Head, Link } from '@inertiajs/inertia-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { Pagination } from '@/Components/Frontend/Pagination';
import {
  Newspaper,
  Calendar,
  User,
  ImageIcon,
  FileText,
  Hash,
} from 'lucide-react';

// ─── Color scheme matching homepage ───
const primaryColor = '#FFD700';   // Yellow
const secondaryColor = '#E31E24'; // Red

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
interface BeritaItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  created_at: string;
  kategori: { id: number; nama_kategori: string } | null;
  user: { name: string } | null;
}

interface PaginationProps {
  data: BeritaItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
  beritas: PaginationProps;
}

// ─── Helpers ───
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function stripHtml(html: string, maxLen = 180) {
  const text = html.replace(/<[^>]*>?/gm, '');
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text;
}

// ─── Animation variants ───
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Page Component ───
export default function Berita({ beritas }: Props) {
  const totalCount = useCountUp(beritas.total, 2000);

  return (
    <>
      <Head title="Berita - SMAS St. Bonaventura" />
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key="berita-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gray-50 pt-20"
        >
          {/* ═══ Hero Section ═══ */}
          <div
            className="relative h-[380px] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor}DD 40%, ${primaryColor}60 100%)`,
            }}
          >
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

            {/* Decorative circles */}
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
              style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }}
            />
            <div
              className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full opacity-10"
              style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }}
            />

            {/* Hero content */}
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
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block mb-5"
                >
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    <Newspaper className="w-4 h-4" />
                    Informasi & Kabar
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                  Berita Sekolah
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light">
                  Ikuti perkembangan dan kegiatan terbaru dari SMAS St. Bonaventura
                </p>

                {/* Stat counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full"
                >
                  <Hash className="w-4 h-4 text-yellow-300" />
                  <span className="text-white font-semibold tabular-nums">
                    {totalCount.toLocaleString('id-ID')}
                  </span>
                  <span className="text-white/70 text-sm">artikel diterbitkan</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom fade to content */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
          </div>

          {/* ═══ Main Content ═══ */}
          <section className="py-16 -mt-8">
            <div className="container mx-auto px-4 max-w-7xl">
              {/* Empty state */}
              {beritas.data.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100"
                >
                  <motion.div
                    animate={{ rotate: [0, -5, 5, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${secondaryColor}10` }}
                  >
                    <FileText className="w-14 h-14" style={{ color: secondaryColor }} strokeWidth={1} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Berita</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Berita dan artikel akan segera ditambahkan. Kunjungi kembali nanti untuk informasi terbaru.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Card Grid */}
                  <motion.div
                    variants={cardContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {beritas.data.map((berita) => (
                      <motion.div
                        key={berita.id}
                        variants={cardVariants}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="h-full"
                      >
                        <Link
                          href={`/berita/${berita.slug}`}
                          className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 h-full flex flex-col"
                        >
                          {/* Thumbnail */}
                          <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                            {berita.thumbnail ? (
                              <motion.img
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                src={`/storage/images/berita/${berita.thumbnail}`}
                                alt={berita.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div
                                className="w-full h-full flex items-center justify-center"
                                style={{
                                  background: `linear-gradient(135deg, ${secondaryColor}15, ${primaryColor}20)`,
                                }}
                              >
                                <ImageIcon className="w-16 h-16 text-gray-300" strokeWidth={1} />
                              </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(to top, ${secondaryColor}80 0%, transparent 60%)`,
                              }}
                            />

                            {/* Category badge */}
                            {berita.kategori && (
                              <div className="absolute top-4 left-4">
                                <span
                                  className="text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg tracking-wide"
                                  style={{ backgroundColor: secondaryColor }}
                                >
                                  {berita.kategori.nama_kategori}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Card content */}
                          <div className="p-5 flex flex-col flex-1">
                            {/* Date */}
                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                              <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                              <span>{formatDate(berita.created_at)}</span>
                            </div>

                            {/* Title */}
                            <h3
                              className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 transition-colors duration-200"
                              style={{ ':hover': { color: secondaryColor } }}
                            >
                              {berita.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                              {stripHtml(berita.content)}
                            </p>

                            {/* Author */}
                            {berita.user && (
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
                                <div
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                                  style={{
                                    backgroundColor: `${secondaryColor}15`,
                                    color: secondaryColor,
                                  }}
                                >
                                  {berita.user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-gray-700">{berita.user.name}</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-14"
                  >
                    <Pagination data={beritas} />
                  </motion.div>
                </>
              )}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
}