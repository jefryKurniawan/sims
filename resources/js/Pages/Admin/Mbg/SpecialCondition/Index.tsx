import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";

export default function Index() {
    const { conditions } = usePage().props as any;
    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState<any>(null);
    const [form, setForm] = useState({ nama: "", kategori: "alergi", deskripsi: "" });

    const openAdd = () => { setEdit(null); setForm({ nama: "", kategori: "alergi", deskripsi: "" }); setShowForm(true); };
    const openEdit = (c: any) => { setEdit(c); setForm({ nama: c.nama, kategori: c.kategori, deskripsi: c.deskripsi || "" }); setShowForm(true); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (edit) {
            Inertia.put(route("mbg.special-conditions.update", edit.id), { ...form, _method: "PUT" });
        } else {
            Inertia.post(route("mbg.special-conditions.store"), form);
        }
        setShowForm(false);
    };

    const columns: Column[] = [
        { key: "nama", label: "Nama" },
        { key: "kategori", label: "Kategori", render: (v: string) => (
            <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">{v}</span>
        )},
        { key: "deskripsi", label: "Deskripsi", render: (v: any) => v || "-" },
        { key: "is_active", label: "Aktif", render: (v: boolean) => v ? "✅" : "❌" },
        { key: "actions", label: "", render: (_: any, r: any) => (
            <button onClick={() => openEdit(r)} className="p-1 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
        )},
    ];

    return (<>
        <Head title="Kondisi Khusus" />
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Master Kondisi Khusus (Alergi / Pantangan)</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" /> Tambah
                </button>
            </div>
            <AdminTable columns={columns} rows={conditions?.data || []} pagination={conditions} />

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
                    <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <h2 className="text-lg font-semibold mb-4">{edit ? "Edit" : "Tambah"} Kondisi Khusus</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div><label className="block text-sm font-medium mb-1">Nama *</label>
                                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" /></div>
                            <div><label className="block text-sm font-medium mb-1">Kategori</label>
                                <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})} className="w-full border rounded px-3 py-2 text-sm">
                                    <option value="alergi">Alergi</option><option value="intoleransi">Intoleransi</option>
                                    <option value="pantangan">Pantangan</option><option value="vegetarian">Vegetarian</option>
                                </select></div>
                            <div><label className="block text-sm font-medium mb-1">Deskripsi</label>
                                <textarea value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} rows={2} className="w-full border rounded px-3 py-2 text-sm" /></div>
                            <div className="flex gap-2">
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Simpan</button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    </>);
}
