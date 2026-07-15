import { useForm, usePage, Link } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layout/AdminLayout";
import { useState } from "react";

interface JurusanItem {
    id: number;
    singkatan: string;
}

interface RaporKelasItem {
    id: number;
    nama_kelas: string;
    tingkat: number;
    jurusan: JurusanItem | null;
    rapor_mapel: RaporMapelItem[];
}

interface RaporMapelItem {
    id: number;
    nama_mapel: string;
    kkm: number;
    kelompok: string;
}

interface RaporNilaiItem {
    id: number;
    rapor_mapel_id: number;
    nilai_pengetahuan: number | null;
    predikat_pengetahuan: string | null;
    nilai_keterampilan: number | null;
    predikat_keterampilan: string | null;
}

interface RaporDeskripsiItem {
    id: number;
    rapor_mapel_id: number;
    deskripsi_pengetahuan: string | null;
    deskripsi_keterampilan: string | null;
}

interface SiswaItem {
    id: number;
    nama_lengkap: string;
    nisn: string;
}

interface RaporSiswaItem {
    id: number;
    semester: string;
    tahun_ajaran: string;
    siswa: SiswaItem | null;
    rapor_kelas: RaporKelasItem | null;
    rapor_nilai: RaporNilaiItem[];
    rapor_deskripsi: RaporDeskripsiItem[];
}

interface Props {
    raporSiswa: RaporSiswaItem;
}

