import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    users: User[];
}

export default function Create({ users }: Props) {
    const { errors } = usePage().props;
    const [values, setValues] = useState({
        user_id: '',
        tahun_lulus: '',
        pekerjaan: '',
        alamat: '',
        no_telp: '',
        linkedin: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route('alumni.store'), values);
    };

    return (
        <AdminLayout title="Tambah Alumni">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Tambah Alumni</h1>
                </div>

                <div className="bg-white rounded-lg border">
                    <div className="px-6 py-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">Tambah Alumni</h4>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        User <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="user_id"
                                        value={values.user_id}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Pilih User</option>
                                        {users.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.name} ({u.email})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tahun Lulus <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="tahun_lulus"
                                            value={values.tahun_lulus}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Contoh: 2023"
                                        />
                                        {errors.tahun_lulus && <p className="mt-1 text-sm text-red-600">{errors.tahun_lulus}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            No. Telepon <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="no_telp"
                                            value={values.no_telp}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Contoh: 08123456789"
                                        />
                                        {errors.no_telp && <p className="mt-1 text-sm text-red-600">{errors.no_telp}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pekerjaan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="pekerjaan"
                                        value={values.pekerjaan}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Contoh: Software Engineer"
                                    />
                                    {errors.pekerjaan && <p className="mt-1 text-sm text-red-600">{errors.pekerjaan}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Alamat <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="alamat"
                                        value={values.alamat}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Alamat lengkap"
                                    />
                                    {errors.alamat && <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        LinkedIn
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={values.linkedin}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                    {errors.linkedin && <p className="mt-1 text-sm text-red-600">{errors.linkedin}</p>}
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
                                    href={route('alumni.index')}
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
