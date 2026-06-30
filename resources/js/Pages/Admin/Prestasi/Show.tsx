import { Head, Link } from '@inertiajs/inertia-react';
import { ArrowLeft, Trophy, Calendar, User, MapPin } from 'lucide-react';

interface Siswa {
    id: number;
    nama_lengkap: string;
    user?: { name: string };
}

interface Prestasi {
    id: number;
    siswa_id: number;
    jenis: string;
    prestasi: string;
    tingkat: string;
    tanggal: string;
    bukti: string | null;
    keterangan: string | null;
    created_at: string;
    updated_at: string;
    siswa: Siswa;
}

interface Props {
    prestasi: Prestasi;
}

export default function Show({ prestasi }: Props) {
    const getJenisBadge = (jenis: string) => {
        return jenis === 'akademik'
            ? 'bg-blue-100 text-blue-700 border border-blue-200'
            : 'bg-purple-100 text-purple-700 border border-purple-200';
    };

    return (
        <>
            <Head title="Detail Prestasi" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-6 py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.prestasi.index')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Detail Prestasi</h1>
                                <p className="text-gray-600 text-sm mt-1">Informasi lengkap prestasi siswa</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        {/* Header Info */}
                        <div className="border-b pb-6 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{prestasi.prestasi}</h2>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getJenisBadge(prestasi.jenis)}`}>
                                        {prestasi.jenis === 'akademik' ? 'Akademik' : 'Non-Akademik'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Siswa */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Siswa</h4>
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-900">{prestasi.siswa.nama_lengkap || prestasi.siswa.user?.name}</span>
                                </div>
                            </div>

                            {/* Tingkat */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Tingkat</h4>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-900">{prestasi.tingkat}</span>
                                </div>
                            </div>

                            {/* Tanggal */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Tanggal</h4>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-900">
                                        {new Date(prestasi.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Bukti */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Bukti</h4>
                                {prestasi.bukti ? (
                                    <a
                                        href={`/storage/${prestasi.bukti}`}
                                        target="_blank"
                                        className="text-primary hover:underline text-sm"
                                    >
                                        Lihat Bukti Sertifikat
                                    </a>
                                ) : (
                                    <span className="text-gray-500 text-sm">Tidak ada bukti</span>
                                )}
                            </div>
                        </div>

                        {/* Keterangan */}
                        {prestasi.keterangan && (
                            <div className="mt-6 pt-6 border-t">
                                <h4 className="font-semibold text-gray-700 mb-2">Keterangan</h4>
                                <p className="text-gray-600">{prestasi.keterangan}</p>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="mt-8 pt-6 border-t">
                            <p className="text-sm text-gray-500">
                                Dibuat: {new Date(prestasi.created_at).toLocaleString('id-ID')} |
                                Diupdate: {new Date(prestasi.updated_at).toLocaleString('id-ID')}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex justify-end gap-4">
                            <Link
                                href={route('admin.prestasi.edit', prestasi.id)}
                                className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route('admin.prestasi.index')}
                                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition font-semibold"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
