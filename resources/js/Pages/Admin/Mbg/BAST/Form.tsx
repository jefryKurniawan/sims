import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Form() {
    const { bast } = usePage().props as any;
    const isEdit = !!bast;

    const [form, setForm] = useState({
        tanggal: bast?.tanggal || "",
        waktu_datang: bast?.waktu_datang || "",
        porsi_dipesan: bast?.porsi_dipesan || "",
        porsi_diterima: bast?.porsi_diterima || "",
        nama_kurir: bast?.nama_kurir || "",
        catatan: bast?.catatan || "",
        status: bast?.status || "pending",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            Inertia.put(route("mbg.basts.update", bast.id), form);
        } else {
            Inertia.post(route("mbg.basts.store"), form);
        }
    };

    return (<>
        <Head title={isEdit ? "Edit BAST" : "BAST Baru"} />
        <div className="max-w-2xl mx-auto">
            <Link href={route("mbg.basts.index")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
                <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit BAST" : "BAST Baru — Serah Terima"}</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Tanggal *</label>
                        <input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" /></div>
                    <div><label className="block text-sm font-medium mb-1">Waktu Datang *</label>
                        <input type="time" value={form.waktu_datang} onChange={e => setForm({...form, waktu_datang: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Porsi Dipesan *</label>
                        <input type="number" min="0" value={form.porsi_dipesan} onChange={e => setForm({...form, porsi_dipesan: +e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" /></div>
                    <div><label className="block text-sm font-medium mb-1">Porsi Diterima *</label>
                        <input type="number" min="0" value={form.porsi_diterima} onChange={e => setForm({...form, porsi_diterima: +e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Nama Kurir</label>
                    <input type="text" value={form.nama_kurir} onChange={e => setForm({...form, nama_kurir: e.target.value})} className="w-full border rounded px-3 py-2 text-sm" /></div>
                <div><label className="block text-sm font-medium mb-1">Status *</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm">
                        <option value="pending">Pending</option>
                        <option value="diterima">Diterima</option>
                        <option value="ditolak">Ditolak</option>
                    </select></div>
                <div><label className="block text-sm font-medium mb-1">Catatan</label>
                    <textarea value={form.catatan} onChange={e => setForm({...form, catatan: e.target.value})} rows={3} className="w-full border rounded px-3 py-2 text-sm" /></div>
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        {isEdit ? "Simpan Perubahan" : "Simpan BAST"}
                    </button>
                    <Link href={route("mbg.basts.index")} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Batal</Link>
                </div>
            </form>
        </div>
    </>);
}
