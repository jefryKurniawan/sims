import { Head, usePage, Link } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Show() {
    const { data } = usePage();
    const { kategori } = data;

    return (
        <AdminLayout
            title="Detail Kategori Berita"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Detail Kategori Berita</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('website.kategori-berita.edit', kategori.id)}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Edit
                        </Link>
                        <Link
                            href={route('website.kategori-berita.index')}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{kategori.nama}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Tanggal: {new Date(kategori.created_at).toLocaleDateString('id-ID')}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            kategori.is_active === '0' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {kategori.is_active === '0' ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}