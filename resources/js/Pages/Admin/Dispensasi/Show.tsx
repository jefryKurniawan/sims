import { Head } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import { Trash, Edit, ChevronLeft } from 'lucide-react';

export default function Show({ dispensasi }: { dispensasi: any }) {
    return (
        <>
            <Head title="Detail Dispensasi" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Detail Dispensasi</h1>
                    <div className="flex space-x-3">
                        <Link
                            href={route('dispensasi.index')}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm font-medium flex items-center"
                        >
                            <ChevronLeft className="h-5 w-5 mr-2" />
                            Kembali
                        </Link>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Siswa</p>
                            <p className="text-xl font-semibold text-gray-900">
                                {dispensasi.siswa?.nama_lengkap ?? 'Tidak Diketahui'}
                                <br />
                                <span className="text-xs text-gray-500">({dispensasi.siswa?.nisn ?? '-'})</span>
                            </p>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-500">Jenis Dispensasi</p>
                            <p className="text-xl font-semibold text-gray-900">
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${dispensasi.jenis === 'potongan' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {dispensasi.jenis === 'potongan' ? 'Potongan' : 'Penundaan'}
                                </span>
                            </p>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-500">Nominal</p>
                            <p className="text-xl font-semibold text-gray-900">
                                Rp {parseFloat(dispensasi.nominal).toLocaleString('id-ID')}
                            </p>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-500">Periode</p>
                            <p className="text-xl font-semibold text-gray-900">
                                {dispensasi.tanggal_mulai ? (
                                    <>
                                        {new Date(dispensasi.tanggal_mulai).toLocaleDateString('id-ID')}
                                        {dispensasi.tanggal_selesai ? ' - ' : ''}
                                        {dispensasi.tanggal_selesai ? (
                                            new Date(dispensasi.tanggal_selesai).toLocaleDateString('id-ID')
                                        ) : ''}
                                    </>
                                ) : '-'}
                            </p>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-500">Keterangan</p>
                            <p className="text-xl font-semibold text-gray-900">
                                {dispensasi.keterangan ?? '-'}
                            </p>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-500">Tanggal Dibuat</p>
                            <p className="text-xl font-semibold text-gray-900">
                                {dispensasi.created_at ? new Date(dispensasi.created_at).toLocaleDateString('id-ID') : '-'}
                            </p>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-500">Terakhir Diperbarui</p>
                            <p className="text-xl font-semibold text-gray-900">
                                {dispensasi.updated_at ? new Date(dispensasi.updated_at).toLocaleDateString('id-ID') : '-'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}