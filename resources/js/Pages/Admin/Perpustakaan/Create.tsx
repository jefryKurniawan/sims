import { Link, usePage } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface UserDetail {
    id: number;
    user_id: number;
    nip: string;
    email: string;
    linkidln: string | null;
    instagram: string | null;
    website: string | null;
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
    is_active: number;
}

interface UserItem {
    id: number;
    name: string;
    email: string;
    username: string;
    role: string;
    status: string;
    foto_profile: string | null;
    userDetail: UserDetail | null;
}

interface Props {
    users?: UserItem;
    role?: string;
}

export default function Create({ users, role }: Props) {
    const { errors } = usePage().props;
    const isEdit = !!users;

    const [values, setValues] = useState({
        name: '',
        email: '',
        nip: '',
        linkidln: '',
        instagram: '',
        website: '',
        facebook: '',
        twitter: '',
        youtube: '',
        foto_profile: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (isEdit && users?.userDetail) {
            setValues({
                name: users.name,
                email: users.email,
                nip: users.userDetail.nip || '',
                linkidln: users.userDetail.linkidln || '',
                instagram: users.userDetail.instagram || '',
                website: users.userDetail.website || '',
                facebook: users.userDetail.facebook || '',
                twitter: users.userDetail.twitter || '',
                youtube: users.userDetail.youtube || '',
                foto_profile: null,
            });
            if (users.foto_profile) {
                setPreview(`/storage/${users.foto_profile}`);
            }
        }
    }, [users, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setValues((prev) => ({ ...prev, foto_profile: file }));
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('nip', values.nip);
        formData.append('linkidln', values.linkidln);
        formData.append('instagram', values.instagram);
        formData.append('website', values.website);
        formData.append('facebook', values.facebook);
        formData.append('twitter', values.twitter);
        formData.append('youtube', values.youtube);
        if (values.foto_profile) {
            formData.append('foto_profile', values.foto_profile);
        }
        if (isEdit) {
            formData.append('_method', 'PUT');
            Inertia.post(route('users.perpus.update', users.id), formData);
        } else {
            Inertia.post(route('users.perpus.store'), formData);
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Pengguna Perpustakaan' : 'Tambah Pengguna Perpustakaan'}>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit Pengguna Perpustakaan' : 'Tambah Pengguna Perpustakaan'}</h1>
                </div>

                <div className="bg-white rounded-lg border">
                    <div className="px-6 py-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">{isEdit ? 'Edit Pengguna Perpustakaan' : 'Tambah Pengguna Perpustakaan'}</h4>
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
                                            NIP <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nip"
                                            value={values.nip}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nomor Induk Pegawai"
                                        />
                                        {errors.nip && <p className="mt-1 text-sm text-red-600">{errors.nip}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Foto Profile {!isEdit && <span className="text-red-500">*</span>}
                                        </label>
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

                                <div className="border-t pt-4">
                                    <h5 className="text-sm font-semibold text-gray-700 mb-3">Media Sosial (Opsional)</h5>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                            <input
                                                type="text"
                                                name="linkidln"
                                                value={values.linkidln}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="URL LinkedIn"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                                            <input
                                                type="text"
                                                name="instagram"
                                                value={values.instagram}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="URL Instagram"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                            <input
                                                type="text"
                                                name="website"
                                                value={values.website}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="URL Website"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                                            <input
                                                type="text"
                                                name="facebook"
                                                value={values.facebook}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="URL Facebook"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                                            <input
                                                type="text"
                                                name="twitter"
                                                value={values.twitter}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="URL Twitter"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Youtube</label>
                                            <input
                                                type="text"
                                                name="youtube"
                                                value={values.youtube}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="URL Youtube"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    {isEdit ? 'Update' : 'Simpan'}
                                </button>
                                <Link
                                    href={route('users.perpus.index')}
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
