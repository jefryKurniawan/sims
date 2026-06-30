/// <reference types="vite/client" />
import { Head, Link, router } from '@inertiajs/inertia-react';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { Pagination } from '@/Components/Frontend/Pagination';
import { Users, Briefcase, GraduationCap, Search, X, User, Mail, MapPin, BookOpen } from 'lucide-react';

interface GuruUser {
    id: number;
    name: string;
    email: string;
    foto_profile: string | null;
}

interface Guru {
    id: number;
    nama_lengkap: string;
    nip_nuptk: string;
    jenis: string;
    jabatan: string;
    bidang_studi: string;
    foto: string | null;
    user: GuruUser;
}

interface Props {
    gurus: {
        data: Guru[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        jenis: string;
        bidang_studi: string;
        search: string;
    };
    bidangStudiList: string[];
    stats: {
        total: number;
        guru: number;
        tendik: number;
    };
}

export default function Guru({ gurus, filters, bidangStudiList, stats }: Props) {
    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.get('/guru', params.toString());
    };

    const clearFilters = () => {
        router.get('/guru');
    };

    const hasActiveFilters = filters.jenis || filters.bidang_studi || filters.search;

    return (
        <>
            <Head title="Guru & Tenaga Kependidikan - SMAS St. Bonaventura" />
            <Header />
            <div className="min-h-screen bg-gray-50 pt-20">
                {/* Hero Section */}
                <div className="relative h-[350px] bg-gradient-to-br from-primary via-primary-dark to-indigo-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" />
                                    Tenaga Pendidik & Kependidikan
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guru & Staf Sekolahku</h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                Mengenali para educator profesional yang membimbing siswa menuju kesuksesan
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Stats & Filter Section */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                                <div className="text-3xl font-bold text-primary mb-1">
                                    {stats.total.toLocaleString('id-ID')}
                                </div>
                                <div className="text-gray-600 text-xs">Total Guru & Staf</div>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-lg p-6 text-center text-white">
                                <GraduationCap className="w-8 h-8 mx-auto mb-1" strokeWidth={2} />
                                <div className="text-sm opacity-90">{stats.guru} Guru</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg p-6 text-center text-white">
                                <Briefcase className="w-8 h-8 mx-auto mb-1" strokeWidth={2} />
                                <div className="text-sm opacity-90">{stats.tendik} Tenaga Admin</div>
                            </div>
                        </div>

                        {/* Filter Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Search className="w-5 h-5 text-primary" />
                                    Filter & Pencarian
                                </h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                                    >
                                        <X className="w-4 h-4" />
                                        Reset Filter
                                    </button>
                                )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                {/* Search */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Cari Nama
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ketik nama guru..."
                                        value={filters.search}
                                        onChange={(e) => handleFilter('search', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                {/* Jenis Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Jenis Pegawai
                                    </label>
                                    <select
                                        value={filters.jenis}
                                        onChange={(e) => handleFilter('jenis', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">Semua</option>
                                        <option value="guru">Guru</option>
                                        <option value="tenaga_kependidikan">Tenaga Kependidikan</option>
                                    </select>
                                </div>

                                {/* Bidang Studi Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Bidang Studi
                                    </label>
                                    <select
                                        value={filters.bidang_studi}
                                        onChange={(e) => handleFilter('bidang_studi', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">Semua Bidang Studi</option>
                                        {bidangStudiList.map((bidang) => (
                                            <option key={bidang} value={bidang}>
                                                {bidang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Guru Grid */}
                        {gurus.data.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {gurus.data.map((guru) => (
                                        <div
                                            key={guru.id}
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                                        >
                                            {/* Profile Image */}
                                            <div className="relative h-32 bg-gradient-to-br from-primary/20 to-indigo-500/20 overflow-hidden">
                                                {guru.user.foto_profile ? (
                                                    <img
                                                        src={`/storage/images/profile/${guru.user.foto_profile}`}
                                                        alt={guru.user.name}
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
                                                    {guru.user.foto_profile ? (
                                                        <img
                                                            src={`/storage/images/profile/${guru.user.foto_profile}`}
                                                            alt={guru.user.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                                            {guru.user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 text-center mt-3 mb-1">
                                                    {guru.user.name}
                                                </h3>

                                                {/* Badge Jenis */}
                                                <div className="flex justify-center gap-2 mb-3">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            guru.jenis === 'guru'
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                        }`}
                                                    >
                                                        {guru.jenis === 'guru' ? 'Guru' : 'Staf'}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-start gap-2 text-gray-600">
                                                        <Briefcase className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                                                        <span className="line-clamp-1">{guru.jabatan}</span>
                                                    </div>
                                                    <div className="flex items-start gap-2 text-gray-600">
                                                        <BookOpen className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                                                        <span className="line-clamp-1">{guru.bidang_studi || '-'}</span>
                                                    </div>
                                                    <div className="flex items-start gap-2 text-gray-500">
                                                        <span className="text-xs">{guru.nip_nuptk}</span>
                                                    </div>
                                                </div>

                                                {/* Social Links */}
                                                <div className="flex justify-center gap-2 mt-4 pt-4 border-t">
                                                    <a
                                                        href={`mailto:${guru.user.email}`}
                                                        className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition"
                                                        title="Kirim Email"
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
                                    <Pagination paginator={gurus} />
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak Ada Data</h3>
                                <p className="text-gray-600">
                                    {hasActiveFilters
                                        ? 'Tidak ada guru yang sesuai dengan filter yang dipilih.'
                                        : 'Belum ada data guru yang terdaftar.'}
                                </p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                    >
                                        Reset Filter
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}