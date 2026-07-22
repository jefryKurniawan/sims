import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Form() {
    const [form, setForm] = useState({
        tanggal: new Date().toISOString().split("T")[0],
        kategori: "keterlambatan",
        deskripsi: "",
        severity: "ringan",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("mbg.incidents.store"), form);
    };

    return (<>
        <Head title="Laporkan Insiden" />
        <div className="max-w-2xl mx-auto">
            <Link href={route("mbg.incidents.index")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
                <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <h1 className="text-2xl font-bold mb-6">Laporkan Insiden MBG</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-4">
                <div><label className="block text-sm font-medium mb-1">Tanggal *</label>
                    <input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" /></div>
                <div><label className="block text-sm font-medium mb-1">Kategori *</label>
                    <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm">
                        <option value="keracunan">Keracunan</option>
                        <option value="keterlambatan">Keterlambatan</option>
                        <option value="penolakan_massal">Penolakan Massal</option>
                        <option value="kerusakan">Kerusakan</option>
                        <option value="lainnya">Lainnya</option>
                    </select></div>
                <div><label className="block text-sm font-medium mb-1">Tingkat Keparahan *</label>
                    <select value={form.severity} onChange={e => setForm({...form, severity: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm">
                        <option value="ringan">Ringan</option>
                        <option value="sedang">Sedang</option>
                        <option value="berat">Berat</option>
                    </select></div>
                <div><label className="block text-sm font-medium mb-1">Deskripsi Kejadian *</label>
                    <textarea value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} rows={4} required
                        className="w-full border rounded px-3 py-2 text-sm" placeholder="Jelaskan kronologi kejadian..." /></div>
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Laporkan</button>
                    <Link href={route("mbg.incidents.index")} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Batal</Link>
                </div>
            </form>
        </div>
    </>);
}
