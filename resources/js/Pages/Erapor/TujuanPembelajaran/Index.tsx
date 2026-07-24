/// <reference types="vite/client" />
import React from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

interface TP {
    id: number;
    kode_tp: string;
    deskripsi: string;
    fase: string;
    semester: number;
    tahun_ajaran: string;
    aktif: boolean;
    rapor_mapel: { id: number; nama: string } | null;
    guru: { id: number; nama: string } | null;
    created_at: string;
}

interface Props {
    tps: {
        data: TP[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        fase?: string;
        tahun_ajaran?: string;
        aktif?: boolean;
    };
}

export default function Index({ tps, filters }: Props) {
    const form = useForm({
        fase: filters.fase || "",
        tahun_ajaran: filters.tahun_ajaran || "",
        aktif: filters.aktif || false,
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = route("erapor.tujuan-pembelajaran.index", {
            fase: form.data.fase || undefined,
            tahun_ajaran: form.data.tahun_ajaran || undefined,
            aktif: form.data.aktif || undefined,
        } as any);
    };

    const faseOptions = ["A", "B", "C", "D", "E", "F"];

    return (
        <>
            <Head title="Tujuan Pembelajaran" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Tujuan Pembelajaran
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Kelola TP per mata pelajaran sesuai Kurikulum
                                Merdeka
                            </p>
                        </div>
                        <Link
                            href={route(
                                "erapor.tujuan-pembelajaran.create",
                            )}
                            className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700"
                        >
                            + Tambah TP
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
                                    Fase
                                </label>
                                <select
                                    value={form.data.fase}
                                    onChange={(e) =>
                                        form.setData("fase", e.target.value)
                                    }
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                >
                                    <option value="">Semua Fase</option>
                                    {faseOptions.map((f) => (
                                        <option key={f} value={f}>
                                            Fase {f}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tahun Ajaran
                                </label>
                                <input
                                    type="text"
                                    value={form.data.tahun_ajaran}
                                    onChange={(e) =>
                                        form.setData(
                                            "tahun_ajaran",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="2023/2024"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={form.data.aktif}
                                        onChange={(e) =>
                                            form.setData(
                                                "aktif",
                                                e.target.checked,
                                            )
                                        }
                                        className="rounded border-gray-300 dark:border-gray-700"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Hanya yang aktif
                                    </span>
                                </label>
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

                    {/* Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Kode TP
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Deskripsi
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Mapel
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Fase
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Semester
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {tps.data.map((tp) => (
                                    <tr
                                        key={tp.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td className="px-4 py-3 text-sm font-medium text-navy-600">
                                            {tp.kode_tp}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white max-w-md truncate">
                                            {tp.deskripsi}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                            {tp.rapor_mapel?.nama || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                Fase {tp.fase}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                            {tp.semester}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {tp.aktif ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                                    Tidak Aktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route(
                                                        "erapor.tujuan-pembelajaran.edit",
                                                        tp.id,
                                                    )}
                                                    className="text-emerald-600 hover:text-emerald-900"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "erapor.tujuan-pembelajaran.edit",
                                                        tp.id,
                                                    )}
                                                    className="text-destructive hover:text-destructive/80"
                                                    method="delete"
                                                    as="button"
                                                >
                                                    Hapus
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Halaman {tps.current_page} dari{" "}
                                    {tps.last_page}
                                </span>
                                <div className="flex gap-1">
                                    {tps.links.map((link, i) => (
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
                </div>
            </div>
        </>
    );
}

