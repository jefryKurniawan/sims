import { Head, Link } from '@inertiajs/inertia-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import {
  ArrowLeft,
  Calendar,
  User,
  ImageIcon,
  Newspaper,
  Clock,
  Tag,
} from 'lucide-react';

// ─── Color scheme ───
const primaryColor = '#FFD700';
const secondaryColor = '#E31E24';

// ─── Types ───
interface BeritaDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  created_at: string;
  kategori: { id: number; nama_kategori: string } | null;
  user: { name: string } | null;
}

interface RecentBerita {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  created_at: string;
  kategori: { id: number; nama_kategori: string } | null;
}

interface Props {
  berita: BeritaDetail;
  recentBeritas: RecentBerita[];
}

// ─── Helpers ───
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function shortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ─── Animation variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ─── Component ───
export default function DetailBerita({ berita, recentBeritas }: Props) {
  return (
    <>
      <Head title={`${berita.title} - SMAS St. Bonaventura`} />
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key="detail-berita"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gray-50 pt-20"
        >
          {/* ═══ Article Header Hero ═══ */}
          <div
            className="relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor}DD 30%, ${primaryColor}40 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-15" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              {/* Back link */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                  Kembali ke Berita
                </Link>
              </motion.div>

              {/* Category + Metadata */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mb-4">
                {berita.kategori && (
                  <span
                    className="inline-flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg tracking-wide mb-3"
                    style={{ backgroundColor: `${primaryColor}30`, border: `1px solid ${primaryColor}40` }}
                  >
                    <Tag className="w-3 h-3" />
                    {berita.kategori.nama_kategori}
                  </span>
                )}

                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    {formatDate(berita.created_at)}
                  </span>
                  {berita.user && (
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" strokeWidth={1.5} />
                      {berita.user.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" strokeWidth={1.5} />
                    {Math.ceil(berita.content.replace(/<[^>]*>?/gm, '').length / 1000)} menit baca
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight"
              >
                {berita.title}
              </motion.h1>
            </div>

            {/* Bottom fade */}
            <div className="h-16 bg-gradient-to-t from-gray-50 to-transparent" />
          </div>

          {/* ═══ Content Body ═══ */}
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-12">
            {/* Thumbnail */}
            {berita.thumbnail && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <img
                  src={`/storage/images/berita/${berita.thumbnail}`}
                  alt={berita.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            )}

            {/* Article content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10"
            >
              <div
                className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-a:font-medium prose-img:rounded-xl prose-blockquote:border-l-4 prose-blockquote:font-normal prose-blockquote:text-gray-700 prose-blockquote:not-italic"
                style={{
                  ['--tw-prose-links' as any]: secondaryColor,
                  ['--tw-prose-bold' as any]: '#111827',
                }}
                dangerouslySetInnerHTML={{ __html: berita.content }}
              />
            </motion.div>
          </article>

          {/* ═══ Related News ═══ */}
          {recentBeritas.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="py-16"
              style={{ backgroundColor: `${secondaryColor}08` }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-10">
                  <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: secondaryColor }} />
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Newspaper className="w-5 h-5" style={{ color: secondaryColor }} />
                    Berita Terbaru
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentBeritas.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                      whileHover={{ y: -4 }}
                    >
                      <Link
                        href={`/berita/${item.slug}`}
                        className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 h-full"
                      >
                        {/* Thumbnail */}
                        <div className="aspect-[16/9] bg-gray-200 overflow-hidden relative">
                          {item.thumbnail ? (
                            <img
                              src={`/storage/images/berita/${item.thumbnail}`}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{
                                background: `linear-gradient(135deg, ${secondaryColor}10, ${primaryColor}15)`,
                              }}
                            >
                              <ImageIcon className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                            </div>
                          )}

                          {/* Badge */}
                          {item.kategori && (
                            <div className="absolute top-3 left-3">
                              <span
                                className="text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                                style={{ backgroundColor: secondaryColor }}
                              >
                                {item.kategori.nama_kategori}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card body */}
                        <div className="p-4">
                          <p className="text-xs text-gray-400 mb-1.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {shortDate(item.created_at)}
                          </p>
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}