export default function InputNilai({ raporSiswa }: Props) {
    const { flash } = usePage().props;
    const siswa = raporSiswa.siswa;
    const kelas = raporSiswa.rapor_kelas;
    const mapels = kelas?.rapor_mapel || [];

    const initialNilai = mapels.map((mapel) => {
        const existing = raporSiswa.rapor_nilai.find(
            (n) => n.rapor_mapel_id === mapel.id,
        );
        const desk = raporSiswa.rapor_deskripsi.find(
            (d) => d.rapor_mapel_id === mapel.id,
        );
        return {
            rapor_mapel_id: mapel.id,
            nilai_pengetahuan: existing?.nilai_pengetahuan ?? "",
            predikat_pengetahuan: existing?.predikat_pengetahuan ?? "",
            nilai_keterampilan: existing?.nilai_keterampilan ?? "",
            predikat_keterampilan: existing?.predikat_keterampilan ?? "",
            deskripsi_pengetahuan: desk?.deskripsi_pengetahuan ?? "",
            deskripsi_keterampilan: desk?.deskripsi_keterampilan ?? "",
        };
    });

    const { data, setData, post, processing, errors } = useForm({
        nilai: initialNilai,
    });

    const updateNilai = (mapelIndex: number, field: string, value: any) => {
        const updated = [...data.nilai] as any[];
        (updated[mapelIndex] as any)[field] = value;
        setData("nilai", updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("rapor-siswa.input-nilai-store", raporSiswa.id));
    };

    return (
        <AdminLayout title="Input Nilai Rapor">
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Input Nilai Rapor
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {siswa?.nama_lengkap} ({siswa?.nisn}) -{" "}
                            {kelas
                                ? `Kelas ${kelas.tingkat} - ${kelas.nama_kelas} (${kelas.jurusan?.singkatan || "-"})`
                                : ""}{" "}
                            - Semester {raporSiswa.semester}{" "}
                            {raporSiswa.tahun_ajaran}
                        </p>
                    </div>
                    <Link
                        href={route("rapor-siswa.show", raporSiswa.id)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Detail Rapor
                    </Link>
                </div>
            </div>

            {flash.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    {flash.success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    Mapel
                                </th>
                                <th
                                    className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
                                    colSpan={2}
                                >
                                    Pengetahuan
                                </th>
                                <th
                                    className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
                                    colSpan={2}
                                >
                                    Keterampilan
                                </th>
                                <th
                                    className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
                                    colSpan={2}
                                >
                                    Deskripsi
                                </th>
                            </tr>
                            <tr className="bg-gray-50 border-b">
                                <th></th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">
                                    Nilai
                                </th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">
                                    Predikat
                                </th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">
                                    Nilai
                                </th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">
                                    Predikat
                                </th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">
                                    Pengetahuan
                                </th>
                                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500">
                                    Keterampilan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {mapels.map((mapel, idx) => (
                                <tr key={mapel.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                        {mapel.nama_mapel}
                                        <span className="text-xs text-gray-400 ml-1">
                                            (KKM: {mapel.kkm})
                                        </span>
                                    </td>
                                    <td className="px-2 py-3">
                                        <input
                                            type="number"
                                            value={
                                                data.nilai[idx]
                                                    ?.nilai_pengetahuan
                                            }
                                            onChange={(e) =>
                                                updateNilai(
                                                    idx,
                                                    "nilai_pengetahuan",
                                                    e.target.value === ""
                                                        ? ""
                                                        : Number(
                                                              e.target.value,
                                                          ),
                                                )
                                            }
                                            className="w-20 px-2 py-1 border rounded text-sm text-center"
                                            min={0}
                                            max={100}
                                        />
                                    </td>
                                    <td className="px-2 py-3">
                                        <input
                                            type="text"
                                            value={
                                                data.nilai[idx]
                                                    ?.predikat_pengetahuan
                                            }
                                            onChange={(e) =>
                                                updateNilai(
                                                    idx,
                                                    "predikat_pengetahuan",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-14 px-2 py-1 border rounded text-sm text-center"
                                            maxLength={2}
                                        />
                                    </td>
                                    <td className="px-2 py-3">
                                        <input
                                            type="number"
                                            value={
                                                data.nilai[idx]
                                                    ?.nilai_keterampilan
                                            }
                                            onChange={(e) =>
                                                updateNilai(
                                                    idx,
                                                    "nilai_keterampilan",
                                                    e.target.value === ""
                                                        ? ""
                                                        : Number(
                                                              e.target.value,
                                                          ),
                                                )
                                            }
                                            className="w-20 px-2 py-1 border rounded text-sm text-center"
                                            min={0}
                                            max={100}
                                        />
                                    </td>
                                    <td className="px-2 py-3">
                                        <input
                                            type="text"
                                            value={
                                                data.nilai[idx]
                                                    ?.predikat_keterampilan
                                            }
                                            onChange={(e) =>
                                                updateNilai(
                                                    idx,
                                                    "predikat_keterampilan",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-14 px-2 py-1 border rounded text-sm text-center"
                                            maxLength={2}
                                        />
                                    </td>
                                    <td className="px-2 py-3">
                                        <textarea
                                            value={
                                                data.nilai[idx]
                                                    ?.deskripsi_pengetahuan
                                            }
                                            onChange={(e) =>
                                                updateNilai(
                                                    idx,
                                                    "deskripsi_pengetahuan",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-2 py-1 border rounded text-sm"
                                            rows={2}
                                        />
                                    </td>
                                    <td className="px-2 py-3">
                                        <textarea
                                            value={
                                                data.nilai[idx]
                                                    ?.deskripsi_keterampilan
                                            }
                                            onChange={(e) =>
                                                updateNilai(
                                                    idx,
                                                    "deskripsi_keterampilan",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-2 py-1 border rounded text-sm"
                                            rows={2}
                                        />
                                    </td>
                                </tr>
                            ))}
                            {mapels.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-8 text-center text-sm text-gray-500"
                                    >
                                        Tidak ada mata pelajaran yang terdaftar
                                        untuk kelas ini.{" "}
                                        <Link
                                            href={route("rapor-mapel.create")}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Tambah Mapel
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {mapels.length > 0 && (
                    <div className="mt-6 flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? "Menyimpan..." : "Simpan Nilai"}
                        </button>
                        <Link
                            href={route("rapor-siswa.index")}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Kembali
                        </Link>
                    </div>
                )}
            </form>
        </AdminLayout>
    );
}
