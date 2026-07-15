/// <reference types="vite/client" />
import React from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import AppLayout from "@/Layout/AppLayout";

interface Mapel {
    id: number;
    nama: string;
}

interface Guru {
    id: number;
    nama: string;
}

interface Props {
    mapels: Mapel[];
    gurus: Guru[];
    faseOptions: string[];
}

export default function Create({ mapels, gurus, faseOptions }: Props) {
    const form = useForm({
        rapor_mapel_id: "",
        guru_id: "",
        kode_tp: "",
        deskripsi: "",
        fase: "A",
        semester: 1,
        tahun_ajaran:
            new Date().getFullYear() + "/" + (new Date().getFullYear() + 1),
        aktif: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("admin.erapor.tujuan-pembelajaran.store"));
    };

    return (
        <>
            <Head title="Tambah Tujuan Pembelajaran" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route(
                                "admin.erapor.tujuan-pembelajaran.index",
                            )}
                            className="text-emerald-600 hover:text-emerald-900"
                        >
                            ← Kembali ke Daftar TP
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                            Tambah Tujuan Pembelajaran
                        </h1>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Mata Pelajaran{" "}
                                <span className="text-destructive">*</span>
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
                                required
                            >
                                <option value="">Pilih Mapel</option>
                                {mapels.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Guru Pengampu
                            </label>
                            <select
                                value={form.data.guru_id}
                                onChange={(e) =>
                                    form.setData("guru_id", e.target.value)
                                }
                                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            >
                                <option value="">Pilih Guru</option>
                                {gurus.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Kode TP{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.data.kode_tp}
                                    onChange={(e) =>
                                        form.setData("kode_tp", e.target.value)
                                    }
                                    placeholder="Contoh: TP-MTK-001"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Fase{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <select
                                    value={form.data.fase}
                                    onChange={(e) =>
                                        form.setData("fase", e.target.value)
                                    }
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    required
                                >
                                    {faseOptions.map((f) => (
                                        <option key={f} value={f}>
                                            Fase {f}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Deskripsi{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <textarea
                                value={form.data.deskripsi}
                                onChange={(e) =>
                                    form.setData("deskripsi", e.target.value)
                                }
                                rows={4}
                                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                placeholder="Deskripsi tujuan pembelajaran..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Semester{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <select
                                    value={form.data.semester}
                                    onChange={(e) =>
                                        form.setData(
                                            "semester",
                                            parseInt(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    required
                                >
                                    <option value={1}>Semester 1</option>
                                    <option value={2}>Semester 2</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tahun Ajaran{" "}
                                    <span className="text-destructive">*</span>
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
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.data.aktif}
                                    onChange={(e) =>
                                        form.setData("aktif", e.target.checked)
                                    }
                                    className="rounded border-gray-300 dark:border-gray-700"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Aktif
                                </span>
                            </label>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 disabled:opacity-50"
                            >
                                {form.processing ? "Menyimpan..." : "Simpan"}
                            </button>
                            <Link
                                href={route(
                                    "admin.erapor.tujuan-pembelajaran.index",
                                )}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = (page: React.ReactElement) => <AppLayout children={page} />;
