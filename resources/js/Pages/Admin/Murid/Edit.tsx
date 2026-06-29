import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface UserItem {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

interface Props {
    murid: UserItem;
}

export default function Edit({ murid }: Props) {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: '',
        email: '',
        status: 'Aktif',
        role: 'Guest',
    });

    useEffect(() => {
        if (murid) {
            setValues({
                name: murid.name,
                email: murid.email,
                status: murid.status || 'Aktif',
                role: murid.role,
            });
        }
    }, [murid]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route('users.murid.update', murid.id), {
            _method: 'PUT',
            name: values.name,
            email: values.email,
            status: values.status,
            role: values.role,
        });
    };

    return (
        <AdminLayout title="Edit Calon Murid">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Edit Calon Murid</h1>
                </div>

                <div className="bg-white rounded-lg border">
                    <div className="px-6 py-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">Edit Calon Murid</h4>
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
                                            Status <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Aktif">Aktif</option>
                                            <option value="Tidak Aktif">Tidak Aktif</option>
                                        </select>
                                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="role"
                                            value={values.role}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Guest">Guest (Calon Murid)</option>
                                            <option value="Murid">Murid</option>
                                        </select>
                                        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                                    </div>
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
