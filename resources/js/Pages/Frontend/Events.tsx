import { Head, Link } from '@inertiajs/inertia-react';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { Pagination } from '@/Components/Frontend/Pagination';
import { Calendar, MapPin, Image as ImageIcon } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    slug: string;
    desc: string;
    acara: string;
    lokasi: string;
    thumbnail: string | null;
    created_at: string;
}

interface Props {
    events: {
        data: Event[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function Events({ events }: Props) {
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }

    function formatFullDate(dateString: string) {
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
            <Head title="Event Sekolah - SMAS St. Bonaventura" />
            <Header />
            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Hero Section */}
                <div className="relative h-[300px] bg-gradient-to-br from-primary via-primary-dark to-purple-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    📅 Agenda Sekolah
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Event Sekolah</h1>
                            <p className="text-xl text-white/90">Beragam kegiatan dan acara sekolah untuk mengembangkan bakat dan minat siswa</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Events List */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        {events.data.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {events.data.map((event) => (
                                        <div
                                            key={event.id}
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                                        >
                                            {/* Thumbnail */}
                                            {event.thumbnail ? (
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={`/storage/images/events/${event.thumbnail}`}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg">
                                                        <div className="text-xs text-gray-500 uppercase font-semibold">
                                                            {new Date(event.acara).toLocaleDateString('id-ID', { month: 'short' })}
                                                        </div>
                                                        <div className="text-2xl font-bold text-primary">
                                                            {new Date(event.acara).getDate()}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(event.acara).getFullYear()}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="relative h-48 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                                                    <Calendar className="w-20 h-20 text-white/30" strokeWidth={1.5} />
                                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg">
                                                        <div className="text-xs text-gray-500 uppercase font-semibold">
                                                            {new Date(event.acara).toLocaleDateString('id-ID', { month: 'short' })}
                                                        </div>
                                                        <div className="text-2xl font-bold text-primary">
                                                            {new Date(event.acara).getDate()}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(event.acara).getFullYear()}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                    <Link href={`/event/${event.slug}`}>
                                                        {event.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {event.desc}
                                                </p>

                                                {/* Info */}
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="w-4 h-4 text-primary" strokeWidth={2} />
                                                        <span>{formatFullDate(event.acara)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="w-4 h-4 text-primary" strokeWidth={2} />
                                                        <span>{event.lokasi}</span>
                                                    </div>
                                                </div>

                                                {/* Read More Button */}
                                                <Link
                                                    href={`/event/${event.slug}`}
                                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                                >
                                                    Baca Selengkapnya
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-12">
                                    <Pagination data={events} />
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Calendar className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Event</h3>
                                <p className="text-gray-500">Event akan segera ditambahkan</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}