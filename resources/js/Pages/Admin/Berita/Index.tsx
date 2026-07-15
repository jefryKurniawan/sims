import { Head, Link, usePage } from "@inertiajs/inertia-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

interface Kategori {
    id: number;
    nama: string;
}

interface BeritaItem {
    id: number;
    title: string;
    thumbnail: string;
    kategori: Kategori;
    is_active: string;
    created_at: string;
}

export default function Index() {
    const { berita, kategori, flash, filters } = usePage().props as {
        berita: any;
        kategori: Kategori[];
        flash: {
            success?: string;
            error?: string;
            message?: string;
            type?: string;
        };
        filters: { search?: string };
    };
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("berita-admin.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        { key: "title", label: "Judul" },
        {
            key: "thumbnail",
            label: "Thumbnail",
            render: (_v: any, row: any) => (
                <img
                    src={`/storage/images/berita/${row.thumbnail}`}
                    alt={row.title}
                    className="w-12 h-12 object-cover rounded"
                />
            ),
        },
        {
            key: "kategori",
            label: "Kategori",
            render: (_v: any, row: any) => row.kategori?.nama || "-",
        },
        {
            key: "is_active",
            label: "Status",
            render: (v: string) => (
                <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                        v === "0"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {v === "0" ? "Publish" : "Draft"}
                </span>
            ),
        },
    ];

    return (
        <>
            <Head title="Berita" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Berita
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola berita & pengumuman sekolah
                        </p>
                    </div>
                    <Link
                        href={route("berita-admin.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        Berita Baru
                    </Link>
                </div>

                {kategori.length === 0 ? (
                    <div className="p-12 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Kategori Masih Kosong!
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Silakan tambah kategori berita terlebih dahulu.
                        </p>
                    </div>
                ) : (
                    <>
                        {(flash?.success || flash?.message) && (
                            <div
                                className={`mb-4 p-4 rounded-lg text-sm font-medium border ${
                                    flash?.type === "error"
                                        ? "bg-destructive/10 text-destructive border-destructive/20"
                                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                            >
                                {flash.success || flash.message}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-4 p-4 bg-destructive/10 text-destructive border-destructive/20 rounded-lg text-sm font-medium">
                                {flash.error}
                            </div>
                        )}

                        <AdminTable
                            columns={columns}
                            rows={berita?.data || []}
                            pagination={{
                                current_page: berita?.current_page,
                                last_page: berita?.last_page,
                                per_page: berita?.per_page,
                                from: berita?.from,
                                to: berita?.to,
                                total: berita?.total,
                                links: berita?.links,
                            }}
                            actions={(row) => [
                                {
                                    icon: "edit",
                                    onClick: () =>
                                        Inertia.visit(
                                            route("berita-admin.edit", row.id),
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
                            title="Hapus Berita"
                            message={`Yakin ingin menghapus berita "${deleteTarget?.title}"?`}
                            onConfirm={handleDelete}
                            onCancel={() => setDeleteTarget(null)}
                        />
                    </>
                )}
            </div>
        </>
    );
}
