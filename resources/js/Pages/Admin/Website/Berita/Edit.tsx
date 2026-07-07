import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';
import { Trash2, Edit2, FileText } from 'lucide-react';

export default function Edit() {
    const { data } = usePage();
    const { berita, kategori } = data;
    const { data: formData, put, processing, reset, errors } = useForm({
        title: berita?.title ?? '',
        slug: berita?.slug ?? '',
        content: berita?.content ?? '',
        kategori_id: berita?.kategori_id ?? '',
        thumbnail: null,
        is_active: berita?.is_active === '1' ? '1' : '0',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('website.berita.update', berita.id), {
            onSuccess: () => {
                router.visit(route('website.berita.index'), {
                    preserveScroll: true,
                    only: ['berita']
                });
            }
        });
    };

    const handleThumbnailChange = (e) => {
        if (e.target.files[0]) {
            formData.thumbnail = e.target.files[0];
        }
    };

    return (
        <AdminLayout
            title="Edit Berita"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Edit Berita</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('website.berita.index')}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Kembali
                        </Link>
                        <Link
                            href={route('website.berita.create')}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Tambah Baru
                        </Link>
                    </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug (opsional)</label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => { formData.slug = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.slug ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.slug && (<p className="mt-1 text-xs text-red-500">{errors.slug}</p>)}
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
                        {kategoria.map((k: any) => (
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail (biarkan kosong jika tidak ingin mengganti)</label>
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

                <div className="flex justify-end space-x-6">
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
                        {processing ? 'Mengupdate...' : 'Update'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}