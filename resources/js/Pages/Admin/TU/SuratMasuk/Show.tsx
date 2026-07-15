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
    AlertTriangle,
    Send,
    Archive,
    Edit,
    Trash2,
    ArrowLeft,
    Eye,
} from "lucide-react";
import { useState } from "react";

export default function Show({ suratMasuk }: { suratMasuk: any }) {
    const { auth } = usePage().props as any;
    const [showDisposisiModal, setShowDisposisiModal] = useState(false);
    const [disposisiForm, setDisposisiForm] = useState({
        disposisi_kepada: "",
        disposisi_instruksi: "",
        disposisi_batas_waktu: "",
    });

    const handleArsipkan = async () => {
        if (confirm("Yakin ingin mengarsipkan surat ini?")) {
            router.put(route("tu.surat-masuk.arsipkan", suratMasuk.id));
        }
    };

    const handleDisposisiSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            route("tu.surat-masuk.disposisi", suratMasuk.id),
            disposisiForm,
            {
                onSuccess: () => setShowDisposisiModal(false),
            },
        );
    };

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
            baru: "bg-blue-100 text-blue-700",
            diproses: "bg-yellow-100 text-yellow-700",
            selesai: "bg-green-100 text-green-700",
            arsip: "bg-gray-100 text-gray-700",
        };
        return badges[status] || "bg-gray-100 text-gray-700";
    };

    const getDisposisiBadge = (status: string) => {
        const badges: Record<string, string> = {
            belum: "bg-gray-100 text-gray-700",
            dibaca: "bg-blue-100 text-blue-700",
            dibalas: "bg-green-100 text-green-700",
        };
        return badges[status] || "bg-gray-100 text-gray-700";
    };

    return (
        <>
            <Head title={`Surat Masuk - ${suratMasuk.no_surat}`} />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("tu.surat-masuk.index")}
                            className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                            title="Kembali"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                                Surat Masuk
                            </h1>
                            <p className="text-sm text-gray-500">
                                {suratMasuk.no_surat}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={route("tu.surat-masuk.edit", suratMasuk.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-accent transition"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </Link>
                        {suratMasuk.status !== "arsip" && (
                            <button
                                onClick={handleArsipkan}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-accent transition"
                            >
                                <Archive className="w-4 h-4" />
                                Arsipkan
                            </button>
                        )}
                        {(auth?.user?.role === "Admin" ||
                            auth?.user?.role === "TU" ||
                            auth?.user?.role === "Staf") && (
                            <button
                                onClick={() => setShowDisposisiModal(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                            >
                                <Send className="w-4 h-4" />
                                Disposisi
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
                                        {suratMasuk.no_surat}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Tanggal Surat
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {formatDate(suratMasuk.tanggal_surat)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Tanggal Diterima
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {formatDate(suratMasuk.tanggal_terima)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        No. Agenda
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {suratMasuk.no_agenda}
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm text-gray-500">
                                        Asal Surat
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {suratMasuk.asal_surat}
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm text-gray-500">
                                        Perihal
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 mt-1">
                                        {suratMasuk.perihal}
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
                                {suratMasuk.ringkasan || "-"}
                            </p>
                        </div>

                        {suratMasuk.file_scan && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Lampiran
                                </h2>
                                <Link
                                    href={`/storage/${suratMasuk.file_scan}`}
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

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                Disposisi
                            </h2>
                            {suratMasuk.disposisi_kepada ? (
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-sm text-gray-500">
                                            Kepada
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900 mt-1">
                                            {suratMasuk.disposisi_kepada
                                                ?.name || "-"}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">
                                            Status Disposisi
                                        </dt>
                                        <dd className="mt-1">
                                            <span
                                                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getDisposisiBadge(suratMasuk.status_disposisi)}`}
                                            >
                                                {suratMasuk.status_disposisi ===
                                                "belum"
                                                    ? "Belum"
                                                    : suratMasuk.status_disposisi ===
                                                        "dibaca"
                                                      ? "Dibaca"
                                                      : "Dibalas"}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm text-gray-500">
                                            Instruksi
                                        </dt>
                                        <dd className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                                            {suratMasuk.disposisi_instruksi ||
                                                "-"}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">
                                            Batas Waktu
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900 mt-1">
                                            {formatDate(
                                                suratMasuk.disposisi_batas_waktu,
                                            )}
                                        </dd>
                                    </div>
                                </dl>
                            ) : (
                                <div className="text-center py-8">
                                    <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">
                                        Belum ada disposisi untuk surat ini
                                    </p>
                                </div>
                            )}
                        </div>
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
                                        className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadge(suratMasuk.status)}`}
                                    >
                                        {suratMasuk.status === "baru"
                                            ? "Baru"
                                            : suratMasuk.status === "diproses"
                                              ? "Diproses"
                                              : suratMasuk.status === "selesai"
                                                ? "Selesai"
                                                : "Arsip"}
                                    </span>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Dibuat oleh
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {suratMasuk.created_by?.name || "-"}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Dibuat pada
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {formatDateTime(suratMasuk.created_at)}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Diperbarui pada
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {formatDateTime(suratMasuk.updated_at)}
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
                                        "tu.surat-masuk.edit",
                                        suratMasuk.id,
                                    )}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition text-sm text-gray-700"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Surat
                                </Link>
                                {suratMasuk.file_scan && (
                                    <Link
                                        href={`/storage/${suratMasuk.file_scan}`}
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

                {showDisposisiModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="fixed inset-0 bg-black/50"
                                onClick={() => setShowDisposisiModal(false)}
                            />
                            <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Buat Disposisi
                                </h3>
                                <form
                                    onSubmit={handleDisposisiSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label
                                            htmlFor="disposisi_kepada"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Penerima{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            id="disposisi_kepada"
                                            name="disposisi_kepada"
                                            required
                                            value={
                                                disposisiForm.disposisi_kepada
                                            }
                                            onChange={(e) =>
                                                setDisposisiForm({
                                                    ...disposisiForm,
                                                    disposisi_kepada:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        >
                                            <option value="">
                                                Pilih penerima...
                                            </option>
                                            {suratMasuk.stafTu?.map(
                                                (u: any) => (
                                                    <option
                                                        key={u.id}
                                                        value={u.id}
                                                    >
                                                        {u.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="disposisi_instruksi"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Instruksi{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            id="disposisi_instruksi"
                                            name="disposisi_instruksi"
                                            rows={3}
                                            required
                                            value={
                                                disposisiForm.disposisi_instruksi
                                            }
                                            onChange={(e) =>
                                                setDisposisiForm({
                                                    ...disposisiForm,
                                                    disposisi_instruksi:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="disposisi_batas_waktu"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Batas Waktu{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            id="disposisi_batas_waktu"
                                            name="disposisi_batas_waktu"
                                            required
                                            value={
                                                disposisiForm.disposisi_batas_waktu
                                            }
                                            onChange={(e) =>
                                                setDisposisiForm({
                                                    ...disposisiForm,
                                                    disposisi_batas_waktu:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowDisposisiModal(false)
                                            }
                                            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-accent transition"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold"
                                        >
                                            <Send className="w-4 h-4" />
                                            Kirim Disposisi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
