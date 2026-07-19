import { Head, Link, usePage, router } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Archive, Search } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

interface SuratMasuk {
    id: number;
    no_agenda: number;
    tanggal_terima: string;
    no_surat: string;
    asal_surat: string;
    perihal: string;
    status: string;
    status_disposisi: string;
    disposisi_kepada?: { id: number; name: string };
    created_by?: { id: number; name: string };
}

export default function Index() {
    const { suratMasuk, filters, statuses, flash } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search || "");
    const [statusFilter, setStatusFilter] = useState(filters?.status || "");
    const [dateFrom, setDateFrom] = useState(filters?.tanggal_terima_from || "");
    const [dateTo, setDateTo] = useState(filters?.tanggal_terima_to || "");
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [archiveTarget, setArchiveTarget] = useState<any>(null);

    const handleSearch = () => {
        router.get(
            route("tu.surat-masuk.index"),
            { search, status: statusFilter, tanggal_terima_from: dateFrom, tanggal_terima_to: dateTo },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("tu.surat-masuk.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const handleArchive = () => {
        if (!archiveTarget) return;
        Inertia.put(route("tu.surat-masuk.arsipkan", archiveTarget.id));
        setArchiveTarget(null);
    };

    const dispose = (id: number) => {
        Inertia.visit(route("tu.surat-masuk.disposisi", id));
    };

    const statusBadge = (s: string) => {
        const colors: Record<string, string> = {
            baru: "bg-blue-100 text-blue-700",
            diproses: "bg-amber-100 text-amber-700",
            selesai: "bg-emerald-100 text-emerald-700",
            arsip: "bg-gray-100 text-gray-500",
        };
        return (
            <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${colors[s] || "bg-gray-100 text-gray-600"}`}>
                {s}
            </span>
        );
    };

    const columns: Column[] = [
        { key: "no_surat", label: "No. Surat" },
        {
            key: "tanggal_terima",
            label: "Tgl. Terima",
            render: (v: string) => v || "-",
        },
        { key: "asal_surat", label: "Asal" },
        {
            key: "perihal",
            label: "Perihal",
            render: (v: string) => (
                <span className="max-w-[200px] truncate block">{v}</span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (v: string) => statusBadge(v),
        },
        {
            key: "status_disposisi",
            label: "Disposisi",
            render: (v: string) => {
                const dot = v === "belum" ? "bg-red-400" : v === "dibaca" ? "bg-amber-400" : "bg-emerald-400";
                return (
                    <span className="inline-flex items-center gap-1.5 text-sm">
                        <span className={`w-2 h-2 rounded-full ${dot}`} />
                        {v}
                    </span>
                );
            },
        },
    ];

    return (
        <>
            <Head title="Surat Masuk" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Surat Masuk
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola surat yang diterima sekolah
                        </p>
                    </div>
                    <Link
                        href={route("tu.surat-masuk.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Surat Masuk Baru
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-end">
                    <div className="flex-1 min-w-[160px]">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Cari</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="No. surat, asal, perihal..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setTimeout(handleSearch); }}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        >
                            <option value="">Semua</option>
                            {statuses.map((s: string) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Dari Tgl</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Sampai Tgl</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                    >
                        Filter
                    </button>
                </div>

                <AdminTable
                    columns={columns}
                    rows={suratMasuk?.data || []}
                    pagination={{
                        current_page: suratMasuk?.current_page,
                        last_page: suratMasuk?.last_page,
                        per_page: suratMasuk?.per_page,
                        from: suratMasuk?.from,
                        to: suratMasuk?.to,
                        total: suratMasuk?.total,
                        links: suratMasuk?.links,
                    }}
                    actions={(row) => [
                        ...(row.status !== "arsip"
                            ? [
                                {
                                    icon: "eye" as const,
                                    onClick: () => Inertia.visit(route("tu.surat-masuk.show", row.id)),
                                    label: "Detail",
                                },
                              ]
                            : []),
                        {
                            icon: "edit" as const,
                            onClick: () => Inertia.visit(route("tu.surat-masuk.edit", row.id)),
                            label: "Edit",
                        },
                        ...(row.status !== "arsip"
                            ? [
                                {
                                    icon: "delete" as const,
                                    onClick: () => setArchiveTarget(row),
                                    label: "Arsipkan",
                                },
                              ]
                            : []),
                        {
                            icon: "delete" as const,
                            onClick: () => setDeleteTarget(row),
                            label: "Hapus",
                        },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Surat"
                    message={`Yakin ingin menghapus surat "${deleteTarget?.perihal}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />

                <ConfirmModal
                    open={!!archiveTarget}
                    title="Arsipkan Surat"
                    message={`Arsipkan surat "${archiveTarget?.perihal}"?`}
                    onConfirm={handleArchive}
                    onCancel={() => setArchiveTarget(null)}
                />
            </div>
        </>
    );
}
