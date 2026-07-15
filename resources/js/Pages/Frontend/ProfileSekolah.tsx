import { Head } from "@/Layout/Head";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Header from "@/Components/Frontend/Header";
import Footer from "@/Components/Frontend/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Building2,
    Award,
    Hash,
    UserCircle,
    MapPin,
    Phone,
    Mail,
    Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Color scheme matching homepage
const primaryColor = "#FFD700"; // Yellow
const secondaryColor = "#E31E24"; // Red

// Social media links with inline SVG icons (no extra dependency)
const socialLinks = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/groups/smabonamadiun/",
        color: "#1877F2",
        icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@smakst.bonaventuramadiun6171",
        color: "#FF0000",
        icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/bonaventura_shs/",
        color: "#E4405F",
        icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@smastbonaventura",
        color: "#000000",
        icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.14 1.85-.02.75.16 1.54.62 2.06.62.69 1.64.92 2.56.63 1.15-.39 1.84-1.56 2-2.7.07-.75.04-1.52.04-2.28.02-4.12.01-8.24.02-12.36z",
    },
];

// Custom hook for counting animations
function useCountUp(target: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const startTime = performance.now();

        const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            setCount(Math.floor(eased * target));

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                cancelAnimationFrame(rafRef.current!);
            }
        };

        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current!);
    }, [target, duration]);

    return count;
}

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

