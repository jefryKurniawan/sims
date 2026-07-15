import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";
import { ArrowLeft } from "lucide-react";
import AdminLayout from "@/Layout/AdminLayout";

export default function Create() {
    const { flash } = usePage().props;

    const form = useForm({
        tahun_ajaran: "",
        tanggal_buka: "",
        tanggal_tutup: "",
        kuota_reguler: "",
        kuota_afirmasi: "",
        kuota_prestasi: "",
        biaya_pendaftaran: "",
        aktif: true,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route("spmb.config.store"));
    };

    return (
        <AdminLayout title="Tambah Konfigurasi SPMB">
            <div className="p-4 lg:p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Link
                        href={route("spmb.config.index")}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Tambah Konfigurasi SPMB
                    </h1>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}

                <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
                    <div className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tahun Ajaran{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="tahun_ajaran"
                                        value={form.tahun_ajaran}
                                        onChange={(e) =>
                                            form.setData(
                                                "tahun_ajaran",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        placeholder="Contoh: 2026/2027"
                                    />
                                    {form.errors.tahun_ajaran && (
                                        <p className="text-destructive text-sm mt-1">
                                            {form.errors.tahun_ajaran}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Buka{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_buka"
                                        value={form.tanggal_buka}
                                        onChange={(e) =>
                                            form.setData(
                                                "tanggal_buka",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    />
                                    {form.errors.tanggal_buka && (
                                        <p className="text-destructive text-sm mt-1">
                                            {form.errors.tanggal_buka}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Tutup{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_tutup"
                                        value={form.tanggal_tutup}
                                        onChange={(e) =>
                                            form.setData(
                                                "tanggal_tutup",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    />
                                    {form.errors.tanggal_tutup && (
                                        <p className="text-destructive text-sm mt-1">
                                            {form.errors.tanggal_tutup}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kuota Reguler{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="kuota_reguler"
                                        value={form.kuota_reguler}
                                        onChange={(e) =>
                                            form.setData(
                                                "kuota_reguler",
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        min="0"
                                    />
                                    {form.errors.kuota_reguler && (
                                        <p className="text-destructive text-sm mt-1">
                                            {form.errors.kuota_reguler}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kuota Afirmasi{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="kuota_afirmasi"
                                        value={form.kuota_afirmasi}
                                        onChange={(e) =>
                                            form.setData(
                                                "kuota_afirmasi",
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        min="0"
                                    />
                                    {form.errors.kuota_afirmasi && (
                                        <p className="text-destructive text-sm mt-1">
                                            {form.errors.kuota_afirmasi}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kuota Prestasi{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="kuota_prestasi"
                                        value={form.kuota_prestasi}
                                        onChange={(e) =>
                                            form.setData(
                                                "kuota_prestasi",
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        min="0"
                                    />
                                    {form.errors.kuota_prestasi && (
                                        <p className="text-destructive text-sm mt-1">
                                            {form.errors.kuota_prestasi}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Biaya Pendaftaran{" "}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        name="biaya_pendaftaran"
                                        value={form.biaya_pendaftaran}
                                        onChange={(e) =>
                                            form.setData(
                                                "biaya_pendaftaran",
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        min="0"
                                        step="1"
                                    />
                                    {form.errors.biaya_pendaftaran && (
                                        <p className="text-destructive text-sm mt-1">
                                            {form.errors.biaya_pendaftaran}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="aktif"
                                        name="aktif"
                                        checked={form.aktif}
                                        onChange={(e) =>
                                            form.setData(
                                                "aktif",
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 text-primary focus:ring-ring border-primary/20 rounded"
                                    />
                                    <label
                                        htmlFor="aktif"
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        Aktif
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6">
                                <Link
                                    href={route("spmb.config.index")}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-primary/20 rounded-lg hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                                >
                                    Simpan Konfigurasi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
