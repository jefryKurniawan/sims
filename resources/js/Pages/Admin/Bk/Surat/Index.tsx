import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { FileText, Plus, Filter, X } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { surat, filters, flash } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const f = filters || {};
    const [jenis, setJenis] = useState(f.jenis || "");
    const [status, setStatus] = useState(f.status || "");
    const [search, setSearch] = useState(f.search || "");

    const handleFilter = () => {
        const params: any = {};
        if (jenis) params.jenis = jenis;
        if (status) params.status = status;
        if (search) params.search = search;
        Inertia.get(route("bk.surat.index"), params, { preserveState: true });
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("bk.surat.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const jenisOptions = [
        { value: 'panggilan_ortu', label: 'Surat Panggilan Orang Tua' },
        { value: 'pernyataan', label: 'Surat Pernyataan' },
        { value: 'rekomendasi_pkl', label: 'Surat Rekomendasi PKL' },
        { value: 'rekomendasi_kuliah', label: 'Surat Rekomendasi Kuliah' },
        { value: 'lainnya', label: 'Lainnya' },
    ];

    const statusBadge = (v: string) => {
        const map: Record<string, string> = {
            draft: "bg-gray-100 text-gray-700",
            diajukan: "bg-yellow-100 text-yellow-700",
            disetujui: "bg-green-100 text-green-700",
            ditolak: "bg-red-100 text-red-700",
        };
        return map[v] || "bg-gray-100 text-gray-700";
    };

    const jenisLabel = (v: string) => {
        const found = jenisOptions.find(j => j.value === v);
        return found?.label || v;
    };

    const columns: Column[] = [
        { key: "siswa", label: "Siswa", render: (_v: any, row: any) => row.siswa?.nama_lengkap || "-" },
        { key: "jenis", label: "Jenis Surat", render: (v: string) => jenisLabel(v) },
        { key: "status", label: "Status", render: (v: string) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadge(v)}`}>{v}</span>
        )},
        { key: "tanggal_surat", label: "Tanggal" },
    ];

    return (
        <>
            <Head title="Surat Rekomendasi" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Surat Rekomendasi</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Kelola surat rekomendasi, panggilan ortu, pernyataan</p>
                    </div>
                    <Link href={route("bk.surat.create")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm">
                        <Plus className="w-4 h-4" />
                        Buat Surat Baru
                    </Link>
                </div>

                {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Surat</label>
                            <select value={jenis} onChange={e => setJenis(e.target.value)} className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm">
                                <option value="">Semua</option>
                                {jenisOptions.map(j => <option key={j.value} value={j.value}>{j.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm">
                                <option value="">Semua</option>
                                <option value="draft">Draft</option>
                                <option value="diajukan">Diajukan</option>
                                <option value="disetujui">Disetujui</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cari</label>
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nama siswa..." className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm" />
                        </div>
                        <div className="flex items-end gap-2">
                            <button onClick={handleFilter} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">Filter</button>
                            <Link href={route("bk.surat.index")} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Reset</Link>
                        </div>
                    </div>
                </div>
            </div>

            <AdminTable
                columns={columns}
                rows={surat?.data || []}
                pagination={surat}
                actions={(row: any) => [
                    { icon: "view", onClick: () => Inertia.visit(route("bk.surat.show", row.id)), label: "Lihat" },
                    { icon: "edit", onClick: () => Inertia.visit(route("bk.surat.edit", row.id)), label: "Edit" },
                    { icon: "delete", onClick: () => setDeleteTarget(row), label: "Hapus" },
                ]}
            />

            <ConfirmModal
                open={!!deleteTarget}
                title="Hapus Surat"
                message="Yakin ingin menghapus data surat ini?"
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </>
    );
}
