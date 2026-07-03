import React from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import Header from '@/Components/Frontend/Header';
import {
  Monitor, Globe, FlaskConical, ArrowRight, ChevronRight, ChevronDown,
  Phone, Mail, MapPin, MessageCircle, Heart
} from 'lucide-react';

function useCountUp(target: number, duration = 2000, inView = false) {
  const [count, setCount] = React.useState(0);
  const started = React.useRef(false);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, inView]);

  return count;
}

function StatCounter({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.unobserve(el); }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const count = useCountUp(target, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-extrabold text-white">{count.toLocaleString('id-ID')}{suffix}</p>
      <p className="text-sm mt-1 text-white/80">{label}</p>
    </div>
  );
}

/* ─── Main Page Component ─── */
interface FrontendIndexProps {
  berita: Array<{ id: number; title: string; slug: string; content: string; thumbnail: string; created_at: string; sumber?: string }>;
  event: Array<{ id: number; title: string; slug: string; desc: string; acara: string; lokasi: string }>;
  slider: Array<{ image: string; title: string; desc: string }>;
  about: { title: string; desc: string; image: string } | null;
  video: { title: string; desc: string; url: string } | null;
  footer: { logo: string | null; desc: string; telp: string; email: string; linkedln: string; twitter: string; facebook: string; instagram: string; alamat: string } | null;
  jurusanM: Array<{ slug: string; nama: string }>;
  kegiatanM: Array<{ slug: string; nama: string }>;
}

