import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Plus, Upload, MoveRight, ChevronLeft, Filter } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import ImportModal from "@/Components/ImportModal";

interface SiswaRow {
    id: number;
    nama_lengkap: string;
    nisn: string;
    nis?: string;
    kelasAktif?: { kelas?: { nama_kelas: string } } | null;
    kelas_aktif?: { kelas?: { nama_kelas: string } } | null;
    status: string;
}

interface Props {
    tingkat: string;
    siswa: any;
    variants: string[];
    kelasList: { id: number; nama_kelas: string }[];
}

export default function Tingkat({ tingkat, variants, kelasList }: Props) {
    const { siswa, flash } = usePage().props as unknown as {
        siswa: any;
        flash?: any;
        [k: string]: any;
    };
    const [showImport, setShowImport] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showMigrate, setShowMigrate] = useState(false);
    const [targetKelasId, setTargetKelasId] = useState<string>("");
    const [migrating, setMigrating] = useState(false);

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const handleFilterChange = (variant: string) => {
        const params = new URLSearchParams(window.location.search);
        if (variant) params.set("variant", variant);
        else params.delete("variant");
        params.set("page", "1");
        Inertia.visit(
            route("users.murid.tingkat", tingkat) + "?" + params.toString(),
        );
    };

    const handleMigrate = () => {
        if (!targetKelasId || selectedIds.length === 0) return;
        setMigrating(true);
        Inertia.post(
            route("users.murid.promote"),
            {
                siswa_ids: selectedIds,
                target_kelas_id: parseInt(targetKelasId, 10),
            },
            {
                onSuccess: () => {
                    setShowMigrate(false);
                    setSelectedIds([]);
                    setTargetKelasId("");
                    setMigrating(false);
                },
                onError: () => setMigrating(false),
            },
        );
    };

    const statusColors: Record<string, string> = {
        Aktif: "bg-emerald-100 text-emerald-700",
        Pindah: "bg-yellow-100 text-yellow-700",
        Lulus: "bg-blue-100 text-blue-700",
        Dropout: "bg-destructive/10 text-destructive",
    };

    const columns: Column[] = [
        // ponytail: kolom checkbox pemilihan siswa paling kiri
        {
            key: "_select",
            label: "",
            className: "w-10",
            wrapClass: "text-center",
            render: (_v: any, row: SiswaRow) => (
                <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                    aria-label={`Pilih ${row.nama_lengkap}`}
                    className="w-4 h-4 rounded border-primary/20 text-primary focus:outline-none focus:ring-ring/20 cursor-pointer"
                />
            ),
        },
        { key: "nama_lengkap", label: "Nama" },
        { key: "nisn", label: "NISN", render: (v: string) => v || "-" },
        { key: "nis", label: "NIS", render: (v: string) => v || "-" },
        {
            key: "kelas",
            label: "Kelas",
            render: (_v: any, row: SiswaRow) =>
                row.kelas_aktif?.kelas?.nama_kelas || "-",
        },
        {
            key: "status",
            label: "Status",
            render: (v: string) => (
                <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[v] || "bg-gray-100 text-gray-700"}`}
                >
                    {v}
                </span>
            ),
        },
    ];

    return (
        <>
            <Head title={`Data Siswa Kelas ${tingkat}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route("users.murid.index")}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
                            aria-label="Kembali ke daftar angkatan"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                                Data Siswa Kelas {tingkat}
                            </h1>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Filter per variant, import template, atau
                                pindahkan siswa antar kelas
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route("users.murid.create")}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Siswa Baru
                        </Link>
                        <button
                            onClick={() => setShowImport(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-semibold shadow-sm"
                        >
                            <Upload className="w-4 h-4" />
                            Import
                        </button>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-destructive/10 text-destructive border-destructive/20 rounded-lg text-sm font-medium">
                        {flash.error}
                    </div>
                )}

                <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Filter className="w-4 h-4 text-gray-400" />
                                Variant:
                            </div>
                            <button
                                onClick={() => handleFilterChange("")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                    !new URL(
                                        window.location.href,
                                    ).searchParams.get("variant")
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                Semua
                            </button>
                            {variants.map((v) => {
                                const active =
                                    new URL(
                                        window.location.href,
                                    ).searchParams.get("variant") === v;
                                return (
                                    <button
                                        key={v}
                                        onClick={() => handleFilterChange(v)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                            active
                                                ? "bg-primary text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {tingkat}
                                        {v}
                                    </button>
                                );
                            })}
                        </div>

                        {selectedIds.length > 0 && (
                            <button
                                onClick={() => setShowMigrate(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-sm font-semibold shadow-sm"
                            >
                                <MoveRight className="w-4 h-4" />
                                Pindahkan {selectedIds.length} siswa
                            </button>
                        )}
                    </div>

                    <AdminTable
                        columns={columns}
                        rows={siswa?.data || []}
                        pagination={{
                            current_page: siswa?.current_page,
                            last_page: siswa?.last_page,
                            per_page: siswa?.per_page,
                            from: siswa?.from,
                            to: siswa?.to,
                            total: siswa?.total,
                            links: siswa?.links,
                        }}
                        actions={(row: SiswaRow) => [
                            {
                                icon: "eye",
                                onClick: () =>
                                    Inertia.visit(
                                        route("users.murid.show", row.id),
                                    ),
                                label: "Detail",
                            },
                            {
                                icon: "edit",
                                onClick: () =>
                                    Inertia.visit(
                                        route("users.murid.edit", row.id),
                                    ),
                                label: "Edit",
                            },
                            {
                                icon: "delete",
                                onClick: () => {
                                    if (confirm(`Hapus ${row.nama_lengkap}?`)) {
                                        Inertia.delete(
                                            route(
                                                "users.murid.destroy",
                                                row.id,
                                            ),
                                        );
                                    }
                                },
                                label: "Hapus",
                            },
                        ]}
                    />
                </div>

                <ImportModal
                    open={showImport}
                    onClose={() => setShowImport(false)}
                    title={`Import Siswa Kelas ${tingkat}`}
                    templateRouteXlsx={
                        route("users.murid.template") + "?format=xlsx"
                    }
                    templateRouteCsv={
                        route("users.murid.template") + "?format=csv"
                    }
                    importRoute={route("users.murid.import")}
                />

                {showMigrate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                Pindahkan Siswa
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {selectedIds.length} siswa akan dipindahkan ke
                                kelas tujuan.
                            </p>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Kelas Tujuan
                            </label>
                            <select
                                value={targetKelasId}
                                onChange={(e) =>
                                    setTargetKelasId(e.target.value)
                                }
                                className="w-full px-4 py-2.5 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            >
                                <option value="">Pilih kelas tujuan</option>
                                {kelasList.map((k: any) => (
                                    <option key={k.id} value={k.id}>
                                        {k.nama_kelas}{" "}
                                        {k.jurusan?.nama
                                            ? `(${k.jurusan.nama})`
                                            : ""}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    onClick={() => setShowMigrate(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                    disabled={migrating}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleMigrate}
                                    disabled={!targetKelasId || migrating}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 disabled:opacity-50"
                                >
                                    {migrating ? "Memindahkan..." : "Pindahkan"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
