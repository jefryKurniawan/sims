import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function Form() {
    const [form, setForm] = useState({
        judul: "",
        file_path: "",
        kategori: "serah_terima",
        tanggal_kegiatan: new Date().toISOString().split("T")[0],
        deskripsi: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("mbg.galleries.store"), form);
    };

    const cls = "w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring";

    return (<>
        <Head title="Tambah Dokumentasi" />
        <div className="max-w-2xl mx-auto">
            <Link href={route("mbg.galleries.index")}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <h1 className="text-2xl font-bold mb-6">Tambah Dokumentasi MBG</h1>

            <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6 space-y-4">
                <div><label className="block text-sm font-medium mb-1">Judul *</label>
                    <input type="text" value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} required className={cls} /></div>
                <div><label className="block text-sm font-medium mb-1">URL File / Path *</label>
                    <input type="text" value={form.file_path} onChange={e => setForm({...form, file_path: e.target.value})} required className={cls} placeholder="/storage/mbg/..." /></div>
                <div><label className="block text-sm font-medium mb-1">Kategori</label>
                    <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})} className={cls}>
                        <option value="serah_terima">Serah Terima</option>
                        <option value="uji_kelayakan">Uji Kelayakan</option>
                        <option value="suasana_makan">Suasana Makan</option>
                        <option value="dokumentasi">Dokumentasi</option>
                    </select></div>
                <div><label className="block text-sm font-medium mb-1">Tanggal Kegiatan *</label>
                    <input type="date" value={form.tanggal_kegiatan} onChange={e => setForm({...form, tanggal_kegiatan: e.target.value})} required className={cls} /></div>
                <div><label className="block text-sm font-medium mb-1">Deskripsi</label>
                    <textarea value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} rows={2} className={cls} /></div>
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90">Simpan</button>
                    <Link href={route("mbg.galleries.index")}
                        className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-accent">Batal</Link>
                </div>
            </form>
        </div>
    </>);
}
