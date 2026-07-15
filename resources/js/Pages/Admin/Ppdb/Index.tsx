import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { users, flash } = usePage().props as {
        users: any;
        flash: { success?: string; error?: string };
    };
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("users.ppdb.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        { key: "name", label: "Nama" },
        { key: "email", label: "Email" },
        {
            key: "nip",
            label: "NIP",
            render: (_v: any, row: any) => row.userDetail?.nip || "-",
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
            <Head title="Pengguna PPDB" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Pengguna PPDB
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola akun panitia PPDB
                        </p>
                    </div>
                    <Link
                        href={route("users.ppdb.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        Pengguna PPDB Baru
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
                    rows={users?.data || []}
                    pagination={{
                        current_page: users?.current_page,
                        last_page: users?.last_page,
                        per_page: users?.per_page,
                        from: users?.from,
                        to: users?.to,
                        total: users?.total,
                        links: users?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "edit",
                            onClick: () =>
                                Inertia.visit(route("users.ppdb.edit", row.id)),
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
                    title="Hapus Pengguna PPDB"
                    message={`Yakin ingin menghapus "${deleteTarget?.name}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
