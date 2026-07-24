import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Form() {
    const [form, setForm] = useState({
        tanggal_rapat: "", tempat: "", agenda: "", notulensi: "", kesimpulan: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("mbg.meetings.store"), form);
    };

    return (<>
        <Head title="Notulensi Rapat" />
        <div className="max-w-3xl mx-auto">
            <Link href={route("mbg.meetings.index")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
                <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <h1 className="text-2xl font-bold mb-6">Notulensi Rapat Evaluasi MBG</h1>
            <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Tanggal Rapat *</label>
                        <input type="date" value={form.tanggal_rapat} onChange={e => setForm({...form, tanggal_rapat: e.target.value})} required className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring" /></div>
                    <div><label className="block text-sm font-medium mb-1">Tempat</label>
                        <input type="text" value={form.tempat} onChange={e => setForm({...form, tempat: e.target.value})} className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Agenda *</label>
                    <textarea value={form.agenda} onChange={e => setForm({...form, agenda: e.target.value})} rows={3} required className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring" /></div>
                <div><label className="block text-sm font-medium mb-1">Notulensi</label>
                    <textarea value={form.notulensi} onChange={e => setForm({...form, notulensi: e.target.value})} rows={6} className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring" /></div>
                <div><label className="block text-sm font-medium mb-1">Kesimpulan</label>
                    <textarea value={form.kesimpulan} onChange={e => setForm({...form, kesimpulan: e.target.value})} rows={3} className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring" /></div>
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Simpan</button>
                    <Link href={route("mbg.meetings.index")} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray-50">Batal</Link>
                </div>
            </form>
        </div>
    </>);
}
