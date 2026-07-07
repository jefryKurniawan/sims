import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Create() {
    const { data } = usePage();
    const { kategori } = data;
    const { data: formData, post, processing, errors, reset } = useForm({
        title: '',
        slug: '',
        content: '',
        kategori_id: '',
        thumbnail: null,
        is_active: '0'
    });

    const handleSubmit = (e) => {
        e.preventDispatch(); // Actually useForm's post handles event; but we need to prevent default.
        e.preventDefault();
        post(route('website.berita.store'), {
            onSuccess: () => {
                // Reset form and redirect maybe via router?
                router.visit(route('website.berita.index'), {
                    preserveScroll: true,
                    only: ['kategori']
                });
            }
        });
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formData.thumbnail = file;
        }
    };

    return (
        <AdminLayout
            title="Tambah Berita"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Tambah Berita</h1>
                    </div>
                    <Link
                        href={route('website.berita.index')}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => { formData.title = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.title ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.title && (<p className="mt-1 text-xs text-red-500">{errors.title}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                        value={formData.kategori_id}
                        onChange={(e) => { formData.kategori_id = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.kategori_id ? 'border-red-500' : ''}`}
                        disabled={processing}
                    >
                        <option value="">-- Pilih Kategori --</option>
                        {kategori.map((k: any) => (
                            <option key={k.id} value={k.id}>{k.nama}</option>
                        ))}
                    </select>
                    {errors.kategori_id && (<p className="mt-1 text-xs text-red-500">{errors.kategori_id}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Konten</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => { formData.content = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.content ? 'border-red-500' : ''}`}
                        rows={8}
                        disabled={processing}
                    />
                    {errors.content && (<p className="mt-1 text-xs text-red-500">{errors.content}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.thumbnail ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.thumbnail && (<p className="mt-1 text-xs text-red-500">{errors.thumbnail}</p>)}
                </div>

                <div className="flex items-center space-x-4">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                        <input
                            type="checkbox"
                            checked={formData.is_active === '1'}
                            onChange={(e) => { formData.is_active = e.target.checked ? '1' : '0'; }}
                        />
                        Aktif
                    </label>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => router.visit(route('website.berita.index'))}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}