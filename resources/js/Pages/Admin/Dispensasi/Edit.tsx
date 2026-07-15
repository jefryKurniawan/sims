import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

interface Props {
    dispensasi: {
        id: number;
        siswa_id: number;
        siswa: { id: number; nama_lengkap: string; nisn: string } | null;
        jenis: "potongan" | "penundaan";
        nominal: number;
        tanggal_mulai: string;
        tanggal_selesai: string | null;
        keterangan: string | null;
    };
    siswa: { id: number; nama_lengkap: string; nisn: string }[];
}

export default function Edit({ dispensasi, siswa }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        siswa_id: String(dispensasi.siswa_id ?? ""),
        jenis: dispensasi.jenis,
        nominal: String(dispensasi.nominal ?? 0),
        tanggal_mulai: dispensasi.tanggal_mulai
            ? dispensasi.tanggal_mulai.split("T")[0]
            : "",
        tanggal_selesai: dispensasi.tanggal_selesai
            ? dispensasi.tanggal_selesai.split("T")[0]
            : "",
        keterangan: dispensasi.keterangan ?? "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("dispensasi.update", dispensasi.id));
    };

    return (
        <>
            <Head title="Edit Dispensasi" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Edit Dispensasi
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {dispensasi.siswa?.nama_lengkap || "Tanpa Siswa"}
                        </p>
                    </div>
                    <Link
                        href={route("dispensasi.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="siswa_id"
                                className="block text-sm font-medium mb-1 text-gray-700"
                            >
                                Siswa
                            </label>
                            <select
                                id="siswa_id"
                                value={data.siswa_id}
                                onChange={(e) =>
                                    setData("siswa_id", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                required
                            >
                                <option value="">Pilih Siswa</option>
                                {siswa.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nama_lengkap} ({s.nisn})
                                    </option>
                                ))}
                            </select>
                            {errors.siswa_id && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.siswa_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="jenis"
                                className="block text-sm font-medium mb-1 text-gray-700"
                            >
                                Jenis Dispensasi
                            </label>
                            <select
                                id="jenis"
                                value={data.jenis}
                                onChange={(e) =>
                                    setData("jenis", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                required
                            >
                                <option value="potongan">Potongan</option>
                                <option value="penundaan">Penundaan</option>
                            </select>
                            {errors.jenis && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.jenis}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="nominal"
                                className="block text-sm font-medium mb-1 text-gray-700"
                            >
                                Nominal
                            </label>
                            <input
                                id="nominal"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.nominal}
                                onChange={(e) =>
                                    setData("nominal", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                placeholder="Nominal dispensasi"
                                required
                            />
                            {errors.nominal && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.nominal}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="tanggal_mulai"
                                    className="block text-sm font-medium mb-1 text-gray-700"
                                >
                                    Tanggal Mulai
                                </label>
                                <input
                                    id="tanggal_mulai"
                                    type="date"
                                    value={data.tanggal_mulai}
                                    onChange={(e) =>
                                        setData("tanggal_mulai", e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                    required
                                />
                                {errors.tanggal_mulai && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.tanggal_mulai}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="tanggal_selesai"
                                    className="block text-sm font-medium mb-1 text-gray-700"
                                >
                                    Tanggal Selesai
                                </label>
                                <input
                                    id="tanggal_selesai"
                                    type="date"
                                    value={data.tanggal_selesai}
                                    onChange={(e) =>
                                        setData(
                                            "tanggal_selesai",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                />
                                {errors.tanggal_selesai && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.tanggal_selesai}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="keterangan"
                                className="block text-sm font-medium mb-1 text-gray-700"
                            >
                                Keterangan
                            </label>
                            <textarea
                                id="keterangan"
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-primary/20 rounded-lg text-sm"
                                rows={3}
                                placeholder="Keterangan tambahan"
                            />
                            {errors.keterangan && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.keterangan}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route("dispensasi.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? "Menyimpan..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
