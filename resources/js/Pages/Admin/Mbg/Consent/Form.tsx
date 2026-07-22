import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Form() {
    const { siswa } = usePage().props as any;
    const [form, setForm] = useState({ siswa_id: "", status: "menunggu", catatan_ortu: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("mbg.consents.store"), form);
    };

    return (<>
        <Head title="Persetujuan MBG" />
        <div className="max-w-2xl mx-auto">
            <Link href={route("mbg.consents.index")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
                <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <h1 className="text-2xl font-bold mb-6">Persetujuan MBG — Orang Tua</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-4">
                <div><label className="block text-sm font-medium mb-1">Siswa *</label>
                    <select value={form.siswa_id} onChange={e => setForm({...form, siswa_id: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm">
                        <option value="">Pilih Siswa</option>
                        {siswa?.map((s: any) => <option key={s.id} value={s.id}>{s.nama_lengkap} ({s.nisn})</option>)}
                    </select></div>
                <div><label className="block text-sm font-medium mb-1">Status Persetujuan *</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm">
                        <option value="menunggu">Menunggu</option>
                        <option value="setuju">Setuju</option>
                        <option value="tolak">Tolak</option>
                    </select></div>
                <div><label className="block text-sm font-medium mb-1">Catatan Orang Tua</label>
                    <textarea value={form.catatan_ortu} onChange={e => setForm({...form, catatan_ortu: e.target.value})} rows={3} className="w-full border rounded px-3 py-2 text-sm" /></div>
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Simpan</button>
                    <Link href={route("mbg.consents.index")} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Batal</Link>
                </div>
            </form>
        </div>
    </>);
}
