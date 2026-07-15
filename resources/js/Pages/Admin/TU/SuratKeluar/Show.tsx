import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia as router } from "@inertiajs/inertia";
import {
    Mail,
    Calendar,
    Clock,
    User,
    FileText,
    Download,
    ExternalLink,
    ArrowLeft,
    Eye,
    Edit,
    Archive,
} from "lucide-react";

export default function Show({ suratKeluar }: { suratKeluar: any }) {
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatDateTime = (dateStr: string | null) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            draf: "bg-gray-100 text-gray-700",
            terkirim: "bg-blue-100 text-blue-700",
            arsip: "bg-green-100 text-green-700",
        };
        return badges[status] || "bg-gray-100 text-gray-700";
    };

    const handleArsipkan = () => {
        if (confirm("Yakin ingin mengarsipkan surat ini?")) {
            router.put(route("tu.surat-keluar.arsipkan", suratKeluar.id));
        }
    };

    return (
        <>
            <Head title={`Surat Keluar - ${suratKeluar.no_surat}`} />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("tu.surat-keluar.index")}
                            className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                            title="Kembali"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                                Surat Keluar
                            </h1>
                            <p className="text-sm text-gray-500">
                                {suratKeluar.no_surat}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={route("tu.surat-keluar.edit", suratKeluar.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-accent transition"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </Link>
                        {suratKeluar.status !== "arsip" && (
                            <button
                                onClick={handleArsipkan}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-accent transition"
                            >
                                <Archive className="w-4 h-4" />
                                Arsipkan
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                Informasi Surat
                            </h2>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Nomor Surat
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {suratKeluar.no_surat}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Tanggal Kirim
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {formatDate(suratKeluar.tanggal_kirim)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        No. Agenda
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {suratKeluar.no_agenda}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Penandatangan
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {suratKeluar.penandatangan}
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm text-gray-500">
                                        Tujuan Surat
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {suratKeluar.tujuan}
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm text-gray-500">
                                        Perihal
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {suratKeluar.perihal}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" />
                                Ringkasan Isi
                            </h2>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {suratKeluar.ringkasan || "-"}
                            </p>
                        </div>

                        {suratKeluar.file_scan && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Lampiran
                                </h2>
                                <Link
                                    href={`/storage/${suratKeluar.file_scan}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                                >
                                    <FileText className="w-4 h-4" />
                                    Lihat File Scan
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Status
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <span
                                        className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadge(suratKeluar.status)}`}
                                    >
                                        {suratKeluar.status === "draf"
                                            ? "Draf"
                                            : suratKeluar.status === "terkirim"
                                              ? "Terkirim"
                                              : "Arsip"}
                                    </span>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Dibuat oleh
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {suratKeluar.created_by?.name || "-"}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Dibuat pada
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {formatDateTime(suratKeluar.created_at)}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Diperbarui pada
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {formatDateTime(suratKeluar.updated_at)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-primary" />
                                Aksi Cepat
                            </h2>
                            <div className="space-y-2">
                                <Link
                                    href={route(
                                        "tu.surat-keluar.edit",
                                        suratKeluar.id,
                                    )}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition text-sm text-gray-700"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Surat
                                </Link>
                                {suratKeluar.file_scan && (
                                    <Link
                                        href={`/storage/${suratKeluar.file_scan}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition text-sm text-gray-700"
                                    >
                                        <Download className="w-4 h-4" />
                                        Unduh File Scan
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
