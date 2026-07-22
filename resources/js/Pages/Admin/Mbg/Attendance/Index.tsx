import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";

export default function Index() {
    const { attendances, filters, kelasList } = usePage().props as any;
    const [kelasId, setKelasId] = useState(filters?.kelas_id || "");
    const [tanggal, setTanggal] = useState(filters?.tanggal || "");

    const handleFilter = () => {
        const p: any = {};
        if (kelasId) p.kelas_id = kelasId;
        if (tanggal) p.tanggal = tanggal;
        Inertia.get(route("mbg.attendances.index"), p, { preserveState: true });
    };

    const badge = (v: string) => {
        const m: any = { hadir_makan: "bg-emerald-100 text-emerald-700", tidak_hadir: "bg-red-100 text-red-700",
            dibawa_pulang: "bg-amber-100 text-amber-700", tidak_makan: "bg-gray-100 text-gray-600" };
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${m[v] || "bg-gray-100"}`}>{v}</span>;
    };

    const columns: Column[] = [
        { key: "siswa", label: "Siswa", render: (_: any, r: any) => r.siswa?.nama_lengkap || "-" },
        { key: "kelas", label: "Kelas", render: (_: any, r: any) => r.kelas?.nama || "-" },
        { key: "status", label: "Status", render: (v: string) => badge(v) },
        { key: "bast", label: "Tanggal", render: (_: any, r: any) => r.bast?.tanggal || "-" },
        { key: "inputter", label: "Input", render: (_: any, r: any) => r.inputter?.nama || "-" },
    ];

    return (<>
        <Head title="Absensi Makan" />
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Absensi Makan Siswa</h1>
                <Link href={route("mbg.attendances.create")}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" /> Absensi Baru
                </Link>
            </div>
            <div className="bg-white rounded-lg border p-4 mb-4 flex flex-wrap gap-2 items-end">
                <div><label className="text-xs text-gray-500">Kelas</label>
                    <select value={kelasId} onChange={e => setKelasId(e.target.value)} className="block border rounded px-2 py-1 text-sm">
                        <option value="">Semua</option>
                        {kelasList?.map((k: any) => <option key={k.id} value={k.id}>{k.tingkat} - {k.nama}</option>)}
                    </select></div>
                <div><label className="text-xs text-gray-500">Tanggal</label>
                    <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} className="block border rounded px-2 py-1 text-sm" /></div>
                <button onClick={handleFilter} className="px-3 py-1.5 bg-gray-100 rounded text-sm hover:bg-gray-200">Filter</button>
            </div>
            <AdminTable columns={columns} rows={attendances?.data || []} pagination={attendances} />
        </div>
    </>);
}
