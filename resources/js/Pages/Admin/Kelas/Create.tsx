import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ArrowLeft } from "lucide-react";

export default function Create({
    guru,
    jurusan,
}: {
    guru: any[];
    jurusan: any[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        nama_kelas: "",
        tingkat: "10",
        jurusan_id: "",
        wali_kelas_id: "",
        ruangan: "",
        kapasitas: "30",
        tahun_ajaran: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("kelas.store"));
    };

    return (
        <>
            <Head title="Tambah Kelas" />
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("kelas.index")}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">
                        Tambah Kelas
                    </h1>
                </div>

                <div className="bg-white rounded-xl border border-border shadow-sm">
                    <form onSubmit={submit} className="p-6 space-y-5">
                        <div>
                            <label
                                htmlFor="nama_kelas"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Nama Kelas{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                id="nama_kelas"
                                value={data.nama_kelas}
                                onChange={(e) =>
                                    setData("nama_kelas", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                placeholder="Kelas X MIPA 1"
                            />
                            {errors.nama_kelas && (
                                <p className="text-sm text-destructive mt-1">
                                    {errors.nama_kelas}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="tingkat"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Tingkat{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <select
                                id="tingkat"
                                value={data.tingkat}
                                onChange={(e) =>
                                    setData("tingkat", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            >
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="jurusan_id"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Jurusan
                            </label>
                            <select
                                id="jurusan_id"
                                value={data.jurusan_id}
                                onChange={(e) =>
                                    setData("jurusan_id", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            >
                                <option value="">Tanpa Jurusan</option>
                                {jurusan?.map((j: any) => (
                                    <option key={j.id} value={j.id}>
                                        {j.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="wali_kelas_id"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Wali Kelas
                            </label>
                            <select
                                id="wali_kelas_id"
                                value={data.wali_kelas_id}
                                onChange={(e) =>
                                    setData("wali_kelas_id", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            >
                                <option value="">Belum Ditentukan</option>
                                {guru?.map((g: any) => (
                                    <option key={g.id} value={g.id}>
                                        {g.nama_lengkap}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="ruangan"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Ruangan
                                </label>
                                <input
                                    type="text"
                                    id="ruangan"
                                    value={data.ruangan}
                                    onChange={(e) =>
                                        setData("ruangan", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                    placeholder="Ruang 101"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="kapasitas"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Kapasitas{" "}
                                    <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="kapasitas"
                                    min="1"
                                    value={data.kapasitas}
                                    onChange={(e) =>
                                        setData("kapasitas", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="tahun_ajaran"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Tahun Ajaran{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                id="tahun_ajaran"
                                value={data.tahun_ajaran}
                                onChange={(e) =>
                                    setData("tahun_ajaran", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                placeholder="2025/2026"
                            />
                            {errors.tahun_ajaran && (
                                <p className="text-sm text-destructive mt-1">
                                    {errors.tahun_ajaran}
                                </p>
                            )}
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
                                href={route("kelas.index")}
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
