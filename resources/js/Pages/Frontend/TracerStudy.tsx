/// <reference types="vite/client" />
import { Head, Link } from '@inertiajs/inertia-react';
import { ClipboardList, Info, CheckCircle, ArrowRight } from 'lucide-react';

export default function TracerStudy() {
    return (
        <>
            <Head title="Tracer Study - Alumni" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[300px] bg-gradient-to-br from-emerald-500 via-emerald-700 to-teal-900 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    📊 Tracer Study
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tracer Study Alumni</h1>
                            <p className="text-xl text-white/90">Bantu kami meningkatkan kualitas pendidikan dengan feedback Anda</p>
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
                                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition shadow-lg shadow-primary/30"
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

                        {/* Info Cards */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ClipboardList className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Kuesioner Tracer Study</h2>
                                    <p className="text-gray-600">
                                        Partisipasi Anda sangat berharga untuk peningkatan kualitas pendidikan
                                    </p>
                                </div>

                                {/* Form Preview */}
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
                                    <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                                        <Info className="w-5 h-5" />
                                        Aspek yang Ditanyakan
                                    </h3>
                                    <ul className="space-y-2 text-emerald-700">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span><strong>Status Pekerjaan:</strong> Apakah Anda saat ini bekerja, melanjutkan studi, atau berwirausaha?</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span><strong>Relevansi Kompetensi:</strong> Sejauh mana kompetensi yang dipelajari di sekolah relevan dengan pekerjaan Anda saat ini?</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span><strong>Kepuasan Kerja:</strong> Tingkat kepuasan Anda terhadap pekerjaan saat ini</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span><strong>Saran & Masukan:</strong> Rekomendasi Anda untuk peningkatan kualitas pendidikan di sekolah</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* CTA Button */}
                                <div className="text-center">
                                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-12 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30 inline-flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        Isi Kuesioner Tracer Study
                                    </button>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Waktu pengisian: sekitar 10-15 menit
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg p-6 text-white text-center">
                                    <div className="text-4xl font-bold mb-2">85%</div>
                                    <div className="text-sm opacity-90">Alumni Bekerja</div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-lg p-6 text-white text-center">
                                    <div className="text-4xl font-bold mb-2">10%</div>
                                    <div className="text-sm opacity-90">Melanjutkan Studi</div>
                                </div>
                                <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl shadow-lg p-6 text-white text-center">
                                    <div className="text-4xl font-bold mb-2">5%</div>
                                    <div className="text-sm opacity-90">Berwirausaha</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}