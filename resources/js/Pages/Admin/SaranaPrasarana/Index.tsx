import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import ImportModal from "@/Components/ImportModal";

const KATEGORI_OPTIONS = [
    { value: "ruangan", label: "Ruangan" },
    { value: "laboratorium", label: "Laboratorium" },
    { value: "perpustakaan", label: "Perpustakaan" },
    { value: "olahraga", label: "Olahraga" },
    { value: "ibadah", label: "Ibadah" },
    { value: "sanitasi", label: "Sanitasi" },
    { value: "teknologi", label: "Teknologi" },
    { value: "lainnya", label: "Lainnya" },
];

const KONDISI_OPTIONS = [
    { value: "baik", label: "Baik" },
    { value: "rusak_ringan", label: "Rusak Ringan" },
    { value: "rusak_berat", label: "Rusak Berat" },
];

export default function Index() {
    const { sarana, flash } = usePage().props;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [showImport, setShowImport] = useState(false);
    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("sarana.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        { key: "nama", label: "Nama" },
        {
            key: "kategori",
            label: "Kategori",
            render: (v: string) => {
                const opt = KATEGORI_OPTIONS.find((o) => o.value === v);
                return (
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {opt?.label || v}
                    </span>
                );
            },
        },
        { key: "lokasi", label: "Lokasi", render: (v: string) => v || "-" },
        {
            key: "kondisi",
            label: "Kondisi",
            render: (v: string) => {
                const colors: Record<string, string> = {
                    baik: "bg-emerald-100 text-emerald-700",
                    rusak_ringan: "bg-yellow-100 text-yellow-700",
                    rusak_berat: "bg-destructive/10 text-destructive",
                };
                const labels: Record<string, string> = {
                    baik: "Baik",
                    rusak_ringan: "Rusak Ringan",
                    rusak_berat: "Rusak Berat",
                };
                return (
                    <span
                        className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${colors[v] || "bg-gray-100 text-gray-700"}`}
                    >
                        {labels[v] || v}
                    </span>
                );
            },
        },
        {
            key: "kapasitas",
            label: "Kapasitas",
            render: (v: any) => (v ? `${v} orang` : "-"),
        },
        {
            key: "tahun_pengadaan",
            label: "Tahun",
            render: (v: any) => v || "-",
        },
    ];

    return (
        <>
            <Head title="Sarana & Prasarana" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Sarana & Prasarana
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola fasilitas & infrastruktur sekolah
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route("sarana.create")}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Sarana Baru
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
                    <div className="mb-4 p-4 bg-destructive/10 text-destructive border-destructive/20 rounded-lg text-sm font-medium">
                        {flash.error}
                    </div>
                )}

                <AdminTable
                    columns={columns}
                    rows={sarana?.data || []}
                    pagination={{
                        current_page: sarana?.current_page,
                        last_page: sarana?.last_page,
                        per_page: sarana?.per_page,
                        from: sarana?.from,
                        to: sarana?.to,
                        total: sarana?.total,
                        links: sarana?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye",
                            onClick: () =>
                                Inertia.visit(route("sarana.show", row.id)),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () =>
                                Inertia.visit(route("sarana.edit", row.id)),
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
                    title="Hapus Sarana"
                    message={`Yakin ingin menghapus "${deleteTarget?.nama}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />

                <ImportModal
                    open={showImport}
                    onClose={() => setShowImport(false)}
                    title="Import Sarana & Prasarana"
                    templateRouteXlsx={
                        route("sarana.template") + "?format=xlsx"
                    }
                    templateRouteCsv={route("sarana.template") + "?format=csv"}
                    importRoute={route("sarana.import")}
                />
            </div>
        </>
    );
}
