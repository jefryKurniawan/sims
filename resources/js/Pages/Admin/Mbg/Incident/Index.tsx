import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column, Action } from "@/Components/AdminTable";

export default function Index() {
    const { incidents, filters } = usePage().props as any;
    const [status, setStatus] = useState(filters?.status || "");
    const [kategori, setKategori] = useState(filters?.kategori || "");
    const [editIncident, setEditIncident] = useState<any>(null);
    const [tindakLanjut, setTindakLanjut] = useState("");

    const severityColor = (v: string) => v === "ringan" ? "bg-yellow-100 text-yellow-700" : v === "sedang" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700";
    const statusColor = (v: string) => v === "terlapor" ? "bg-red-100 text-red-700" : v === "ditangani" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700";

    const columns: Column[] = [
        { key: "tanggal", label: "Tanggal" },
        { key: "kategori", label: "Kategori", render: (v: string) => (
            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100">{v}</span>
        )},
        { key: "severity", label: "Severity", render: (v: string) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${severityColor(v)}`}>{v}</span>
        )},
        { key: "status", label: "Status", render: (v: string) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(v)}`}>{v}</span>
        )},
        { key: "pelapor", label: "Pelapor", render: (_: any, r: any) => r.pelapor?.nama || "-" },
        { key: "deskripsi", label: "Deskripsi", render: (v: string) => v?.substring(0, 60) + (v?.length > 60 ? "..." : "") },
    ];

    const handleStatusUpdate = () => {
        if (!editIncident) return;
        Inertia.put(route("mbg.incidents.update", editIncident.id), {
            status: editIncident.status,
            tindak_lanjut: tindakLanjut,
        });
        setEditIncident(null);
    };

    return (<>
        <Head title="Insiden MBG" />
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Laporan Insiden MBG</h1>
                <Link href={route("mbg.incidents.create")}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" /> Insiden Baru
                </Link>
            </div>
            <div className="bg-white border border-border rounded-lg shadow-sm p-4 mb-4 flex flex-wrap gap-2 items-end">
                <div><label className="text-xs text-gray-500">Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="block border border-primary/20 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring">
                        <option value="">Semua</option>
                        <option value="terlapor">Terlapor</option><option value="ditangani">Ditangani</option><option value="selesai">Selesai</option>
                    </select></div>
                <div><label className="text-xs text-gray-500">Kategori</label>
                    <select value={kategori} onChange={e => setKategori(e.target.value)} className="block border border-primary/20 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring">
                        <option value="">Semua</option>
                        <option value="keracunan">Keracunan</option><option value="keterlambatan">Keterlambatan</option>
                        <option value="penolakan_massal">Penolakan Massal</option><option value="kerusakan">Kerusakan</option><option value="lainnya">Lainnya</option>
                    </select></div>
                <button onClick={() => Inertia.get(route("mbg.incidents.index"), { status, kategori }, { preserveState: true })}
                    className="px-3 py-1.5 bg-gray-100 rounded text-sm hover:bg-gray-200">Filter</button>
            </div>
            <AdminTable columns={columns} rows={incidents?.data || []} pagination={incidents}
                actions={(row: any): Action[] => [
                    { icon: "edit", onClick: () => { setEditIncident(row); setTindakLanjut(row.tindak_lanjut || ""); }, label: "Update" },
                ]}
            />
        </div>
        {editIncident && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditIncident(null)}>
                <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                    <h2 className="text-lg font-semibold mb-2">Update Insiden #{editIncident.id}</h2>
                    <p className="text-sm text-gray-500 mb-4">{editIncident.kategori} — {editIncident.deskripsi?.substring(0, 100)}</p>
                    <div className="space-y-3">
                        <div><label className="block text-sm font-medium mb-1">Status</label>
                            <select value={editIncident.status} onChange={e => setEditIncident({...editIncident, status: e.target.value})}
                                className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring">
                                <option value="terlapor">Terlapor</option><option value="ditangani">Ditangani</option><option value="selesai">Selesai</option>
                            </select></div>
                        <div><label className="block text-sm font-medium mb-1">Tindak Lanjut</label>
                            <textarea value={tindakLanjut} onChange={e => setTindakLanjut(e.target.value)} rows={3}
                                className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring" /></div>
                        <div className="flex gap-2">
                            <button onClick={handleStatusUpdate} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Simpan</button>
                            <button onClick={() => setEditIncident(null)} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray-50">Batal</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>);
}
