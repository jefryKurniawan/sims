import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Create() {
    const { data } = usePage();
    const { data: formData, post, processing, errors, reset } = useForm({
        title: '',
        desc: '',
        image: null,
        is_active: '0',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('imageslider.store'), {
            onSuccess: () => {
                reset();
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
            title="Tambah Slider Gambar"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Tambah Slider Gambar</h1>
                    </div>
                    <Link
                        href={route('imageslider.index')}
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
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-${errors.title ? 'red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                    <textarea
                        value={formData.desc}
                        onChange={(e) => { formData.desc = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-${errors.desc ? 'red-500' : ''}`}
                        rows={4}
                        disabled={processing}
                    />
                    {errors.desc && <p className="mt-1 text-xs text-red-500">{errors.desc}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urutan</label>
                    <input
                        type="number"
                        value={formData.urutan}
                        onChange={(e) => { formData.urutan = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-${errors.urutan ? 'red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.urutan && <p className="mt-1 text-xs text-red-500">{errors.urutan}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-${errors.image ? 'red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
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
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Kembali
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