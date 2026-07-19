import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

interface HutangRow {
    siswa_id: number;
    nama_lengkap: string;
    nisn: string;
    total_tagihan: number;
    jumlah_tagihan: number;
    overdue_count: number;
}

interface Props {
    hutang: HutangRow[];
}

export default function Hutang({ hutang }: Props) {
    const formatRupiah = (num: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num);

    return (
        <>
            <Head title="Hutang SPP" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Hutang SPP
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Rekap tagihan yang belum dibayar per siswa
                        </p>
                    </div>
                    <Link
                        href={route("spp.index")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-sm"
                    >
                        Kembali ke SPP
                    </Link>
                </div>

                {hutang.length === 0 && (
                    <div className="bg-white rounded-lg shadow border p-8 text-center">
                        <p className="text-gray-500">Tidak ada hutang. Semua tagihan lunas! 🎉</p>
                    </div>
                )}

                {hutang.length > 0 && (
                    <div className="overflow-x-auto bg-white rounded-lg shadow border">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600">Siswa</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600">NISN</th>
                                    <th className="text-right px-4 py-3 font-medium text-gray-600">Total Tagihan</th>
                                    <th className="text-center px-4 py-3 font-medium text-gray-600">Jml Tagihan</th>
                                    <th className="text-center px-4 py-3 font-medium text-gray-600">Overdue</th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {hutang.map((row) => (
                                    <tr key={row.siswa_id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{row.nama_lengkap}</td>
                                        <td className="px-4 py-3 text-gray-500">{row.nisn}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-destructive">
                                            {formatRupiah(row.total_tagihan)}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                                {row.jumlah_tagihan}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {row.overdue_count > 0 && (
                                                <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
                                                    {row.overdue_count}
                                                </span>
                                            )}
                                            {row.overdue_count === 0 && (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() =>
                                                    Inertia.visit(
                                                        route("spp.siswa", row.siswa_id),
                                                    )
                                                }
                                                className="text-primary hover:underline text-sm font-medium"
                                            >
                                                Riwayat
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
