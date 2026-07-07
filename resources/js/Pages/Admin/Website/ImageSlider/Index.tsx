import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Index() {
    const { data } = usePage();
    const { image } = data; // This is actually the slider images collection
    const { data: formData, delete: destroy, processing, reset } = useForm({});

    const handleDelete = (id) => {
        if (!window.confirm('Yakin ingin menghapus slider ini?')) return;
        delete(route('imageslider.destroy', id), {
            onSuccess: () => {
                router.visit(route('imageslider.index'), {
                    preserveScroll: true,
                    only: ['image']
                });
            }
        });
    };

    return (
        <AdminLayout
            title="Image Slider"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Image Slider</h1>
                    </div>
                    <Link
                        href={route('imageslider.create')}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                        Tambah Slider
                    </Link>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urutan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {image && image.data && image.data.length > 0 ? (
                            image.data.map((img: any) => (
                                <tr key={img.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {img.urutan}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                                        {img.image ? (
                                            <img
                                                src={`/storage/images/slider/${img.image}`}
                                                alt={img.title}
                                                className="h-8 w-8 rounded border"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {img.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {img.desc}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            img.is_active === '0' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {img.is_active === '0' ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link
                                            href={route('imageslider.edit', img.id)}
                                            className="text-sm text-primary hover:text-primary/80"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(img.id)}
                                            className="text-sm text-red-600 hover:text-red-800"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    Tidak ada data slider
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {image && image.links && (
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex items-center flex-1">
                        <span className="text-sm text-gray-500">
                            Menampilkan {image.from} - {image.to} dari {image.total} data
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {image.prev_page_url && (
                            <a
                                href={image.prev_page_url}
                                className="px-3 py-1 mr-2 text-sm font-medium text-primary border border-primary/20 rounded-md hover:bg-primary/10"
                            >
                                Prev
                            </a>
                        )}
                        {image.links && image.links.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`px-3 py-1 mx-1 text-sm font-medium ${link.active ? 'bg-primary/20 text-primary' : 'bg-white text-gray-500 hover:border-primary/10'} rounded-md`}
                            >
                                {link.label}
                            </a>
                        ))}
                        {image.next_page_url && (
                            <a
                                href={image.next_page_url}
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