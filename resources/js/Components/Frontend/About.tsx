import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
    about: {
        title: string;
        desc: string;
        image: string;
    } | null;
}

export default function About({ about }: AboutProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.fromTo(contentRef.current?.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }
            )
            .fromTo(imageRef.current,
                { opacity: 0, scale: 0.9, rotateY: 15 },
                { opacity: 1, scale: 1, rotateY: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.4'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (!about) {
        return (
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-16 h-1 bg-emerald-500 mx-auto mb-6 rounded-full" />
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            Tentang Sekolah Kami
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Kami berkomitmen untuk mewujudkan generasi emas Indonesia melalui pendidikan berkualitas tinggi
                            dengan fasilitas modern dan tenaga pengajar profesional.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div ref={contentRef} className="order-2 lg:order-1">
                        <div className="inline-block mb-4">
                            <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium">
                                🏫 Tentang Kami
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            {about.title}
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mb-6" />
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {about.desc}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-primary">Terakreditasi</p>
                                    <p className="text-sm text-gray-500">Standar Nasional</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-primary">Siswa Berprestasi</p>
                                    <p className="text-sm text-gray-500">Nasional & Internasional</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="order-1 lg:order-2">
                        <div className="relative">
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-200 rounded-full opacity-20 blur-xl" />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-full opacity-10 blur-2xl" />

                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-primary/20 rounded-2xl transform rotate-3" />
                                <img
                                    className="w-full rounded-2xl shadow-2xl object-cover relative z-10"
                                    style={{ aspectRatio: '4/3' }}
                                    src={`/storage/images/about/${about.image}`}
                                    alt="About sekolah"
                                />

                                {/* Floating badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-primary">25+</p>
                                            <p className="text-xs text-gray-500">Tahun Pengabdian</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}