import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";

export default function Statistik({ statistik, gelombang, gelombang_id }) {
    return (
        <>
            <Head title="Statistik PPDB" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Statistik PPDB
                </h1>
                <div className="mb-4">
                    <Link
                        href="/dashboard/ppdb"
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Kembali ke Daftar Calon Siswa
                    </Link>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gelombang
                    </label>
                    <select className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring">
                        <option value="">Semua Gelombang</option>
                        {gelombang.map((g) => (
                            <option
                                key={g.id}
                                value={g.id}
                                selected={gelombang_id === g.id}
                            >
                                {g.nama}
                            </option>
                        ))}
                    </select>
                </div>
                {statistik ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow border">
                            <h2 className="font-semibold text-gray-800 mb-2">
                                Jumlah Pendaftar
                            </h2>
                            <p className="text-3xl font-bold text-blue-600">
                                {statistik.total_pendaftar ?? 0}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border">
                            <h2 className="font-semibold text-gray-800 mb-2">
                                Lulus
                            </h2>
                            <p className="text-3xl font-bold text-green-600">
                                {statistik.lulus ?? 0}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border">
                            <h2 className="font-semibold text-gray-800 mb-2">
                                Tidak Lulus
                            </h2>
                            <p className="text-3xl font-bold text-destructive">
                                {statistik.tidak_lulus ?? 0}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border">
                            <h2 className="font-semibold text-gray-800 mb-2">
                                Dalam Seleksi
                            </h2>
                            <p className="text-3xl font-bold text-yellow-600">
                                {statistik.dalam_seleksi ?? 0}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">Belum ada data statistik.</p>
                )}
            </div>
        </>
    );
}
