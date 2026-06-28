import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaTwitter, FaFacebook, FaInstagram, FaGlobe, FaLinkedin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

interface TeachersProps {
    pengajar: Array<{
        id: number;
        name: string;
        email: string;
        foto_profile: string;
        userDetail: {
            mengajar: string;
            website?: string;
            linkedln?: string;
            twitter?: string;
            facebook?: string;
            instagram?: string;
        } | null;
    }>;
}

export default function Teachers({ pengajar }: TeachersProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const getVisibleItems = () => {
        if (typeof window === 'undefined') return 4;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 3;
        return 4;
    };

    const [visibleItems, setVisibleItems] = useState(getVisibleItems());

    useEffect(() => {
        const handleResize = () => setVisibleItems(getVisibleItems());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!pengajar || pengajar.length === 0) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.fromTo('.teacher-card',
                { opacity: 0, y: 40, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [pengajar]);

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, Math.max(0, pengajar.length - visibleItems)));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    if (!pengajar || pengajar.length === 0) {
        return null;
    }

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium">
                            👨‍🏫 Tim Pengajar
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Pengajar Kami
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4" />
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Tenaga pendidik profesional dan berpengalaman di bidang masing-masing
                    </p>
                </div>

                {/* Cards Grid with Carousel */}
                <div className="relative">
                    <div ref={containerRef} className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
                        >
                            {pengajar.map((guru, index) => (
                                <div
                                    key={guru.id}
                                    ref={(el) => el && (cardsRef.current[index] = el)}
                                    className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-4 py-2"
                                >
                                    <div className="teacher-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                        {/* Image Container */}
                                        <div className="relative aspect-square overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                            <img
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                src={guru.foto_profile ? `/storage/images/profile/${guru.foto_profile}` : '/Assets/Frontend/img/default-avatar.png'}
                                                alt={guru.name}
                                            />
                                            {/* Social Links Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                                <div className="flex justify-center gap-2">
                                                    {guru.userDetail?.website && (
                                                        <a
                                                            href={guru.userDetail.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-9 h-9 bg-white/90 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors"
                                                        >
                                                            <FaGlobe className="w-4 h-4 text-gray-700 hover:text-white" />
                                                        </a>
                                                    )}
                                                    {guru.userDetail?.linkedln && (
                                                        <a
                                                            href={`https://www.linkedin.com/in/${guru.userDetail.linkedln}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-9 h-9 bg-white/90 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                                                        >
                                                            <FaLinkedin className="w-4 h-4 text-gray-700 hover:text-white" />
                                                        </a>
                                                    )}
                                                    {guru.userDetail?.twitter && (
                                                        <a
                                                            href={`https://www.twitter.com/${guru.userDetail.twitter}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-9 h-9 bg-white/90 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
                                                        >
                                                            <FaTwitter className="w-4 h-4 text-gray-700 hover:text-white" />
                                                        </a>
                                                    )}
                                                    {guru.userDetail?.facebook && (
                                                        <a
                                                            href={`https://www.facebook.com/${guru.userDetail.facebook}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-9 h-9 bg-white/90 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                                                        >
                                                            <FaFacebook className="w-4 h-4 text-gray-700 hover:text-white" />
                                                        </a>
                                                    )}
                                                    {guru.userDetail?.instagram && (
                                                        <a
                                                            href={`https://www.instagram.com/${guru.userDetail.instagram}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-9 h-9 bg-white/90 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                                                        >
                                                            <FaInstagram className="w-4 h-4 text-gray-700 hover:text-white" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-emerald-600 transition-colors">
                                                {guru.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-3">
                                                {guru.userDetail?.mengajar || 'Guru'}
                                            </p>
                                            <a
                                                href={`mailto:${guru.email}`}
                                                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                                            >
                                                <Mail className="w-4 h-4" />
                                                Kirim Email
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {pengajar.length > visibleItems && (
                        <>
                            <button
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-emerald-500 text-primary hover:text-white p-3 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-gray-200"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={currentIndex >= pengajar.length - visibleItems}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-emerald-500 text-primary hover:text-white p-3 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border border-gray-200"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}