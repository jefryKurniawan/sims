/// <reference types="vite/client" />
import React from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import AppLayout from "@/Layout/AppLayout";

interface NilaiFormatif {
    id: number;
    rapor_siswa: { id: number; siswa: { nama_lengkap: string } } | null;
    rapor_mapel: { id: number; nama: string } | null;
    tujuan_pembelajaran: { id: number; kode_tp: string } | null;
    jenis: string;
    tanggal: string;
    nilai: number;
    catatan: string | null;
}

interface NilaiSumatif {
    id: number;
    rapor_siswa: { id: number; siswa: { nama_lengkap: string } } | null;
    rapor_mapel: { id: number; nama: string } | null;
    jenis: string;
    tanggal: string;
    nilai: number;
}

interface Mapel {
    id: number;
    nama: string;
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
        window.location.href = route("admin.erapor.nilai.index", {
            rapor_mapel_id: form.data.rapor_mapel_id || undefined,
            tanggal_from: form.data.tanggal_from || undefined,
            tanggal_to: form.data.tanggal_to || undefined,
        } as any);
    };

    return (
        <>
            <Head title="Kelola Nilai" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Kelola Nilai - Asesmen Formatif & Sumatif
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Input dan kelola nilai asesmen siswa
                            </p>
                        </div>
                        <Link
                            href={route("admin.erapor.nilai.input")}
                            className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700"
                        >
                            + Input Nilai
                        </Link>
                    </div>

                    {/* Filter */}
                    <form
                        onSubmit={handleFilter}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                >
                                    <option value="">Semua Mapel</option>
                                    {mapels.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Dari Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={form.data.tanggal_from}
                                    onChange={(e) =>
                                        form.setData(
                                            "tanggal_from",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Sampai Tanggal
                                </label>
                                <input
                                    type="date"
                                    value={form.data.tanggal_to}
                                    onChange={(e) =>
                                        form.setData(
                                            "tanggal_to",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Tabs */}
                    <div className="mb-4">
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="-mb-px flex gap-4">
                                <button
                                    onClick={() => setActiveTab("formatif")}
                                    className={`pb-2 px-1 font-medium text-sm ${
                                        activeTab === "formatif"
                                            ? "border-b-2 border-navy-600 text-navy-600"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Asesmen Formatif
                                </button>
                                <button
                                    onClick={() => setActiveTab("sumatif")}
                                    className={`pb-2 px-1 font-medium text-sm ${
                                        activeTab === "sumatif"
                                            ? "border-b-2 border-navy-600 text-navy-600"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Asesmen Sumatif
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Table Formatif */}
                    {activeTab === "formatif" && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Siswa
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Mapel
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            TP
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Jenis
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tanggal
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Nilai
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Catatan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {nilaiFormatif.data.map((nilai) => (
                                        <tr
                                            key={nilai.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                {nilai.rapor_siswa?.siswa
                                                    ?.nama_lengkap || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {nilai.rapor_mapel?.nama || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {nilai.tujuan_pembelajaran
                                                    ?.kode_tp || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {nilai.jenis}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(
                                                    nilai.tanggal,
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <span
                                                    className={`font-medium ${
                                                        nilai.nilai >= 75
                                                            ? "text-green-600"
                                                            : "text-destructive"
                                                    }`}
                                                >
                                                    {nilai.nilai}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                                {nilai.catatan || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Halaman {nilaiFormatif.current_page}{" "}
                                        dari {nilaiFormatif.last_page}
                                    </span>
                                    <div className="flex gap-1">
                                        {nilaiFormatif.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || "#"}
                                                className={`px-3 py-1 rounded text-sm ${
                                                    link.active
                                                        ? "bg-navy-600 text-white"
                                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Table Sumatif */}
                    {activeTab === "sumatif" && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Siswa
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Mapel
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Jenis
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tanggal
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Nilai
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {nilaiSumatif.data.map((nilai) => (
                                        <tr
                                            key={nilai.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                {nilai.rapor_siswa?.siswa
                                                    ?.nama_lengkap || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {nilai.rapor_mapel?.nama || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {nilai.jenis}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(
                                                    nilai.tanggal,
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <span
                                                    className={`font-medium ${
                                                        nilai.nilai >= 75
                                                            ? "text-green-600"
                                                            : "text-destructive"
                                                    }`}
                                                >
                                                    {nilai.nilai}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Halaman {nilaiSumatif.current_page} dari{" "}
                                        {nilaiSumatif.last_page}
                                    </span>
                                    <div className="flex gap-1">
                                        {nilaiSumatif.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || "#"}
                                                className={`px-3 py-1 rounded text-sm ${
                                                    link.active
                                                        ? "bg-navy-600 text-white"
                                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Export/Import Actions */}
                    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Export / Import
                        </h3>
                        <div className="flex gap-4">
                            <Link
                                href={route("admin.erapor.nilai.export")}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                            >
                                📥 Export Excel
                            </Link>
                            {/* Import form would go here - needs file upload */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactElement) => <AppLayout children={page} />;
