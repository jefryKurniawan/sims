import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Image } from "lucide-react";

export default function Index() {
    const { galleries } = usePage().props as any;
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ judul: "", file_path: "", kategori: "kegiatan", tanggal_kegiatan: new Date().toISOString().split("T")[0], deskripsi: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post(route("mbg.galleries.store"), form);
        setShowForm(false);
        setForm({ judul: "", file_path: "", kategori: "kegiatan", tanggal_kegiatan: new Date().toISOString().split("T")[0], deskripsi: "" });
    };

    const kategoriColor = (v: string) => {
        const m: any = { serah_terima: "bg-blue-100 text-blue-700", uji_kelayakan: "bg-emerald-100 text-emerald-700",
            suasana_makan: "bg-amber-100 text-amber-700", dokumentasi: "bg-gray-100 text-gray-700" };
        return m[v] || "bg-gray-100";
    };

    return (<>
        <Head title="Galeri MBG" />
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Galeri Dokumentasi MBG</h1>
                <button onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="w-4 h-4" /> Tambah
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleries?.data?.map((g: any) => (
                    <div key={g.id} className="bg-white rounded-lg border overflow-hidden hover:shadow transition">
                        <div className="h-40 bg-gray-100 flex items-center justify-center">
                            {g.file_path?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <img src={g.file_path} alt={g.judul} className="w-full h-full object-cover" />
                            ) : (
                                <Image className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <div className="p-3">
                            <p className="font-medium text-sm truncate">{g.judul}</p>
                            <span className={`inline-block px-2 py-0.5 rounded text-xs mt-1 ${kategoriColor(g.kategori)}`}>{g.kategori}</span>
                            <p className="text-xs text-gray-400 mt-1">{g.tanggal_kegiatan}</p>
                        </div>
                    </div>
                ))}
            </div>

            {(!galleries?.data || galleries.data.length === 0) && (
                <div className="text-center py-12 text-gray-400">
                    <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Belum ada dokumentasi. Tambahkan foto kegiatan MBG.</p>
                </div>
            )}
        </div>

        {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
                <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                    <h2 className="text-lg font-semibold mb-4">Tambah Dokumentasi</h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div><label className="block text-sm font-medium mb-1">Judul *</label>
                            <input type="text" value={form.judul} onChange={e => setForm({...form, judul: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" /></div>
                        <div><label className="block text-sm font-medium mb-1">URL File / Path *</label>
                            <input type="text" value={form.file_path} onChange={e => setForm({...form, file_path: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" placeholder="/storage/mbg/..." /></div>
                        <div><label className="block text-sm font-medium mb-1">Kategori</label>
                            <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})} className="w-full border rounded px-3 py-2 text-sm">
                                <option value="serah_terima">Serah Terima</option>
                                <option value="uji_kelayakan">Uji Kelayakan</option>
                                <option value="suasana_makan">Suasana Makan</option>
                                <option value="dokumentasi">Dokumentasi</option>
                            </select></div>
                        <div><label className="block text-sm font-medium mb-1">Tanggal Kegiatan *</label>
                            <input type="date" value={form.tanggal_kegiatan} onChange={e => setForm({...form, tanggal_kegiatan: e.target.value})} required className="w-full border rounded px-3 py-2 text-sm" /></div>
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
    </>);
}
