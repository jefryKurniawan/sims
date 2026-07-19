import { Head, Link } from "@inertiajs/inertia-react";
import { ChevronLeft, File } from "lucide-react";

export default function Show({ arsipAkreditasi }: { arsipAkreditasi: any }) {
    const statusBadge = (s: string) => (
        <span className={`inline-flex px-2.5 py-0.5 text-sm font-medium rounded-full ${s === "lengkap" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {s}
        </span>
    );

    const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
        <div className="border-t pt-4 first:border-t-0 first:pt-0">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-label mb-1">{label}</p>
            <div className="text-sm text-gray-900">{children}</div>
        </div>
    );

    return (
        <>
            <Head title={`Detail - ${arsipAkreditasi.nama_dokumen}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Detail Dokumen
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">Standar {arsipAkreditasi.standar} — {arsipAkreditasi.sub_standar} / {arsipAkreditasi.butir}</p>
                    </div>
                    <Link
                        href={route("tu.arsip-akreditasi.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 space-y-4 max-w-2xl">
                    <div className="flex items-center justify-between">
                        <Field label="Nama Dokumen">
                            <p className="text-base font-medium">{arsipAkreditasi.nama_dokumen}</p>
                        </Field>
                        {statusBadge(arsipAkreditasi.status)}
                    </div>
                    <Field label="Standar">{`Standar ${arsipAkreditasi.standar}`}</Field>
                    <Field label="Sub Standar">{arsipAkreditasi.sub_standar}</Field>
                    <Field label="Butir">{arsipAkreditasi.butir}</Field>
                    <Field label="Tahun Ajaran">{arsipAkreditasi.tahun_ajaran}</Field>
                    <Field label="File Dokumen">
                        {arsipAkreditasi.file_path ? (
                            <a
                                href={`/storage/${arsipAkreditasi.file_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80"
                            >
                                <File className="w-4 h-4" />
                                Lihat / Download
                            </a>
                        ) : (
                            <span className="text-gray-400">Tidak ada</span>
                        )}
                    </Field>
                    <Field label="Penanggung Jawab">
                        {arsipAkreditasi.penanggung_jawab?.name || "-"}
                    </Field>
                </div>
            </div>
        </>
    );
}
