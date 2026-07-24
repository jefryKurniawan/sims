/// <reference types="vite/client" />
import React from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Plus,
    Download,
    Filter,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface NilaiFormatif {
    id: number;
    rapor_siswa: { id: number; siswa: { nama_lengkap: string } } | null;
    rapor_mapel: { id: number; nama_mapel: string } | null;
    tujuan_pembelajaran: { id: number; kode_tp: string } | null;
    jenis: string;
    tanggal: string;
    nilai: number;
    catatan: string | null;
}

interface NilaiSumatif {
    id: number;
    rapor_siswa: { id: number; siswa: { nama_lengkap: string } } | null;
    rapor_mapel: { id: number; nama_mapel: string } | null;
    jenis: string;
    tanggal: string;
    nilai: number;
}

interface Mapel {
    id: number;
    nama_mapel: string;
}

interface Props {
    nilaiFormatif: {
        data: NilaiFormatif[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    nilaiSumatif: {
        data: NilaiSumatif[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    mapels: Mapel[];
    filters: {
        rapor_mapel_id?: string;
        tanggal_from?: string;
        tanggal_to?: string;
    };
}

export default function Index({
    nilaiFormatif,
    nilaiSumatif,
    mapels,
    filters,
}: Props) {
    const [activeTab, setActiveTab] = React.useState<"formatif" | "sumatif">(
        "formatif",
    );

    const form = useForm({
        rapor_mapel_id: filters.rapor_mapel_id || "",
        tanggal_from: filters.tanggal_from || "",
        tanggal_to: filters.tanggal_to || "",
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = route("erapor.nilai.index", {
            rapor_mapel_id: form.data.rapor_mapel_id || undefined,
            tanggal_from: form.data.tanggal_from || undefined,
            tanggal_to: form.data.tanggal_to || undefined,
        } as any);
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const renderPagination = (paginator: Props["nilaiFormatif"]) => (
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <span className="text-sm text-muted-foreground">
                Halaman {paginator.current_page} dari {paginator.last_page}
            </span>
            <div className="flex gap-1">
                {paginator.links.map((link, i) => {
                    const isDisabled = !link.url || link.label.includes("Previous") || link.label.includes("Next");
                    return (
                        <div
                            key={i}
                            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-8 w-8 ${
                                link.active
                                    ? "bg-primary text-primary-foreground shadow"
                                    : isDisabled
                                      ? "text-muted-foreground/40 cursor-not-allowed"
                                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                            {...(link.url && !isDisabled
                                ? {
                                      onClick: () => {
                                          window.location.href = link.url!;
                                      },
                                  }
                                : {})}
                            dangerouslySetInnerHTML={{
                                __html: link.label
                                    .replace("Previous", "‹")
                                    .replace("Next", "›"),
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );

    const tabClass = (tab: "formatif" | "sumatif") =>
        `pb-2.5 px-1 text-sm font-medium transition-colors border-b-2 ${
            activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
        }`;

    const nilaiClass = (n: number) =>
        n >= 75 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive";

    return (
        <>
            <Head title="Kelola Nilai" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Kelola Nilai
                            </h1>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Input dan kelola nilai asesmen formatif & sumatif
                            </p>
                        </div>
                        <Link href={route("erapor.nilai.input")}>
                            <Button>
                                <Plus className="w-4 h-4" />
                                Input Nilai
                            </Button>
                        </Link>
                    </div>

                    {/* Filter Card */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                Filter
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFilter}>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-foreground">
                                            Mata Pelajaran
                                        </label>
                                        <select
                                            value={form.data.rapor_mapel_id}
                                            onChange={(e) =>
                                                form.setData(
                                                    "rapor_mapel_id",
                                                    e.target.value,
                                                )
                                            }
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Semua Mapel</option>
                                            {mapels.map((m) => (
                                                <option key={m.id} value={m.id}>
                                                    {m.nama_mapel}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-foreground">
                                            Dari Tanggal
                                        </label>
                                        <Input
                                            type="date"
                                            value={form.data.tanggal_from}
                                            onChange={(e) =>
                                                form.setData(
                                                    "tanggal_from",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-foreground">
                                            Sampai Tanggal
                                        </label>
                                        <Input
                                            type="date"
                                            value={form.data.tanggal_to}
                                            onChange={(e) =>
                                                form.setData(
                                                    "tanggal_to",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            type="submit"
                                            variant="secondary"
                                            className="w-full"
                                        >
                                            <Search className="w-4 h-4" />
                                            Filter
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Tabs */}
                    <div className="border-b border-border">
                        <nav className="-mb-px flex gap-6">
                            <button
                                onClick={() => setActiveTab("formatif")}
                                className={tabClass("formatif")}
                            >
                                Asesmen Formatif
                                <span className="ml-2 text-xs text-muted-foreground">
                                    ({nilaiFormatif.data.length})
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab("sumatif")}
                                className={tabClass("sumatif")}
                            >
                                Asesmen Sumatif
                                <span className="ml-2 text-xs text-muted-foreground">
                                    ({nilaiSumatif.data.length})
                                </span>
                            </button>
                        </nav>
                    </div>

                    {/* Table Formatif */}
                    {activeTab === "formatif" && (
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/50">
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Siswa
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Mapel
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                TP
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Jenis
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Nilai
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Catatan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nilaiFormatif.data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={7}
                                                    className="h-24 text-center text-sm text-muted-foreground"
                                                >
                                                    Belum ada data nilai formatif
                                                </td>
                                            </tr>
                                        ) : (
                                            nilaiFormatif.data.map((nilai) => (
                                                <tr
                                                    key={nilai.id}
                                                    className="border-b border-border transition-colors hover:bg-muted/50"
                                                >
                                                    <td className="p-4 text-sm text-foreground">
                                                        {nilai.rapor_siswa?.siswa
                                                            ?.nama_lengkap || "-"}
                                                    </td>
                                                    <td className="p-4 text-sm text-muted-foreground">
                                                        {nilai.rapor_mapel?.nama_mapel || "-"}
                                                    </td>
                                                    <td className="p-4 text-sm text-muted-foreground">
                                                        <Badge variant="outline">
                                                            {nilai.tujuan_pembelajaran
                                                                ?.kode_tp || "-"}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-4 text-sm text-muted-foreground">
                                                        {nilai.jenis}
                                                    </td>
                                                    <td className="p-4 text-sm text-muted-foreground">
                                                        {formatDate(nilai.tanggal)}
                                                    </td>
                                                    <td className="p-4 text-sm">
                                                        <span
                                                            className={`font-semibold ${nilaiClass(nilai.nilai)}`}
                                                        >
                                                            {nilai.nilai}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-sm text-muted-foreground max-w-[200px] truncate">
                                                        {nilai.catatan || (
                                                            <span className="text-muted-foreground/50 italic">
                                                                -
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {renderPagination(nilaiFormatif)}
                        </Card>
                    )}

                    {/* Table Sumatif */}
                    {activeTab === "sumatif" && (
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/50">
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Siswa
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Mapel
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Jenis
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Nilai
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nilaiSumatif.data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="h-24 text-center text-sm text-muted-foreground"
                                                >
                                                    Belum ada data nilai sumatif
                                                </td>
                                            </tr>
                                        ) : (
                                            nilaiSumatif.data.map((nilai) => (
                                                <tr
                                                    key={nilai.id}
                                                    className="border-b border-border transition-colors hover:bg-muted/50"
                                                >
                                                    <td className="p-4 text-sm text-foreground">
                                                        {nilai.rapor_siswa?.siswa
                                                            ?.nama_lengkap || "-"}
                                                    </td>
                                                    <td className="p-4 text-sm text-muted-foreground">
                                                        {nilai.rapor_mapel?.nama_mapel || "-"}
                                                    </td>
                                                    <td className="p-4 text-sm text-muted-foreground">
                                                        {nilai.jenis}
                                                    </td>
                                                    <td className="p-4 text-sm text-muted-foreground">
                                                        {formatDate(nilai.tanggal)}
                                                    </td>
                                                    <td className="p-4 text-sm">
                                                        <span
                                                            className={`font-semibold ${nilaiClass(nilai.nilai)}`}
                                                        >
                                                            {nilai.nilai}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {renderPagination(nilaiSumatif)}
                        </Card>
                    )}

                    {/* Export / Import */}
                    <Card>
                        <CardHeader className="pb-3">
                            <h3 className="text-lg font-semibold text-foreground">
                                Export / Import
                            </h3>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                <Link href={route("erapor.nilai.export")}>
                                    <Button variant="outline">
                                        <Download className="w-4 h-4" />
                                        Export Excel
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
