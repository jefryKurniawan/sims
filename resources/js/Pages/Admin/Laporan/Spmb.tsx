import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function LaporanSpmb({
    pendaftar,
    byStatus,
    byGelombang,
    byJurusan,
}: any) {
    const columns: Column[] = [
        { key: "nama_lengkap", label: "Nama" },
        { key: "email", label: "Email" },
        {
            key: "status",
            label: "Status",
            render: (v: string) => {
                const colors: Record<string, string> = {
                    lulus: "text-emerald-600 bg-emerald-50",
                    tidak_lulus: "text-destructive bg-destructive/10",
                    pending: "text-yellow-600 bg-yellow-50",
                };
                return (
                    <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[v] || "bg-gray-100"}`}
                    >
                        {v === "lulus" ? (
                            <CheckCircle className="w-3 h-3" />
                        ) : v === "tidak_lulus" ? (
                            <XCircle className="w-3 h-3" />
                        ) : (
                            <Clock className="w-3 h-3" />
                        )}
                        {v}
                    </span>
                );
            },
        },
        {
            key: "created_at",
            label: "Tanggal Daftar",
            render: (v: any) =>
                v ? new Date(v).toLocaleDateString("id-ID") : "-",
        },
    ];

    return (
        <>
            <Head title="Laporan SPMB" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Laporan SPMB / PPDB
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <Link
                                href={route("laporan.index")}
                                className="text-blue-600 hover:underline"
                            >
                                Laporan
                            </Link>{" "}
                            / SPMB
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {Object.entries(byStatus).map(([s, total]: any) => (
                        <div
                            key={s}
                            className="bg-white rounded-xl border p-4 flex justify-between items-center"
                        >
                            <span className="font-medium capitalize">{s}</span>
                            <span className="text-lg font-bold">{total}</span>
                        </div>
                    ))}
                    {byGelombang.map((item: any, i: number) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border p-4 flex justify-between items-center"
                        >
                            <span className="font-medium">
                                {item.gelombang}
                            </span>
                            <span className="text-lg font-bold">
                                {item.total}
                            </span>
                        </div>
                    ))}
                    {byJurusan.map((item: any, i: number) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border p-4 flex justify-between items-center"
                        >
                            <span className="font-medium">{item.jurusan}</span>
                            <span className="text-lg font-bold">
                                {item.total}
                            </span>
                        </div>
                    ))}
                </div>
                <AdminTable
                    columns={columns}
                    rows={pendaftar?.data || []}
                    pagination={pendaftar}
                />
            </div>
        </>
    );
}
