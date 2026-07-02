import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface JurusanItem {
    id: number;
    nama_jurusan: string;
    singkatan: string;
}

interface KelasItem {
    id: number;
    nama_kelas: string;
    tingkat: number;
    tahun_ajaran: string;
    jurusan: JurusanItem | null;
    jurusan_id: number | null;
}

interface Props {
    kelas: {
        data: KelasItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        total: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    filters: Record<string, string>;
}

export default function Index({ kelas, filters }: Props) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/dashboard/rapor-kelas?search=${search}`;
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah anda yakin ingin menghapus kelas rapor ini?')) {
            Inertia.delete(route('rapor-kelas.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelas Rapor">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kelas Rapor</h1>
                <Link
                    href={route('rapor-kelas.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    + Kelas Baru
                </Link>
            </div>

            {flash.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    {flash.success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mb-6 bg-white rounded-lg shadow p-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama kelas..."
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Filter
                        </button>
                        <Link href={route('rapor-kelas.index')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                            Reset
                        </Link>
                    </div>
                </div>
            </form>

            <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Kelas</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tingkat</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jurusan</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tahun Ajaran</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {kelas.data.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-700">{kelas.from + index}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.nama_kelas}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">Kelas {item.tingkat}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{item.jurusan?.singkatan || '-'}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{item.tahun_ajaran}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('rapor-kelas.edit', item.id)}
                                            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {kelas.data.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                                    Tidak ada data kelas rapor
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {kelas.total > kelas.per_page && (
                    <div className="p-4 flex justify-between items-center border-t">
                        <div className="text-sm text-gray-600">
                            Menampilkan {kelas.from} - {kelas.to} dari {kelas.total} data
                        </div>
                        <div className="flex gap-2">
                            {kelas.prev_page_url && (
                                <Link href={kelas.prev_page_url} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                                    Prev
                                </Link>
                            )}
                            <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">{kelas.current_page}</span>
                            {kelas.next_page_url && (
                                <Link href={kelas.next_page_url} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
