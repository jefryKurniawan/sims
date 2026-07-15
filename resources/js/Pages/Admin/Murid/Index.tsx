import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { murid, flash } = usePage().props;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("users.murid.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        { key: "name", label: "Nama" },
        { key: "email", label: "Email" },
        { key: "username", label: "Username", render: (v: string) => v || "-" },
        {
            key: "role",
            label: "Role",
            render: (v: string) => (
                <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${v === "Murid" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                >
                    {v}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (v: string) => (
                <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${v === "active" ? "bg-emerald-100 text-emerald-700" : "bg-destructive/10 text-destructive"}`}
                >
                    {v === "active" ? "Aktif" : "Nonaktif"}
                </span>
            ),
        },
    ];

    return (
        <>
            <Head title="Calon Murid / Murid" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Calon Murid / Murid
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola akun calon murid & murid
                        </p>
                    </div>
                    <Link
                        href={route("users.murid.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        Calon Murid Baru
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
                    rows={murid?.data || []}
                    pagination={{
                        current_page: murid?.current_page,
                        last_page: murid?.last_page,
                        per_page: murid?.per_page,
                        from: murid?.from,
                        to: murid?.to,
                        total: murid?.total,
                        links: murid?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye",
                            onClick: () =>
                                Inertia.visit(
                                    route("users.murid.show", row.id),
                                ),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () =>
                                Inertia.visit(
                                    route("users.murid.edit", row.id),
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
                    title="Hapus Murid"
                    message={`Yakin ingin menghapus "${deleteTarget?.name}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
