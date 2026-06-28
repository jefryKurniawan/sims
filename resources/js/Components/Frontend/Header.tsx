import { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import gsap from 'gsap';
import { Phone, Mail, ChevronDown, Menu, X, LogIn } from 'lucide-react';

interface HeaderProps {
    footer: {
        logo: string | null;
        telp: string;
        email: string;
    };
    jurusanM: Array<{
        slug: string;
        nama: string;
    }>;
    kegiatanM: Array<{
        slug: string;
        nama: string;
    }>;
}

export default function Header({ footer, jurusanM, kegiatanM }: HeaderProps) {
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const topBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            gsap.fromTo('.mobile-menu-item',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [mobileMenuOpen]);

    const isActive = (path: string) => {
        if (path === '/') {
            return url === '/';
        }
        return url.startsWith(path);
    };

    return (
        <>
            {/* Top Bar - Enhanced with gradient */}
            <div ref={topBarRef} className="bg-gradient-to-r from-primary via-primary-dark to-emerald-900 py-2 border-b border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                            <a href="/" className="flex items-center gap-2">
                                {footer?.logo ? (
                                    <img
                                        className="h-10 w-auto brightness-0 invert"
                                        src={`/storage/images/logo/${footer.logo}`}
                                        alt="logo"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                            <span className="text-primary font-bold text-sm">S</span>
                                        </div>
                                        <span className="text-white font-semibold text-lg hidden sm:block">Sekolahku</span>
                                    </div>
                                )}
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href={`tel:${footer?.telp}`}
                                className="hidden sm:flex items-center text-white/80 hover:text-white transition-colors text-sm gap-2"
                            >
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">{footer?.telp}</span>
                            </a>
                            <a
                                href={`mailto:${footer?.email}`}
                                className="hidden lg:flex items-center text-white/80 hover:text-white transition-colors text-sm gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">{footer?.email}</span>
                            </a>
                        </div>
                        {url === '/dashboard' || url.startsWith('/dashboard') ? (
                            <a
                                href="/dashboard"
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                            >
                                🏠 Home
                            </a>
                        ) : (
                            <a
                                href="/auth/login"
                                className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2"
                            >
                                <LogIn className="w-4 h-4" />
                                Masuk
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation - Enhanced with glassmorphism */}
            <nav
                ref={headerRef}
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-primary/95 backdrop-blur-md shadow-lg shadow-primary/20'
                        : 'bg-primary'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-1">
                            <a
                                href="/"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    url === '/'
                                        ? 'bg-white/20 text-white shadow-inner'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                Beranda
                            </a>

                            {/* Tentang Kami Dropdown */}
                            <div className="relative group">
                                <button className="px-4 py-2 text-white/90 hover:bg-white/10 hover:text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                                    Tentang Kami
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                </button>
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform group-hover:translate-y-0 translate-y-2">
                                    <div className="py-2">
                                        <a
                                            href="/profile-sekolah"
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                                        >
                                            👤 Profile Sekolah
                                        </a>
                                        <a
                                            href="/visi-dan-misi"
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                                        >
                                            🎯 Visi dan Misi
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Program Dropdown */}
                            <div className="relative group">
                                <button className="px-4 py-2 text-white/90 hover:bg-white/10 hover:text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                                    Program
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                </button>
                                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform group-hover:translate-y-0 translate-y-2 max-h-96 overflow-y-auto">
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 mx-2">
                                            Program Studi
                                        </div>
                                        {jurusanM?.map((jurusan) => (
                                            <a
                                                key={jurusan.slug}
                                                href={`/program/${jurusan.slug}`}
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                                            >
                                                📚 {jurusan.nama}
                                            </a>
                                        ))}
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-t border-b border-gray-100 mx-2 mt-2">
                                            Kegiatan Siswa
                                        </div>
                                        {kegiatanM?.map((kegiatan) => (
                                            <a
                                                key={kegiatan.slug}
                                                href={`/kegiatan/${kegiatan.slug}`}
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                                            >
                                                🎪 {kegiatan.nama}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <a
                                href="/berita"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    url.startsWith('/berita')
                                        ? 'bg-white/20 text-white shadow-inner'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                Berita
                            </a>

                            <a
                                href="/ppdb"
                                target="_blank"
                                className="px-4 py-2 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-all"
                            >
                                PPDB
                            </a>

                            {/* Lainnya Dropdown */}
                            <div className="relative group">
                                <button className="px-4 py-2 text-white/90 hover:bg-white/10 hover:text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                                    Lainnya
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                </button>
                                <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform group-hover:translate-y-0 translate-y-2">
                                    <div className="py-2">
                                        <a
                                            href="/murid/perpustakaan"
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                                        >
                                            📖 Perpustakaan
                                        </a>
                                        <a
                                            href="/alumni"
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                                        >
                                            🎓 Alumni
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`text-white p-2 rounded-lg transition-all ${
                                    mobileMenuOpen ? 'bg-white/20' : 'hover:bg-white/10'
                                }`}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-primary/95 backdrop-blur-md border-t border-white/10 max-h-[80vh] overflow-y-auto">
                        <div className="px-4 py-3 space-y-1">
                            <a href="/" className="block px-4 py-3 text-white font-medium bg-white/10 rounded-lg mobile-menu-item">🏠 Beranda</a>

                            <div className="border-t border-white/10 pt-2 mt-2">
                                <div className="px-4 py-2 text-white/70 text-sm font-medium">Tentang Kami</div>
                                <a href="/profile-sekolah" className="block px-4 py-2.5 text-white/90 hover:bg-white/10 rounded-lg text-sm mobile-menu-item">👤 Profile Sekolah</a>
                                <a href="/visi-dan-misi" className="block px-4 py-2.5 text-white/90 hover:bg-white/10 rounded-lg text-sm mobile-menu-item">🎯 Visi dan Misi</a>
                            </div>

                            <div className="border-t border-white/10 pt-2 mt-2">
                                <div className="px-4 py-2 text-white/70 text-sm font-medium">Program Studi</div>
                                {jurusanM?.map((jurusan) => (
                                    <a
                                        key={jurusan.slug}
                                        href={`/program/${jurusan.slug}`}
                                        className="block px-4 py-2.5 text-white/90 hover:bg-white/10 rounded-lg text-sm mobile-menu-item"
                                    >
                                        📚 {jurusan.nama}
                                    </a>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-2 mt-2">
                                <div className="px-4 py-2 text-white/70 text-sm font-medium">Kegiatan</div>
                                {kegiatanM?.map((kegiatan) => (
                                    <a
                                        key={kegiatan.slug}
                                        href={`/kegiatan/${kegiatan.slug}`}
                                        className="block px-4 py-2.5 text-white/90 hover:bg-white/10 rounded-lg text-sm mobile-menu-item"
                                    >
                                        🎪 {kegiatan.nama}
                                    </a>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-2 mt-2">
                                <a href="/berita" className="block px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg text-sm mobile-menu-item">📰 Berita</a>
                                <a href="/ppdb" target="_blank" className="block px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg text-sm mobile-menu-item">🎓 PPDB</a>
                                <a href="/murid/perpustakaan" className="block px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg text-sm mobile-menu-item">📖 Perpustakaan</a>
                                <a href="/alumni" className="block px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg text-sm mobile-menu-item">🎓 Alumni</a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}