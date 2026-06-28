import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Create() {
    const { data } = usePage().props;
    const { flash } = data;
    const [form] = useForm({
        name: '',
        email: '',
        nip: '',
        foto_profile: null,
        foto_profile_preview: '',
        linkidln: '',
        instagram: '',
        website: '',
        facebook: '',
        twitter: '',
        youtube: '',
        status: 'Aktif',
    });

    const [preview, setPreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            form.set('foto_profile', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                form.set('foto_profile_preview', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('backend-pengguna-perpus.store'), form);
        form.reset();
        setPreview('');
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Tambah Petugas Perpustakaan Baru</h1>
                <Link
                    href={route('backend-pengguna-perpus.index')}
                    className="btn btn-outline mb-2"
                >
                    Kembali ke Daftar Petugas Perpustakaan
                </Link>
                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
                        {flash.error}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => form.set('name', e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Nama lengkap"
                    />
                    {!!form.errors.name && <span className="text-error text-sm">{form.errors.name}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => form.set('email', e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="email@example.com"
                    />
                    {!!form.errors.email && <span className="text-error text-sm">{form.errors.email}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">NIP</label>
                    <input
                        type="text"
                        value={form.nip}
                        onChange={(e) => form.set('nip', e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Nomor Induk Pegawai"
                    />
                    {!!form.errors.nip && <span className="text-error text-sm">{form.errors.nip}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Foto Profile</label>
                    <div className="space-y-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full"
                        />
                        {preview && (
                            <div className="mt-2">
                                <img src={preview} alt="Preview" className="max-w-xs max-h-xs rounded border" />
                            </div>
                        )}
                    </div>
                    {!!form.errors.foto_profile && <span className="text-error text-sm">{form.errors.foto_profile}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn</label>
                        <input
                            type="text"
                            value={form.linkidln}
                            onChange={(e) => form.set('linkidln', e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="URL LinkedIn"
                        />
                        {!!form.errors.linkidln && <span className="text-error text-sm">{form.errors.linkidln}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Instagram</label>
                        <input
                            type="text"
                            value={form.instagram}
                            onChange={(e) => form.set('instagram', e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="URL Instagram"
                        />
                        {!!form.errors.instagram && <span className="text-error text-sm">{form.errors.instagram}</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <input
                            type="text"
                            value={form.website}
                            onChange={(e) => form.set('website', e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="URL Website"
                        />
                        {!!form.errors.website && <span className="text-error text-sm">{form.errors.website}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Facebook</label>
                        <input
                            type="text"
                            value={form.facebook}
                            onChange={(e) => form.set('facebook', e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="URL Facebook"
                        />
                        {!!form.errors.facebook && <span className="text-error text-sm">{form.errors.facebook}</span>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Twitter</label>
                        <input
                            type="text"
                            value={form.twitter}
                            onChange={(e) => form.set('twitter', e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="URL Twitter"
                        />
                        {!!form.errors.twitter && <span className="text-error text-sm">{form.errors.twitter}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">YouTube</label>
                        <input
                            type="text"
                            value={form.youtube}
                            onChange={(e) => form.set('youtube', e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="URL YouTube"
                        />
                        {!!form.errors.youtube && <span className="text-error text-sm">{form.errors.youtube}</span>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                        value={form.status}
                        onChange={(e) => form.set('status', e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                    {!!form.status && <span className="text-error text-sm">{form.errors.status}</span>}
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => {
                            form.reset();
                            setPreview('');
                        }}
                        className="btn btn-outline"
                    >
                        Batal
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Simpan Petugas Perpustakaan
                    </button>
                </div>
            </form>
        </>
    );
}