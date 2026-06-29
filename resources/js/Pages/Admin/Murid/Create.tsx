import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Create() {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [foto, setFoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFoto(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        if (foto) {
            formData.append('foto_profile', foto);
        }
        Inertia.post(route('users.murid.store'), formData);
    };

    return (
        <AdminLayout title="Tambah Calon Murid">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Tambah Calon Murid</h1>
                </div>

                <div className="bg-white rounded-lg border">
                    <div className="px-6 py-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">Tambah Calon Murid</h4>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nama lengkap"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="email@sekolah.ac.id"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Password default"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profile</label>
                                        <input
                                            type="file"
                                            name="foto_profile"
                                            onChange={handleFile}
                                            accept="image/*"
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.foto_profile && <p className="mt-1 text-sm text-red-600">{errors.foto_profile}</p>}
                                        {preview && (
                                            <img src={preview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-lg" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    Simpan
                                </button>
                                <Link
                                    href={route('users.murid.index')}
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
