import { Head, Link, usePage, router } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import Pagination from "@/Components/Pagination";

interface Detail {
    id: number;
    jumlah: number;
    status_verifikasi: string;
}

interface Pembayaran {
    id: number;
    jenis_pembayaran: string;
    jumlah_tagihan: number;
    jumlah_dibayar: number;
    sisa: number;
    status: string;
    jatuh_tempo: string | null;
    siswa?: { nama_lengkap: string; nisn: string } | null;
    details_count?: number;
    details?: Detail[];
}

interface PageProps {
    pembayaran: { data: Pembayaran[]; current_page: number; last_page: number; per_page: number } | Pembayaran[];
    filters: { jenis?: string; status?: string; q?: string };
    jenisOptions: string[];
    flash: { success?: string; error?: string };
}

const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

const statusColors: Record<string, string> = {
    lunas: "bg-emerald-100 text-emerald-700",
    belum_lunas: "bg-red-100 text-red-700",
    angsuran: "bg-yellow-100 text-yellow-700",
};

export default function Index() {
    const { pembayaran, filters, jenisOptions, flash } = usePage<PageProps>().props as any;
    const [q, setQ] = useState(filters.q || "");

    const items = Array.isArray(pembayaran) ? pembayaran : pembayaran.data;
    const meta = Array.isArray(pembayaran) ? null : pembayaran;

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route("pembayaran.index"), { ...filters, q }, { preserveState: true, preserveScroll: true });
    };

    const columns: Column<Pembayaran>[] = [
        { key: "siswa", header: "Siswa", render: (p) => p.siswa?.nama_lengkap || "-" },
        { key: "nisn", header: "NISN", render: (p) => p.siswa?.nisn || "-" },
        { key: "jenis", header: "Jenis", render: (p) => p.jenis_pembayaran },
        { key: "jumlah_tagihan", header: "Tagihan", render: (p) => formatRupiah(p.jumlah_tagihan) },
        { key: "jumlah_dibayar", header: "Dibayar", render: (p) => formatRupiah(p.jumlah_dibayar) },
        { key: "sisa", header: "Sisa", render: (p) => formatRupiah(p.sisa) },
        {
            key: "status",
            header: "Status",
            render: (p) => (
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[p.status] || statusColors.belum_lunas}`}>
                    {p.status.replace("_", " ")}
                </span>
            ),
        },
        {
            key: "action",
            header: "",
            render: (p) => (
                <Link href={route("pembayaran.show", p.id)} className="text-primary text-sm hover:underline">
                    Detail
                </Link>
            ),
        },
    ];

    return (
        <>
            <Head title="Pembayaran" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
                    <Link href={route("pembayaran.create")} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:opacity-90">
                        <Plus className="w-4 h-4" /> Buat Tagihan
                    </Link>
                </div>

                {flash?.success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded">{flash.success}</div>}
                {flash?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{flash.error}</div>}

                <form onSubmit={onSearch} className="mb-4 flex gap-2 flex-wrap">
                    <input
                        type="text"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Cari siswa..."
                        className="border border-border px-3 py-2 rounded text-sm flex-1 min-w-[200px]"
                    />
                    <select
                        value={filters.jenis || ""}
                        onChange={(e) => router.get(route("pembayaran.index"), { ...filters, jenis: e.target.value || undefined }, { preserveState: true })}
                        className="border border-border px-3 py-2 rounded text-sm"
                    >
                        <option value="">Semua Jenis</option>
                        {jenisOptions.map((j) => (
                            <option key={j} value={j}>{j}</option>
                        ))}
                    </select>
                    <select
                        value={filters.status || ""}
                        onChange={(e) => router.get(route("pembayaran.index"), { ...filters, status: e.target.value || undefined }, { preserveState: true })}
                        className="border border-border px-3 py-2 rounded text-sm"
                    >
                        <option value="">Semua Status</option>
                        <option value="belum_lunas">Belum Lunas</option>
                        <option value="angsuran">Angsuran</option>
                        <option value="lunas">Lunas</option>
                    </select>
                    <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded text-sm hover:bg-gray-200">
                        <Search className="w-4 h-4" /> Cari
                    </button>
                </form>

                <AdminTable columns={columns} rows={items} />

                {meta && <Pagination data={items} current_page={meta.current_page} last_page={meta.last_page} per_page={meta.per_page} from={meta.from} to={meta.to} total={meta.total} links={meta.links} />}
            </div>
        </>
    );
}
