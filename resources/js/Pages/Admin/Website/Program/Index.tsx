import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Index() {
    const { data } = usePage();
    const { jurusan } = data;
    const { data: formData, delete: destroy, processing, reset } = useForm({});

    const handleDelete = (id) => {
        if (!window.confirm('Yakin ingin menghapus program studi ini?')) return;
        delete(route('program-studi.destroy', id), {
            onSuccess: () => {
                router.visit(route('program-studi.index'), {
                    preserveScroll: true,
                    only: ['jurusan']
                });
            }
        });
    };

    return (
        <AdminLayout title="Program Studi">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Program Studi</h1>
                </div>
                <Link
                    href={route('program-studi.create')}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                    Tambah Program Studi
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Program</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Singkatan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {jurusan && jurusan.data && jurusan.data.length > 0 ? (
                            jurusan.data.map((j: any) => (
                                <tr key={j.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {j.nama}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {j.singkatan}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {j.slug}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            j.is_active === '0' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {j.is_active === '0' ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link
                                            href={route('program-studi.edit', j.id)}
                                            className="text-sm text-primary hover:text-primary/80"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(j.id)}
                                            className="text-sm text-red-600 hover:text-red-800"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    Tidak ada data program studi
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {jurusan && jurusan.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {jurusan.from} - {jurusan.to} dari {jurusan.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {jurusan.prev_page_url && (
                            <a
                                href={jurusan.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {jurusan.links?.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? 'bg-primary/20 text-primary' : 'bg-white text-gray-500 hover:bg-primary/10'} rounded-md`}
                            >
                                {link.label}
                            </a>
                        ))}
                        {jurusan.next_page_url && (
                            <a
                                href={jurusan.next_page_url}
                                className="px-3 py-1 ml-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Next
                            </a>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}