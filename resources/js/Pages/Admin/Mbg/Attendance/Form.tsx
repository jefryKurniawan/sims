import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";

interface SiswaItem { id: number; nama_lengkap: string; nisn: string }

export default function Form() {
    const { bast, kelasList } = usePage().props as any;
    const [bastId, setBastId] = useState(bast?.id?.toString() || "");
    const [kelasId, setKelasId] = useState("");
    const [siswaList, setSiswaList] = useState<SiswaItem[]>([]);
    const [attendance, setAttendance] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(false);

    const loadSiswa = async () => {
        if (!bastId || !kelasId) return;
        setLoading(true);
        try {
            const res = await axios.post(route("mbg.attendances.by-kelas"), { bast_id: bastId, kelas_id: kelasId });
            setSiswaList(res.data.siswa);
            // Pre-fill existing
            const existing: Record<number, string> = {};
            for (const [k, v] of Object.entries(res.data.existing)) {
                existing[+k] = v as string;
            }
            // Default new ones to hadir_makan
            res.data.siswa.forEach((s: SiswaItem) => {
                if (existing[s.id] === undefined) existing[s.id] = "hadir_makan";
            });
            setAttendance(existing);
        } catch {}
        setLoading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = siswaList.map(s => ({ siswa_id: s.id, status: attendance[s.id] || "hadir_makan" }));
        Inertia.post(route("mbg.attendances.store"), { bast_id: bastId, kelas_id: kelasId, attendances: data });
    };

    const badge = (v: string) => v === "hadir_makan" ? "bg-emerald-100 text-emerald-700" :
        v === "tidak_hadir" ? "bg-red-100 text-red-700" :
        v === "dibawa_pulang" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600";

    return (<>
        <Head title="Absensi Makan" />
        <div className="max-w-4xl mx-auto">
            <Link href={route("mbg.attendances.index")} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
                <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <h1 className="text-2xl font-bold mb-6">Absensi Makan Siswa</h1>
            <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">BAST (Hari ini) *</label>
                        <select value={bastId} onChange={e => setBastId(e.target.value)} required className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring">
                            <option value="">Pilih BAST</option>
                            {bast ? <option value={bast.id}>BAST #{bast.id} — {bast.tanggal}</option> : null}
                        </select></div>
                    <div><label className="block text-sm font-medium mb-1">Kelas *</label>
                        <select value={kelasId} onChange={e => { setKelasId(e.target.value); setSiswaList([]); }} required className="w-full border border-primary/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring">
                            <option value="">Pilih Kelas</option>
                            {kelasList?.map((k: any) => <option key={k.id} value={k.id}>{k.tingkat} - {k.nama}</option>)}
                        </select></div>
                </div>
                <button type="button" onClick={loadSiswa} disabled={!bastId || !kelasId || loading}
                    className="px-4 py-2 bg-gray-100 rounded text-sm hover:bg-gray-200 disabled:opacity-50">
                    {loading ? <Loader2 className="w-4 h-4 inline animate-spin" /> : "Muat Data Siswa"}
                </button>

                {siswaList.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr><th className="text-left p-2">Siswa</th><th className="text-left p-2">NISN</th><th className="text-left p-2">Status</th></tr>
                            </thead>
                            <tbody>
                                {siswaList.map((s) => (
                                    <tr key={s.id} className="border-t">
                                        <td className="p-2">{s.nama_lengkap}</td>
                                        <td className="p-2 text-gray-500">{s.nisn}</td>
                                        <td className="p-2">
                                            <select value={attendance[s.id] || "hadir_makan"}
                                                onChange={e => setAttendance({...attendance, [s.id]: e.target.value})}
                                                className={`border border-primary/20 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring ${badge(attendance[s.id] || "hadir_makan")}`}>
                                                <option value="hadir_makan">Hadir & Makan</option>
                                                <option value="tidak_hadir">Tidak Hadir</option>
                                                <option value="dibawa_pulang">Dibawa Pulang</option>
                                                <option value="tidak_makan">Tidak Makan</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {siswaList.length > 0 && (
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Simpan Absensi</button>
                        <Link href={route("mbg.attendances.index")} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Batal</Link>
                    </div>
                )}
            </form>
        </div>
    </>);
}
