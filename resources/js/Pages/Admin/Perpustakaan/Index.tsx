import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import ImportModal from "@/Components/ImportModal";

export default function Index() {
    const { buku, flash } = usePage().props;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [showImport, setShowImport] = useState(false);

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("admin.perpustakaan.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        { key: "judul", label: "Judul" },
        { key: "penulis", label: "Penulis" },
        { key: "kategori", label: "Kategori", render: (v: string) => v || "-" },
        {
            key: "tahun_terbit",
            label: "Tahun",
            render: (v: number) => v || "-",
        },
        { key: "jumalah_stok", label: "Stok" },
        {
            key: "tersedia",
            label: "Status",
            render: (v: boolean) => (
                <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${v ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                >
                    {v ? "Tersedia" : "Dipinjam"}
                </span>
            ),
        },
        {
            key: "lokasi_rak",
            label: "Lokasi Rak",
            render: (v: string) => v || "-",
        },
    ];

    return (
        <>
            <Head title="Perpustakaan" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Perpustakaan
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola data buku dan stok peminjaman
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route("admin.perpustakaan.create")}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm"
                        >
                            Buku Baru
                        </Link>
                        <button
                            onClick={() => setShowImport(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-semibold shadow-sm"
                        >
                            <Upload className="w-4 h-4" />
                            Import
                        </button>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">
                        {flash.error}
                    </div>
                )}

                <AdminTable
                    columns={columns}
                    rows={buku?.data || []}
                    pagination={{
                        current_page: buku?.current_page,
                        last_page: buku?.last_page,
                        per_page: buku?.per_page,
                        from: buku?.from,
                        to: buku?.to,
                        total: buku?.total,
                        links: buku?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye",
                            onClick: () =>
                                Inertia.visit(
                                    route("admin.perpustakaan.show", row.id),
                                ),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () =>
                                Inertia.visit(
                                    route("admin.perpustakaan.edit", row.id),
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
                    title="Hapus Buku"
                    message={`Yakin ingin menghapus buku \"${deleteTarget?.judul}\"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />

                <ImportModal
                    open={showImport}
                    onClose={() => setShowImport(false)}
                    title="Import Buku Perpustakaan"
                    templateRouteXlsx={route("admin.perpustakaan.template") + "?format=xlsx"}
                    templateRouteCsv={route("admin.perpustakaan.template") + "?format=csv"}
                    importRoute={route("admin.perpustakaan.import")}
                />
            </div>
        </>
    );
}

