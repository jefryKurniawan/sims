import { Head, usePage } from '@inertiajs/inertia-react';

interface SiswaData {
    id: number;
    nisn: string;
    nama_lengkap: string;
}

interface TagihanItem {
    id: number;
    siswa_id: number;
    nominal: number;
    status: string;
    tanggal_jatuh_tempo: string;
    keterangan: string | null;
    siswa: SiswaData | null;
}

interface PaginatedData {
    data: TagihanItem[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    tagihan: PaginatedData;
}

export default function Index({ tagihan }: Props) {
    const { flash } = usePage().props;

    const statusBadge = (status: string) => {
        const map: Record<string, string> = {
            'lunas': 'bg-green-100 text-green-700',
            'belum_lunas': 'bg-red-100 text-red-700',
            'pending': 'bg-yellow-100 text-yellow-700',
        };
        const label: Record<string, string> = {
            'lunas': 'Lunas',
            'belum_lunas': 'Belum Lunas',
            'pending': 'Pending',
        };
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-700'}`}>
                {label[status] || status}
            </span>
        );
    };

    const formatRupiah = (num: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    };

    return (
        <>
            <Head title="SPP & Pembayaran" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">SPP & Pembayaran</h1>
                </div>

                {flash.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Siswa</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NISN</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nominal</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jatuh Tempo</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {tagihan.data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {(tagihan.current_page - 1) * tagihan.data.length + index + 1}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {item.siswa?.nama_lengkap || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {item.siswa?.nisn || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {formatRupiah(item.nominal)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {item.tanggal_jatuh_tempo}
                                    </td>
                                    <td className="px-4 py-3">
                                        {statusBadge(item.status)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {item.keterangan || '-'}
                                    </td>
                                </tr>
                            ))}
                            {tagihan.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                                        Tidak ada data tagihan SPP
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {tagihan.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                        <span>Total: {tagihan.total} tagihan</span>
                        <div className="flex gap-2">
                            {Array.from({ length: tagihan.last_page }, (_, i) => i + 1).map(page => (
                                <a
                                    key={page}
                                    href={`/dashboard/spp?page=${page}`}
                                    className={`px-3 py-1 rounded ${page === tagihan.current_page ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                >
                                    {page}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
