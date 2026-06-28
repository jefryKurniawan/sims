import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Kategori {
    id: number;
    nama: string;
}

interface BeritaItem {
    id: number;
    title: string;
    thumbnail: string;
    content: string;
    kategori_id: number;
    is_active: string;
}

interface Props {
    berita: BeritaItem;
    kategori: Kategori[];
}

export default function Edit({ berita, kategori }: Props) {
    const { flash, errors } = usePage().props;
    const [values, setValues] = useState({
        title: berita.title,
        kategori_id: String(berita.kategori_id),
        content: berita.content,
        is_active: berita.is_active,
    });
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('kategori_id', values.kategori_id);
        formData.append('content', values.content);
        formData.append('is_active', values.is_active);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }
        formData.append('_method', 'PUT');
        Inertia.post(route('berita-admin.update', berita.id), formData);
    };

    return (
        <AdminLayout title="Edit Berita">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Edit Berita</h1>
                </div>

                {flash.message && (
                    <div className={`p-4 mb-4 rounded-lg text-sm font-medium ${
                        flash.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {flash.message}
                    </div>
                )}

                <div className="bg-white rounded-lg border">
                    <div className="px-6 py-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">Edit Berita</h4>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title Berita <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Title Berita"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Thumbnail <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            name="thumbnail"
                                            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Kosongkan jika tidak ingin mengubah.</p>
                                        {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kategori <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="kategori_id"
                                            value={values.kategori_id}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">-- Pilih --</option>
                                            {kategori.map((k) => (
                                                <option key={k.id} value={k.id}>{k.nama}</option>
                                            ))}
                                        </select>
                                        {errors.kategori_id && <p className="mt-1 text-sm text-red-600">{errors.kategori_id}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="is_active"
                                            value={values.is_active}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">-- Pilih --</option>
                                            <option value="0">Publish</option>
                                            <option value="1">Draft</option>
                                        </select>
                                        {errors.is_active && <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Content <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="content"
                                        value={values.content}
                                        onChange={handleChange}
                                        rows={10}
                                        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Update
                                </button>
                                <Link
                                    href={route('berita-admin.index')}
                                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
