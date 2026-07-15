import { Head, Link } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

export default function Show({ dispensasi }: { dispensasi: any }) {
    return (
        <>
            <Head title="Detail Dispensasi" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Detail Dispensasi
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {dispensasi.siswa?.nama_lengkap ||
                                "Tidak Diketahui"}
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

                <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-4 max-w-2xl">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Siswa
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {dispensasi.siswa?.nama_lengkap ??
                                "Tidak Diketahui"}
                            {dispensasi.siswa?.nisn && (
                                <span className="text-xs text-gray-400 ml-1.5">
                                    ({dispensasi.siswa.nisn})
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Jenis Dispensasi
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            <span
                                className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${dispensasi.jenis === "potongan" ? "bg-destructive/10 text-destructive" : "bg-yellow-100 text-yellow-700"}`}
                            >
                                {dispensasi.jenis === "potongan"
                                    ? "Potongan"
                                    : "Penundaan"}
                            </span>
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Nominal
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            Rp{" "}
                            {parseFloat(dispensasi.nominal).toLocaleString(
                                "id-ID",
                            )}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Periode
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {dispensasi.tanggal_mulai ? (
                                <>
                                    {new Date(
                                        dispensasi.tanggal_mulai,
                                    ).toLocaleDateString("id-ID")}
                                    {dispensasi.tanggal_selesai ? " - " : ""}
                                    {dispensasi.tanggal_selesai
                                        ? new Date(
                                              dispensasi.tanggal_selesai,
                                          ).toLocaleDateString("id-ID")
                                        : ""}
                                </>
                            ) : (
                                "-"
                            )}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Keterangan
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {dispensasi.keterangan ?? "-"}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Tanggal Dibuat
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {dispensasi.created_at
                                ? new Date(
                                      dispensasi.created_at,
                                  ).toLocaleDateString("id-ID")
                                : "-"}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-label">
                            Terakhir Diperbarui
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {dispensasi.updated_at
                                ? new Date(
                                      dispensasi.updated_at,
                                  ).toLocaleDateString("id-ID")
                                : "-"}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
