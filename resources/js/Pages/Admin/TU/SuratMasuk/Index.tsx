import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import { Plus, Search, Filter, Archive, ArrowRightLeft } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import { useState } from "react";

export default function Index() {
    const {
        suratMasuk,
        filters = {
            status: "",
            search: "",
            tanggal_terima_from: "",
            tanggal_terima_to: "",
        },
        statuses,
    } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleFilter = (key: string, value: string) => {
        const params: Record<string, string> = { ...(filters || {}) };
        if (value) params[key] = value;
        else delete params[key];
        delete params.page;
        router.get(route("tu.surat-masuk.index"), params);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route("tu.surat-masuk.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            baru: "bg-blue-100 text-blue-700",
            diproses: "bg-yellow-100 text-yellow-700",
            selesai: "bg-green-100 text-green-700",
            arsip: "bg-gray-100 text-gray-700",
        };
        return badges[status] || "bg-gray-100 text-gray-700";
    };

    const getDisposisiBadge = (status: string) => {
        const badges: Record<string, string> = {
            belum: "bg-gray-100 text-gray-700",
            dibaca: "bg-blue-100 text-blue-700",
            dibalas: "bg-green-100 text-green-700",
        };
        return badges[status] || "bg-gray-100 text-gray-700";
    };

    const columns: Column[] = [
        { key: "no_agenda", label: "No. Agenda" },
        {
            key: "tanggal_terima",
            label: "Tgl Terima",
            render: (v: string) =>
                new Date(v).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }),
        },
        { key: "no_surat", label: "No. Surat" },
        { key: "asal_surat", label: "Asal Surat" },
        { key: "perihal", label: "Perihal" },
        {
            key: "status",
            label: "Status",
            render: (v: string) => (
                <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(v)}`}
                >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                </span>
            ),
        },
        {
            key: "status_disposisi",
            label: "Disposisi",
            render: (v: string) => (
                <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getDisposisiBadge(v)}`}
                >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                </span>
            ),
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
                            Kelola surat masuk dan disposisi
                        </p>
                    </div>
                    <Link
                        href={route("tu.surat-masuk.create")}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Surat Baru
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cari
                            </label>
                            <input
                                type="text"
                                placeholder="No. Surat, Asal, Perihal..."
                                defaultValue={filters.search}
                                onBlur={(e) =>
                                    handleFilter("search", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) =>
                                    handleFilter("status", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            >
                                <option value="">Semua</option>
                                {statuses.map((s: string) => (
                                    <option key={s} value={s}>
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tgl Terima Dari
                            </label>
                            <input
                                type="date"
                                defaultValue={filters.tanggal_terima_from}
                                onBlur={(e) =>
                                    handleFilter(
                                        "tanggal_terima_from",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tgl Terima Sampai
                            </label>
                            <input
                                type="date"
                                defaultValue={filters.tanggal_terima_to}
                                onBlur={(e) =>
                                    handleFilter(
                                        "tanggal_terima_to",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            />
                        </div>
                        <div className="md:col-span-5 flex justify-end gap-2 pt-4">
                            <button
                                onClick={() =>
                                    router.get(route("tu.surat-masuk.index"))
                                }
                                className="px-4 py-2 border border-primary/20 rounded-lg text-sm hover:bg-accent transition"
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
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
                        {
                            icon: "eye",
                            onClick: () =>
                                router.visit(
                                    route("tu.surat-masuk.show", row.id),
                                ),
                            label: "Detail",
                        },
                        {
                            icon: "edit",
                            onClick: () =>
                                router.visit(
                                    route("tu.surat-masuk.edit", row.id),
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
                    title="Hapus Surat Masuk"
                    message={`Yakin ingin menghapus surat "${deleteTarget?.no_surat || ""}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
