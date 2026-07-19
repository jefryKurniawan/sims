import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import {
    Search,
    CheckCircle2,
    XCircle,
    Plus,
    FileText,
    Download,
} from "lucide-react";

interface BukuStatus {
    has_profil: boolean;
    has_rekam_medis: boolean;
    has_orang_tua: boolean;
    has_mutasi: boolean;
}

interface SiswaItem {
    id: number;
    nis: string;
    nisn: string;
    nama_lengkap: string;
    jenis_kelamin: string;
    status: string;
    buku_induk: BukuStatus | null;
    kelas_aktif?: {
        kelas?: {
            tingkat: string;
            nama_kelas: string;
        };
    }[];
}

export default function Index() {
    const { siswa, filters, flash, tingkatList } = usePage().props as any;

    const applyFilter = (key: string, value: string) => {
        Inertia.get(
            route("buku-induk.index", { ...filters, [key]: value || "" }),
            {},
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const columns: Column[] = [
        {
            key: "nama_lengkap",
            label: "Nama Lengkap",
            render: (_v: unknown, row: SiswaItem) => (
                <Link
                    href={route("buku-induk.show", row.id)}
                    className="font-medium text-primary hover:underline"
                >
                    {row.nama_lengkap}
                </Link>
            ),
        },
        {
            key: "nisn",
            label: "NISN",
            render: (v: string) => v || "-",
        },
        {
            key: "nis",
            label: "NIS",
            render: (v: string) => v || "-",
        },
        {
            key: "tingkat",
            label: "Kelas",
            render: (_v: unknown, row: SiswaItem) => {
                const k = row.kelas_aktif?.[0]?.kelas;
                return k ? (
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-200 ring-inset">
                        {k.tingkat} {k.nama_kelas}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">-</span>
                );
            },
        },
        {
            key: "status",
            label: "Status",
            render: (_v: unknown, row: SiswaItem) => {
                const labels: Record<string, string> = {
                    aktif: "Aktif",
                    lulus: "Lulus",
                    pindah: "Pindah",
                    keluar: "Keluar",
                };
                const colors: Record<string, string> = {
                    aktif: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 ring-inset",
                    lulus: "bg-blue-50 text-blue-700 ring-1 ring-blue-200 ring-inset",
                    pindah: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 ring-inset",
                    keluar: "bg-red-50 text-red-700 ring-1 ring-red-200 ring-inset",
                };
                return (
                    <span
                        className={
                            "inline-flex px-2 py-0.5 text-xs font-medium rounded-full " +
                            (colors[row.status] || "bg-gray-50 text-gray-700 ring-1 ring-gray-200 ring-inset")
                        }
                    >
                        {labels[row.status] || row.status}
                    </span>
                );
            },
        },
        {
            key: "kelengkapan",
            label: "Kelengkapan",
            render: (_v: unknown, row: SiswaItem) => {
                const b: BukuStatus = row.buku_induk || {
                    has_profil: false,
                    has_rekam_medis: false,
                    has_orang_tua: false,
                    has_mutasi: false,
                };
                const items = [
                    { label: "Profil", ok: b.has_profil, title: "Data profil siswa" },
                    { label: "Medis", ok: b.has_rekam_medis, title: "Rekam medis" },
                    { label: "Ortu", ok: b.has_orang_tua, title: "Data orang tua/wali" },
                    { label: "Mutasi", ok: b.has_mutasi, title: "Riwayat mutasi" },
                ];
                return (
                    <div className="flex flex-wrap gap-1">
                        {items.map((it) => (
                            <span
                                key={it.label}
                                title={it.title}
                                className={
                                    "inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-medium rounded " +
                                    (it.ok
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-gray-50 text-gray-400")
                                }
                            >
                                {it.ok ? (
                                    <CheckCircle2 className="h-3 w-3" />
                                ) : (
                                    <XCircle className="h-3 w-3" />
                                )}
                                {it.label}
                            </span>
                        ))}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Head title="Buku Induk Digital" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Buku Induk Digital
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Profil lengkap, rekam medis, data orang tua, dan
                            riwayat mutasi siswa
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Link
                            href={route("buku-induk.cetak-semua", {
                                tingkat: filters?.tingkat || undefined,
                            })}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition shadow-sm"
                        >
                            <FileText className="h-4 w-4" />
                            Cetak Semua
                        </Link>
                        <Link
                            href={route("buku-induk.cetak-pdf-massal", {
                                tingkat: filters?.tingkat || undefined,
                            })}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition shadow-sm"
                        >
                            <Download className="h-4 w-4" />
                            PDF Massal
                        </Link>
                        <Link
                            href={route("users.murid.create")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition shadow-sm"
                        >
                            <Plus className="h-4 w-4" />
                            Tambah
                        </Link>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm font-medium">
                        {flash.error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1 max-w-md">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const q = (
                                        e.currentTarget.querySelector(
                                            "input[name=search]",
                                        ) as HTMLInputElement
                                    ).value;
                                    Inertia.get(
                                        route("buku-induk.index", {
                                            ...filters,
                                            search: q,
                                        }),
                                        {},
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                                className="flex gap-2"
                            >
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="search"
                                        name="search"
                                        defaultValue={filters?.search ?? ""}
                                        placeholder="Cari nama / NIS / NISN..."
                                        className="w-full pl-10 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition shadow-sm"
                                >
                                    Cari
                                </button>
                            </form>
                        </div>
                        <select
                            value={filters?.tingkat || ""}
                            onChange={(e) =>
                                applyFilter("tingkat", e.target.value)
                            }
                            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors w-full sm:w-40"
                        >
                            <option value="">Semua Kelas</option>
                            {(tingkatList || []).map((t: string) => (
                                <option key={t} value={t}>
                                    Kelas {t}
                                </option>
                            ))}
                        </select>
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
                    />
                </div>
            </div>
        </>
    );
}