export default function Index({
  berita,
  event,
  pengajar,
}: FrontendIndexProps) {
  const [faqOpen, setFaqOpen] = React.useState(0);

  // Hero slideshow
  const heroImages = [
    'https://smabona.sch.id/wp-content/uploads/2023/05/WhatsApp-Image-2023-05-03-at-13.19.00.jpg',
    'https://smabona.sch.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-10-17-at-08.19.29_b0ba88d9.jpg',
    'https://smabona.sch.id/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-23-at-10.33.20_613b6134-scaled.jpg',
  ];
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const primaryColor = '#FFD700';
  const secondaryColor = '#E31E24';

  return (
    <>
      <Head title="Beranda" />
      <Header />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden pt-20" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${img})` }} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${secondaryColor}40 0%, transparent 70%)` }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)` }} />
        </div>
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 rounded-full uppercase text-xs font-bold tracking-widest mb-6 shadow-sm text-gray-900" style={{ backgroundColor: primaryColor }}>
              Madiun's Digital Vanguard
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-8">
              Cerdas, Berkarakter, Bersama Bonaventura
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl">
              Ruang belajar modern untuk generasi wason depan dengan pondasi karakter yang kuat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={route('program.index')} className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-lg hover:shadow-xl transition-all" style={{ backgroundColor: secondaryColor }}>
                Jelajahi Program <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/spmb/daftar" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/40 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-all">
                Daftar SPMB
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DATA STATS ── */}
      <section className="py-16" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter target={1954} label="Tahun Berdiri" />
          <StatCounter target={1200} suffix="+" label="Siswa Aktif" />
          <StatCounter target={80} suffix="+" label="Tenaga Pendidik" />
          <StatCounter target={98} suffix="%" label="Kelulusan" />
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pioneering Academic Excellence</h2>
              <p className="text-gray-600 text-lg">Melatih nilai unggulan dan karakter siswa-siswi dalam bidang akademik maupun non-akademik.</p>
            </div>
            <Link href={route('program.index')} className="text-red-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Kurikulum <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Monitor, title: 'Sistem Pembelajaran Mandiri & Terukur', desc: 'Mempersiapkan generasi adaptif melalui kurikulum nasional yang diperkaya nilai humanis.' },
              { icon: Globe, title: 'Kurikulum Merdeka Berbasis Karakter', desc: 'Fokus pada pengembangan bakat alami, penalaran kritis, dan iman yang teguh.' },
              { icon: FlaskConical, title: 'Ruang Tumbuh Bakat & Potensi Siswa', desc: 'Program pembelajaran untuk kesiapan studi lanjut dan masa depan.' },
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 border border-yellow-200 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-l-4 border-l-yellow-400">
                <div className="w-14 h-14 bg-yellow-50 flex items-center justify-center rounded-lg mb-8" style={{ color: secondaryColor }}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Berita & Informasi Terkini</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Ikuti perkembangan terbaru dari komunitas SMAS St. Bonaventura</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {berita[0] && (
              <div className="lg:col-span-8 lg:row-span-2 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-[400px] lg:h-[600px]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('http://smabona.sch.id/wp-content/uploads/2023/04/smabona1.png')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-gray-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex gap-3 mb-4">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-xs font-bold uppercase">Berita</span>
                    <span className="text-white/80 text-xs">{new Date(berita[0].created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{berita[0].title}</h3>
                  <Link href={`/berita/${berita[0].slug}`} className="inline-flex items-center gap-2 text-yellow-400 font-bold hover:gap-3 transition-all">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
            <div className="lg:col-span-4 bg-white border border-yellow-200 rounded-2xl p-8 flex flex-col shadow-sm">
              <div className="mb-6 rounded-lg overflow-hidden h-48 bg-gray-100">
                <img src="https://smabona.sch.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-10-17-at-08.19.29_b0ba88d9.jpg" alt="SPMB" className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-red-600 font-bold text-xs uppercase">Admisi</span>
                <span className="text-gray-500 text-xs">{new Date().getFullYear()}</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Penerimaan Murid Baru {new Date().getFullYear()}/{new Date().getFullYear() + 1}</h4>
              <p className="text-gray-600 text-sm mb-6 flex-grow">Saatnya tumbuh cerdas dan berkarakter di SMAS St. Bonaventura Madiun</p>
              <Link href="/spmb/daftar" className="text-red-600 font-bold text-sm underline decoration-yellow-400 decoration-4 underline-offset-4">
                Daftar Sekarang
              </Link>
            </div>
            <div className="lg:col-span-4 text-white rounded-2xl p-8 flex flex-col shadow-sm" style={{ backgroundColor: secondaryColor }}>
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-5 h-5 text-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">Kesehatan</span>
              </div>
              <h4 className="text-xl font-bold mb-4">Kesehatan Mental Remaja</h4>
              <p className="text-white/80 text-sm mb-6 flex-grow">Kolaborasi sekolah dengan orang tua dalam mendampingi tumbuh kembang emosional siswa</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">Admin</span>
                <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAFF ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Pilar Akademik & Karakter Kami</h2>
              <p className="text-gray-600 text-lg">Mengenal lebih dekat para pendidik yang berdedikasi</p>
            </div>
            <Link href="/guru" className="inline-flex items-center gap-2 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all" style={{ backgroundColor: secondaryColor }}>
              Lihat Semua Daftar Guru
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pengajar?.slice(0, 4).map((g: any, i: number) => (
              <div key={i} className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-yellow-300 shadow-lg transition-transform group-hover:scale-105 bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">{g.name.charAt(0)}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900">{g.name}</h4>
                <p className="text-red-600 text-xs font-bold uppercase mt-1">{g.userDetail?.mengajar || 'Guru'}</p>
              </div>
            )) || <div className="col-span-full text-center py-12 text-gray-500">Data guru belum tersedia.</div>}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 text-white" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-white/80 mb-8">Temukan jawaban atas pertanyaan umum mengenai kurikulum, pendaftaran, dan fasilitas kami</p>
              <Link href="/spmb/daftar" className="inline-flex items-center gap-2 bg-yellow-400 text-grayScheme-900 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all shadow-lg">
                <MessageCircle className="w-5 h-5" /> Hubungi Admin
              </Link>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {[
                { q: 'Bagaimana penerapan kurikulum di SMAS St. Bonaventura?', a: 'Kami mengintegrasikan platform e-learning dengan standar internasional, memungkinkan siswa mengakses materi 24/7.' },
                { q: 'Apa saja syarat pendaftaran tahun ajaran baru?', a: 'Calon siswa diwajibkan mengikuti tes potensi akademik berbasis digital, wawancara, serta melampirkan nilai rapor SMP.' },
                { q: 'Apakah ada program beasiswa?', a: 'Ya, kami memiliki program beasiswa prestasi akademik dan non-akademik melalui kemitraan dengan Yayasan Anak-Anak Terang.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-6 cursor-pointer transition-all hover:border-yellow-300" onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold pr-4">{item.q}</h4>
                    <ChevronDown className={`w-5 h-5 text-yellow-300 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                  </div>
                  {faqOpen === i && <p className="mt-4 text-white/80">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Siap Memulai Perjalanan Digital?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Pendaftaran Tahun Ajaran {new Date().getFullYear()}/{new Date().getFullYear() + 1} telah dibuka. Bergabunglah dengan komunitas unggul kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/spmb/daftar" className="inline-flex items-center justify-center gap-2 text alleged text-white font-bold px-10 py-5 rounded-lg hover:shadow-xl transition-all" style={{ backgroundColor: secondaryColor }}>
              Daftar Online Sekarang
            </Link>
            <Link href="/profile-sekolah" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-yellow-400 text-gray-900 font-bold px-10 py-5 rounded-lg hover:bg-yellow-50 transition-all">
              Profil Sekolah
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="text-white pt-20 pb-8" style={{ backgroundColor: secondaryColor }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold" style={{ backgroundColor: primaryColor, color: '#1a1a1a' }}>S</div>
              <span className="font-bold text-lg text-yellow-300">St. Bonaventura</span>
            </div>
            <p className="text-white/70 mb-8 text-sm">SMA Katolik St. Bonaventura Madiun: Nurturing faith, building intellect, and embracing technology since 1954.</p>
          </div>
          <div>
            <h4 className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6">Menu Cepat</h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li><Link href="/berita" className="hover:text-yellow-300 transition-colors">Berita</Link></li>
              <li><Link href="/event" className="hover:text-yellow-300 transition-colors">Event</Link></li>
              <li><Link href="/spmb/daftar" className="hover:text-yellow-300 transition-colors">SPMB</Link></li>
              <li><Link href="/alumni" className="hover:text-yellow-300 transition-colors">Alumni</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6">Kontak</h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-300" /> Jl. Diponegoro No.45, Madiun</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0 text-yellow-300" /> (0351) 454194</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0 text-yellow-300" /> smabovent@yahoo.co.id</li>
            </ul>
          </div>
          <div>
            <h4 className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6">Jam Operasional</h4>
            <div className="bg-white/10 rounded-xl p-6 border border-white/10 text-sm">
              <div className="flex justify-between mb-2"><span className="text-white/60">Sen-Jum</span><span>07:00 - 15:30</span></div>
              <div className="flex justify-between"><span className="text-white/60">Sab</span><span>07:00 - 12:00</span></div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 uppercase tracking-widest">
          <div>© {new Date().getFullYear()} SMAS St. Bonaventura Madiun</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Ketentuan Layanan</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
