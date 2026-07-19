import { Head, Link, usePage, router } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { suratKeluar, filters, statuses, flash } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search || "");
    const [statusFilter, setStatusFilter] = useState(filters?.status || "");
    const [dateFrom, setDateFrom] = useState(filters?.tanggal_kirim_from || "");
    const [dateTo, setDateTo] = useState(filters?.tanggal_kirim_to || "");
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [archiveTarget, setArchiveTarget] = useState<any>(null);

    const handleSearch = () => {
        router.get(
            route("tu.surat-keluar.index"),
            { search, status: statusFilter, tanggal_kirim_from: dateFrom, tanggal_kirim_to: dateTo },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("tu.surat-keluar.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const handleArchive = () => {
        if (!archiveTarget) return;
        Inertia.put(route("tu.surat-keluar.arsipkan", archiveTarget.id));
        setArchiveTarget(null);
    };

    const statusBadge = (s: string) => {
        const colors: Record<string, string> = {
            draf: "bg-gray-100 text-gray-600",
            terkirim: "bg-emerald-100 text-emerald-700",
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
            key: "tanggal_kirim",
            label: "Tgl. Kirim",
            render: (v: string) => v || "-",
        },
        { key: "tujuan", label: "Tujuan" },
        {
            key: "perihal",
            label: "Perihal",
            render: (v: string) => (
                <span className="max-w-[200px] truncate block">{v}</span>
            ),
        },
        { key: "penandatangan", label: "Ditandatangani" },
        {
            key: "status",
            label: "Status",
            render: (v: string) => statusBadge(v),
        },
    ];

    return (
        <>
            <Head title="Surat Keluar" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Surat Keluar
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola surat yang dikirim sekolah
                        </p>
                    </div>
                    <Link
                        href={route("tu.surat-keluar.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Surat Keluar Baru
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
                                placeholder="No. surat, tujuan, perihal..."
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
                    rows={suratKeluar?.data || []}
                    pagination={{
                        current_page: suratKeluar?.current_page,
                        last_page: suratKeluar?.last_page,
                        per_page: suratKeluar?.per_page,
                        from: suratKeluar?.from,
                        to: suratKeluar?.to,
                        total: suratKeluar?.total,
                        links: suratKeluar?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye" as const,
                            onClick: () => Inertia.visit(route("tu.surat-keluar.show", row.id)),
                            label: "Detail",
                        },
                        {
                            icon: "edit" as const,
                            onClick: () => Inertia.visit(route("tu.surat-keluar.edit", row.id)),
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
