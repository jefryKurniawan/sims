import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const parameters = [
    { key: "warna", label: "Warna" },
    { key: "aroma", label: "Aroma" },
    { key: "rasa", label: "Rasa" },
    { key: "suhu", label: "Suhu" },
    { key: "tekstur", label: "Tekstur" },
];

export default function Form() {
    const { basts } = usePage().props as any;
    const [form, setForm] = useState({
        bast_id: "",
        warna: "baik", aroma: "baik", rasa: "baik", suhu: "baik", tekstur: "baik",
        hasil: "layak", catatan: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("mbg.organoleptik.store"), form);
    };

    const ratingColor = (v: string) => v === 'baik' ? 'text-emerald-600' : v === 'cukup' ? 'text-amber-600' : 'text-red-600';

    return (<>
        <Head title="Uji Organoleptik" />
        <div className="max-w-2xl mx-auto">
            <Link href={route("mbg.organoleptik.index")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
                <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <h1 className="text-2xl font-bold mb-6">Uji Organoleptik (Kelayakan Pangan)</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-4">
                <div><label className="block text-sm font-medium mb-1">BAST (Serah Terima) *</label>
                    <select value={form.bast_id} onChange={e => setForm({...form, bast_id: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm">
                        <option value="">Pilih BAST hari ini</option>
                        {basts?.map((b: any) => (
                            <option key={b.id} value={b.id}>BAST #{b.id} — {b.tanggal} ({b.status})</option>
                        ))}
                    </select></div>

                <div className="grid grid-cols-2 gap-4">
                    {parameters.map((p) => (
                        <div key={p.key}>
                            <label className="block text-sm font-medium mb-1">{p.label}</label>
                            <select value={(form as any)[p.key]} onChange={e => {
                                const vals = { ...form, [p.key]: e.target.value };
                                // Auto-set hasil: if any is kurang -> tidak_layak
                                const isBaik = ["warna","aroma","rasa","suhu","tekstur"].every(k => (vals as any)[k] === 'baik');
                                vals.hasil = isBaik ? 'layak' : 'tidak_layak';
                                setForm(vals);
                            }} className={`w-full border rounded px-3 py-2 text-sm ${ratingColor((form as any)[p.key])}`}>
                                <option value="baik">Baik</option>
                                <option value="cukup">Cukup</option>
                                <option value="kurang">Kurang</option>
                            </select>
                        </div>
                    ))}
                </div>

                <div><label className="block text-sm font-medium mb-1">Hasil Akhir</label>
                    <p className={`font-semibold text-lg ${form.hasil === 'layak' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {form.hasil === 'layak' ? '✅ LAYAK Dikonsumsi' : '❌ TIDAK LAYAK Dikonsumsi'}
                    </p></div>

                <div><label className="block text-sm font-medium mb-1">Catatan</label>
                    <textarea value={form.catatan} onChange={e => setForm({...form, catatan: e.target.value})} rows={3} className="w-full border rounded px-3 py-2 text-sm" /></div>

                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Simpan Hasil Uji</button>
                    <Link href={route("mbg.organoleptik.index")} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Batal</Link>
                </div>
            </form>
        </div>
    </>);
}
