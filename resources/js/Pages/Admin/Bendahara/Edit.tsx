import { Head } from '@/Layout/Head';
import { Link } from '@inertiajs/inertia-react';
import { Avatar } from '@/components/ui/avatar';

export default function BendaharaEdit({ bendahara }: { bendahara: any }) {
    const foto = bendahara.foto_profile
        ? `/images/profile/${bendahara.foto_profile}`
        : '/images/default-avatar.png';

    return (
        <>
            <Head title="Edit Bendahara" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Edit Bendahara</h1>
                    <div className="flex space-x-2">
                        <Link
                            href="/dashboard/users/bendahara"
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Kembali ke Daftar Bendahara
                        </Link>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center space-x-4 mb-6">
                        <Avatar
                            src={foto}
                            alt={bendahara.name}
                            className="h-12 w-12"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-800">{bendahara.name}</h2>
                            <p className="text-sm text-gray-500">
                                {bendahara.email}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow border">
                            <h3 className="font-semibold text-gray-700 mb-3">Informasi Dasar</h3>
                            <div className="space-y-2">
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Nama Lengkap</span>
                                    <span className="text-gray-900">{bendahara.name}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Email</span>
                                    <span className="text-gray-900">{bendahara.email}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Username</span>
                                    <span className="text-gray-900">{bendahara.username}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Role</span>
                                    <span className="text-gray-900 capitalize">{bendahara.role}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Status</span>
                                    <span
                                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            bendahara.status === 'Aktif'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {bendahara.status}
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
                                        {bendahara.foto_profile ? (
                                            <span className="text-sm text-gray-600">
                                                {bendahara.foto_profile}
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
                                    <span className="text-gray-900">{bendahara.userDetail?.nip ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">LinkedIn</span>
                                    <span className="text-gray-900">{bendahara.userDetail?.linkidln ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Instagram</span>
                                    <span className="text-gray-900">{bendahara.userDetail?.instagram ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Website</span>
                                    <span className="text-gray-900">{bendahara.userDetail?.website ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Facebook</span>
                                    <span className="text-gray-900">{bendahara.userDetail?.facebook ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">Twitter</span>
                                    <span className="text-gray-900">{bendahara.userDetail?.twitter ?? '-'}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-medium text-gray-600">YouTube</span>
                                    <span className="text-gray-900">{bendahara.userDetail?.youtube ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}