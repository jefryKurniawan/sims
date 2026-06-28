import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin, ArrowRight, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NewsEventsProps {
    berita: Array<{
        id: number;
        title: string;
        slug: string;
        thumbnail: string;
        created_at: string;
    }>;
    event: Array<{
        id: number;
        title: string;
        slug: string;
        desc: string;
        acara: string;
        lokasi: string;
    }>;
}

export default function NewsEvents({ berita, event }: NewsEventsProps) {
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

            tl.fromTo('.news-item',
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            )
            .fromTo('.event-item',
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
                '-=0.3'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('id-ID', { month: 'short' }),
            year: date.getFullYear(),
            time: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
    };

    return (
        <section ref={sectionRef} className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Berita Section */}
                    <div>
                        <div className="mb-8">
                            <div className="inline-block mb-3">
                                <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium">
                                    📰 Berita Terbaru
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                Berita & Artikel
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {berita?.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="news-item group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="w-32 flex-shrink-0 overflow-hidden rounded-lg">
                                        <a href={`/berita/${item.slug}`}>
                                            <img
                                                className="w-full h-24 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                src={`/storage/images/berita/${item.thumbnail}`}
                                                alt={item.title}
                                            />
                                        </a>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-primary mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                            <a href={`/berita/${item.slug}`} className="hover:text-emerald-600">
                                                {item.title}
                                            </a>
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(item.created_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <a
                                href="/berita"
                                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                            >
                                Lihat Semua Berita
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Event Section */}
                    <div>
                        <div className="mb-8">
                            <div className="inline-block mb-3">
                                <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                                    📅 Event Mendatang
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                Agenda Sekolah
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {event?.map((item, index) => {
                                const eventDate = formatEventDate(item.acara);
                                return (
                                    <div
                                        key={item.id}
                                        className="event-item group p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex gap-4">
                                            {/* Date Badge */}
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl flex flex-col items-center justify-center text-center shadow-lg group-hover:shadow-emerald-500/50 transition-shadow">
                                                    <span className="text-2xl font-bold">{eventDate.day}</span>
                                                    <span className="text-xs uppercase font-medium">{eventDate.month}</span>
                                                    <span className="text-xs opacity-80">{eventDate.year}</span>
                                                </div>
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-emerald-600 transition-colors">
                                                    <a href={`/event/${item.slug}`} className="hover:text-emerald-600">
                                                        {item.title}
                                                    </a>
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {item.desc}
                                                </p>
                                                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-4 h-4 text-emerald-500" />
                                                        <span>{eventDate.time} - Selesai</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-4 h-4 text-emerald-500" />
                                                        <span>{item.lokasi}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-8">
                            <a
                                href="/event"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Lihat Semua Event
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}