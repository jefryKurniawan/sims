import { Head, Link, router } from "@inertiajs/inertia-react";
import { Plus, Filter, Trophy, Eye, Pencil } from "lucide-react";

interface Siswa {
    id: number;
    nama_lengkap: string;
    user?: { name: string };
}

interface Prestasi {
    id: number;
    siswa_id: number;
    siswa: Siswa;
    jenis: string;
    prestasi: string;
    tingkat: string;
    tanggal: string;
    bukti: string | null;
    keterangan: string | null;
}

interface Props {
    prestasis: {
        data: Prestasi[];
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
        tingkat: string;
        search: string;
    };
    jenisList: string[];
}

export default function Index({ prestasis, filters, jenisList }: Props) {
    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.get(route("admin.prestasi.index"), params.toString());
    };

    const getJenisBadge = (jenis: string) => {
        return jenis === "akademik"
            ? "bg-blue-100 text-blue-700 border border-blue-200"
            : "bg-purple-100 text-purple-700 border border-purple-200";
    };

    return (
        <>
            <Head title="Kelola Prestasi Siswa" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                    Kelola Prestasi Siswa
                                </h1>
                                <p className="text-gray-600 text-sm mt-1">
                                    Data prestasi akademik dan non-akademik
                                    siswa
                                </p>
                            </div>
                            <Link
                                href={route("admin.prestasi.create")}
                                className="inline-flex items-center gap-2 bg-school-red text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition font-semibold"
                            >
                                <Plus className="w-4 h-4" />
                                Prestasi Baru
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <h3 className="font-bold text-gray-900">Filter</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cari Prestasi
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nama prestasi..."
                                    value={filters.search}
                                    onChange={(e) =>
                                        handleFilter("search", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jenis
                                </label>
                                <select
                                    value={filters.jenis}
                                    onChange={(e) =>
                                        handleFilter("jenis", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">Semua</option>
                                    {jenisList.map((jenis) => (
                                        <option key={jenis} value={jenis}>
                                            {jenis === "akademik"
                                                ? "Akademik"
                                                : "Non-Akademik"}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tingkat
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Nasional, Provinsi..."
                                    value={filters.tingkat}
                                    onChange={(e) =>
                                        handleFilter("tingkat", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                                            Siswa
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                                            Jenis
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                                            Prestasi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                                            Tingkat
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {prestasis.data.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {p.siswa.nama_lengkap}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getJenisBadge(p.jenis)}`}
                                                >
                                                    {p.jenis === "akademik"
                                                        ? "Akademik"
                                                        : "Non-Akademik"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {p.prestasi}
                                                </div>
                                                {p.keterangan && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {p.keterangan}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {p.tingkat}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {new Date(
                                                    p.tanggal,
                                                ).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        href={route(
                                                            "admin.prestasi.edit",
                                                            p.id,
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "admin.prestasi.show",
                                                            p.id,
                                                        )}
                                                        className="text-emerald-600 hover:text-emerald-900 transition-colors"
                                                        title="Lihat Detail"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {prestasis.data.length === 0 && (
                            <div className="p-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <Trophy className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Belum ada data prestasi
                                </h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    Tambahkan prestasi siswa dengan mengklik
                                    tombol "Tambah Prestasi" di atas.
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {prestasis.last_page > 1 && (
                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {prestasis.from} -{" "}
                                    {prestasis.to} dari {prestasis.total}
                                </div>
                                <div className="flex items-center gap-2">
                                    {prestasis.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                                link.active
                                                    ? "bg-primary text-white"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
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