export default function ProfileSekolah({
    profileSekolah,
}: ProfileSekolahProps) {
    const defaultProfile = {
        nama_sekolah: "SMA Bonavenura Madiun",
        npsn: "12345678",
        alamat: "Jl. Diponegoro No.45, Kec. Manguharjo, Kota Madiun",
        telepon: "(0351) 454194",
        email: "smabovent@yahoo.co.id",
        website: "www.sekolahku.sch.id",
        kepala_sekolah: "Dr. Budi Santoso, M.Pd",
        tahun_berdiri: "1998",
        akreditasi: "A",
        visi: "Menjadi sekolah unggul yang menghasilkan generasi berkarakter, cerdas, dan berwawasan global",
        misi: "Menyelenggarakan pendidikan berkualitas dengan mengedepankan nilai-nilai karakter dan teknologi",
        logo: null,
        foto_sekolah: null,
    };

    const profile = profileSekolah ?? defaultProfile;

    const getField = (value: string | null, fallback: string): string => {
        return value ?? fallback;
    };

    // NPSN count animation (useCountUp hook with ease-out cubic)
    const npsnCount = useCountUp(
        parseInt(getField(profile.npsn, defaultProfile.npsn)) || 0,
        2000,
    );

    // GSAP animations for entrance and scroll
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade-in header
            gsap.fromTo(
                ".profile-header",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            );
            // Stagger cards
            gsap.fromTo(
                ".profile-card",
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.3",
            );
            // Section reveal on scroll
            gsap.utils.toArray("section").forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.6,
                    ease: "power3.out",
                });
            });
        }, null);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Head
                title="Profil Sekolah"
                description={getField(profile.visi, defaultProfile.visi)}
                image={profile.logo}
            />
            <Header />
            {/* Wrap page content in AnimatePresence for page transitions */}
            <AnimatePresence mode="wait">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="min-h-screen bg-gray-50 pt-20"
                >
                    {/* Hero Section */}
                    <div
                        className="relative h-[480px] overflow-hidden"
                        style={{
                            background: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor}, ${secondaryColor}20)`,
                        }}
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVybnVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white profile-header opacity-0">
                                <div className="inline-block mb-4">
                                    <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        Profil Institusi
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    {getField(
                                        profile.nama_sekolah,
                                        defaultProfile.nama_sekolah,
                                    )}
                                </h1>
                                <p className="text-xl text-white/90">
                                    Mewujudkan Generasi Emas Indonesia
                                </p>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                    </div>

                    {/* Main Content */}
                    <section className="py-16 -mt-10 relative">
                        <div className="container mx-auto px-4">
                            {/* Info Cards */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                <motion.div
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow:
                                            "0 8px 25px rgba(0,0,0,0.15)",
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    className="profile-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                                        <Building2 className="w-6 h-6 text-destructive" />
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Tahun Berdiri
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {getField(
                                            profile.tahun_berdiri,
                                            defaultProfile.tahun_berdiri,
                                        )}
                                    </p>
                                </motion.div>

                                <motion.div
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow:
                                            "0 8px 25px rgba(0,0,0,0.15)",
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    className="profile-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                                        <Award className="w-6 h-6 text-destructive" />
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Akreditasi
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {getField(
                                            profile.akreditasi,
                                            defaultProfile.akreditasi,
                                        )}
                                    </p>
                                </motion.div>

                                <motion.div
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow:
                                            "0 8px 25px rgba(0,0,0,0.15)",
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    className="profile-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                                        <Hash className="w-6 h-6 text-destructive" />
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        NPSN
                                    </p>
                                    <div className="relative">
                                        <p className="text-2xl font-bold text-gray-900">
                                            {npsnCount.toLocaleString()}
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow:
                                            "0 8px 25px rgba(0,0,0,0.15)",
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    className="profile-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                                        <UserCircle className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Kepala Sekolah
                                    </p>
                                    <p className="text-lg font-bold text-gray-900">
                                        {getField(
                                            profile.kepala_sekolah,
                                            defaultProfile.kepala_sekolah,
                                        )}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                                <h2
                                    className="text-2xl font-bold mb-6 flex items-center gap-3"
                                    style={{ color: secondaryColor }}
                                >
                                    <span
                                        className="w-1.5 h-8 rounded-full"
                                        style={{
                                            backgroundColor: secondaryColor,
                                        }}
                                    />
                                    Informasi Kontak
                                </h2>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Left column: Email + Phone */}
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-yellow-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium mb-0.5">
                                                    Email
                                                </p>
                                                <a
                                                    href={`mailto:${getField(profile.email, defaultProfile.email)}`}
                                                    className="text-gray-700 hover:text-destructive transition-colors font-medium"
                                                >
                                                    {getField(
                                                        profile.email,
                                                        defaultProfile.email,
                                                    )}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-destructive" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium mb-0.5">
                                                    Telepon
                                                </p>
                                                <a
                                                    href={`tel:${getField(profile.telepon, defaultProfile.telepon).replace(/\D/g, "")}`}
                                                    className="text-gray-700 hover:text-destructive transition-colors font-medium"
                                                >
                                                    {getField(
                                                        profile.telepon,
                                                        defaultProfile.telepon,
                                                    )}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right column: Alamat + Social Media */}
                                    <div className="space-y-5">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-destructive" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium mb-0.5">
                                                    Alamat
                                                </p>
                                                <a
                                                    href="https://maps.app.goo.gl/WVo5c3F3KrYndmwt7"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-700 hover:text-destructive transition-colors"
                                                >
                                                    {getField(
                                                        profile.alamat,
                                                        defaultProfile.alamat,
                                                    )}
                                                </a>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-2">
                                                Sosial Media
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {socialLinks.map((s) => (
                                                    <a
                                                        key={s.label}
                                                        href={s.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold hover:scale-105 active:scale-95 transition-transform"
                                                        style={{
                                                            backgroundColor:
                                                                s.color + "15",
                                                            color: s.color,
                                                        }}
                                                    >
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            width="14"
                                                            height="14"
                                                            fill="currentColor"
                                                        >
                                                            <path d={s.icon} />
                                                        </svg>
                                                        {s.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visi & Misi */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                                <h2
                                    className="text-2xl font-bold mb-6 flex items-center gap-3"
                                    style={{ color: secondaryColor }}
                                >
                                    <span
                                        className="w-1.5 h-8 rounded-full"
                                        style={{
                                            backgroundColor: secondaryColor,
                                        }}
                                    />
                                    Visi & Misi
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            Visi
                                        </h3>
                                        <p className="text-gray-700">
                                            {getField(
                                                profile.visi,
                                                defaultProfile.visi,
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            Misi
                                        </h3>
                                        <p className="text-gray-700">
                                            {getField(
                                                profile.misi,
                                                defaultProfile.misi,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Foto Sekolah (if available) */}
                            {profile.foto_sekolah && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <span className="w-1.5 h-8 bg-yellow-100 rounded-full" />
                                        Foto Sekolah
                                    </h2>
                                    <img
                                        src={profile.foto_sekolah}
                                        alt="Foto Sekolah"
                                        className="rounded-xl shadow-lg w-full h-auto object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </motion.section>
            </AnimatePresence>
            <Footer />
        </>
    );
}
