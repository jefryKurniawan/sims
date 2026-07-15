import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ArrowLeft, Save } from "lucide-react";

interface Siswa {
    id: number;
    nama_lengkap: string;
    user?: { name: string };
}

interface Prestasi {
    id: number;
    siswa_id: number;
    jenis: string;
    prestasi: string;
    tingkat: string;
    tanggal: string;
    bukti: string | null;
    keterangan: string | null;
    siswa: Siswa;
}

interface Props {
    prestasi: Prestasi;
    siswa: Siswa[];
}

export default function Edit({ prestasi, siswa }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        siswa_id: prestasi.siswa_id.toString(),
        jenis: prestasi.jenis,
        prestasi: prestasi.prestasi,
        tingkat: prestasi.tingkat,
        tanggal: prestasi.tanggal,
        bukti: null as File | null,
        keterangan: prestasi.keterangan || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("siswa_id", data.siswa_id);
        formData.append("jenis", data.jenis);
        formData.append("prestasi", data.prestasi);
        formData.append("tingkat", data.tingkat);
        formData.append("tanggal", data.tanggal);
        if (data.bukti) {
            formData.append("bukti", data.bukti);
        }
        formData.append("keterangan", data.keterangan);
        formData.append("_method", "PUT");

        put(route("admin.prestasi.update", prestasi.id), {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Prestasi Siswa" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-6 py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route("admin.prestasi.index")}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Edit Prestasi
                                </h1>
                                <p className="text-gray-600 text-sm mt-1">
                                    Perbarui data prestasi siswa
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 py-8">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-xl shadow p-8"
                    >
                        {/* Siswa */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Siswa{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <select
                                value={data.siswa_id}
                                onChange={(e) =>
                                    setData("siswa_id", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="">-- Pilih Siswa --</option>
                                {siswa.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nama_lengkap || s.user?.name}
                                    </option>
                                ))}
                            </select>
                            {errors.siswa_id && (
                                <p className="text-destructive text-sm mt-1">
                                    {errors.siswa_id}
                                </p>
                            )}
                        </div>

                        {/* Jenis & Prestasi */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Jenis Prestasi{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <select
                                    value={data.jenis}
                                    onChange={(e) =>
                                        setData("jenis", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="akademik">Akademik</option>
                                    <option value="non_akademik">
                                        Non-Akademik
                                    </option>
                                </select>
                                {errors.jenis && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.jenis}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Prestasi{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.prestasi}
                                    onChange={(e) =>
                                        setData("prestasi", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                {errors.prestasi && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.prestasi}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Tingkat & Tanggal */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tingkat{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.tingkat}
                                    onChange={(e) =>
                                        setData("tingkat", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                {errors.tingkat && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.tingkat}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tanggal{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) =>
                                        setData("tanggal", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                {errors.tanggal && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.tanggal}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Bukti - Preview existing */}
                        {prestasi.bukti && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Bukti Saat Ini
                                </label>
                                <a
                                    href={`/storage/${prestasi.bukti}`}
                                    target="_blank"
                                    className="text-primary hover:underline text-sm"
                                >
                                    Lihat Bukti
                                </a>
                            </div>
                        )}

                        {/* Bukti - Upload new */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Ganti Bukti (Opsional)
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData(
                                        "bukti",
                                        e.target.files?.[0] || null,
                                    )
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                accept=".jpg,.jpeg,.png,.pdf"
                            />
                            {errors.bukti && (
                                <p className="text-destructive text-sm mt-1">
                                    {errors.bukti}
                                </p>
                            )}
                        </div>

                        {/* Keterangan */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Keterangan
                            </label>
                            <textarea
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                rows={4}
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-6 border-t">
                            <Link
                                href={route("admin.prestasi.index")}
                                className="px-6 py-2.5 border border-primary/20 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition font-semibold"
                            >
                                <Save className="w-4 h-4" />
                                {processing
                                    ? "Menyimpan..."
                                    : "Update Prestasi"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
