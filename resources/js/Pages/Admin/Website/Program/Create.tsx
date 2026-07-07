import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Create() {
    const { data } = usePage();
    const { data: formData, post, processing, errors, reset } = useForm({
        nama: '',
        singkatan: '',
        content: '',
        image: null,
        is_active: '0',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('program-studi.store'), {
            onSuccess: () => {
                router.visit(route('program-studi.index'), {
                    preserveScroll: true,
                    only: ['jurusan']
                });
            }
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            formData.image = e.target.files[0];
        }
    };

    return (
        <AdminLayout
            title="Tambah Program Studi"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Tambah Program Studi</h1>
                    </div>
                    <Link
                        href={route('program-studi.index')}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Program Studi</label>
                    <input
                        type="text"
                        value={formData.nama}
                        onChange={(e) => { formData.nama = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.nama ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.nama && (<p className="mt-1 text-xs text-red-500">{errors.nama}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Singkatan</label>
                    <input
                        type="text"
                        value={formData.singkatan}
                        onChange={(e) => { formData.singkatan = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.singkatan ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.singkatan && (<p className="mt-1 text-xs text-red-500">{errors.singkatan}</p>)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.image ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.image && (<p className="mt-1 text-xs text-red-500">{errors.image}</p>)}
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
                        onClick={() => router.visit(route('program-studi.index'))}
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