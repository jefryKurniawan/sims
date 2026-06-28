import { useEffect, useRef } from 'react';
import Head from '@/Layout/Head';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Building2,
    Award,
    Hash,
    UserCircle,
    MapPin,
    Phone,
    Mail,
    Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProfileSekolahProps {
    profileSekolah: {
        id: number;
        nama_sekolah: string;
        npsn: string;
        alamat: string;
        telepon: string;
        email: string;
        website: string;
        kepala_sekolah: string;
        tahun_berdiri: string;
        akreditasi: string;
        visi: string;
        misi: string;
        logo: string | null;
        foto_sekolah: string | null;
    } | null;
}

export default function ProfileSekolah({ profileSekolah }: ProfileSekolahProps) {
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

            tl.fromTo('.profile-header',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            )
            .fromTo('.profile-card',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
                '-=0.3'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const defaultProfile = {
        nama_sekolah: 'Sekolahku',
        npsn: '12345678',
        alamat: 'Jl. Pendidikan No. 123, Jakarta',
        telepon: '(021) 1234-5678',
        email: 'info@sekolahku.sch.id',
        website: 'www.sekolahku.sch.id',
        kepala_sekolah: 'Dr. Budi Santoso, M.Pd',
        tahun_berdiri: '1998',
        akreditasi: 'A',
        visi: 'Menjadi sekolah unggul yang menghasilkan generasi berkarakter, cerdas, dan berwawasan global',
        misi: 'Menyelenggarakan pendidikan berkualitas dengan mengedepankan nilai-nilai karakter dan teknologi',
        logo: null,
        foto_sekolah: null,
    };

    const profile = profileSekolah || defaultProfile;

    return (
        <>
            <Head title="Profil Sekolah" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[400px] bg-gradient-to-br from-primary via-primary-dark to-emerald-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white profile-header opacity-0">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    Profil Institusi
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{profile.nama_sekolah}</h1>
                            <p className="text-xl text-white/90">Mewujudkan Generasi Emas Indonesia</p>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Main Content */}
                <section ref={sectionRef} className="py-16 -mt-10 relative">
                    <div className="container mx-auto px-4">
                        {/* Info Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <div className="profile-card opacity-0 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                                    <Building2 className="w-6 h-6 text-emerald-600" />
                                </div>
                                <p className="text-sm text-gray-500 mb-1">Tahun Berdiri</p>
                                <p className="text-2xl font-bold text-primary">{profile.tahun_berdiri}</p>
                            </div>

                            <div className="profile-card opacity-0 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <Award className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-sm text-gray-500 mb-1">Akreditasi</p>
                                <p className="text-2xl font-bold text-primary">{profile.akreditasi}</p>
                            </div>

                            <div className="profile-card opacity-0 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Hash className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-sm text-gray-500 mb-1">NPSN</p>
                                <p className="text-2xl font-bold text-primary">{profile.npsn}</p>
                            </div>

                            <div className="profile-card opacity-0 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <UserCircle className="w-6 h-6 text-amber-600" />
                                </div>
                                <p className="text-sm text-gray-500 mb-1">Kepala Sekolah</p>
                                <p className="text-lg font-bold text-primary">{profile.kepala_sekolah}</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                                Informasi Kontak
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Alamat</p>
                                        <p className="text-gray-700">{profile.alamat}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Telepon</p>
                                        <p className="text-gray-700">{profile.telepon}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
                                        <p className="text-gray-700">{profile.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Website</p>
                                        <p className="text-gray-700">{profile.website}</p>
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