import { Head, Link, router } from "@inertiajs/inertia-react";
import { ChevronLeft, Send, Archive } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";

export default function Show({ suratMasuk }: { suratMasuk: any }) {
    const handleArchive = () => {
        Inertia.put(route("tu.surat-masuk.arsipkan", suratMasuk.id));
    };

    const handleDispose = () => {
        Inertia.visit(route("tu.surat-masuk.disposisi", suratMasuk.id));
    };

    const statusBadge = (s: string) => {
        const colors: Record<string, string> = {
            baru: "bg-blue-100 text-blue-700",
            diproses: "bg-amber-100 text-amber-700",
            selesai: "bg-emerald-100 text-emerald-700",
            arsip: "bg-gray-100 text-gray-500",
        };
        return (
            <span className={`inline-flex px-2.5 py-0.5 text-sm font-medium rounded-full ${colors[s] || "bg-gray-100 text-gray-600"}`}>
                {s}
            </span>
        );
    };

    const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
        <div className="border-t pt-4 first:border-t-0 first:pt-0">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label mb-1">{label}</p>
            <div className="text-sm text-gray-900">{children}</div>
        </div>
    );

    return (
        <>
            <Head title={`Detail Surat - ${suratMasuk.no_surat}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Detail Surat Masuk
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">{suratMasuk.perihal}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {suratMasuk.status !== "arsip" && (
                            <>
                                <button
                                    type="button"
                                    onClick={handleDispose}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-medium"
                                >
                                    <Send className="w-4 h-4" />
                                    Disposisi
                                </button>
                                <button
                                    type="button"
                                    onClick={handleArchive}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm font-medium"
                                >
                                    <Archive className="w-4 h-4" />
                                    Arsipkan
                                </button>
                            </>
                        )}
                        <Link
                            href={route("tu.surat-masuk.index")}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-4 max-w-2xl">
                    <div className="flex items-center justify-between">
                        <Field label="Nomor Surat">
                            {suratMasuk.no_surat}
                        </Field>
                        {statusBadge(suratMasuk.status)}
                    </div>
                    <Field label="Tanggal Terima">{suratMasuk.tanggal_terima}</Field>
                    <Field label="Tanggal Surat">{suratMasuk.tanggal_surat}</Field>
                    <Field label="Asal Surat">{suratMasuk.asal_surat}</Field>
                    <Field label="Perihal">
                        <p className="text-base font-medium">{suratMasuk.perihal}</p>
                    </Field>
                    <Field label="Ringkasan">
                        <p className="text-gray-600 whitespace-pre-wrap">{suratMasuk.ringkasan || "-"}</p>
                    </Field>
                    <Field label="File Scan">
                        {suratMasuk.file_scan ? (
                            <a
                                href={`/storage/${suratMasuk.file_scan}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline hover:text-primary/80"
                            >
                                Lihat File
                            </a>
                        ) : (
                            <span className="text-gray-400">Tidak ada</span>
                        )}
                    </Field>
                    <Field label="Disposisi">
                        {suratMasuk.disposisi_kepada ? (
                            <div className="space-y-1">
                                <p>Kepada: <strong>{suratMasuk.disposisi_kepada.name}</strong></p>
                                <p>Instruksi: {suratMasuk.disposisi_instruksi || "-"}</p>
                                <p>Batas Waktu: {suratMasuk.disposisi_batas_waktu || "-"}</p>
                                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                                    suratMasuk.status_disposisi === "belum" ? "bg-red-100 text-red-700" :
                                    suratMasuk.status_disposisi === "dibaca" ? "bg-amber-100 text-amber-700" :
                                    "bg-emerald-100 text-emerald-700"
                                }`}>
                                    {suratMasuk.status_disposisi}
                                </span>
                            </div>
                        ) : (
                            <span className="text-gray-400">Belum disposisi</span>
                        )}
                    </Field>
                    <Field label="Dicatat Oleh">
                        {suratMasuk.created_by?.name || "-"}
                    </Field>
                </div>
            </div>
        </>
    );
}
