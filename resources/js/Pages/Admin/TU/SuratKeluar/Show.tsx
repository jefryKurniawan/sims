import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { ChevronLeft, Archive } from "lucide-react";

export default function Show({ suratKeluar }: { suratKeluar: any }) {
    const handleArchive = () => {
        Inertia.put(route("tu.surat-keluar.arsipkan", suratKeluar.id));
    };

    const statusBadge = (s: string) => {
        const colors: Record<string, string> = {
            draf: "bg-gray-100 text-gray-600",
            terkirim: "bg-emerald-100 text-emerald-700",
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
            <Head title={`Detail Surat Keluar - ${suratKeluar.no_surat}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Detail Surat Keluar
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">{suratKeluar.perihal}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {suratKeluar.status !== "arsip" && (
                            <button
                                type="button"
                                onClick={handleArchive}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm font-medium"
                            >
                                <Archive className="w-4 h-4" />
                                Arsipkan
                            </button>
                        )}
                        <Link
                            href={route("tu.surat-keluar.index")}
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
                            <span className="font-mono">{suratKeluar.no_surat}</span>
                        </Field>
                        {statusBadge(suratKeluar.status)}
                    </div>
                    <Field label="Tanggal Kirim">{suratKeluar.tanggal_kirim}</Field>
                    <Field label="Tujuan">{suratKeluar.tujuan}</Field>
                    <Field label="Perihal">
                        <p className="text-base font-medium">{suratKeluar.perihal}</p>
                    </Field>
                    <Field label="Ringkasan">
                        <p className="text-gray-600 whitespace-pre-wrap">{suratKeluar.ringkasan || "-"}</p>
                    </Field>
                    <Field label="Penandatangan">{suratKeluar.penandatangan}</Field>
                    <Field label="File Scan">
                        {suratKeluar.file_scan ? (
                            <a
                                href={`/storage/${suratKeluar.file_scan}`}
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
                    <Field label="Dicatat Oleh">
                        {suratKeluar.created_by?.name || "-"}
                    </Field>
                </div>
            </div>
        </>
    );
}
