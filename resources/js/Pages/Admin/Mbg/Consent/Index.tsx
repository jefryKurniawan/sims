import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";

export default function Index() {
    const { consents, filters } = usePage().props as any;
    const [status, setStatus] = useState(filters?.status || "");

    const badge = (v: string) => {
        const m: any = { setuju: "bg-emerald-100 text-emerald-700", menunggu: "bg-amber-100 text-amber-700", tolak: "bg-red-100 text-red-700" };
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${m[v] || ""}`}>{v}</span>;
    };

    const columns: Column[] = [
        { key: "siswa", label: "Siswa", render: (_: any, r: any) => r.siswa?.nama_lengkap || "-" },
        { key: "status", label: "Status", render: (v: string) => badge(v) },
        { key: "tanggal_persetujuan", label: "Tgl. Persetujuan", render: (v: any) => v || "-" },
        { key: "catatan_ortu", label: "Catatan", render: (v: any) => v || "-" },
    ];

    return (<>
        <Head title="Persetujuan MBG" />
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Persetujuan Orang Tua (MBG)</h1>
                <Link href={route("mbg.consents.create")}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" /> Tambah
                </Link>
            </div>
            <div className="bg-white border border-border rounded-lg shadow-sm p-4 mb-4 flex gap-2 items-end">
                <div><label className="text-xs text-gray-500">Status</label>
                    <select value={status} onChange={e => { setStatus(e.target.value); Inertia.get(route("mbg.consents.index"), { status: e.target.value }, { preserveState: true }); }} className="block border border-primary/20 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring">
                        <option value="">Semua</option>
                        <option value="setuju">Setuju</option><option value="menunggu">Menunggu</option><option value="tolak">Tolak</option>
                    </select></div>
            </div>
            <AdminTable columns={columns} rows={consents?.data || []} pagination={consents} />
        </div>
    </>);
}
