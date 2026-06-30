import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Edit, Trash } from 'lucide-react';

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

                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">No</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Nama</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Email</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Username</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Role</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Status</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {murid.map((item, index) => (
                                <tr key={item.id} className="">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <Link
                                            href={route('users.murid.edit', item.id)}
                                            className="mr-3"
                                        >
                                            <Edit className="h-5 w-5 text-blue-600 hover:text-blue-700" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {murid.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
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