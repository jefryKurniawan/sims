import { Link, usePage } from "@inertiajs/inertia-react";
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

interface StatistikMapel {
    nama_mapel: string;
    kkm: number;
    avg_pengetahuan: number;
    avg_keterampilan: number;
    min_pengetahuan: number;
    max_pengetahuan: number;
    min_keterampilan: number;
    max_keterampilan: number;
    tuntas: number;
    tidak_tuntas: number;
    total: number;
    persentase_tuntas: number;
}

interface StatistikData {
    total_siswa: number;
    mapel: StatistikMapel[];
}

interface Props {
    kelas: RaporKelasItem[];
    statistik: StatistikData | Record<string, never>;
    filters: Record<string, string>;
}

export default function Statistik({ kelas, statistik, filters }: Props) {
    const { flash } = usePage().props;
    const [kelasId, setKelasId] = useState(filters.rapor_kelas_id || "");
    const [semester, setSemester] = useState(filters.semester || "Ganjil");
    const [tahunAjaran, setTahunAjaran] = useState(filters.tahun_ajaran || "");

    const hasData =
        statistik && "total_siswa" in statistik && statistik.total_siswa > 0;

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (kelasId) params.set("rapor_kelas_id", kelasId);
        if (semester) params.set("semester", semester);
        if (tahunAjaran) params.set("tahun_ajaran", tahunAjaran);
        window.location.href = `/dashboard/rapor-siswa/statistik?${params.toString()}`;
    };

    return (
        <AdminLayout title="Statistik Rapor">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Statistik Nilai Rapor
                </h1>
            </div>

            {/* Filter */}
            <div className="mb-6 bg-white rounded-lg border p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kelas
                        </label>
                        <select
                            value={kelasId}
                            onChange={(e) => setKelasId(e.target.value)}
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Semester
                        </label>
                        <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
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
                            value={tahunAjaran}
                            onChange={(e) => setTahunAjaran(e.target.value)}
                            placeholder="2024/2025"
                            className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <button
                            onClick={handleFilter}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Tampilkan
                        </button>
                        <Link
                            href={route("rapor-siswa.statistik")}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Reset
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hasil */}
            {hasData ? (
                <>
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg border">
                        <span className="text-sm text-blue-700 font-medium">
                            Total Siswa: {statistik.total_siswa}
                        </span>
                    </div>

                    <div className="bg-white rounded-lg border overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Mapel
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                                        KKM
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
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                                        Tuntas
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                                        % Tuntas
                                    </th>
                                </tr>
                                <tr className="bg-gray-50 border-b">
                                    <th></th>
                                    <th></th>
                                    <th className="px-2 py-1 text-center text-xs text-gray-500">
                                        Rata
                                    </th>
                                    <th className="px-2 py-1 text-center text-xs text-gray-500">
                                        Min-Max
                                    </th>
                                    <th className="px-2 py-1 text-center text-xs text-gray-500">
                                        Rata
                                    </th>
                                    <th className="px-2 py-1 text-center text-xs text-gray-500">
                                        Min-Max
                                    </th>
                                    <th colSpan={2}></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {statistik.mapel.map((m, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                            {m.nama_mapel}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center">
                                            {m.kkm}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center font-semibold">
                                            {m.avg_pengetahuan.toFixed(1)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center text-gray-500">
                                            {m.min_pengetahuan} -{" "}
                                            {m.max_pengetahuan}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center font-semibold">
                                            {m.avg_keterampilan.toFixed(1)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center text-gray-500">
                                            {m.min_keterampilan} -{" "}
                                            {m.max_keterampilan}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center">
                                            <span className="text-green-600 font-medium">
                                                {m.tuntas}
                                            </span>
                                            <span className="text-gray-400">
                                                /
                                            </span>
                                            <span className="text-destructive font-medium">
                                                {m.tidak_tuntas}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center font-semibold">
                                            {m.persentase_tuntas.toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-lg border p-8 text-center text-sm text-gray-500">
                    {kelasId
                        ? "Belum ada data statistik untuk kelas yang dipilih"
                        : 'Pilih kelas dan klik "Tampilkan" untuk melihat statistik'}
                </div>
            )}
        </AdminLayout>
    );
}
