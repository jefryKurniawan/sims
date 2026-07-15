/// <reference types="vite/client" />
import React from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import AppLayout from "@/Layout/AppLayout";

interface Siswa {
    id: number;
    nisn: string;
    nama_lengkap: string;
    raporSiswa: { id: number; kelas: string } | null;
}

interface Mapel {
    id: number;
    nama_mapel: string;
    kkm: number;
}

interface TujuanPembelajaran {
    id: number;
    kode_tp: string;
    deskripsi: string;
}

interface Props {
    jenis_nilai: string;
    siswas: Siswa[];
    mapels: Mapel[];
    tps: TujuanPembelajaran[];
}

export default function InputForm({ jenis_nilai, siswas, mapels, tps }: Props) {
    const isFormatif = jenis_nilai === "formatif";
    const [selectedMapel, setSelectedMapel] = React.useState("");
    const [selectedTp, setSelectedTp] = React.useState("");
    const [tanggal, setTanggal] = React.useState(
        new Date().toISOString().split("T")[0],
    );

    const form = useForm({
        rapor_siswa_id: "",
        rapor_mapel_id: "",
        tujuan_pembelajaran_id: "",
        jenis: "",
        tanggal: "",
        nilai: "",
        catatan: "",
    });

    const [batchValues, setBatchValues] = React.useState<
        Record<number, string>
    >({});
    const [batchCatatan, setBatchCatatan] = React.useState<
        Record<number, string>
    >({});
    const [isBatchMode, setIsBatchMode] = React.useState(false);

    const handleSingleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(
            isFormatif
                ? route("admin.erapor.nilai.store-formatif")
                : route("admin.erapor.nilai.store-sumatif"),
            {
                onSuccess: () => form.reset(),
            },
        );
    };

    const handleBatchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMapel) return;

        const data: Record<string, any> = {
            rapor_mapel_id: selectedMapel,
            tanggal,
            jenis: jenis_nilai,
        };

        if (isFormatif) {
            data.tujuan_pembelajaran_id = selectedTp;
        }

        const nilaiArr: {
            rapor_siswa_id: number;
            nilai: string;
            catatan?: string;
        }[] = [];
        for (const [siswaId, nilai] of Object.entries(batchValues)) {
            if (nilai) {
                nilaiArr.push({
                    rapor_siswa_id: Number(siswaId),
                    nilai,
                    ...(isFormatif && batchCatatan[Number(siswaId)]
                        ? { catatan: batchCatatan[Number(siswaId)] }
                        : {}),
                });
            }
        }

        data.nilai = nilaiArr;

        form.post(
            isFormatif
                ? route("admin.erapor.nilai.store-formatif")
                : route("admin.erapor.nilai.store-sumatif"),
            {
                data,
                onSuccess: () => {
                    setBatchValues({});
                    setBatchCatatan({});
                },
            },
        );
    };

    return (
        <>
            <Head
                title={`Input Nilai ${isFormatif ? "Formatif" : "Sumatif"}`}
            />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route("admin.erapor.nilai.index")}
                            className="text-navy-600 hover:text-navy-800 text-sm"
                        >
                            &larr; Kembali
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Input Nilai{" "}
                                        {isFormatif
                                            ? "Asesmen Formatif"
                                            : "Asesmen Sumatif"}
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {isFormatif
                                            ? "Input nilai formatif per TP (Tujuan Pembelajaran)"
                                            : "Input nilai sumatif per mata pelajaran"}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={route(
                                            "admin.erapor.nilai.input",
                                            { jenis_nilai: "formatif" },
                                        )}
                                        className={`px-3 py-1.5 text-sm rounded ${
                                            isFormatif
                                                ? "bg-navy-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}
                                    >
                                        Formatif
                                    </Link>
                                    <Link
                                        href={route(
                                            "admin.erapor.nilai.input",
                                            { jenis_nilai: "sumatif" },
                                        )}
                                        className={`px-3 py-1.5 text-sm rounded ${
                                            !isFormatif
                                                ? "bg-navy-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}
                                    >
                                        Sumatif
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Batch Input */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Input Nilai Batch
                            </h2>
                        </div>

                        <form
                            onSubmit={handleBatchSubmit}
                            className="p-6 space-y-6"
                        >
                            {/* Filter Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Mata Pelajaran{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        value={selectedMapel}
                                        onChange={(e) =>
                                            setSelectedMapel(e.target.value)
                                        }
                                        className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    >
                                        <option value="">Pilih Mapel</option>
                                        {mapels.map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.nama_mapel} (KKM {m.kkm})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {isFormatif && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Tujuan Pembelajaran{" "}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            value={selectedTp}
                                            onChange={(e) =>
                                                setSelectedTp(e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                        >
                                            <option value="">Pilih TP</option>
                                            {tps.map((tp) => (
                                                <option
                                                    key={tp.id}
                                                    value={tp.id}
                                                >
                                                    {tp.kode_tp} -{" "}
                                                    {tp.deskripsi.substring(
                                                        0,
                                                        60,
                                                    )}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tanggal{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        value={tanggal}
                                        onChange={(e) =>
                                            setTanggal(e.target.value)
                                        }
                                        className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {form.errors.rapor_mapel_id && (
                                <p className="text-destructive text-xs">
                                    {form.errors.rapor_mapel_id}
                                </p>
                            )}
                            {form.errors.tujuan_pembelajaran_id && (
                                <p className="text-destructive text-xs">
                                    {form.errors.tujuan_pembelajaran_id}
                                </p>
                            )}

                            {/* Siswa Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                No
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                NISN
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Nama Siswa
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Kelas
                                            </th>
                                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                                Nilai
                                            </th>
                                            {isFormatif && (
                                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                                    Catatan
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {siswas.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={isFormatif ? 6 : 5}
                                                    className="px-4 py-12 text-center text-gray-400"
                                                >
                                                    Tidak ada data siswa
                                                </td>
                                            </tr>
                                        )}
                                        {siswas.map((siswa, idx) => (
                                            <tr
                                                key={siswa.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                <td className="px-4 py-2 text-sm text-gray-500">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {siswa.nisn}
                                                </td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                    {siswa.nama_lengkap}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {siswa.raporSiswa?.kelas ||
                                                        "-"}
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={
                                                            batchValues[
                                                                siswa.id
                                                            ] || ""
                                                        }
                                                        onChange={(e) =>
                                                            setBatchValues(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [siswa.id]:
                                                                        e.target
                                                                            .value,
                                                                }),
                                                            )
                                                        }
                                                        className="w-20 text-center rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-sm"
                                                        placeholder="0-100"
                                                    />
                                                </td>
                                                {isFormatif && (
                                                    <td className="px-4 py-2 text-center">
                                                        <input
                                                            type="text"
                                                            value={
                                                                batchCatatan[
                                                                    siswa.id
                                                                ] || ""
                                                            }
                                                            onChange={(e) =>
                                                                setBatchCatatan(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [siswa.id]:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    }),
                                                                )
                                                            }
                                                            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-sm"
                                                            placeholder="Catatan (opsional)"
                                                        />
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={route("admin.erapor.nilai.index")}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={form.processing || !selectedMapel}
                                    className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
                                >
                                    {form.processing
                                        ? "Menyimpan..."
                                        : "Simpan Semua Nilai"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

InputForm.layout = (page: React.ReactElement) => <AppLayout children={page} />;
