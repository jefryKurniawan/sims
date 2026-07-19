import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, List, FileSpreadsheet } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { tagihan, flash } = usePage().props;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("spp.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const formatRupiah = (num: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num);

    const statusColors: Record<string, string> = {
        lunas: "bg-emerald-100 text-emerald-700",
        belum_lunas: "bg-destructive/10 text-destructive",
        overdue: "bg-yellow-100 text-yellow-700",
        pending: "bg-yellow-100 text-yellow-700",
        failed: "bg-red-100 text-red-700",
    };
    const statusLabels: Record<string, string> = {
        lunas: "Lunas",
        belum_lunas: "Belum Lunas",
        overdue: "Overdue",
        pending: "Pending",
        failed: "Gagal",
    };

    const columns: Column[] = [
        {
            key: "siswa_nama",
            label: "Nama Siswa",
            render: (_v: any, row: any) => row.siswa?.nama_lengkap || "-",
        },
        {
            key: "siswa_nisn",
            label: "NISN",
            render: (_v: any, row: any) => row.siswa?.nisn || "-",
        },
        {
            key: "nominal",
            label: "Nominal",
            render: (v: number) => formatRupiah(v),
        },
        { key: "tanggal_jatuh_tempo", label: "Jatuh Tempo" },
        {
            key: "status",
            label: "Status",
            render: (v: string) => (
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[v] || "bg-gray-100 text-gray-700"}`}>
                    {statusLabels[v] || v}
                </span>
            ),
        },
        {
            key: "keterangan",
            label: "Keterangan",
            render: (v: string) => v || "-",
        },
    ];

    return (
        <>
            <Head title="SPP & Pembayaran" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            SPP & Pembayaran
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola tagihan & pembayaran SPP
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={route("spp.hutang")}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition text-sm font-medium border border-yellow-200"
                        >
                            <List className="w-4 h-4" />
                            Hutang
                        </Link>
                        <Link
                            href={route("spp.generate")}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium border border-blue-200"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            Generate
                        </Link>
                        <Link
                            href={route("spp.create")}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            SPP Baru
                        </Link>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-destructive/10 text-destructive border-destructive/20 rounded-lg text-sm font-medium">
                        {flash.error}
                    </div>
                )}

                <AdminTable
                    columns={columns}
                    rows={tagihan?.data || []}
                    pagination={{
                        current_page: tagihan?.current_page,
                        last_page: tagihan?.last_page,
                        per_page: tagihan?.per_page,
                        from: tagihan?.from,
                        to: tagihan?.to,
                        total: tagihan?.total,
                        links: tagihan?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye",
                            onClick: () => Inertia.visit(route("spp.show", row.id)),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () => Inertia.visit(route("spp.edit", row.id)),
                            label: "Edit",
                        },
                        {
                            icon: "delete",
                            onClick: () => setDeleteTarget(row),
                            label: "Hapus",
                        },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Tagihan"
                    message={`Yakin ingin menghapus tagihan "${deleteTarget?.siswa?.nama_lengkap}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
