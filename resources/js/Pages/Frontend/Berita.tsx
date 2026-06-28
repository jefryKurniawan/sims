import { Link } from '@inertiajs/inertia-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, FileText, Image as ImageIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

export default function Berita({ beritas }: Props) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.fromTo('.news-card',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[350px] bg-gradient-to-br from-primary via-primary-dark to-emerald-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    📰 Berita & Artikel
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita Sekolah</h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                Ikuti perkembangan dan kegiatan terbaru dari sekolah kami
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Main Content */}
                <section ref={sectionRef} className="py-16 -mt-10">
                    <div className="container mx-auto px-4">
                        {beritas.data.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Berita</h3>
                                <p className="text-gray-500">Berita akan segera ditambahkan</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {beritas.data.map((berita, index) => (
                                        <Link
                                            key={berita.id}
                                            href={`/berita/${berita.slug}`}
                                            className="news-card opacity-0 group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                                                {berita.thumbnail ? (
                                                    <img
                                                        src={`/storage/images/berita/${berita.thumbnail}`}
                                                        alt={berita.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                                        <ImageIcon className="w-16 h-16 text-gray-300" strokeWidth={1} />
                                                    </div>
                                                )}
                                                {/* Overlay Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                                {/* Category Badge */}
                                                {berita.kategori && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                                                            {berita.kategori.nama_kategori}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                {/* Meta Info */}
                                                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                                                    <Calendar className="w-4 h-4" strokeWidth={2} />
                                                    <span>{formatDate(berita.created_at)}</span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                    {berita.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {stripHtml(berita.content)}
                                                </p>

                                                {/* Author */}
                                                {berita.user && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <span className="text-primary font-semibold text-xs">
                                                                {berita.user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <span>{berita.user.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-12">
                                    <Pagination data={beritas} />
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}