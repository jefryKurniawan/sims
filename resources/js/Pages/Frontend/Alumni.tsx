/// <reference types="vite/client" />
import { Head, Link } from '@inertiajs/inertia-react';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { Pagination } from '@/Components/Frontend/Pagination';
import { Users, Briefcase, Globe, MessageCircle, User, Mail, MapPin } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

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

export default function Alumni({ alumni, stats }: Props) {
    return (
        <>
            <Head title="Alumni - Sekolahku" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[350px] bg-gradient-to-br from-primary via-primary-dark to-indigo-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Jaringan Alumni
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Alumni Sekolahku</h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                Terhubung dengan {stats.total.toLocaleString('id-ID')}+ alumni dari berbagai generasi
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Stats Section */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                                <div className="text-4xl font-bold text-primary mb-2">
                                    {stats.total.toLocaleString('id-ID')}
                                </div>
                                <div className="text-gray-600 text-sm">Total Alumni</div>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-lg p-6 text-center text-white">
                                <Briefcase className="w-10 h-10 mx-auto mb-2" strokeWidth={2} />
                                <div className="text-sm opacity-90">Berbagai Profesi</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg p-6 text-center text-white">
                                <Globe className="w-10 h-10 mx-auto mb-2" strokeWidth={2} />
                                <div className="text-sm opacity-90">Seluruh Indonesia</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-lg p-6 text-center text-white">
                                <MessageCircle className="w-10 h-10 mx-auto mb-2" strokeWidth={2} />
                                <div className="text-sm opacity-90">Forum & Networking</div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8 justify-center">
                            <Link
                                href="/alumni"
                                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition shadow-lg shadow-primary/30"
                            >
                                📋 Direktori Alumni
                            </Link>
                            <Link
                                href="/alumni/tracer-study"
                                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition shadow-lg"
                            >
                                📊 Tracer Study
                            </Link>
                            <Link
                                href="/alumni/forum"
                                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition shadow-lg"
                            >
                                💬 Forum
                            </Link>
                            <Link
                                href="/alumni/donasi"
                                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition shadow-lg"
                            >
                                ❤️ Donasi
                            </Link>
                        </div>

                        {/* Alumni Grid */}
                        {alumni.data.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {alumni.data.map((alumnus) => (
                                        <div
                                            key={alumnus.id}
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                                        >
                                            {/* Profile Image */}
                                            <div className="relative h-32 bg-gradient-to-br from-primary/20 to-indigo-500/20 overflow-hidden">
                                                {alumnus.user.foto_profile ? (
                                                    <img
                                                        src={`/storage/images/profile/${alumnus.user.foto_profile}`}
                                                        alt={alumnus.user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <User className="w-16 h-16 text-primary/60 bg-white/50 rounded-full p-3" strokeWidth={1.5} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 -mt-12 relative">
                                                <div className="w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden mx-auto">
                                                    {alumnus.user.foto_profile ? (
                                                        <img
                                                            src={`/storage/images/profile/${alumnus.user.foto_profile}`}
                                                            alt={alumnus.user.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                                            {alumnus.user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 text-center mt-3 mb-1">
                                                    {alumnus.user.name}
                                                </h3>
                                                <p className="text-primary font-semibold text-sm text-center mb-3">
                                                    Angkatan {alumnus.tahun_lulus}
                                                </p>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-start gap-2 text-gray-600">
                                                        <Briefcase className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                                                        <span className="line-clamp-1">{alumnus.pekerjaan}</span>
                                                    </div>
                                                    <div className="flex items-start gap-2 text-gray-600">
                                                        <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                                                        <span className="line-clamp-1">{alumnus.alamat}</span>
                                                    </div>
                                                </div>

                                                {/* Social Links */}
                                                <div className="flex justify-center gap-2 mt-4 pt-4 border-t">
                                                    {alumnus.linkedin && (
                                                        <a
                                                            href={alumnus.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition"
                                                        >
                                                            <FaLinkedin className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    <a
                                                        href={`mailto:${alumnus.user.email}`}
                                                        className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition"
                                                    >
                                                        <Mail className="w-4 h-4" strokeWidth={2} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-12">
                                    <Pagination paginator={alumni} />
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Alumni</h3>
                                <p className="text-gray-600">Belum ada data alumni yang terdaftar.</p>
                            </div>
                        )}

                        {/* CTA Section */}
                        <div className="mt-16 bg-gradient-to-br from-primary to-indigo-900 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">Belum Terdaftar sebagai Alumni?</h2>
                            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                                Bergabunglah dengan jaringan alumni kami dan tetap terhubung dengan sekolah serta teman-teman seangkatan.
                            </p>
                            <a
                                href="/auth/register"
                                className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg"
                            >
                                Daftar Sekarang
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}