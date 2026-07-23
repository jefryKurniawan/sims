import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { FileText, BarChart2, Printer } from "lucide-react";

export default function Index() {
    const { bulan: b, tahun: t, stats, bastsPerHari } = usePage().props as any;
    const [bulan, setBulan] = useState(b || 1);
    const [tahun, setTahun] = useState(t || 2026);

    const loadReport = () => {
        Inertia.get(route("mbg.reports.index"), { bulan, tahun }, { preserveState: true });
    };

    const monthNames = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const statCards = [
        { label: "Total BAST", value: stats.total_bast, icon: FileText, color: "text-blue-600" },
        { label: "Porsi Dipesan", value: stats.total_porsi_dipesan, icon: BarChart2, color: "text-amber-600" },
        { label: "Porsi Diterima", value: stats.total_porsi_diterima, icon: BarChart2, color: "text-emerald-600" },
        { label: "Total Insiden", value: stats.total_insiden, icon: FileText, color: "text-red-600" },
        { label: "Rata-rata Harian", value: stats.rata_harian, icon: BarChart2, color: "text-indigo-600" },
    ];

    return (<>
        <Head title="Laporan MBG" />
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Laporan MBG — {monthNames[bulan]} {tahun}</h1>

            <div className="bg-card rounded-lg border border-border p-4 mb-6 flex flex-wrap gap-3 items-end">
                <div><label className="text-xs text-muted-foreground">Bulan</label>
                    <select value={bulan} onChange={e => setBulan(+e.target.value)} className="block border border-border rounded px-2 py-1 text-sm">
                        {monthNames.slice(1).map((name, i) => <option key={i + 1} value={i + 1}>{name}</option>)}
                    </select></div>
                <div><label className="text-xs text-muted-foreground">Tahun</label>
                    <input type="number" value={tahun} onChange={e => setTahun(+e.target.value)} className="block border border-border rounded px-2 py-1 text-sm w-20" /></div>
                <div className="flex gap-2">
                    <button onClick={loadReport} className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">Tampilkan</button>
                    <Link href={route("mbg.reports.print", { bulan, tahun })}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-border rounded text-sm hover:bg-accent">
                        <Printer className="w-4 h-4" /> Cetak PDF
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (<div key={card.label} className="bg-card rounded-lg border border-border p-4">
                        <div className="flex items-center gap-2">
                            <Icon className={`w-5 h-5 ${card.color}`} />
                            <div>
                                <p className="text-xs text-muted-foreground">{card.label}</p>
                                <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
                            </div>
                        </div>
                    </div>);
                })}
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
                <h2 className="font-semibold mb-3">BAST per Hari</h2>
                {bastsPerHari?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-accent/50">
                                <th className="text-left p-2 text-muted-foreground">Tanggal</th>
                                <th className="text-left p-2 text-muted-foreground">Total Porsi</th>
                                <th className="text-left p-2 text-muted-foreground">Status</th>
                            </tr></thead>
                            <tbody>
                                {bastsPerHari.map((item: any, i: number) => (
                                    <tr key={i} className="border-t border-border">
                                        <td className="p-2">{item.tanggal}</td>
                                        <td className="p-2">{item.total_porsi}</td>
                                        <td className="p-2">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                item.status === 'diterima' ? 'bg-emerald-100 text-emerald-700' :
                                                item.status === 'ditolak' ? 'bg-red-100 text-red-700' : 'bg-muted text-muted-foreground'
                                            }`}>{item.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="text-sm text-muted-foreground">Belum ada data.</p>}
            </div>
        </div>
    </>);
}
