import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VideoProps {
    video: {
        title: string;
        desc: string;
        url: string;
    } | null;
}

export default function Video({ video }: VideoProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const playButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!video) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.fromTo(contentRef.current?.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            )
            .fromTo(playButtonRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
                '-=0.3'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [video]);

    if (!video) {
        return null;
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-cover bg-center bg-fixed overflow-hidden"
            style={{ backgroundImage: `url(/Assets/Frontend/img/banner/1.jpg)` }}
        >
            {/* Overlay with mesh gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-emerald-900/90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

            {/* Animated background circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative container mx-auto px-4">
                <div ref={contentRef} className="text-center max-w-4xl mx-auto">
                    <div className="inline-block mb-4">
                        <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                            🎥 Video Profil
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {video.title}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full mx-auto mb-6" />
                    <p className="text-xl text-white/90 leading-relaxed mb-12">
                        {video.desc}
                    </p>

                    {!isPlaying ? (
                        <button
                            ref={playButtonRef}
                            onClick={() => setIsPlaying(true)}
                            className="group inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
                            aria-label="Play video"
                        >
                            <div className="w-18 h-18 md:w-20 md:h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50 transition-all">
                                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" />
                            </div>
                        </button>
                    ) : (
                        <div className="relative w-full max-w-4xl mx-auto">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent pointer-events-none" />
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${getYouTubeId(video.url)}?autoplay=1`}
                                    title="School video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function getYouTubeId(url: string): string {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i);
    return match ? match[1] : url;
}