import { Head, Link, usePage, router } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { arsipAkreditasi, filters, tahunAjaranList, flash } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search || "");
    const [standarFilter, setStandarFilter] = useState(filters?.standar || "");
    const [subStandarFilter, setSubStandarFilter] = useState(filters?.sub_standar || "");
    const [tahunAjaranFilter, setTahunAjaranFilter] = useState(filters?.tahun_ajaran || "");
    const [statusFilter, setStatusFilter] = useState(filters?.status || "");
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleSearch = () => {
        router.get(
            route("tu.arsip-akreditasi.index"),
            { search, standar: standarFilter, sub_standar: subStandarFilter, tahun_ajaran: tahunAjaranFilter, status: statusFilter },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("tu.arsip-akreditasi.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const standarOpts = [1, 2, 3, 4, 5, 6, 7, 8];

    const statusBadge = (s: string) => {
        const c = s === "lengkap" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700";
        return <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${c}`}>{s}</span>;
    };

    const columns: Column[] = [
        { key: "standar", label: "Standar", render: (v: number) => `Standar ${v}` },
        { key: "sub_standar", label: "Sub" },
        { key: "butir", label: "Butir" },
        {
            key: "nama_dokumen",
            label: "Nama Dokumen",
            render: (v: string) => <span className="max-w-[200px] truncate block">{v}</span>,
        },
        { key: "tahun_ajaran", label: "Thn. Ajaran" },
        {
            key: "status",
            label: "Status",
            render: (v: string) => statusBadge(v),
        },
        {
            key: "penanggung_jawab",
            label: "PJ",
            render: (_v: any, row: any) => row.penanggung_jawab?.name || "-",
        },
    ];

    return (
        <>
            <Head title="Arsip Akreditasi" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Arsip Akreditasi
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Pengelolaan dokumen akreditasi per standar
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {tahunAjaranList?.length > 0 && (
                            <Link
                                href={route("tu.arsip-akreditasi.tree", tahunAjaranList[0])}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-semibold shadow-sm"
                            >
                                Tree View
                            </Link>
                        )}
                        <Link
                            href={route("tu.arsip-akreditasi.create")}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Dokumen Baru
                        </Link>
                    </div>
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
                                placeholder="Nama dokumen, butir..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Standar</label>
                        <select
                            value={standarFilter}
                            onChange={(e) => setStandarFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        >
                            <option value="">Semua</option>
                            {standarOpts.map((s) => (
                                <option key={s} value={s}>Standar {s}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Sub Standar</label>
                        <input
                            type="text"
                            value={subStandarFilter}
                            onChange={(e) => setSubStandarFilter(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Contoh: 1.1"
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Tahun Ajaran</label>
                        <select
                            value={tahunAjaranFilter}
                            onChange={(e) => setTahunAjaranFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        >
                            <option value="">Semua</option>
                            {tahunAjaranList?.map((t: string) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                        >
                            <option value="">Semua</option>
                            <option value="lengkap">Lengkap</option>
                            <option value="belum">Belum</option>
                        </select>
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
                    rows={arsipAkreditasi?.data || []}
                    pagination={{
                        current_page: arsipAkreditasi?.current_page,
                        last_page: arsipAkreditasi?.last_page,
                        per_page: arsipAkreditasi?.per_page,
                        from: arsipAkreditasi?.from,
                        to: arsipAkreditasi?.to,
                        total: arsipAkreditasi?.total,
                        links: arsipAkreditasi?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "eye" as const,
                            onClick: () => Inertia.visit(route("tu.arsip-akreditasi.show", row.id)),
                            label: "Detail",
                        },
                        {
                            icon: "edit" as const,
                            onClick: () => Inertia.visit(route("tu.arsip-akreditasi.edit", row.id)),
                            label: "Edit",
                        },
                        {
                            icon: "delete" as const,
                            onClick: () => setDeleteTarget(row),
                            label: "Hapus",
                        },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Dokumen"
                    message={`Yakin ingin menghapus "${deleteTarget?.nama_dokumen}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
