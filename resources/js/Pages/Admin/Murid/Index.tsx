import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

interface UserItem {
    id: number;
    name: string;
    email: string;
    username: string;
    role: string;
    status: string;
    foto_profile: string | null;
}

interface Props {
    murid: UserItem[];
}

export default function Index({ murid }: Props) {
    const { flash } = usePage().props;

    const handleDelete = (id: number) => {
        if (confirm('Apakah anda yakin ingin menghapus pengguna ini?')) {
            Inertia.delete(route('users.murid.destroy', id));
        }
    };

    return (
        <>
            <Head title="Calon Murid / Murid" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Calon Murid / Murid</h1>
                    <Link
                        href={route('users.murid.create')}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Tambah Calon Murid
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
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Username</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {murid.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.username}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{item.role}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('users.murid.edit', item.id)}
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
                            {murid.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                                        Tidak ada data Calon Murid
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
