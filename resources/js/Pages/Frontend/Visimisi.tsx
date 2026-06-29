import { useEffect, useRef } from 'react';
import Head from '@/Layout/Head';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Check, Sparkles, BookOpen, Star, Globe, Lightbulb, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VisimisiProps {
    visimisi: {
        id: number;
        visi: string;
        misi: string;
        moto: string | null;
    } | null;
}

export default function Visimisi({ visimisi }: VisimisiProps) {
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

            tl.fromTo('.visi-card',
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
            )
            .fromTo('.misi-item',
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
                '-=0.4'
            )
            .fromTo('.moto-card',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.3'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const defaultData = {
        visi: 'Menjadi sekolah unggul yang menghasilkan generasi berkarakter, cerdas, kompetitif, dan berwawasan global serta tetap berlandaskan pada nilai-nilai iman dan taqwa.',
        misi: 'Menyelenggarakan pendidikan berkualitas dengan pendekatan student-centered learning\nMengembangkan potensi akademik dan non-akademik siswa secara optimal\nMenumbuhkan semangat kewirausahaan dan inovasi pada siswa\nMembangun karakter yang kuat berdasarkan nilai-nilai moral dan etika\nMenerapkan teknologi dalam proses pembelajaran untuk meningkatkan kualitas pendidikan',
        moto: 'Berilmu, Berakhlak, Berprestasi',
    };

    const data = visimisi || defaultData;
    const misiList = data.misi.split('\n').filter((m) => m.trim());

    return (
        <>
            <Head title="Visi dan Misi - SMAS St. Bonaventura" />
            <Header />
            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Hero Section */}
                <div className="relative h-[350px] bg-gradient-to-br from-primary via-primary-dark to-emerald-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="inline-block mb-4 opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out forwards' }}>
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                    <Target className="w-4 h-4" />
                                    Arah & Tujuan
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 opacity-0" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s forwards' }}>
                                Visi & Misi Sekolah
                            </h1>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Main Content */}
                <section ref={sectionRef} className="py-16 -mt-10 relative">
                    <div className="container mx-auto px-4">
                        {/* Visi Card */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <div className="visi-card opacity-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                                {/* Decorative Background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                            <Eye className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-primary">Visi Kami</h2>
                                    </div>

                                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-emerald-100">
                                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic">
                                            "{data.visi}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Misi Cards */}
                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                                <div className="flex items-center gap-3 mb-6 relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                        <Check className="w-7 h-7 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-primary">Misi Kami</h2>
                                </div>

                                <ul className="space-y-4 relative">
                                    {misiList.map((misi, index) => (
                                        <li key={index} className="misi-item opacity-0 flex items-start gap-3">
                                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                                                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                            </div>
                                            <span className="text-gray-700 leading-relaxed">{misi}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Values / Moto Card */}
                            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                            <Sparkles className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold">Nilai & Moto</h2>
                                    </div>

                                    <div className="moto-card opacity-0 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
                                        <p className="text-lg text-white/90 mb-2 text-sm uppercase tracking-wide">Moto Kami</p>
                                        <p className="text-2xl font-bold text-emerald-300">{data.moto}</p>
                                    </div>

                                    {/* Core Values */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                            <BookOpen className="w-8 h-8 text-emerald-300 mb-2" />
                                            <p className="text-sm font-semibold text-emerald-300 mb-1">Unggul</p>
                                            <p className="text-xs text-white/70">Dalam prestasi</p>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                            <Star className="w-8 h-8 text-emerald-300 mb-2" />
                                            <p className="text-sm font-semibold text-emerald-300 mb-1">Karakter</p>
                                            <p className="text-xs text-white/70">Berakhlak mulia</p>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                            <Globe className="w-8 h-8 text-emerald-300 mb-2" />
                                            <p className="text-sm font-semibold text-emerald-300 mb-1">Global</p>
                                            <p className="text-xs text-white/70">Berpikir luas</p>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                            <Lightbulb className="w-8 h-8 text-emerald-300 mb-2" />
                                            <p className="text-sm font-semibold text-emerald-300 mb-1">Inovatif</p>
                                            <p className="text-xs text-white/70">Selalu berkembang</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}