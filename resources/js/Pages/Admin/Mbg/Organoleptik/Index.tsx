import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";

export default function Index() {
    const { organoleptiks, filters } = usePage().props as any;
    const [hasil, setHasil] = useState(filters?.hasil || "");

    const columns: Column[] = [
        { key: "id", label: "ID" },
        { key: "warna", label: "Warna" },
        { key: "aroma", label: "Aroma" },
        { key: "rasa", label: "Rasa" },
        { key: "suhu", label: "Suhu" },
        { key: "tekstur", label: "Tekstur" },
        { key: "hasil", label: "Hasil", render: (v: string) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${v === 'layak' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{v}</span>
        )},
        { key: "penguji", label: "Penguji", render: (_: any, r: any) => r.penguji?.nama || "-" },
        { key: "created_at", label: "Waktu" },
    ];

    return (<>
        <Head title="Uji Organoleptik" />
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Uji Organoleptik MBG</h1>
                <Link href={route("mbg.organoleptik.create")}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" /> Uji Baru
                </Link>
            </div>
            <div className="bg-white rounded-lg border p-4 mb-4 flex gap-2 items-end">
                <div><label className="text-xs text-gray-500">Hasil</label>
                    <select value={hasil} onChange={e => { setHasil(e.target.value); Inertia.get(route("mbg.organoleptik.index"), { hasil: e.target.value }, { preserveState: true }); }} className="block border rounded px-2 py-1 text-sm">
                        <option value="">Semua</option>
                        <option value="layak">Layak</option>
                        <option value="tidak_layak">Tidak Layak</option>
                    </select></div>
            </div>
            <AdminTable columns={columns} rows={organoleptiks?.data || []} pagination={organoleptiks} />
        </div>
    </>);
}
