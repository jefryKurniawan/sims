import { Link } from '@inertiajs/inertia-react';
import FrontendLayout from '@/Layout/FrontendLayout';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

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

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function DetailBerita({ berita, recentBeritas }: Props) {
    return (
        <FrontendLayout title={berita.title}>
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Link
                        href="/berita"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-[#003366] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" strokeWidth={2} />
                        Kembali ke Berita
                    </Link>
                </div>

                <header className="mb-8">
                    {berita.kategori && (
                        <span className="inline-block text-xs font-medium text-white bg-[#003366] px-3 py-1.5 rounded-full mb-4">
                            {berita.kategori.nama_kategori}
                        </span>
                    )}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-heading leading-tight mb-4">
                        {berita.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(berita.created_at)}</span>
                        {berita.user && (
                            <>
                                <span className="text-gray-300">|</span>
                                <span>Oleh {berita.user.name}</span>
                            </>
                        )}
                    </div>
                </header>

                {berita.thumbnail && (
                    <div className="mb-8 rounded-lg overflow-hidden">
                        <img
                            src={`/storage/images/berita/${berita.thumbnail}`}
                            alt={berita.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                <div
                    className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-[#003366] prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: berita.content }}
                />
            </article>

            {recentBeritas.length > 0 && (
                <section className="bg-gray-100 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-[#003366] font-heading mb-8">
                            Berita Terbaru
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recentBeritas.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/berita/${item.slug}`}
                                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border"
                                >
                                    <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
                                        {item.thumbnail ? (
                                            <img
                                                src={`/storage/images/berita/${item.thumbnail}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-gray-400 mb-1">
                                            {formatDate(item.created_at)}
                                        </p>
                                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#003366] transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </FrontendLayout>
    );
}