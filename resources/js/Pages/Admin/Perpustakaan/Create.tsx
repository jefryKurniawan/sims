import { Head, useForm } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

export default function Create() {
    const form = useForm({
        judul: "",
        penulis: "",
        penerbit: "",
        tahun_terbit: "",
        isbn: "",
        kategori: "",
        deskripsi: "",
        jumlah_halaman: "",
        jumalah_stok: "1",
        lokasi_rak: "",
        file_cover: "",
        tersedia: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("admin.perpustakaan.store"));
    };

    return (
        <>
            <Head title="Tambah Buku Baru" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Tambah Buku Baru
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Masukkan detail buku baru
                        </p>
                    </div>
                    <Link
                        href={route("admin.perpustakaan.index")}
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
                                Judul
                            </label>
                            <input
                                type="text"
                                value={form.data.judul}
                                onChange={(e) =>
                                    form.setData("judul", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.judul && (
                                <span className="text-destructive text-xs">
                                    {form.errors.judul}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Penulis
                            </label>
                            <input
                                type="text"
                                value={form.data.penulis}
                                onChange={(e) =>
                                    form.setData("penulis", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.penulis && (
                                <span className="text-destructive text-xs">
                                    {form.errors.penulis}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Penerbit
                            </label>
                            <input
                                type="text"
                                value={form.data.penerbit}
                                onChange={(e) =>
                                    form.setData("penerbit", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    Tahun Terbit
                                </label>
                                <input
                                    type="number"
                                    min="1000"
                                    max="2100"
                                    value={form.data.tahun_terbit}
                                    onChange={(e) =>
                                        form.setData(
                                            "tahun_terbit",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    ISBN
                                </label>
                                <input
                                    type="text"
                                    value={form.data.isbn}
                                    onChange={(e) =>
                                        form.setData("isbn", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Kategori
                            </label>
                            <input
                                type="text"
                                value={form.data.kategori}
                                onChange={(e) =>
                                    form.setData("kategori", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                placeholder="Fiksi, Non-Fiksi, Sains"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Jumlah Halaman
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={form.data.jumlah_halaman}
                                onChange={(e) =>
                                    form.setData(
                                        "jumlah_halaman",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.jumlah_halaman && (
                                <span className="text-destructive text-xs">
                                    {form.errors.jumlah_halaman}
                                </span>
                            )}
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
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={form.data.jumalah_stok}
                                    onChange={(e) =>
                                        form.setData(
                                            "jumalah_stok",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    Lokasi Rak
                                </label>
                                <input
                                    type="text"
                                    value={form.data.lokasi_rak}
                                    onChange={(e) =>
                                        form.setData(
                                            "lokasi_rak",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                    placeholder="A1, B2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Status
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="tersedia"
                                        checked={form.data.tersedia === true}
                                        onChange={() =>
                                            form.setData("tersedia", true)
                                        }
                                        className="mr-2"
                                    />
                                    Tersedia
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="tersedia"
                                        checked={form.data.tersedia === false}
                                        onChange={() =>
                                            form.setData("tersedia", false)
                                        }
                                        className="mr-2"
                                    />
                                    Dipinjam
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route("admin.perpustakaan.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                disabled={form.processing}
                            >
                                {form.processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
