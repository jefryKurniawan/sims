import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
    slider: Array<{
        image: string;
        title: string;
        desc: string;
    }>;
}

export default function Slider({ slider }: SliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const indicatorsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (slider.length === 0) return;

        let currentSlide = 0;
        const totalSlides = slider.length;
        let interval: NodeJS.Timeout;

        // Initial animation
        const tl = gsap.timeline({ delay: 0.5 });
        tl.fromTo(contentRef.current?.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
        tl.fromTo(indicatorsRef.current?.children,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
            '-=0.3'
        );

        const showSlide = (index: number) => {
            const content = contentRef.current;
            if (!content) return;

            gsap.to(content.children, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' });

            setTimeout(() => {
                const elements = content.querySelectorAll('.slide-content-element');
                gsap.set(elements, { opacity: 0, y: 20 });
                gsap.to(elements, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' });
            }, 400);

            // Update indicators
            const indicators = indicatorsRef.current?.children;
            if (indicators) {
                gsap.to(indicators, { scale: 1, opacity: 0.5, duration: 0.3 });
                gsap.to(indicators[index], { scale: 1.4, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
            }
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        };

        interval = setInterval(nextSlide, 5000);

        return () => clearInterval(interval);
    }, [slider.length]);

    if (!slider || slider.length === 0) {
        return (
            <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Selamat Datang di Sekolahku</h1>
                    <p className="text-xl text-white/80">Mewujudkan Generasi Emas Indonesia</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={sliderRef} className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
            {slider.map((slide, index) => (
                <div
                    key={slide.image}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transform scale-105"
                        style={{
                            backgroundImage: `url(/storage/images/slider/${slide.image})`,
                            transform: index === 0 ? 'scale(1.05)' : 'scale(1.1)'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-emerald-900/80" />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                    </div>

                    {/* Content */}
                    <div className="relative container mx-auto px-4 h-full flex items-center">
                        {index === 0 && (
                            <div ref={contentRef} className="max-w-3xl text-white slide-content">
                                <div className="inline-block mb-4">
                                    <span className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium">
                                        🎓 Pendaftaran Tahun Ajaran 2026/2027
                                    </span>
                                </div>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight slide-content-element">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl slide-content-element leading-relaxed">
                                    {slide.desc}
                                </p>
                                <div className="flex flex-wrap gap-4 slide-content-element">
                                    <a
                                        href="/ppdb"
                                        className="group bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50 flex items-center gap-2"
                                    >
                                        Daftar Sekarang
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                    <a
                                        href="/profile-sekolah"
                                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all border border-white/20"
                                    >
                                        Profil Sekolah
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div ref={indicatorsRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                {slider.map((_, index) => (
                    <button
                        key={index}
                        className="w-3 h-3 rounded-full bg-white transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-[5000ms] ease-linear"
                    style={{ width: '100%', animation: 'progress 5s linear infinite' }}
                />
            </div>
        </div>
    );
}