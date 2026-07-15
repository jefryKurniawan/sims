import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";
import { BookOpen, Users, Clock, BookCopy } from "lucide-react";

export default function LaporanPerpustakaan({
    buku,
    totalBuku,
    totalJudul,
    peminjamanAktif,
    anggotaAktif,
    byKategori,
}: any) {
    return (
        <>
            <Head title="Laporan Perpustakaan" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Laporan Perpustakaan
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <Link
                                href={route("laporan.index")}
                                className="text-blue-600 hover:underline"
                            >
                                Laporan
                            </Link>{" "}
                            / Perpustakaan
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                        {
                            icon: <BookCopy className="w-5 h-5" />,
                            label: "Total Stok",
                            value: totalBuku,
                            color: "text-blue-600 bg-blue-50",
                        },
                        {
                            icon: <BookOpen className="w-5 h-5" />,
                            label: "Total Judul",
                            value: totalJudul,
                            color: "text-rose-600 bg-rose-50",
                        },
                        {
                            icon: <Clock className="w-5 h-5" />,
                            label: "Dipinjam",
                            value: peminjamanAktif,
                            color: "text-orange-600 bg-orange-50",
                        },
                        {
                            icon: <Users className="w-5 h-5" />,
                            label: "Anggota Aktif",
                            value: anggotaAktif,
                            color: "text-emerald-600 bg-emerald-50",
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border p-4 flex items-center gap-3"
                        >
                            <div
                                className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}
                            >
                                {s.icon}
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">
                                    {s.label}
                                </p>
                                <p className="text-lg font-bold">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-xl border p-4">
                    <h3 className="font-semibold text-sm mb-3">
                        Buku per Kategori
                    </h3>
                    <div className="space-y-2">
                        {byKategori.map((item: any, i: number) => (
                            <div
                                key={i}
                                className="flex justify-between text-sm"
                            >
                                <span>{item.kategori}</span>
                                <span className="font-bold">
                                    {item.total} judul ({item.stok} eksemplar)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
