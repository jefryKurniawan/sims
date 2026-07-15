import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

const KATEGORI_OPTIONS = [
    { value: "ruangan", label: "Ruangan" },
    { value: "laboratorium", label: "Laboratorium" },
    { value: "perpustakaan", label: "Perpustakaan" },
    { value: "olahraga", label: "Olahraga" },
    { value: "ibadah", label: "Ibadah" },
    { value: "sanitasi", label: "Sanitasi" },
    { value: "teknologi", label: "Teknologi" },
    { value: "lainnya", label: "Lainnya" },
];

const KONDISI_OPTIONS = [
    { value: "baik", label: "Baik" },
    { value: "rusak_ringan", label: "Rusak Ringan" },
    { value: "rusak_berat", label: "Rusak Berat" },
];

export default function Edit({ sarana }: { sarana: any }) {
    const form = useForm({
        nama: sarana.nama,
        kategori: sarana.kategori,
        deskripsi: sarana.deskripsi || "",
        lokasi: sarana.lokasi || "",
        kapasitas: sarana.kapasitas ? String(sarana.kapasitas) : "",
        kondisi: sarana.kondisi,
        foto: sarana.foto || "",
        tahun_pengadaan: sarana.tahun_pengadaan
            ? String(sarana.tahun_pengadaan)
            : "",
        sumber_dana: sarana.sumber_dana || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(route("sarana.update", sarana.id));
    };

    return (
        <>
            <Head title={`Edit Sarana - ${sarana.nama}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Edit Sarana
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

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Nama
                            </label>
                            <input
                                type="text"
                                value={form.data.nama}
                                onChange={(e) =>
                                    form.setData("nama", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.nama && (
                                <span className="text-destructive text-xs">
                                    {form.errors.nama}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Kategori
                            </label>
                            <select
                                value={form.data.kategori}
                                onChange={(e) =>
                                    form.setData("kategori", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            >
                                {KATEGORI_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Deskripsi
                            </label>
                            <textarea
                                value={form.data.deskripsi}
                                onChange={(e) =>
                                    form.setData("deskripsi", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    Lokasi
                                </label>
                                <input
                                    type="text"
                                    value={form.data.lokasi}
                                    onChange={(e) =>
                                        form.setData("lokasi", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    Kapasitas
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.data.kapasitas}
                                    onChange={(e) =>
                                        form.setData(
                                            "kapasitas",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Kondisi
                            </label>
                            <select
                                value={form.data.kondisi}
                                onChange={(e) =>
                                    form.setData("kondisi", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            >
                                {KONDISI_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    Tahun Pengadaan
                                </label>
                                <input
                                    type="number"
                                    min="1900"
                                    max="2100"
                                    value={form.data.tahun_pengadaan}
                                    onChange={(e) =>
                                        form.setData(
                                            "tahun_pengadaan",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    Sumber Dana
                                </label>
                                <input
                                    type="text"
                                    value={form.data.sumber_dana}
                                    onChange={(e) =>
                                        form.setData(
                                            "sumber_dana",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route("sarana.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                disabled={form.processing}
                            >
                                {form.processing ? "Menyimpan..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
