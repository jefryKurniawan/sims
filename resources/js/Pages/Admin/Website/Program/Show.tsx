import { Head, usePage, Link } from "@inertiajs/inertia-react";
import AdminLayout from "@/Layout/AdminLayout";

export default function Show() {
    const { data } = usePage();
    const { jurusan } = data;

    return (
        <AdminLayout
            title="Detail Program Studi"
            header={
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Detail Program Studi
                        </h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route("program-studi.edit", jurusan.id)}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Edit
                        </Link>
                        <Link
                            href={route("program-studi.index")}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-primary/90"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {jurusan.nama}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Singkatan: {jurusan.singkatan ?? "-"}</span>
                        <span>
                            Tanggal:{" "}
                            {new Date(jurusan.created_at).toLocaleDateString(
                                "id-ID",
                            )}
                        </span>
                        <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                jurusan.is_active === "0"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {jurusan.is_active === "0"
                                ? "Aktif"
                                : "Tidak Aktif"}
                        </span>
                    </div>
                </div>

                {jurusan.dataJurusan && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Gambar
                        </h3>
                        {jurusan.dataJurusan.image && (
                            <img
                                src={`/storage/images/jurusan/${jurusan.dataJurusan.image}`}
                                alt={jurusan.nama}
                                className="max-w-full h-auto rounded border"
                            />
                        )}
                    </div>
                )}

                {jurusan.dataJurusan && (
                    <div className="prose prose-sm max-w-none">
                        {!!jurusan.dataJurusan.content!!}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
