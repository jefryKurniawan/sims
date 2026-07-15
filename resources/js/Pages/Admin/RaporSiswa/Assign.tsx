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
}

interface SiswaItem {
    id: number;
    nama_lengkap: string;
    nisn: string;
}

interface Props {
    kelas: RaporKelasItem[];
    siswa: SiswaItem[];
}

export default function Assign({ kelas, siswa }: Props) {
    const { flash } = usePage().props;
    const [selectedSiswa, setSelectedSiswa] = useState<number[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        rapor_kelas_id: "",
        siswa_ids: [] as number[],
        semester: "Ganjil",
        tahun_ajaran: "",
    });

    const toggleSiswa = (id: number) => {
        setSelectedSiswa((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
        );
        setData(
            "siswa_ids",
            selectedSiswa.includes(id)
                ? selectedSiswa.filter((s) => s !== id)
                : [...selectedSiswa, id],
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("rapor-siswa.assign-store"));
    };

    return (
        <AdminLayout title="Assign Siswa ke Kelas Rapor">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Assign Siswa ke Kelas Rapor
                </h1>
            </div>

            {flash.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    {flash.success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-lg border p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Konfigurasi Rapor
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kelas
                            </label>
                            <select
                                value={data.rapor_kelas_id}
                                onChange={(e) =>
                                    setData(
                                        "rapor_kelas_id",
                                        Number(e.target.value),
                                    )
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            >
                                <option value="">Pilih Kelas</option>
                                {kelas.map((k) => (
                                    <option key={k.id} value={k.id}>
                                        Kelas {k.tingkat} - {k.nama_kelas} (
                                        {k.jurusan?.singkatan || "-"})
                                    </option>
                                ))}
                            </select>
                            {errors.rapor_kelas_id && (
                                <p className="text-destructive text-xs mt-1">
                                    {errors.rapor_kelas_id}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Semester
                            </label>
                            <select
                                value={data.semester}
                                onChange={(e) =>
                                    setData("semester", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            >
                                <option value="Ganjil">Ganjil</option>
                                <option value="Genap">Genap</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tahun Ajaran
                            </label>
                            <input
                                type="text"
                                value={data.tahun_ajaran}
                                onChange={(e) =>
                                    setData("tahun_ajaran", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                placeholder="2024/2025"
                            />
                            {errors.tahun_ajaran && (
                                <p className="text-destructive text-xs mt-1">
                                    {errors.tahun_ajaran}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50">
                        <h2 className="text-lg font-semibold">Pilih Siswa</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {siswa.length} siswa tersedia (belum terdaftar di
                            semester & tahun ajaran ini)
                        </p>
                    </div>

                    {siswa.length === 0 ? (
                        <div className="p-6 text-center text-sm text-gray-500">
                            Semua siswa sudah terdaftar di semester dan tahun
                            ajaran ini
                        </div>
                    ) : (
                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase w-12">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        const allIds =
                                                            siswa.map(
                                                                (s) => s.id,
                                                            );
                                                        setSelectedSiswa(
                                                            allIds,
                                                        );
                                                        setData(
                                                            "siswa_ids",
                                                            allIds,
                                                        );
                                                    } else {
                                                        setSelectedSiswa([]);
                                                        setData(
                                                            "siswa_ids",
                                                            [],
                                                        );
                                                    }
                                                }}
                                                checked={
                                                    selectedSiswa.length ===
                                                        siswa.length &&
                                                    siswa.length > 0
                                                }
                                                className="rounded"
                                            />
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                            NISN
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                                            Nama Lengkap
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {siswa.map((s) => (
                                        <tr
                                            key={s.id}
                                            className={`hover:bg-gray-50 cursor-pointer ${selectedSiswa.includes(s.id) ? "bg-blue-50" : ""}`}
                                            onClick={() => toggleSiswa(s.id)}
                                        >
                                            <td className="px-4 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSiswa.includes(
                                                        s.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleSiswa(s.id)
                                                    }
                                                    className="rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-700">
                                                {s.nisn}
                                            </td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                                {s.nama_lengkap}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="px-4 py-3 border-t bg-gray-50 flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            {selectedSiswa.length} siswa dipilih
                        </span>
                        <div className="flex gap-2">
                            <Link
                                href={route("rapor-siswa.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={
                                    processing || selectedSiswa.length === 0
                                }
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : `Assign ${selectedSiswa.length} Siswa`}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
