import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Edit() {
    const { data } = usePage();
    const { visimisi } = data;
    const { data: formData, put, processing, reset, errors } = useForm({
        visi: visimisi?.visi ?? '',
        misi: visimisi?.misi ?? '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('website.visimisi.update', visimisi.id), {
            onSuccess: () => {
                router.visit(route('website.visimisi.index'), {
                    preserveScroll: true,
                    only: ['visimisi']
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
            title="Edit Visi dan Misi"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Edit Visi dan Misi</h1>
                    </div>
                    <Link
                        href={route('website.visimisi.index')}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visi</label>
                    <textarea
                        value={formData.visi}
                        onChange={(e) => { formData.visi = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.visi ? 'border-red-500' : ''}`}
                        rows={4}
                        disabled={processing}
                    />
                    {errors.visi && (<p className="mt-1 text-xs text-red-500">{errors.visi}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Misi</label>
                    <textarea
                        value={formData.misi}
                        onChange={(e) => { formData.misi = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.misi ? 'border-red-500' : ''}`}
                        rows={4}
                        disabled={processing}
                    />
                    {errors.misi && (<p className="mt-1 text-xs text-red-500">{errors.misi}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gambar (biarkan kosong jika tidak ingin mengganti)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.image ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.image && (<p className="mt-1 text-xs text-red-500">{errors.image}</p>)}
                </div>

                <div className="flex justify-end space-x-6">
                    <button
                        type="button"
                        onClick={() => router.visit(route('website.visimisi.index'))}
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