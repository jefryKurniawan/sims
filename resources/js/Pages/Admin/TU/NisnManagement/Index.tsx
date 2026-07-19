import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import { Search, RefreshCw, ArrowRightLeft, RotateCcw, Users } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import type { Column } from "@/Components/AdminTable";
import { useState } from "react";

const CrossIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const AlertTriangleIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const AlertCircleIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const EyeIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export default function Index() {
    const { siswa, filters = { search: "", nisn_status: "", jurusan_id: "" }, stats, jurusanList } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [showRegenerateModal, setShowRegenerateModal] = useState<any>(null);
    const [regenerateReason, setRegenerateReason] = useState("");
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [bulkRegenerateReason, setBulkRegenerateReason] = useState("");
    const [showBulkRegenerateModal, setShowBulkRegenerateModal] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [syncStatus, setSyncStatus] = useState<{ synced: number; total: number; unmapped: string[] } | null>(null);

    // Filter state
    const [search, setSearch] = useState(filters?.search || "");
    const [nisnStatusFilter, setNisnStatusFilter] = useState(filters?.nisn_status || "");
    const [jurusanFilter, setJurusanFilter] = useState(filters?.jurusan_id || "");

    const handleSearch = () => {
        router.get(
            route("tu.nisn-management.index"),
            { search, nisn_status: nisnStatusFilter, jurusan_id: jurusanFilter },
            { preserveState: true, replace: true },
        );
    };

    const handleSelectAll = (checked: boolean) => {
        checked ? setSelectedRows(siswa.data.map((s: any) => s.id)) : setSelectedRows([]);
    };

    const handleRowSelect = (id: number, checked: boolean) => {
        checked ? setSelectedRows([...selectedRows, id]) : setSelectedRows(selectedRows.filter((r) => r !== id));
    };

    const handleRegenerateClick = (s: any) => {
        setShowRegenerateModal(s);
        setRegenerateReason("");
    };

    const handleRegenerateConfirm = () => {
        if (!showRegenerateModal || !regenerateReason.trim()) return;
        router.post(route("tu.nisn-management.regenerate", showRegenerateModal.id), { reason: regenerateReason }, {
            onSuccess: () => setShowRegenerateModal(null),
        });
    };

    const handleBulkRegenerateOpen = () => {
        if (selectedRows.length === 0) return;
        setShowBulkRegenerateModal(true);
        setBulkRegenerateReason("");
    };

    const handleBulkRegenerateConfirm = () => {
        if (selectedRows.length === 0 || !bulkRegenerateReason.trim()) return;
        router.post(route("tu.nisn-management.bulk-regenerate"), { siswa_ids: selectedRows, reason: bulkRegenerateReason }, {
            onSuccess: () => { setShowBulkRegenerateModal(false); setSelectedRows([]); },
        });
    };

    const handleSyncDapodik = () => {
        setShowSyncModal(true);
        setSyncStatus(null);
        router.post(route("tu.nisn-management.sync-dapodik"), {}, {
            onSuccess: (page) => {
                if (page.props.syncResult) {
                    const { synced, total_received, unmapped } = page.props.syncResult;
                    setSyncStatus({ synced, total: total_received, unmapped });
                }
            },
            onError: () => setShowSyncModal(false),
        });
    };

    const handleVerify = async (s: any) => {
        await router.post(route("tu.nisn-management.verify", s.id), {});
    };

    const getNisnBadge = (nisn: string | null) => {
        if (!nisn || nisn === "") {
            return <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Kosong</span>;
        }
        if (nisn.length !== 10 || !/^[0-9]{10}$/.test(nisn)) {
            return <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Format Invalid</span>;
        }
        return <span className="font-mono text-sm text-gray-700">{nisn}</span>;
    };

    const getStatusBadge = (s: any) => {
        const issues: string[] = [];
        if (!s.nisn || s.nisn === "") issues.push("Kosong");
        if (s.nisn && (s.nisn.length !== 10 || !/^[0-9]{10}$/.test(s.nisn))) issues.push("Format Invalid");
        return issues.length > 0
            ? <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">{issues.join(", ")}</span>
            : <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Valid</span>;
    };

    const columns: Column[] = [
        { key: "nisn", label: "NISN", render: (v: string, row: any) => (
            <div className="flex items-center gap-2">
                {getNisnBadge(v)}
                <button onClick={() => handleVerify(row)} className="p-1 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition" title="Verifikasi NISN">
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>
        )},
        { key: "nama_lengkap", label: "Nama Lengkap" },
        { key: "nis", label: "NIS", render: (v: string) => v ? <span className="font-mono text-sm text-gray-700">{v}</span> : <span className="text-gray-400">-</span> },
        { key: "jurusan", label: "Jurusan", render: (v: string, row: any) => row.jurusan?.nama || "-" },
        { key: "kelas", label: "Kelas", render: (v: string, row: any) => row.kelasAktif?.kelas?.nama_kelas || "-" },
        { key: "status", label: "Status NISN", render: (v: string, row: any) => getStatusBadge(row) },
        { key: "actions", label: "Aksi", render: (v: string, row: any) => (
            <div className="flex items-center gap-1">
                <Link href={route("tu.nisn-management.show", row.id)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition" title="Detail">
                    <EyeIcon />
                </Link>
                <button onClick={() => handleRegenerateClick(row)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition" title="Regenerate NISN">
                    <ArrowRightLeft className="w-4 h-4" />
                </button>
            </div>
        )},
    ];

    const statusFilterOptions = [
        { value: "", label: "Semua Status" },
        { value: "valid", label: "Valid" },
        { value: "empty", label: "Kosong" },
        { value: "duplicate", label: "Duplikat" },
        { value: "invalid_format", label: "Format Invalid" },
    ];

    return (
        <>
            <Head title="Manajemen NISN" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Manajemen NISN</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Verifikasi, regenerate, dan kelola NISN siswa</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={handleBulkRegenerateOpen} disabled={selectedRows.length === 0}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            <RefreshCw className="w-4 h-4" /> Regenerate Terpilih ({selectedRows.length})
                        </button>
                        <button onClick={handleSyncDapodik} className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                            <ArrowRightLeft className="w-4 h-4" /> Sync Dapodik
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><Users className="w-5 h-5 text-gray-600" /></div>
                            <div><p className="text-sm font-medium text-gray-500">Total Siswa</p><p className="text-2xl font-bold text-gray-900">{stats.total}</p></div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><CrossIcon /></div>
                            <div><p className="text-sm font-medium text-gray-500">NISN Kosong</p><p className="text-2xl font-bold text-red-600">{stats.empty}</p></div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center"><AlertTriangleIcon /></div>
                            <div><p className="text-sm font-medium text-gray-500">Duplikat</p><p className="text-2xl font-bold text-yellow-600">{stats.duplicate}</p></div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"><AlertCircleIcon /></div>
                            <div><p className="text-sm font-medium text-gray-500">Format Invalid</p><p className="text-2xl font-bold text-orange-600">{stats.invalid_format}</p></div>
                        </div>
                    </div>
                </div>

                {/* Filters - konsisten dengan SuratMasuk/SuratKeluar */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-end">
                    <div className="flex-1 min-w-[160px]">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Cari</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Nama, NISN, NIS, No HP..." className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Status NISN</label>
                        <select value={nisnStatusFilter} onChange={(e) => setNisnStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20">
                            {statusFilterOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Jurusan</label>
                        <select value={jurusanFilter} onChange={(e) => setJurusanFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20">
                            <option value="">Semua Jurusan</option>
                            {jurusanList?.map((j: any) => <option key={j.id} value={j.id}>{j.nama}</option>)}
                        </select>
                    </div>
                    <button type="button" onClick={handleSearch} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition">Filter</button>
                </div>

                <AdminTable columns={columns} rows={siswa?.data || []} pagination={{
                    current_page: siswa?.current_page, last_page: siswa?.last_page, per_page: siswa?.per_page,
                    from: siswa?.from, to: siswa?.to, total: siswa?.total, links: siswa?.links,
                }} actions={(row) => [
                    { icon: "eye", onClick: () => router.visit(route("tu.nisn-management.show", row.id)), label: "Detail" },
                    { icon: "refresh", onClick: () => handleRegenerateClick(row), label: "Regenerate NISN" },
                ]} />

                <ConfirmModal open={!!showRegenerateModal} title="Regenerate NISN"
                    message={`Regenerate NISN untuk siswa "${showRegenerateModal?.nama_lengkap}"?`}
                    onConfirm={handleRegenerateConfirm} onCancel={() => { setShowRegenerateModal(null); setRegenerateReason(""); }}
                    confirmButtonText="Regenerate" inputType="textarea" inputPlaceholder="Alasan regenerate..."
                    inputValue={regenerateReason} onInputChange={setRegenerateReason} inputRequired />

                <ConfirmModal open={showBulkRegenerateModal} title="Bulk Regenerate NISN"
                    message={`Regenerate NISN untuk ${selectedRows.length} siswa terpilih?`}
                    onConfirm={handleBulkRegenerateConfirm} onCancel={() => { setShowBulkRegenerateModal(false); setBulkRegenerateReason(""); }}
                    confirmButtonText="Regenerate Semua" inputType="textarea" inputPlaceholder="Alasan regenerate massal..."
                    inputValue={bulkRegenerateReason} onInputChange={setBulkRegenerateReason} inputRequired />

                {showSyncModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => { setShowSyncModal(false); setSyncStatus(null); }}>
                        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Sync Dapodik</h2>
                                <button onClick={() => { setShowSyncModal(false); setSyncStatus(null); }} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            {syncStatus ? (
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-3"><RotateCcw className="w-8 h-8 text-green-600 animate-spin" /></div>
                                        <h3 className="text-lg font-medium text-gray-900">Sinkronisasi Selesai</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="p-3 bg-green-50 rounded-lg"><p className="text-2xl font-bold text-green-700">{syncStatus.synced}</p><p className="text-xs text-green-600">Disinkronisasi</p></div>
                                        <div className="p-3 bg-blue-50 rounded-lg"><p className="text-2xl font-bold text-blue-700">{syncStatus.total}</p><p className="text-xs text-blue-600">Total Diterima</p></div>
                                        <div className="p-3 bg-orange-50 rounded-lg"><p className="text-2xl font-bold text-orange-700">{syncStatus.unmapped.length}</p><p className="text-xs text-orange-600">Tidak Ditemukan</p></div>
                                    </div>
                                    {syncStatus.unmapped.length > 0 && (
                                        <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-3">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Siswa tidak ditemukan di sistem lokal:</p>
                                            <ul className="space-y-1 text-xs text-gray-600">
                                                {syncStatus.unmapped.slice(0, 20).map((item, idx) => <li key={idx} className="truncate">{item}</li>)}
                                                {syncStatus.unmapped.length > 20 && <li className="text-gray-400 italic">... dan {syncStatus.unmapped.length - 20} lagi</li>}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="flex justify-end gap-2 pt-4">
                                        <button onClick={() => { setShowSyncModal(false); setSyncStatus(null); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Tutup</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8"><RotateCcw className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" /><p className="text-gray-600">Mengambil data siswa dari Dapodik...</p></div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
