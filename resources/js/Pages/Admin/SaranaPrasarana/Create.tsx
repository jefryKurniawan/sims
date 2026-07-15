import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ArrowLeft } from "lucide-react";

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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        kategori: "ruangan",
        deskripsi: "",
        lokasi: "",
        kapasitas: "",
        kondisi: "baik",
        foto: "",
        tahun_pengadaan: "",
        sumber_dana: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("sarana.store"));
    };

    return (
        <>
            <Head title="Tambah Sarana Prasarana" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("sarana.index")}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">
                        Tambah Sarana
                    </h1>
                </div>

                <div className="bg-white rounded-xl border border-border shadow-sm">
                    <form onSubmit={submit} className="p-6 space-y-5">
                        <div>
                            <label
                                htmlFor="nama"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Nama <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                id="nama"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            />
                            {errors.nama && (
                                <p className="text-sm text-destructive mt-1">
                                    {errors.nama}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="kategori"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Kategori{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <select
                                    id="kategori"
                                    value={data.kategori}
                                    onChange={(e) =>
                                        setData("kategori", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                >
                                    {KATEGORI_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.kategori && (
                                    <p className="text-sm text-destructive mt-1">
                                        {errors.kategori}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="kondisi"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Kondisi{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <select
                                    id="kondisi"
                                    value={data.kondisi}
                                    onChange={(e) =>
                                        setData("kondisi", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                >
                                    {KONDISI_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.kondisi && (
                                    <p className="text-sm text-destructive mt-1">
                                        {errors.kondisi}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="deskripsi"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Deskripsi
                            </label>
                            <textarea
                                id="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                                rows={3}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="lokasi"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Lokasi
                                </label>
                                <input
                                    type="text"
                                    id="lokasi"
                                    value={data.lokasi}
                                    onChange={(e) =>
                                        setData("lokasi", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="kapasitas"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Kapasitas
                                </label>
                                <input
                                    type="number"
                                    id="kapasitas"
                                    value={data.kapasitas}
                                    onChange={(e) =>
                                        setData("kapasitas", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="tahun_pengadaan"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Tahun Pengadaan
                                </label>
                                <input
                                    type="number"
                                    id="tahun_pengadaan"
                                    value={data.tahun_pengadaan}
                                    onChange={(e) =>
                                        setData(
                                            "tahun_pengadaan",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="sumber_dana"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Sumber Dana
                                </label>
                                <input
                                    type="text"
                                    id="sumber_dana"
                                    value={data.sumber_dana}
                                    onChange={(e) =>
                                        setData("sumber_dana", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-border">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-sm disabled:opacity-50"
                            >
                                {processing ? "Menyimpan..." : "Simpan"}
                            </button>
                            <Link
                                href={route("sarana.index")}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
