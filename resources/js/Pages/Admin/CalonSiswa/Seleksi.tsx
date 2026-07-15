import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";

export default function Seleksi({ gelombang }: { gelombang: any[] }) {
    return (
        <>
            <Head title="Seleksi Calon Siswa" />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Seleksi Calon Siswa
                </h1>
                <div className="mb-4">
                    <Link
                        href="/dashboard/ppdb"
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Kembali ke Daftar Calon Siswa
                    </Link>
                </div>
                {gelombang.length > 0 ? (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Daftar Gelombang Aktif
                        </h2>
                        <div className="space-y-2">
                            {gelombang.map((g) => (
                                <div
                                    key={g.id}
                                    className="p-3 bg-white border border-gray-200 rounded-lg"
                                >
                                    <p className="font-medium">{g.nama}</p>
                                    <p className="text-sm text-gray-500">
                                        Gelombang ID: {g.id}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">
                        Tidak ada gelombang aktif saat ini.
                    </p>
                )}
            </div>
        </>
    );
}
