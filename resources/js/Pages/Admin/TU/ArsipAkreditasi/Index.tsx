import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import { Plus, Search, Filter, FolderTree, ArrowRightLeft } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ConfirmModal from "@/Components/ConfirmModal";
import { useState } from "react";

export default function Index() {
    const {
        arsipAkreditasi,
        filters = {
            standar: "",
            sub_standar: "",
            tahun_ajaran: "",
            status: "",
            search: "",
        },
        tahunAjaranList,
    } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [showTreeModal, setShowTreeModal] = useState(false);
    const [selectedTahunAjaran, setSelectedTahunAjaran] = useState("");

    const handleFilter = (key: string, value: string) => {
        const params: Record<string, string> = { ...(filters || {}) };
        if (value) params[key] = value;
        else delete params[key];
        delete params.page;
        router.get(route("tu.arsip-akreditasi.index"), params);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route("tu.arsip-akreditasi.destroy", deleteTarget.id));
        setDeleteTarget(null);
    };

    const getStatusBadge = (status: string) => {
        return status === "lengkap"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700";
    };

    const getStandarLabel = (standar: number) => {
        const labels: Record<number, string> = {
            1: "Standar 1 - Visi, Misi, Tujuan, Sasaran, Strategi",
            2: "Standar 2 - Pemerintahan & Kepemimpinan",
            3: "Standar 3 - Peserta Didik",
            4: "Standar 4 - SDM",
            5: "Standar 5 - Sarana, Prasarana, & Anggaran",
            6: "Standar 6 - Kurikulum & Pembelajaran",
            7: "Standar 7 - Penilaian",
            8: "Standar 8 - Kemitraan",
        };
        return `${standar}. ${labels[standar] || ""}`;
    };

    const columns: Column[] = [
        {
            key: "standar",
            label: "Standar",
            render: (v: number) => getStandarLabel(v),
        },
        { key: "sub_standar", label: "Sub Standar" },
        { key: "butir", label: "Butir" },
        { key: "nama_dokumen", label: "Nama Dokumen" },
        { key: "tahun_ajaran", label: "Tahun Ajaran" },
        {
            key: "status",
            label: "Status",
            render: (v: string) => (
                <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(v)}`}
                >
                    {v === "lengkap" ? "Lengkap" : "Belum"}
                </span>
            ),
        },
        {
            key: "penanggung_jawab",
            label: "Penanggung Jawab",
            render: (_v: any, row: any) => row.penanggung_jawab?.name || "-",
        },
    ];

    return (
        <>
            <Head title="Arsip Akreditasi" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Arsip Akreditasi
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Kelola dokumen akreditasi per standar
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={route("tu.arsip-akreditasi.create")}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Dokumen
                        </Link>
                        <Link
                            href={`#`}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowTreeModal(true);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-accent transition"
                        >
                            <FolderTree className="w-4 h-4" />
                            Tree View
                        </Link>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cari
                            </label>
                            <input
                                type="text"
                                placeholder="Nama dokumen, butir..."
                                defaultValue={filters.search}
                                onBlur={(e) =>
                                    handleFilter("search", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Standar
                            </label>
                            <select
                                value={filters.standar}
                                onChange={(e) =>
                                    handleFilter("standar", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            >
                                <option value="">Semua</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                                    <option key={s} value={s.toString()}>
                                        {getStandarLabel(s)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sub Standar
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: 1.1"
                                defaultValue={filters.sub_standar}
                                onBlur={(e) =>
                                    handleFilter("sub_standar", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tahun Ajaran
                            </label>
                            <select
                                value={filters.tahun_ajaran}
                                onChange={(e) =>
                                    handleFilter("tahun_ajaran", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            >
                                <option value="">Semua</option>
                                {tahunAjaranList.map((t: string) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) =>
                                    handleFilter("status", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            >
                                <option value="">Semua</option>
                                <option value="lengkap">Lengkap</option>
                                <option value="belum">Belum</option>
                            </select>
                        </div>
                        <div className="md:col-span-6 flex justify-end gap-2 pt-4">
                            <button
                                onClick={() =>
                                    router.get(
                                        route("tu.arsip-akreditasi.index"),
                                    )
                                }
                                className="px-4 py-2 border border-primary/20 rounded-lg text-sm hover:bg-accent transition"
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={arsipAkreditasi?.data || []}
                    pagination={{
                        current_page: arsipAkreditasi?.current_page,
                        last_page: arsipAkreditasi?.last_page,
                        per_page: arsipAkreditasi?.per_page,
                        from: arsipAkreditasi?.from,
                        to: arsipAkreditasi?.to,
                        total: arsipAkreditasi?.total,
                        links: arsipAkreditasi?.links,
                    }}
                    actions={(row) => [
                        {
                            icon: "edit",
                            onClick: () =>
                                router.visit(
                                    route("tu.arsip-akreditasi.edit", row.id),
                                ),
                            label: "Edit",
                        },
                        {
                            icon: "delete",
                            onClick: () => setDeleteTarget(row),
                            label: "Hapus",
                        },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Dokumen Akreditasi"
                    message={`Yakin ingin menghapus "${deleteTarget?.nama_dokumen || ""}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />

                {showTreeModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="fixed inset-0 bg-black/50"
                                onClick={() => {
                                    setShowTreeModal(false);
                                    setSelectedTahunAjaran("");
                                }}
                            />
                            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto">
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Tree View Arsip Akreditasi
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <select
                                            value={selectedTahunAjaran}
                                            onChange={(e) =>
                                                setSelectedTahunAjaran(
                                                    e.target.value,
                                                )
                                            }
                                            className="px-3 py-1.5 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        >
                                            <option value="">
                                                Pilih Tahun Ajaran
                                            </option>
                                            {tahunAjaranList.map(
                                                (t: string) => (
                                                    <option key={t} value={t}>
                                                        {t}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        <button
                                            onClick={() => {
                                                setShowTreeModal(false);
                                                setSelectedTahunAjaran("");
                                            }}
                                            className="p-1 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                {selectedTahunAjaran && (
                                    <TreeView
                                        tahunAjaran={selectedTahunAjaran}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// TreeView component
function TreeView({ tahunAjaran }: { tahunAjaran: string }) {
    const [tree, setTree] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        router.get(route("tu.arsip-akreditasi.tree", tahunAjaran), {
            onSuccess: (page: any) => {
                setTree(page.props.tree);
                setLoading(false);
            },
        });
    }, [tahunAjaran]);

    useEffect(() => {
        setTree(null);
        setLoading(true);
    }, [tahunAjaran]);

    const getStatusBadge = (status: string) => {
        return status === "lengkap"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700";
    };

    const getStandarLabel = (standar: number) => {
        const labels: Record<number, string> = {
            1: "Standar 1 - Visi, Misi, Tujuan, Sasaran, Strategi",
            2: "Standar 2 - Pemerintahan & Kepemimpinan",
            3: "Standar 3 - Peserta Didik",
            4: "Standar 4 - SDM",
            5: "Standar 5 - Sarana, Prasarana, & Anggaran",
            6: "Standar 6 - Kurikulum & Pembelajaran",
            7: "Standar 7 - Penilaian",
            8: "Standar 8 - Kemitraan",
        };
        return `${standar}. ${labels[standar] || ""}`;
    };

    if (loading) return <div className="text-center py-8">Memuat...</div>;
    if (!tree || Object.keys(tree).length === 0)
        return (
            <div className="text-center py-8 text-gray-500">
                Tidak ada data untuk tahun ajaran ini
            </div>
        );

    return (
        <div className="p-4 space-y-2">
            {Object.entries(tree).map(
                ([standarNum, subStandar]: [string, any]) => (
                    <details
                        key={standarNum}
                        className="mb-4 border border-gray-100 rounded-lg overflow-hidden"
                    >
                        <summary className="p-3 bg-gray-50 cursor-pointer font-semibold text-gray-900 flex items-center gap-2">
                            <FolderTree className="w-5 h-5 text-primary" />
                            {getStandarLabel(parseInt(standarNum))}
                        </summary>
                        <div className="p-3">
                            {Object.entries(subStandar).map(
                                ([subStandarKey, butir]: [string, any]) => (
                                    <details
                                        key={subStandarKey}
                                        className="ml-4 mb-3 border-l-2 border-gray-100 pl-3"
                                    >
                                        <summary className="p-2 cursor-pointer font-medium text-gray-700">
                                            Sub Standar {subStandarKey}
                                        </summary>
                                        <div className="p-2">
                                            {Object.entries(butir).map(
                                                ([butirKey, dokumen]: [
                                                    string,
                                                    any,
                                                ]) => (
                                                    <details
                                                        key={butirKey}
                                                        className="ml-4 mb-2 border-l-2 border-primary/20 pl-3"
                                                    >
                                                        <summary className="p-1 cursor-pointer font-medium text-gray-600 text-sm">
                                                            Butir {butirKey}
                                                        </summary>
                                                        <ul className="ml-2 mt-1 space-y-1">
                                                            {dokumen.map(
                                                                (doc: any) => (
                                                                    <li
                                                                        key={
                                                                            doc.id
                                                                        }
                                                                        className="flex items-center gap-2 text-sm text-gray-700"
                                                                    >
                                                                        <FileText className="w-4 h-4 text-primary" />
                                                                        <span>
                                                                            {
                                                                                doc.nama_dokumen
                                                                            }
                                                                        </span>
                                                                        <span
                                                                            className={`inline-flex px-1.5 py-0.5 rounded text-xs font-medium ${getStatusBadge(doc.status)}`}
                                                                        >
                                                                            {doc.status ===
                                                                            "lengkap"
                                                                                ? "Lengkap"
                                                                                : "Belum"}
                                                                        </span>
                                                                        <span className="text-gray-400">
                                                                            {doc
                                                                                .penanggung_jawab
                                                                                ?.name ||
                                                                                ""}
                                                                        </span>
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </details>
                                                ),
                                            )}
                                        </div>
                                    </details>
                                ),
                            )}
                        </div>
                    </details>
                ),
            )}
        </div>
    );
}
