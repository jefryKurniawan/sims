import { Link, Head, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AlumniItem {
    id: number;
    user_id: number;
    tahun_lulus: number | string;
    pekerjaan: string;
    alamat: string;
    no_telp: string;
    linkedin: string | null;
}

interface Props {
    alumni: AlumniItem;
    users: User[];
}

export default function Edit({ alumni, users }: Props) {
    const { errors } = usePage().props;

    if (!alumni) {
        return (
            <>
                <Head title="Edit Alumni" />
                <div className="p-6 text-gray-500">Data alumni tidak ditemukan.</div>
            </>
        );
    }

    const [values, setValues] = useState({
        user_id: String(alumni.user_id ?? ''),
        tahun_lulus: String(alumni.tahun_lulus ?? ''),
        pekerjaan: alumni.pekerjaan ?? '',
        alamat: alumni.alamat ?? '',
        no_telp: alumni.no_telp ?? '',
        linkedin: alumni.linkedin ?? '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route('alumni.update', alumni.id), {
            ...values,
            _method: 'PUT',
        });
    };

    return (
        <>
            <Head title="Edit Alumni" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Edit Alumni</h1>
                        <p className="text-sm text-gray-500 mt-0.5">ID: {alumni.id}</p>
                    </div>
                    <Link href={route('alumni.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                        <ChevronLeft className="w-4 h-4" />Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Pilih User</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name} ({u.email})
                                        </option>
                                    ))}
                                </select>
                                {errors?.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors?.tahun_lulus && <p className="mt-1 text-sm text-red-600">{errors.tahun_lulus}</p>}
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors?.no_telp && <p className="mt-1 text-sm text-red-600">{errors.no_telp}</p>}
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors?.pekerjaan && <p className="mt-1 text-sm text-red-600">{errors.pekerjaan}</p>}
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors?.alamat && <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={values.linkedin}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://linkedin.com/in/username"
                                />
                                {errors?.linkedin && <p className="mt-1 text-sm text-red-600">{errors.linkedin}</p>}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700"
                            >
                                Update
                            </button>
                            <Link
                                href={route('alumni.index')}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

