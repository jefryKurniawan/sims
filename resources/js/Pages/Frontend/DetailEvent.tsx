import { Head, Link } from '@inertiajs/inertia-react';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { Calendar, Clock, MapPin, ArrowLeft, Volume2, Share2 } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

interface Event {
    id: number;
    title: string;
    slug: string;
    desc: string;
    content: string | null;
    acara: string;
    lokasi: string;
    thumbnail: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    event: Event;
    relatedEvents: Event[];
}

export default function DetailEvent({ event, relatedEvents }: Props) {
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    function formatTime(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return (
        <>
            <Head title={event.title} />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[400px] bg-gradient-to-br from-primary via-primary-dark to-purple-900 overflow-hidden">
                    {event.thumbnail ? (
                        <div className="absolute inset-0">
                            <img
                                src={`/storage/images/events/${event.thumbnail}`}
                                alt={event.title}
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary-dark/80 to-purple-900/80" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    📅 Event Sekolah
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto">
                                {event.title}
                            </h1>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Event Content */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                                    {/* Event Info Cards */}
                                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                        <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-4 text-center">
                                            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-80" strokeWidth={2} />
                                            <div className="text-2xl font-bold">
                                                {new Date(event.acara).getDate()}
                                            </div>
                                            <div className="text-sm opacity-80">
                                                {new Date(event.acara).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl p-4 text-center">
                                            <Clock className="w-8 h-8 mx-auto mb-2 opacity-80" strokeWidth={2} />
                                            <div className="text-lg font-bold">
                                                {formatTime(event.acara)}
                                            </div>
                                            <div className="text-sm opacity-80">Waktu Acara</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl p-4 text-center">
                                            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-80" strokeWidth={2} />
                                            <div className="text-sm font-bold line-clamp-2">
                                                {event.lokasi}
                                            </div>
                                            <div className="text-xs opacity-80">Lokasi</div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-primary mb-4">Tentang Event</h2>
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {event.desc}
                                        </p>
                                    </div>

                                    {/* Additional Content */}
                                    {event.content && (
                                        <div>
                                            <h2 className="text-2xl font-bold text-primary mb-4">Detail Lengkap</h2>
                                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {event.content}
                                            </div>
                                        </div>
                                    )}

                                    {/* Share Buttons */}
                                    <div className="mt-8 pt-6 border-t">
                                        <h3 className="text-sm font-semibold text-gray-500 mb-3">Bagikan Event Ini</h3>
                                        <div className="flex gap-2">
                                            <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition">
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                            <button className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                                </svg>
                                            </button>
                                            <button className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition">
                                                <FaLinkedin className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Button */}
                                <Link
                                    href="/event"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                                    Kembali ke Daftar Event
                                </Link>
                            </div>

                            {/* Sidebar - Related Events */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
                                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                        <Volume2 className="w-6 h-6" strokeWidth={2} />
                                        Event Lainnya
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedEvents.length > 0 ? (
                                            relatedEvents.map((relatedEvent) => (
                                                <Link
                                                    key={relatedEvent.id}
                                                    href={`/event/${relatedEvent.slug}`}
                                                    className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                                                >
                                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                        {relatedEvent.thumbnail ? (
                                                            <img
                                                                src={`/storage/images/events/${relatedEvent.thumbnail}`}
                                                                alt={relatedEvent.title}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
                                                                <Calendar className="w-8 h-8 text-primary/40" strokeWidth={1.5} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                                            {relatedEvent.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {formatDate(relatedEvent.acara)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm text-center py-4">
                                                Belum ada event lainnya
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}