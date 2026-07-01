import { Head } from '@/Layout/Head';
import { Link } from '@inertiajs/inertia-react';
import { Avatar } from '@/components/ui/avatar';

export default function PerpustakaanEdit({ perpus }: { perpus: any }) {
    const foto = perpus.foto_profile
        ? `/images/profile/${perpus.foto_profile}`
        : '/images/default-avatar.png';

    return (
        <>
            <Head title="Edit Petugas Perpustakaan" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Edit Petugas Perpustakaan</h1>
                    <div className="flex space-x-2">
                        <Link
                            href="/dashboard/users/perpus"
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Kembali ke Daftar Perpustakaan
                        </Link>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center space-x-4 mb-6">
                        <Avatar
                            src={foto}
                            alt={perpus.name}
                            className="h-12 w-12"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-800">{perpus.name}</h2>
                            <p className="text-sm text-gray-500">
                                {perpus.email}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow border">
                            <h3 className="font-semibold text-gray- text-gray-700 mb-3">Informasi Dasar</h3>
                            <div className="space-y-2">
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Nama Lengkap</span>
                                    <span className="text-gray-900">{perpus.name}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Email</span>
                                    <span className="text-gray-900">{perpus.email}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Username</span>
                                    <span className="text-gray-900">{perpus.username}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Role</span>
                                    <span className="text-gray-900 capitalize">{perpus.role}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Status</span>
                                    <span
                                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            perpus.status === 'Aktif'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {perpus.status}
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Foto Profile</span>
                                    <span className="flex items-center">
                                        <img
                                            src={foto}
                                            alt="Foto"
                                            className="h-8 w-8 object-cover rounded mr-2"
                                        />
                                        {perpus.foto_profile ? (
                                            <span className="text-sm text-gray-600">
                                                {perpus.foto_profile}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-600">Tidak ada foto</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border">
                            <h3 className="font-semibold text-gray-700 mb-3">Detail Tambahan</h3>
                            <div className="space-y-2">
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">NIP</span>
                                    <span className="text-gray-900">{perpus.userDetail?.nip ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">LinkedIn</span>
                                    <span className="text-gray-900">{perpus.userDetail?.linkidln ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Instagram</span>
                                    <span className="text-gray-900">{perpus.userDetail?.instagram ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Website</span>
                                    <span className="text-gray-900">{perpus.userDetail?.website ?? '-'}</span>
                                </div>
                                <div className="  className="flex">
                                    <span className="w-32 font-medium text-gray-600">Facebook</span>
                                    <span className="text-gray-900">{perpus.userDetail?.facebook ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Twitter</span>
                                    <span className="text-gray-900">{perpus.userDetail?.twitter ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">YouTube</span>
                                    <span className="text-gray-900">{perpus.userDetail?.youtube ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}