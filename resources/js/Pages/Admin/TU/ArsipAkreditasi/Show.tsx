import { Head, Link } from "@inertiajs/inertia-react";
import {
    ArrowLeft,
    FileText,
    ExternalLink,
    Calendar,
    User,
    Folder,
    Tag,
    Clock,
    Edit,
    Trash2,
    Download,
    Archive,
} from "lucide-react";

export default function Show({ arsipAkreditasi }: { arsipAkreditasi: any }) {
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
        return status === "lengkap"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700";
    };

    const getStandarLabel = (standar: number) => {
        const labels: Record<number, string> = {
            1: "Visi, Misi, Tujuan, Sasaran, Strategi",
            2: "Pemerintahan & Kepemimpinan",
            3: "Peserta Didik",
            4: "SDM",
            5: "Sarana, Prasarana, & Anggaran",
            6: "Kurikulum & Pembelajaran",
            7: "Penilaian",
            8: "Kemitraan",
        };
        return `Standar ${standar} - ${labels[standar] || ""}`;
    };

    return (
        <>
            <Head
                title={`Dokumen Akreditasi - ${arsipAkreditasi.nama_dokumen}`}
            />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("tu.arsip-akreditasi.index")}
                            className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                            title="Kembali"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                                Detail Dokumen
                            </h1>
                            <p className="text-sm text-gray-500">
                                {arsipAkreditasi.nama_dokumen}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={route(
                                "tu.arsip-akreditasi.edit",
                                arsipAkreditasi.id,
                            )}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-accent transition"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </Link>
                        {arsipAkreditasi.file_path && (
                            <Link
                                href={`/storage/${arsipAkreditasi.file_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-accent transition"
                            >
                                <Download className="w-4 h-4" />
                                Unduh
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Folder className="w-5 h-5 text-primary" />
                                Informasi Dokumen
                            </h2>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Standar
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {getStandarLabel(
                                            arsipAkreditasi.standar,
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Sub Standar
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {arsipAkreditasi.sub_standar}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Butir
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {arsipAkreditasi.butir}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Tahun Ajaran
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {arsipAkreditasi.tahun_ajaran}
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm text-gray-500">
                                        Nama Dokumen
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {arsipAkreditasi.nama_dokumen}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-primary" />
                                Status
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <span
                                        className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadge(arsipAkreditasi.status)}`}
                                    >
                                        {arsipAkreditasi.status === "lengkap"
                                            ? "Lengkap"
                                            : "Belum"}
                                    </span>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Penanggung Jawab
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {arsipAkreditasi.penanggung_jawab
                                            ?.name || "Belum ditetapkan"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {arsipAkreditasi.file_path && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    File Dokumen
                                </h2>
                                <Link
                                    href={`/storage/${arsipAkreditasi.file_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                                >
                                    <FileText className="w-4 h-4" />
                                    Lihat / Unduh File
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                                <p className="text-xs text-gray-500 mt-1">
                                    {arsipAkreditasi.file_path}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                Informasi Sistem
                            </h2>
                            <div className="space-y-4">
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Dibuat pada
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {formatDateTime(
                                            arsipAkreditasi.created_at,
                                        )}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Diperbarui pada
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {formatDateTime(
                                            arsipAkreditasi.updated_at,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-primary" />
                                Navigasi
                            </h2>
                            <div className="space-y-2">
                                <Link
                                    href={route(
                                        "tu.arsip-akreditasi.edit",
                                        arsipAkreditasi.id,
                                    )}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition text-sm text-gray-700"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Dokumen
                                </Link>
                                <Link
                                    href={route("tu.arsip-akreditasi.index")}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition text-sm text-gray-700"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Kembali ke Daftar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
