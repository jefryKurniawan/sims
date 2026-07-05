import { motion, AnimatePresence } from 'framer-motion';
import { Head } from '@/Layout/Head';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import {
  Eye,
  Check,
  Sparkles,
  BookOpen,
  Star,
  Globe,
  Lightbulb,
  Target,
} from 'lucide-react';

// ─── Color scheme ───
const primaryColor = '#FFD700';
const secondaryColor = '#E31E24';

// ─── Types ───
interface VisimisiData {
  visi: string;
  misi: string;
  moto: string | null;
}

interface Props {
  visimisi: VisimisiData | null;
}

// ─── Default fallback ───
const defaultData: VisimisiData = {
  visi: 'Menjadi sekolah unggul yang menghasilkan generasi berkarakter, cerdas, kompetitif, dan berwawasan global serta tetap berlandaskan pada nilai-nilai iman dan taqwa.',
  misi: 'Menyelenggarakan pendidikan berkualitas dengan pendekatan student-centered learning\nMengembangkan potensi akademik dan non-akademik siswa secara optimal\nMenumbuhkan semangat kewirausahaan dan inovasi pada siswa\nMembangun karakter yang kuat berdasarkan nilai-nilai moral dan etika\nMenerapkan teknologi dalam proses pembelajaran untuk meningkatkan kualitas pendidikan',
  moto: 'Berilmu, Berakhlak, Berprestasi',
};

// ─── Animation variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const coreValueIcons = [BookOpen, Star, Globe, Lightbulb];
const coreValueLabels = [
  { title: 'Unggul', desc: 'Dalam prestasi' },
  { title: 'Karakter', desc: 'Berakhlak mulia' },
  { title: 'Global', desc: 'Berpikir luas' },
  { title: 'Inovatif', desc: 'Selalu berkembang' },
];

// ─── Component ───
export default function Visimisi({ visimisi }: Props) {
  const data = visimisi ?? defaultData;
  const misiList = data.misi.split('\n').filter((m) => m.trim());

  return (
    <>
      <Head title="Visi & Misi - SMAS St. Bonaventura" />
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key="visimisi-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gray-50 pt-20"
        >
          {/* ═══ Hero ═══ */}
          <div
            className="relative h-[360px] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor}DD 40%, ${primaryColor}60 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-15" />

            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
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
                    <Target className="w-4 h-4" />
                    Arah & Tujuan
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Visi & Misi
                </h1>
                <p className="text-lg text-white/80 mt-3 font-light">
                  Fondasi yang membimbing setiap langkah kami
                </p>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
          </div>

          {/* ═══ Content ═══ */}
          <section className="py-16 -mt-8">
            <div className="container mx-auto px-4 max-w-5xl">
              {/* ─── Visi Card ─── */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 mb-10 relative overflow-hidden"
              >
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                  style={{ backgroundColor: `${secondaryColor}08` }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
                  style={{ backgroundColor: `${primaryColor}15` }} />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: secondaryColor }}>
                      <Eye className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Visi Kami</h2>
                  </div>

                  <div className="rounded-2xl p-6 md:p-8 border-2 bg-gray-50/50"
                    style={{ borderColor: `${secondaryColor}20` }}>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic font-light">
                      "{data.visi}"
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ─── Misi + Moto ─── */}
              <div className="grid lg:grid-cols-2 gap-10 mb-10">
                {/* Misi */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                  className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"
                    style={{ backgroundColor: `${primaryColor}15` }} />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: secondaryColor }}>
                        <Check className="w-7 h-7 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Misi Kami</h2>
                    </div>

                    <ul className="space-y-4">
                      {misiList.map((misi, index) => (
                        <motion.li
                          key={index}
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          custom={index * 0.1}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                            style={{ backgroundColor: secondaryColor }}>
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{misi}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Moto + Nilai */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                  className="rounded-3xl shadow-xl p-8 text-white relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${secondaryColor}, ${secondaryColor}EE)` }}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 bg-white/10" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
                    style={{ backgroundColor: `${primaryColor}20` }} />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold">Nilai & Moto</h2>
                    </div>

                    {/* Moto */}
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6"
                    >
                      <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Moto Kami</p>
                      <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                        {data.moto}
                      </p>
                    </motion.div>

                    {/* Core Values */}
                    <div className="grid grid-cols-2 gap-4">
                      {coreValueIcons.map((Icon, i) => (
                        <motion.div
                          key={coreValueLabels[i].title}
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          custom={i * 0.08}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                        >
                          <Icon className="w-7 h-7 mb-2" style={{ color: primaryColor }} />
                          <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                            {coreValueLabels[i].title}
                          </p>
                          <p className="text-xs text-white/70">{coreValueLabels[i].desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
}