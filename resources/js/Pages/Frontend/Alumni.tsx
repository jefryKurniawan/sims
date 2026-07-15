import { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/Components/Frontend/Header";
import Footer from "@/Components/Frontend/Footer";
import { Pagination } from "@/Components/Frontend/Pagination";
import {
    Users,
    Briefcase,
    MapPin,
    Mail,
    User,
    GraduationCap,
    MessageCircle,
    Heart,
    BarChart3,
    ChevronRight,
} from "lucide-react";

// ─── Color scheme ───
const primaryColor = "#FFD700";
const secondaryColor = "#E31E24";

// ─── Custom hook: animated counter (triggered on view) ───
function useCountUp(target: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const started = useRef(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (started.current) return;
        started.current = true;
        const startTime = performance.now();
        const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) rafRef.current = requestAnimationFrame(step);
            else cancelAnimationFrame(rafRef.current!);
        };
        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current!);
    }, [target, duration]);

    return count;
}

// ─── Inline LinkedIn SVG (no react-icons dependency) ───
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

// ─── Types ───
interface AlumniUser {
    id: number;
    name: string;
    email: string;
    foto_profile: string | null;
}

interface Alumni {
    id: number;
    user_id: number;
    tahun_lulus: number;
    pekerjaan: string;
    alamat: string;
    no_telp: string;
    linkedin: string | null;
    user: AlumniUser;
}

