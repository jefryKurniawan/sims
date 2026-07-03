import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { ArrowLeft } from 'lucide-react';

export default function Show() {
    const { config } = usePage().props as { config: any };

    return (
        <>
            <Head title="Detail Konfigurasi SPMB" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Link href={route('spmb.config.index')} className="text-gray-600 hover:text-gray-800">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Detail Konfigurasi SPMB</h1>
                </div>

                <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
                    <div className="p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Ajaran</label>
                                <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50">{config.tahun_ajaran}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Periode</label>
                                <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                    {new Date(config.tanggal_buka).toLocaleDateString('id-ID')} - {new Date(config.tanggal_tutup).toLocaleDateString('id-ID')}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kuota (Reguler/Afirmasi/Prestasi)</label>
                                <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                    {config.kuota_reguler} / {config.kuota_afirmasi} / {config.kuota_prestasi}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Biaya Pendaftaran</label>
                                <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                    Rp {Number(config.biaya_pendaftaran).toLocaleString('id-ID')}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <div className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                    {config.aktif ? 'Aktif' : 'Nonaktif'}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6">
                            <Link
                                href={route('spmb.config.index')}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
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