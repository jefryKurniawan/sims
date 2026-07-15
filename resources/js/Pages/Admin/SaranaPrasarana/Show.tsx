import { Head, Link } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

const KATEGORI_LABELS: Record<string, string> = {
    ruangan: "Ruangan",
    laboratorium: "Laboratorium",
    perpustakaan: "Perpustakaan",
    olahraga: "Olahraga",
    ibadah: "Ibadah",
    sanitasi: "Sanitasi",
    teknologi: "Teknologi",
    lainnya: "Lainnya",
};

const KONDISI_LABELS: Record<string, string> = {
    baik: "Baik",
    rusak_ringan: "Rusak Ringan",
    rusak_berat: "Rusak Berat",
};

export default function Show({ sarana }: { sarana: any }) {
    return (
        <>
            <Head title={`Detail Sarana - ${sarana.nama}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Detail Sarana
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {sarana.nama}
                        </p>
                    </div>
                    <Link
                        href={route("sarana.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-4 max-w-2xl">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Nama
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {sarana.nama}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Kategori
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {KATEGORI_LABELS[sarana.kategori] ||
                                sarana.kategori}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Deskripsi
                        </p>
                        <p className="text-base text-gray-700">
                            {sarana.deskripsi || "-"}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Lokasi
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {sarana.lokasi || "-"}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Kapasitas
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {sarana.kapasitas
                                ? `${sarana.kapasitas} orang`
                                : "-"}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Kondisi
                        </p>
                        <span
                            className={`inline-flex px-2 py-0.5 text-sm font-medium rounded-full ${sarana.kondisi === "baik" ? "bg-emerald-100 text-emerald-700" : sarana.kondisi === "rusak_ringan" ? "bg-yellow-100 text-yellow-700" : "bg-destructive/10 text-destructive"}`}
                        >
                            {KONDISI_LABELS[sarana.kondisi] || sarana.kondisi}
                        </span>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Tahun Pengadaan
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {sarana.tahun_pengadaan || "-"}
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Sumber Dana
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {sarana.sumber_dana || "-"}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
