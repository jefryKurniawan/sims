import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Edit, Trash, Plus, Eye } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Index() {
    const { configs, flash } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("spmb.config.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const getStatusBadge = (config: any) => {
        const now = new Date();
        const buka = new Date(config.tanggal_buka);
        const tutup = new Date(config.tanggal_tutup);
        if (!config.aktif)
            return (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    Nonaktif
                </span>
            );
        if (now < buka)
            return (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    Akan Datang
                </span>
            );
        if (now > tutup)
            return (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                    Ditutup
                </span>
            );
        return (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                Aktif
            </span>
        );
    };

    const columns: Column[] = [
        {
            key: "tahun_ajaran",
            label: "Tahun Ajaran",
            render: (v: any) => v,
        },
        {
            key: "periode",
            label: "Periode",
            render: (v: any, row: any) => (
                <div>
                    {new Date(row.tanggal_buka).toLocaleDateString("id-ID")} -
                    {new Date(row.tanggal_tutup).toLocaleDateString("id-ID")}
                </div>
            ),
        },
        {
            key: "kuota",
            label: "Kuota (R/A/P)",
            render: (_v: any, row: any) => (
                <div>
                    {row.kuota_reguler} / {row.kuota_afirmasi} /{" "}
                    {row.kuota_prestasi}
                </div>
            ),
        },
        {
            key: "biaya",
            label: "Biaya",
            render: (_v: any, row: any) => (
                <div>
                    Rp {Number(row.biaya_pendaftaran).toLocaleString("id-ID")}
                </div>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (v: any, row: any) => getStatusBadge(row),
        },
    ];

    return (
        <>
            <Head title="Konfigurasi SPMB" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Konfigurasi SPMB
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola konfigurasi pendaftaran SPMB
                        </p>
                    </div>
                    <Link
                        href={route("spmb.config.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Konfigurasi Baru
                    </Link>
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
                    rows={configs || []}
                    pagination={{
                        current_page: configs?.current_page || 1,
                        last_page: configs?.last_page || 1,
                        per_page: configs?.per_page || 15,
                        from: configs?.from || 1,
                        to: configs?.to || 0,
                        total: configs?.total || 0,
                        links: configs?.links || [],
                    }}
                    actions={(row) => [
                        {
                            icon: "eye",
                            onClick: () =>
                                Inertia.visit(
                                    route("spmb.config.show", row.id),
                                ),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () =>
                                Inertia.visit(
                                    route("spmb.config.edit", row.id),
                                ),
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
                    title="Hapus Konfigurasi SPMB"
                    message={`Yakin ingin menghapus konfigurasi SPMB untuk tahun ajaran \"${deleteTarget?.tahun_ajaran || ""}\"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
