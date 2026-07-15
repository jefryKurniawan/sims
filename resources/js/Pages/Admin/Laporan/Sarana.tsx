import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";

export default function LaporanSarana({ sarana, byKategori, totalAset }: any) {
    const columns: Column[] = [
        { key: "nama_barang", label: "Nama Barang" },
        { key: "kategori", label: "Kategori", render: (v: any) => v || "-" },
        { key: "jumlah", label: "Jumlah" },
        { key: "kondisi", label: "Kondisi", render: (v: any) => v || "-" },
    ];

    return (
        <>
            <Head title="Laporan Sarana Prasarana" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Laporan Sarana Prasarana
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <Link
                                href={route("laporan.index")}
                                className="text-blue-600 hover:underline"
                            >
                                Laporan
                            </Link>{" "}
                            / Sarana
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-xl border p-4 mb-6">
                    <p className="text-sm text-gray-600">
                        Total Aset:{" "}
                        <span className="text-xl font-bold text-teal-600">
                            {totalAset}
                        </span>{" "}
                        item
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {byKategori.map((item: any, i: number) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border p-4 flex justify-between"
                        >
                            <span className="font-medium">{item.kategori}</span>
                            <span className="font-bold">{item.total}</span>
                        </div>
                    ))}
                </div>
                <AdminTable
                    columns={columns}
                    rows={sarana?.data || []}
                    pagination={sarana}
                />
            </div>
        </>
    );
}
