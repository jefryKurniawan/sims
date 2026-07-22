import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { basts, filters, flash } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const [status, setStatus] = useState(filters?.status || "");
    const [dateFrom, setDateFrom] = useState(filters?.date_from || "");
    const [dateTo, setDateTo] = useState(filters?.date_to || "");

    const handleFilter = () => {
        const p: any = {};
        if (status) p.status = status;
        if (dateFrom) p.date_from = dateFrom;
        if (dateTo) p.date_to = dateTo;
        Inertia.get(route("mbg.basts.index"), p, { preserveState: true });
    };

    const columns: Column[] = [
        { key: "tanggal", label: "Tanggal" },
        { key: "waktu_datang", label: "Datang" },
        { key: "porsi_dipesan", label: "Porsi Pesan" },
        { key: "porsi_diterima", label: "Porsi Terima" },
        { key: "nama_kurir", label: "Kurir", render: (v: any) => v || "-" },
        { key: "status", label: "Status", render: (v: string) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                v === "diterima" ? "bg-emerald-100 text-emerald-700" :
                v === "ditolak" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
            }`}>{v}</span>
        )},
        { key: "creator", label: "Oleh", render: (_: any, r: any) => r.creator?.nama || "-" },
    ];

    const actions = (row: any) => (<div className="flex gap-1">
        <Link href={route("mbg.basts.edit", row.id)} className="p-1 hover:text-blue-600"><Pencil className="w-4 h-4" /></Link>
        <button onClick={() => setDeleteTarget(row)} className="p-1 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
    </div>);

    return (<>
        <Head title="BAST MBG" />
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">BAST Serah Terima MBG</h1>
                <Link href={route("mbg.basts.create")}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" /> BAST Baru
                </Link>
            </div>
            <div className="bg-white rounded-lg border p-4 mb-4 flex flex-wrap gap-2 items-end">
                <div><label className="text-xs text-gray-500">Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="block w-full border rounded px-2 py-1 text-sm">
                        <option value="">Semua</option>
                        <option value="pending">Pending</option>
                        <option value="diterima">Diterima</option>
                        <option value="ditolak">Ditolak</option>
                    </select></div>
                <div><label className="text-xs text-gray-500">Dari</label>
                    <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="block border rounded px-2 py-1 text-sm" /></div>
                <div><label className="text-xs text-gray-500">Sampai</label>
                    <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="block border rounded px-2 py-1 text-sm" /></div>
                <button onClick={handleFilter} className="px-3 py-1.5 bg-gray-100 rounded text-sm hover:bg-gray-200">Filter</button>
            </div>
            <AdminTable columns={columns} rows={basts?.data || []} actions={actions} pagination={basts} />
        </div>
        <ConfirmModal show={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => {
            Inertia.delete(route("mbg.basts.destroy", deleteTarget.id));
            setDeleteTarget(null);
        }} title="Hapus BAST?" />
    </>);
}
