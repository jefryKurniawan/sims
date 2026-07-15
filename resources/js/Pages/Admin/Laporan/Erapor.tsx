import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";

export default function LaporanErapor({ raporSiswa, byKelas }: any) {
    const columns: Column[] = [
        {
            key: "siswa",
            label: "Siswa",
            render: (_: any, row: any) => row.siswa?.nama_lengkap || "-",
        },
        {
            key: "raporKelas",
            label: "Kelas",
            render: (_: any, row: any) => row.raporKelas?.nama || "-",
        },
        {
            key: "created_at",
            label: "Tanggal",
            render: (v: any) =>
                v ? new Date(v).toLocaleDateString("id-ID") : "-",
        },
    ];

    return (
        <>
            <Head title="Laporan e-Rapor" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Laporan e-Rapor
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <Link
                                href={route("laporan.index")}
                                className="text-blue-600 hover:underline"
                            >
                                Laporan
                            </Link>{" "}
                            / e-Rapor
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {byKelas.map((item: any, i: number) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border p-4 flex justify-between"
                        >
                            <span className="font-medium">{item.kelas}</span>
                            <span className="font-bold">
                                {item.total} rapor
                            </span>
                        </div>
                    ))}
                </div>
                <AdminTable
                    columns={columns}
                    rows={raporSiswa?.data || []}
                    pagination={raporSiswa}
                />
            </div>
        </>
    );
}
