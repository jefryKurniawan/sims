import { Head, Link } from '@inertiajs/inertia-react';
import React from 'react';
import {
  ArrowRight, CheckCircle, FileCheck, UserPlus, Calendar,
  TrendingUp, Award, MapPin, BookOpen, Heart,
  Briefcase, Wallet, ClipboardList, GraduationCap, Bell,
} from 'lucide-react';

interface Props {
  config?: {
    tahun_ajaran?: string;
    tanggal_buka?: string;
    tanggal_tutup?: string;
    tanggal_pengumuman?: string;
    tanggal_daftar_ulang?: string;
    kuota_total?: number;
    aktif?: boolean;
  };
}

export default function SpmbIndex({ config }: Props) {
  const defaultConfig = {
    tahun_ajaran: '2026/2027',
    tanggal_buka: '1 Mei 2026',
    tanggal_tutup: '30 Juni 2026',
    tanggal_pengumuman: '5 Juli 2026',
    tanggal_daftar_ulang: '8 - 15 Juli 2026',
    kuota_total: 360,
    aktif: true,
  };

  const cfg = { ...defaultConfig, ...config };

  const jalur = [
    {
      icon: MapPin,
      judul: 'Jalur Zonasi',
      kuota: '50%',
      color: 'from-blue-500 to-blue-700',
      desc: 'Jalur utama khusus untuk calon peserta didik yang berdomisili di zona terdekat sekolah sesuai jarak radius.',
    },
    {
      icon: Heart,
      judul: 'Jalur Afirmasi',
      kuota: '15%',
      color: 'from-red-500 to-red-700',
      desc: 'Untuk calon peserta didik dari keluarga kurang mampu, pemegang KIP/KIS, dan panti asuhan.',
    },
    {
      icon: Award,
      judul: 'Jalur Prestasi',
      kuota: '30%',
      color: 'from-yellow-500 to-yellow-700',
      desc: 'Berdasarkan rapor & kejuaraan. Terbagi atas Prestasi Akademik dan Non-Akademik.',
    },
    {
      icon: Briefcase,
      judul: 'Jalur Perpindahan',
      kuota: '5%',
      color: 'from-purple-500 to-purple-700',
      desc: 'Mutasi orang tua/wali, anak guru/tenaga kependidikan, dan situasi khusus lainnya.',
    },
  ];

  const alur = [
    { no: 1, icon: UserPlus, judul: 'Pendaftaran Akun', desc: 'Buat akun di sistem SPMB dengan NISN, nomor KK, dan email aktif.' },
    { no: 2, icon: ClipboardList, judul: 'Pilih Jalur & Formulir', desc: 'Pilih jalur pendaftaran yang sesuai dan lengkapi data diri, orang tua, dan nilai rapor.' },
    { no: 3, icon: FileCheck, judul: 'Verifikasi Berkas', desc: 'Panitia memverifikasi dokumen (Kartu Keluarga, Akta Kelahiran, Ijazah/Rapor, KIP/KIS).' },
    { no: 4, icon: BookOpen, judul: 'Seleksi / Tes Akademik', desc: 'Peserta mengikuti TKA (jalur prestasi) atau diproses lewat zonasi/afirmasi.' },
    { no: 5, icon: TrendingUp, judul: 'Peringkat & Pengumuman', desc: 'Sistem menghitung skor dan menampilkan daftar kelulusan berdasarkan kuota per jalur.' },
    { no: 6, icon: Wallet, judul: 'Daftar Ulang', desc: 'Calon yang lulus melakukan daftar ulang dan pembayaran biaya pendidikan.' },
  ];

  const timeline = [
    { tgl: cfg.tanggal_buka, label: 'Pendaftaran Dibuka', color: 'bg-emerald-500' },
    { tgl: cfg.tanggal_tutup, label: 'Pendaftaran Ditutup', color: 'bg-red-500' },
    { tgl: cfg.tanggal_pengumuman, label: 'Pengumuman Kelulusan', color: 'bg-blue-500' },
    { tgl: cfg.tanggal_daftar_ulang, label: 'Daftar Ulang', color: 'bg-purple-500' },
  ];

  return (
    <>
      <Head title="SPMB 2026 - SMAS St. Bonaventura Madiun" />

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20"
             style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')" }} />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Bell className="w-4 h-4 text-yellow-300" />
                <span>Penerimaan Peserta Didik Baru &middot; T.A {String(cfg.tahun_ajaran)}</span>
             </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                SPMB 2026
                <span className="block text-yellow-300 mt-2">SMK Bonaventura</span>
             </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Sistem Penerimaan Murid Baru online sesuai Permendikbudristek. Pilih jurusan, daftar sesuai jalur, dan pantau status kelulusan secara real-time.
             </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/spmb/daftar"
                  className="inline-flex items-center justify-center gap-2 text-white font-bold px-10 py-4 rounded-lg hover:shadow-2xl transition-all"
                  style={{ backgroundColor: 'rgb(227, 30, 36)' }}
                >
                  Daftar Sekarang <ArrowRight className="w-5 h-5" />
               </Link>
                <Link
                  href="/spmb/cek-status"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold px-10 py-4 rounded-lg hover:bg-white/20 transition-all"
                >
                  Cek Status Pendaftaran
               </Link>
             </div>
           </div>

            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-8 h-8 text-yellow-300" />
                  <h3 className="text-xl font-bold">Kuota T.A {String(cfg.tahun_ajaran)}</h3>
               </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-white/80">Total Kuota</span>
                    <span className="text-3xl font-extrabold text-yellow-300">{String(cfg.kuota_total)}</span>
                 </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Status Pendaftaran</span>
                    <span className="px-3 py-1 bg-emerald-500 rounded-full text-xs font-bold uppercase">
                      {cfg.aktif ? 'Dibuka' : 'Ditutup'}
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
     </section>

      {/* ===== ALUR SPMB ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Alur Pendaftaran
           </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              6 Tahap Pendaftaran SPMB
           </h2>
            <p className="text-gray-600 text-lg">
              Sesuai Permendikbudristek No. 1 Tahun 2025 tentang SPMB, berikut 6 tahap yang perlu dilalui calon peserta didik.
           </p>
         </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alur.map((step) => (
              <div
                key={step.no}
                className="relative bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-extrabold text-lg flex items-center justify-center shadow-lg">
                  {step.no}
               </div>
                <step.icon className="w-10 h-10 text-primary mb-4 mt-2" strokeWidth={1.8} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.judul}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
             </div>
            ))}
         </div>

          <div className="text-center mt-12">
            <Link
              href="/spmb/daftar"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: 'rgb(227, 30, 36)' }}
            >
              Mulai Pendaftaran <ArrowRight className="w-5 h-5" />
           </Link>
         </div>
       </div>
     </section>

      {/* ===== JALUR PENDAFTARAN ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Jalur Seleksi
           </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              4 Jalur Pendaftaran
           </h2>
            <p className="text-gray-600 text-lg">
              Pilih jalur sesuai latar belakang dan kondisi kamu untuk kesempatan terbaik masuk.
           </p>
         </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jalur.map((j, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`bg-gradient-to-br ${j.color} text-white p-6 text-center`}>
                  <j.icon className="w-12 h-12 mx-auto mb-3" strokeWidth={1.5} />
                  <div className="text-4xl font-extrabold">{j.kuota}</div>
                  <div className="text-xs uppercase tracking-wider font-semibold mt-1">dari total</div>
               </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{j.judul}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{j.desc}</p>
               </div>
             </div>
            ))}
         </div>
       </div>
     </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-yellow-50 text-yellow-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Timeline Penting
           </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Jadwal SPMB {String(cfg.tahun_ajaran)}
           </h2>
         </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((t, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 shadow-md border-l-4 border-l-yellow-400">
                <div className={`w-3 h-3 rounded-full ${t.color} absolute -left-[7px] top-8`} />
                <Calendar className="w-6 h-6 text-primary mb-3" />
                <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">{t.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">{t.tgl}</p>
             </div>
            ))}
         </div>
       </div>
     </section>

      {/* ===== CTA AKHIR ===== */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="inline-block bg-white p-2 rounded-full mb-6">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
           </div>
         </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Siap Bergabung dengan SMK Bonaventura?
         </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
            Pendaftaran SPMB 2026 telah dibuka. Daftarkan dirimu sekarang dan jadilah bagian dari generasi unggul, berkarakter, dan kompeten.
         </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/spmb/daftar"
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-10 py-5 rounded-lg hover:shadow-2xl transition-all text-lg"
              style={{ backgroundColor: 'rgb(227, 30, 36)' }}
            >
              Daftar Online Sekarang <ArrowRight className="w-5 h-5" />
           </Link>
            <Link
              href="/spmb/cek-status"
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-yellow-400 text-gray-900 font-bold px-10 py-5 rounded-lg hover:bg-yellow-50 transition-all text-lg"
            >
              Cek Status
           </Link>
         </div>
       </div>
     </section>
    </>
  );
}
