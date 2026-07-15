import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import { Search, BookOpen, CheckCircle2, XCircle } from "lucide-react";

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
}

export default function Index() {
    const { siswa, filters, flash } = usePage().props as any;

    const columns: Column[] = [
        {
            key: "nama_lengkap",
            label: "Nama Siswa",
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
            className: "w-28",
        },
        {
            key: "nis",
            label: "NIS",
            render: (v: string) => v || "-",
            className: "w-28",
        },
        {
            key: "status",
            label: "Status",
            className: "w-24",
            render: (_v: unknown, row: SiswaItem) => {
                const colors: Record<string, string> = {
                    aktif: "bg-emerald-100 text-emerald-700",
                    lulus: "bg-blue-100 text-blue-700",
                    pindah: "bg-amber-100 text-amber-700",
                    keluar: "bg-destructive/10 text-destructive",
                };
                return (
                    <span
                        className={
                            "inline-flex px-2 py-0.5 text-xs font-medium rounded-full " +
                            (colors[row.status] || "bg-gray-100 text-gray-700")
                        }
                    >
                        {row.status}
                    </span>
                );
            },
        },
        {
            key: "kelengkapan",
            label: "Kelengkapan",
            className: "w-48",
            render: (_v: unknown, row: SiswaItem) => {
                const b: BukuStatus = row.buku_induk || {
                    has_profil: false,
                    has_rekam_medis: false,
                    has_orang_tua: false,
                    has_mutasi: false,
                };
                const items = [
                    { label: "P", ok: b.has_profil },
                    { label: "M", ok: b.has_rekam_medis },
                    { label: "O", ok: b.has_orang_tua },
                ];
                return (
                    <div className="flex gap-1">
                        {items.map((it) => (
                            <span
                                key={it.label}
                                className={
                                    "inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium rounded " +
                                    (it.ok
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-gray-100 text-gray-400")
                                }
                            >
                                {it.ok ? (
                                    <CheckCircle2 className="h-2.5 w-2.5" />
                                ) : (
                                    <XCircle className="h-2.5 w-2.5" />
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

                <div className="bg-white rounded-lg border">
                    <div className="p-4 border-b">
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
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
