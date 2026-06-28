import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';

interface GuruItem {
    id: number;
    nama_lengkap: string;
    nuptk: string | null;
    jenis: string;
    jenis_kelamin: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    agama: string;
    alamat: string;
    no_telp: string;
    email: string | null;
    bidang_studi: string | null;
    jabatan: string;
    status_kepegawaian: string;
    tanggal_masuk: string;
    foto: string | null;
}

interface Props {
    guru: GuruItem[];
}

export default function Index({ guru }: Props) {
    const { flash } = usePage().props;

    const handleDelete = (id: number) => {
        if (confirm('Apakah anda yakin ingin menghapus data GTK ini?')) {
            Inertia.delete(route('gtk.destroy', id));
        }
    };

    return (
        <AdminLayout title="GTK">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">GTK</h1>
                    <Link
                        href={route('gtk.create')}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Tambah GTK
                    </Link>
                </div>

                {flash.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NUPTK</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jenis</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jabatan</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No. Telp</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {guru.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.nama_lengkap}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.nuptk || '-'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.jenis}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.jabatan}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.no_telp}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('gtk.edit', item.id)}
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
                            {guru.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                                        Tidak ada data GTK
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
