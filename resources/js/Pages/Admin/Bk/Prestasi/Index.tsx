import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index() {
    const { prestasi, filters, flash } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const f = filters || {};
    const [kategori, setKategori] = useState(f.kategori || "");
    const [tingkat, setTingkat] = useState(f.tingkat || "");
    const [verified, setVerified] = useState(f.verified || "");
    const [search, setSearch] = useState(f.search || "");

    const handleFilter = () => {
        const params: any = {};
        if (kategori) params.kategori = kategori;
        if (tingkat) params.tingkat = tingkat;
        if (verified) params.verified = verified;
        if (search) params.search = search;
        Inertia.get(route("bk.prestasi.index"), params, { preserveState: true });
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route("bk.prestasi.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const badgeClass = (v: string) => {
        const map: Record<string, string> = {
            akademik: "bg-blue-100 text-blue-700",
            "non-akademik": "bg-purple-100 text-purple-700",
            olahraga: "bg-green-100 text-green-700",
            seni: "bg-pink-100 text-pink-700",
        };
        return map[v] || "bg-gray-100 text-gray-700";
    };

    const columns: Column[] = [
        { key: "siswa", label: "Siswa", render: (_v: any, row: any) => row.siswa?.nama_lengkap || "-" },
        { key: "prestasi", label: "Prestasi" },
        { key: "kategori", label: "Kategori", render: (v: string) => (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeClass(v)}`}>{v}</span>
        )},
        { key: "tingkat", label: "Tingkat", render: (v: string) => (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{v}</span>
        )},
        { key: "poin_prestasi", label: "Poin", render: (v: number) => (
            v > 0 ? <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">{v} poin</span> : "-"
        )},
        { key: "verified_by_bk", label: "Verified BK", render: (v: boolean) => (
            v ? (
                <span className="flex items-center justify-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-3 h-3" />
                    Ya
                </span>
            ) : (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">Belum</span>
            )
        )},
        { key: "tanggal", label: "Tanggal" },
    ];

    return (
        <>
            <Head title="Prestasi Siswa" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Prestasi Siswa</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Kelola prestasi siswa</p>
                    </div>
                    <Link href={route("bk.prestasi.create")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm">
                        <Plus className="w-4 h-4" />
                        Tambah Prestasi
                    </Link>
                </div>

                {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                            <select value={kategori} onChange={e => setKategori(e.target.value)} className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm">
                                <option value="">Semua</option>
                                <option value="akademik">Akademik</option>
                                <option value="non-akademik">Non-Akademik</option>
                                <option value="olahraga">Olahraga</option>
                                <option value="seni">Seni</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
                            <select value={tingkat} onChange={e => setTingkat(e.target.value)} className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm">
                                <option value="">Semua</option>
                                <option value="sekolah">Sekolah</option>
                                <option value="kecamatan">Kecamatan</option>
                                <option value="kabupaten_kota">Kabupaten/Kota</option>
                                <option value="provinsi">Provinsi</option>
                                <option value="nasional">Nasional</option>
                                <option value="internasional">Internasional</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Verifikasi BK</label>
                            <select value={verified} onChange={e => setVerified(e.target.value)} className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm">
                                <option value="">Semua</option>
                                <option value="true">Sudah Diverifikasi</option>
                                <option value="false">Belum Diverifikasi</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cari</label>
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nama/prestasi..." className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm" />
                        </div>
                        <div className="flex items-end gap-2">
                            <button onClick={handleFilter} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">Filter</button>
                            <Link href={route("bk.prestasi.index")} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Reset</Link>
                        </div>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={prestasi?.data || []}
                    pagination={prestasi}
                    actions={(row: any) => [
                        { icon: "edit", onClick: () => Inertia.visit(route("bk.prestasi.edit", row.id)), label: "Edit" },
                        { icon: "delete", onClick: () => setDeleteTarget(row), label: "Hapus" },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Prestasi"
                    message="Yakin ingin menghapus data prestasi ini?"
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
