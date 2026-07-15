import { Head, Link } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

export default function Show({ kelas }: { kelas: any }) {
    return (
        <>
            <Head title={`Detail Kelas - ${kelas.nama_kelas}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Detail Kelas
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {kelas.nama_kelas}
                        </p>
                    </div>
                    <Link
                        href={route("kelas.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-4 max-w-2xl">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Nama Kelas
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {kelas.nama_kelas}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Tingkat
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            Kelas {kelas.tingkat}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Jurusan
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {kelas.jurusan?.nama || "-"}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Wali Kelas
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {kelas.wali_kelas?.nama_lengkap ||
                                "Belum Ditentukan"}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Ruangan
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {kelas.ruangan || "-"}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Kapasitas
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {kelas.kapasitas} siswa
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Tahun Ajaran
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {kelas.tahun_ajaran}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