interface Props {
    alumni: {
        data: Alumni[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    stats: {
        total: number;
        byYear: { tahun_lulus: number; count: number }[];
    };
}

// ─── Animation variants ───
const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

// ─── Component ───
export default function Alumni({ alumni, stats }: Props) {
    const totalAlumniCount = useCountUp(stats.total, 2000);

    return (
        <>
            <Head title="Alumni - SMAS St. Bonaventura" />
            <Header />

            <AnimatePresence mode="wait">
                <motion.div
                    key="alumni-page"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-screen bg-gray-50 pt-20"
                >
                    {/* ═══ Hero ═══ */}
                    <div
                        className="relative h-[400px] overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor}DD 40%, ${primaryColor}60 100%)`,
                        }}
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-15" />

                        {/* Decorative circles */}
                        <div
                            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
                            style={{
                                background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
                            }}
                        />
                        <div
                            className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full opacity-10"
                            style={{
                                background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
                            }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="text-center text-white px-4"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-block mb-5"
                                >
                                    <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Jaringan Alumni
                                    </span>
                                </motion.div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                                    Alumni Sekolah
                                </h1>
                                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light">
                                    Terhubung dengan{" "}
                                    <span className="font-bold text-yellow-300">
                                        {totalAlumniCount.toLocaleString(
                                            "id-ID",
                                        )}
                                        +
                                    </span>{" "}
                                    alumni dari berbagai generasi
                                </p>
                            </motion.div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
                    </div>

                    {/* ═══ Stats + Navigation ═══ */}
                    <section className="py-12 -mt-8">
                        <div className="container mx-auto px-4 max-w-7xl">
                            {/* Stats row */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                            >
                                {/* Total Alumni */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
                                    <p className="text-3xl md:text-4xl font-extrabold text-gray-900 tabular-nums">
                                        {totalAlumniCount.toLocaleString(
                                            "id-ID",
                                        )}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Total Alumni
                                    </p>
                                </div>

                                {/* Berbagai Profesi */}
                                <div
                                    className="rounded-2xl shadow-lg p-6 text-center text-white"
                                    style={{ backgroundColor: secondaryColor }}
                                >
                                    <Briefcase
                                        className="w-9 h-9 mx-auto mb-2"
                                        strokeWidth={1.5}
                                    />
                                    <p className="text-sm font-medium opacity-90">
                                        Berbagai Profesi
                                    </p>
                                </div>

                                {/* Seluruh Indonesia */}
                                <div
                                    className="rounded-2xl shadow-lg p-6 text-center border border-gray-100"
                                    style={{
                                        backgroundColor: `${primaryColor}20`,
                                    }}
                                >
                                    <MapPin
                                        className="w-9 h-9 mx-auto mb-2"
                                        style={{ color: secondaryColor }}
                                        strokeWidth={1.5}
                                    />
                                    <p className="text-sm font-medium text-gray-700">
                                        Seluruh Indonesia
                                    </p>
                                </div>

                                {/* Forum */}
                                <div
                                    className="rounded-2xl shadow-lg p-6 text-center border border-gray-100"
                                    style={{
                                        backgroundColor: `${secondaryColor}10`,
                                    }}
                                >
                                    <MessageCircle
                                        className="w-9 h-9 mx-auto mb-2"
                                        style={{ color: secondaryColor }}
                                        strokeWidth={1.5}
                                    />
                                    <p className="text-sm font-medium text-gray-700">
                                        Forum & Networking
                                    </p>
                                </div>
                            </motion.div>

                            {/* Navigation pills */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="flex flex-wrap gap-3 justify-center mb-10"
                            >
                                {[
                                    {
                                        href: "/alumni",
                                        label: "Direktori Alumni",
                                        icon: Users,
                                        active: true,
                                    },
                                    {
                                        href: "/alumni/tracer-study",
                                        label: "Tracer Study",
                                        icon: BarChart3,
                                        active: false,
                                    },
                                    {
                                        href: "/alumni/forum",
                                        label: "Forum Alumni",
                                        icon: MessageCircle,
                                        active: false,
                                    },
                                    {
                                        href: "/alumni/donasi",
                                        label: "Donasi",
                                        icon: Heart,
                                        active: false,
                                    },
                                ].map((tab) => (
                                    <Link
                                        key={tab.href}
                                        href={tab.href}
                                        className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
                                        style={
                                            tab.active
                                                ? {
                                                      backgroundColor:
                                                          secondaryColor,
                                                      color: "#fff",
                                                  }
                                                : {
                                                      backgroundColor: "#fff",
                                                      color: "#374151",
                                                      border: "1px solid #e5e7eb",
                                                  }
                                        }
                                    >
                                        <tab.icon
                                            className="w-4 h-4"
                                            strokeWidth={2}
                                        />
                                        {tab.label}
                                    </Link>
                                ))}
                            </motion.div>

                            {/* Alumni Grid */}
                            {alumni.data.length > 0 ? (
                                <>
                                    <motion.div
                                        variants={cardContainerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            once: true,
                                            margin: "-80px",
                                        }}
                                        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    >
                                        {alumni.data.map((alumnus) => (
                                            <motion.div
                                                key={alumnus.id}
                                                variants={cardVariants}
                                                whileHover={{ y: -6 }}
                                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
                                            >
                                                {/* Header gradient */}
                                                <div
                                                    className="relative h-28 overflow-hidden"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${secondaryColor}30, ${primaryColor}30)`,
                                                    }}
                                                >
                                                    {alumnus.user
                                                        .foto_profile ? (
                                                        <img
                                                            src={`/storage/images/profile/${alumnus.user.foto_profile}`}
                                                            alt={
                                                                alumnus.user
                                                                    .name
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <User
                                                                className="w-14 h-14 text-gray-400"
                                                                strokeWidth={1}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Avatar overlap */}
                                                <div className="px-5 -mt-12 relative">
                                                    <div className="w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden mx-auto shadow-md">
                                                        {alumnus.user
                                                            .foto_profile ? (
                                                            <img
                                                                src={`/storage/images/profile/${alumnus.user.foto_profile}`}
                                                                alt={
                                                                    alumnus.user
                                                                        .name
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div
                                                                className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                                                                }}
                                                            >
                                                                {alumnus.user.name
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <h3 className="text-lg font-bold text-gray-900 text-center mt-3 mb-1">
                                                        {alumnus.user.name}
                                                    </h3>
                                                    <p
                                                        className="text-center text-sm font-semibold mb-3"
                                                        style={{
                                                            color: secondaryColor,
                                                        }}
                                                    >
                                                        <GraduationCap className="w-3.5 h-3.5 inline mr-1" />
                                                        Angkatan{" "}
                                                        {alumnus.tahun_lulus}
                                                    </p>

                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex items-start gap-2 text-gray-600">
                                                            <Briefcase
                                                                className="w-4 h-4 flex-shrink-0 mt-0.5"
                                                                style={{
                                                                    color: secondaryColor,
                                                                }}
                                                                strokeWidth={2}
                                                            />
                                                            <span className="line-clamp-1">
                                                                {alumnus.pekerjaan ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-start gap-2 text-gray-600">
                                                            <MapPin
                                                                className="w-4 h-4 flex-shrink-0 mt-0.5"
                                                                style={{
                                                                    color: secondaryColor,
                                                                }}
                                                                strokeWidth={2}
                                                            />
                                                            <span className="line-clamp-1">
                                                                {alumnus.alamat ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Contact links */}
                                                    <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                                        {alumnus.linkedin && (
                                                            <a
                                                                href={
                                                                    alumnus.linkedin
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-8 h-8 rounded-full flex items-center justify-center transition hover:scale-110"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#0A66C2",
                                                                    color: "#fff",
                                                                }}
                                                                title="LinkedIn"
                                                            >
                                                                <LinkedInIcon />
                                                            </a>
                                                        )}
                                                        <a
                                                            href={`mailto:${alumnus.user.email}`}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center transition hover:scale-110"
                                                            style={{
                                                                backgroundColor:
                                                                    secondaryColor,
                                                                color: "#fff",
                                                            }}
                                                            title="Email"
                                                        >
                                                            <Mail
                                                                className="w-4 h-4"
                                                                strokeWidth={2}
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-14"
                                    >
                                        <Pagination paginator={alumni} />
                                    </motion.div>
                                </>
                            ) : (
                                /* Empty state */
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, -4, 3, -2, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 4,
                                            ease: "easeInOut",
                                        }}
                                        className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6"
                                        style={{
                                            backgroundColor: `${secondaryColor}10`,
                                        }}
                                    >
                                        <Users
                                            className="w-14 h-14"
                                            style={{ color: secondaryColor }}
                                            strokeWidth={1}
                                        />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Belum Ada Alumni
                                    </h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        Data alumni akan muncul setelah
                                        pendaftaran dan verifikasi.
                                    </p>
                                </motion.div>
                            )}

                            {/* CTA Register */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mt-16 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white relative overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${secondaryColor}, ${secondaryColor}DD, ${primaryColor}50)`,
                                }}
                            >
                                <div
                                    className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
                                    style={{
                                        background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
                                    }}
                                />
                                <div className="relative">
                                    <h2 className="text-3xl font-bold mb-4">
                                        Belum Terdaftar sebagai Alumni?
                                    </h2>
                                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                                        Bergabunglah dengan jaringan alumni kami
                                        dan tetap terhubung dengan sekolah serta
                                        teman-teman seangkatan.
                                    </p>
                                    <a
                                        href="/auth/register"
                                        className="inline-flex items-center gap-2 bg-white font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg"
                                        style={{ color: secondaryColor }}
                                    >
                                        Daftar Sekarang
                                        <ChevronRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>

            <Footer />
        </>
    );
}
