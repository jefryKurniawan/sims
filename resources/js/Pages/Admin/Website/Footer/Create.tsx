import { Head, usePage, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Create() {
    const { data } = usePage();
    const { data: formData, post, processing, errors, reset } = useForm({
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        logo: null,
        email: '',
        telp: '',
        whatsapp: '',
        desc: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('footer.store'), {
            onSuccess: () => {
                router.visit(route('footer.index'), {
                    preserveScroll: true,
                    only: ['footer']
                });
            }
        });
    };

    const handleLogoChange = (e) => {
        if (e.target.files[0]) {
            formData.logo = e.target.files[0];
        }
    };

    return (
        <AdminLayout
            title="Tambah Footer Website"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Tambah Footer Website</h1>
                    </div>
                    <Link
                        href={route('footer.index')}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                    <input
                        type="text"
                        value={formData.facebook}
                        onChange={(e) => { formData.facebook = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.facebook ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.facebook && (<p className="mt-1 text-xs text-red-500">{errors.facebook}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => { formData.instagram = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.instagram ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.instagram && (<p className="mt-1 text-xs text-red-500">{errors.instagram}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    <input
                        type="text"
                        value={formData.twitter}
                        onChange={(e) => { formData.twitter = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.twitter ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.twitter && (<p className="mt-1 text-xs text-red-500">{errors.twitter}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                    <input
                        type="text"
                        value={formData.youtube}
                        onChange={(e) => { formData.youtube = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.youtube ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.youtube && (<p className="mt-1 text-xs text-red-500">{errors.youtube}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.logo ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.logo && (<p className="mt-1 text-xs text-red-500">{errors.logo}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => { formData.email = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.email ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.email && (<p className="mt-1 text-xs text-red-500">{errors.email}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
                    <input
                        type="text"
                        value={formData.telp}
                        onChange={(e) => { formData.telp = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.telp ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.telp && (<p className="mt-1 text-xs text-red-500">{errors.telp}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                    <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => { formData.whatsapp = e.target.value; }}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary/20 focus:border-primary ${errors.whatsapp ? 'border-red-500' : ''}`}
                        disabled={processing}
                    />
                    {errors.whatsapp && (<p className="mt-1 text-xs text-red-500">{errors.whatsapp}</p>)}
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
                    {errors.desc && (<p className="mt-1 text-xs text-red-500">{errors.desc}</p>)}
                </div>

                <div className="flex justify-end space-x-6">
                    <button
                        type="button"
                        onClick={() => router.visit(route('footer.index'))}
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