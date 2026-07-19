import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { MessageSquare, Plus } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { konseling, filters, flash } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const f = filters || {};
    const [status, setStatus] = useState(f.status || "");
    const [search, setSearch] = useState(f.search || "");

    const handleFilter = () => {
        const params: any = {};
        if (status) params.status = status;
        if (search) params.search = search;
        Inertia.get(route("bk.konseling.index"), params, { preserveState: true });
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("bk.konseling.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        { key: "siswa", label: "Siswa", render: (_v: any, row: any) => row.siswa?.nama_lengkap || "-" },
        { key: "topik", label: "Topik" },
        { key: "guru_bk", label: "Guru BK", render: (_v: any, row: any) => row.guru_bk?.nama_lengkap || "-" },
        { key: "tanggal", label: "Tanggal" },
        { key: "status", label: "Status", render: (v: string) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                v === "terbuka" ? "bg-yellow-100 text-yellow-700" :
                v === "selesai" ? "bg-green-100 text-green-700" :
                "bg-red-100 text-red-700"
            }`}>{v}</span>
        )},
    ];

    return (
        <>
            <Head title="Konseling" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Konseling & Saran</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Catatan konseling siswa</p>
                    </div>
                    <Link href={route("bk.konseling.create")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm">
                        <Plus className="w-4 h-4" />
                        Tambah Konseling
                    </Link>
                </div>

                {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm">
                                <option value="">Semua</option>
                                <option value="terbuka">Terbuka</option>
                                <option value="selesai">Selesai</option>
                                <option value="rujukan">Rujukan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cari</label>
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nama/topik..." className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm" />
                        </div>
                        <div className="flex items-end gap-2">
                            <button onClick={handleFilter} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">Filter</button>
                            <Link href={route("bk.konseling.index")} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Reset</Link>
                        </div>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={konseling?.data || []}
                    pagination={konseling}
                    actions={(row: any) => [
                        { icon: "edit", onClick: () => Inertia.visit(route("bk.konseling.edit", row.id)), label: "Edit" },
                        { icon: "delete", onClick: () => setDeleteTarget(row), label: "Hapus" },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Konseling"
                    message="Yakin ingin menghapus data konseling ini?"
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
