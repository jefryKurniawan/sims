import { Head, Link, router } from '@inertiajs/inertia-react';
import { GraduationCap, Briefcase, TrendingUp, Search, Filter, Plus } from 'lucide-react';

interface TracerStudy {
    id: number;
    alumni_id: number;
    nama_lengkap: string;
    jenjang_pendidikan: string | null;
    nama_instansi: string | null;
    bidang_studi: string | null;
    tahun_lulus: number | null;
    status: 'kuliah' | 'bekerja' | 'wirausaha' | 'tidak_bekerja';
    alamat: string | null;
    no_telp: string | null;
    linkedin: string | null;
    created_at: string;
    alumni: { user: { name: string } } | null;
}

interface Props {
    tracerStudies: {
        data: TracerStudy[];
        current_page: number;
        last_page: number;
        per_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        status: string;
        search: string;
    };
    stats: {
        total: number;
        bekerja: number;
        kuliah: number;
        wirausaha: number;
        tidak_bekerja: number;
    };
}

export default function Index({ tracerStudies, filters, stats }: Props) {
    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.get(route('admin.tracer-study.index'), params.toString());
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            bekerja: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: Briefcase, label: 'Bekerja' },
            kuliah: { bg: 'bg-blue-100', text: 'text-blue-700', icon: GraduationCap, label: 'Kuliah' },
            wirausaha: { bg: 'bg-purple-100', text: 'text-purple-700', icon: TrendingUp, label: 'Wirausaha' },
            tidak_bekerja: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Briefcase, label: 'Tidak Bekerja' },
        };
        const badge = badges[status as keyof typeof badges];
        const Icon = badge.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                <Icon className="w-3 h-3" />
                {badge.label}
            </span>
        );
    };

    return (
        <>
            <Head title="Kelola Tracer Study Alumni" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Tracer Study Alumni</h1>
                                <p className="text-gray-600 text-sm mt-1">Data perkembangan alumni setelah lulus</p>
                            </div>
                            <Link
                                href={route('admin.tracer-study.create')}
                                className="inline-flex items-center gap-2 bg-school-red text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition font-semibold"
                            >
                                <Plus className="w-4 h-4" />
                                + Tracer Study Baru
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Total</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-gray-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Bekerja</p>
                                    <p className="text-2xl font-bold text-emerald-600">{stats.bekerja}</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Kuliah</p>
                                    <p className="text-2xl font-bold text-blue-600">{stats.kuliah}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Wirausaha</p>
                                    <p className="text-2xl font-bold text-purple-600">{stats.wirausaha}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">Belum Bekerja</p>
                                    <p className="text-2xl font-bold text-gray-500">{stats.tidak_bekerja}</p>
                                </div>
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <h3 className="font-bold text-gray-900">Filter</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Cari</label>
                                <input
                                    type="text"
                                    placeholder="Nama atau instansi..."
                                    value={filters.search}
                                    onChange={(e) => handleFilter('search', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilter('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Semua</option>
                                    <option value="bekerja">Bekerja</option>
                                    <option value="kuliah">Kuliah</option>
                                    <option value="wirausaha">Wirausaha</option>
                                    <option value="tidak_bekerja">Tidak Bekerja</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Alumni</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tahun Lulus</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Instansi / Pendidikan</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bidang Studi</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tracerStudies.data.map((ts) => (
                                        <tr key={ts.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">{ts.nama_lengkap}</div>
                                                {ts.no_telp && <div className="text-sm text-gray-500">{ts.no_telp}</div>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {ts.tahun_lulus || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(ts.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {ts.jenjang_pendidikan || ts.nama_instansi || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {ts.bidang_studi || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route('admin.tracer-study.show', ts.id)}
                                                        className="text-primary hover:text-primary-dark"
                                                    >
                                                        Detail
                                                    </Link>
                                                    <Link
                                                        href={route('admin.tracer-study.edit', ts.id)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {tracerStudies.data.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                Belum ada data tracer study.
                            </div>
                        )}

                        {tracerStudies.data.length > 0 && (
                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {tracerStudies.from} - {tracerStudies.to} dari {tracerStudies.data.length} data
                                </div>
                                <div className="flex items-center gap-2">
                                    {tracerStudies.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url ? route('admin.tracer-study.index', { ...filters, page: index + 1 }) : '#'}
                                            className={`px-3 py-1 rounded ${
                                                link.active
                                                    ? 'bg-primary text-white'
                                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}