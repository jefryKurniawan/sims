import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { kelas, flash } = usePage().props as {
        kelas: any;
        flash: { success?: string; error?: string };
    };
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("rapor-kelas.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        { key: "nama_kelas", label: "Nama Kelas" },
        { key: "tingkat", label: "Tingkat", render: (v: any) => `Kelas ${v}` },
        {
            key: "jurusan",
            label: "Jurusan",
            render: (_v: any, row: any) => row.jurusan?.singkatan || "-",
        },
        { key: "tahun_ajaran", label: "Tahun Ajaran" },
    ];

    return (
        <>
            <Head title="Kelas Rapor" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Kelas Rapor
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola kelas untuk pencetakan rapor
                        </p>
                    </div>
                    <Link
                        href={route("rapor-kelas.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        Kelas Baru
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
                    rows={kelas?.data || []}
                    pagination={{
                        current_page: kelas?.current_page,
                        last_page: kelas?.last_page,
                        per_page: kelas?.per_page,
                        from: kelas?.from,
                        to: kelas?.to,
                        total: kelas?.total,
                        links: kelas?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "edit",
                            onClick: () =>
                                Inertia.visit(
                                    route("rapor-kelas.edit", row.id),
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
                    title="Hapus Kelas Rapor"
                    message={`Yakin ingin menghapus kelas "${deleteTarget?.nama_kelas}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
