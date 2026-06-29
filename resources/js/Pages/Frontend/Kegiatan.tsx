import { Head, Link } from '@inertiajs/inertia-react';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { Calendar, Clock } from 'lucide-react';

interface Kegiatan {
    id: number;
    judul: string;
    slug: string;
    desc: string | null;
    content: string | null;
    gambar: string | null;
    tanggal: string | null;
    created_at: string;
}

interface Props {
    kegiatan: Kegiatan;
}

export default function Kegiatan({ kegiatan }: Props) {
    function formatDate(dateString: string | null) {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    return (
        <>
            <Head title={`${kegiatan.judul} - SMAS St. Bonaventura`} />
            <Header />
            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Hero Section */}
                <div className="relative h-[350px] bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-900 overflow-hidden">
                    {kegiatan.gambar ? (
                        <div className="absolute inset-0">
                            <img
                                src={`/storage/images/kegiatan/${kegiatan.gambar}`}
                                alt={kegiatan.judul}
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/80 via-emerald-700/80 to-emerald-900/80" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    ✨ Kegiatan Sekolah
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto">
                                {kegiatan.judul}
                            </h1>
                            {kegiatan.tanggal && (
                                <div className="flex items-center justify-center gap-2 text-white/90">
                                    <Calendar className="w-5 h-5" />
                                    <span>{formatDate(kegiatan.tanggal)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Content Section */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Main Content Card */}
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                {/* Featured Image */}
                                {kegiatan.gambar && (
                                    <div className="relative h-64 sm:h-80">
                                        <img
                                            src={`/storage/images/kegiatan/${kegiatan.gambar}`}
                                            alt={kegiatan.judul}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-8">
                                    {/* Description */}
                                    {kegiatan.desc && (
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold text-primary mb-4">
                                                Tentang Kegiatan
                                            </h2>
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {kegiatan.desc}
                                            </p>
                                        </div>
                                    )}

                                    {/* Full Content */}
                                    {kegiatan.content && (
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold text-primary mb-4">
                                                Detail Kegiatan
                                            </h2>
                                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {kegiatan.content}
                                            </div>
                                        </div>
                                    )}

                                    {/* Info Section */}
                                    <div className="mt-8 pt-6 border-t">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {kegiatan.tanggal && (
                                                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl">
                                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                                        <Calendar className="w-6 h-6 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-emerald-600 font-semibold">Tanggal</p>
                                                        <p className="text-gray-900 font-medium">{formatDate(kegiatan.tanggal)}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <Clock className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-primary font-semibold">Dipublikasikan</p>
                                                    <p className="text-gray-900 font-medium">
                                                        {formatDate(kegiatan.created_at)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Back Button */}
                            <div className="mt-8 text-center">
                                <Link
                                    href="/kegiatan"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
                                >
                                    ← Kembali ke Daftar Kegiatan
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}