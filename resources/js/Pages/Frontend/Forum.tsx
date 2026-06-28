/// <reference types="vite/client" />
import { Head, Link } from '@inertiajs/inertia-react';
import { Tags, Plus, Search, User, MessageSquare, Eye, Calendar } from 'lucide-react';

interface ForumTopic {
    id: number;
    title: string;
    category: string;
    author: string;
    replies: number;
    views: number;
    created_at: string;
    last_activity: string;
}

export default function Forum() {
    // Sample data - will be replaced with real data from backend
    const topics: ForumTopic[] = [
        {
            id: 1,
            title: 'Tips sukses kuliah di jurusan Teknik Informatika',
            category: 'Pendidikan',
            author: 'Ahmad Rizki',
            replies: 23,
            views: 456,
            created_at: '2024-01-15',
            last_activity: '2024-01-20',
        },
        {
            id: 2,
            title: 'Lowongan kerja di Jakarta untuk fresh graduate',
            category: 'Karir',
            author: 'Siti Nurhaliza',
            replies: 15,
            views: 328,
            created_at: '2024-01-18',
            last_activity: '2024-01-19',
        },
        {
            id: 3,
            title: 'Pengalaman memulai bisnis startup di bidang edukasi',
            category: 'Bisnis',
            author: 'Budi Santoso',
            replies: 31,
            views: 512,
            created_at: '2024-01-10',
            last_activity: '2024-01-20',
        },
    ];

    const categories = [
        { name: 'Semua', count: 156, icon: '📌' },
        { name: 'Pendidikan', count: 45, icon: '🎓' },
        { name: 'Karir', count: 38, icon: '💼' },
        { name: 'Bisnis', count: 27, icon: '💡' },
        { name: 'Umum', count: 46, icon: '💬' },
    ];

    return (
        <>
            <Head title="Forum Alumni - Diskusi & Networking" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[300px] bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    💬 Forum Diskusi
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Forum Alumni</h1>
                            <p className="text-xl text-white/90">Berbagi pengalaman, peluang, dan inspirasi dengan sesama alumni</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>

                {/* Content Section */}
                <section className="py-12 -mt-10">
                    <div className="container mx-auto px-4">
                        {/* Navigation Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8 justify-center">
                            <Link
                                href="/alumni"
                                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition shadow-lg"
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
                                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition shadow-lg shadow-primary/30"
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

                        <div className="grid lg:grid-cols-4 gap-8">
                            {/* Sidebar - Categories */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Tags className="w-5 h-5 text-primary" />
                                        Kategori
                                    </h3>
                                    <ul className="space-y-2">
                                        {categories.map((cat) => (
                                            <li key={cat.name}>
                                                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition">
                                                    <span className="flex items-center gap-2">
                                                        <span className="text-xl">{cat.icon}</span>
                                                        <span className="text-gray-700">{cat.name}</span>
                                                    </span>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                        {cat.count}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* New Topic Button */}
                                    <button className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2">
                                        <Plus className="w-5 h-5" />
                                        Buat Topik Baru
                                    </button>
                                </div>
                            </div>

                            {/* Main Content - Topics */}
                            <div className="lg:col-span-3">
                                {/* Search & Filter */}
                                <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Cari topik..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                            />
                                        </div>
                                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                                            <option>Terbaru</option>
                                            <option>Teraktif</option>
                                            <option>Terpopuler</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Topics List */}
                                <div className="space-y-4">
                                    {topics.map((topic) => (
                                        <div
                                            key={topic.id}
                                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                                    {topic.author.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-primary cursor-pointer">
                                                        {topic.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-4 h-4" />
                                                            {topic.author}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Tags className="w-4 h-4" />
                                                            {topic.category}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(topic.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-center flex-shrink-0">
                                                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                                                        <MessageSquare className="w-4 h-4" />
                                                        <span className="font-semibold">{topic.replies}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <Eye className="w-4 h-4" />
                                                        <span className="font-semibold">{topic.views}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* View All Button */}
                                <div className="mt-8 text-center">
                                    <button className="bg-white text-primary font-semibold py-3 px-8 rounded-xl border-2 border-primary hover:bg-primary hover:text-white transition">
                                        Lihat Semua Topik
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}