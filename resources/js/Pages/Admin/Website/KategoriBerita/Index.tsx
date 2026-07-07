import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Index() {
    const { data } = usePage();
    const { kategori } = data;
    const { data: formData, delete: destroy, processing, reset } = useForm({});

    const handleDelete = (id) => {
        if (!window.confirm('Yakin ingin menghapus kategori berita ini?')) return;
        delete(route('website.kategori-berita.destroy', id), {
            onSuccess: () => {
                router.visit(route('website.kategori-berita.index'), {
                    preserveScroll: true,
                    only: ['kategori']
                });
            }
        });
    };

    return (
        <AdminLayout
            title="Kategori Berita"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Kategori Berita</h1>
                    </div>
                    <Link
                        href={route('website.kategori-berita.create')}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Tambah Kategori
                    </Link>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kategori</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Berita</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {kategori && kategori.data && kategori.data.length > 0 ? (
                            kategori.data.map((k: any) => (
                                <tr key={k.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {k.nama}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {k.meta?.count ?? 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            k.is_active === '0' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {k.is_active === '0' ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link
                                            href={route('website.kategori-berita.edit', k.id)}
                                            className="text-sm text-primary hover:text-primary/80"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(k.id)}
                                            className="text-sm text-red-600 hover:text-red-800"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                    Tidak ada data kategori berita
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {kategori && kategori.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {kategori.from} - {kategori.to} dari {kategori.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {kategori.prev_page_url && (
                            <a
                                href={kategori.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {kategori.links?.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? 'bg-primary/20 text-primary' : 'bg-white text-gray-500 hover:bg-primary/10'} rounded-md`}
                            >
                                {link.label}
                            </a>
                        ))}
                        {kategori.next_page_url && (
                            <a
                                href={kategori.next_page_url}
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