import { Head, useForm, Link } from "@inertiajs/inertia-react";
import {
    ArrowLeft,
    Save,
    FileText,
    Download,
    Edit,
    ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Inertia as router } from "@inertiajs/inertia";

export default function Edit({
    suratMasuk,
    stafTu,
}: {
    suratMasuk: any;
    stafTu: any;
}) {
    const form = useForm({
        tanggal_terima: suratMasuk.tanggal_terima,
        no_surat: suratMasuk.no_surat,
        tanggal_surat: suratMasuk.tanggal_surat,
        asal_surat: suratMasuk.asal_surat,
        perihal: suratMasuk.perihal,
        ringkasan: suratMasuk.ringkasan,
        file_scan: null as File | null,
    });

    const [filePreview, setFilePreview] = useState<string | null>(
        suratMasuk.file_scan ? `/storage/${suratMasuk.file_scan}` : null,
    );
    const [showDisposisiModal, setShowDisposisiModal] = useState(false);
    const disposisiForm = {
        disposisi_kepada: "",
        disposisi_instruksi: "",
        disposisi_batas_waktu: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("tu.surat-masuk.update", suratMasuk.id), {
            method: "put",
            onSuccess: () =>
                router.visit(route("tu.surat-masuk.show", suratMasuk.id)),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData("file_scan", file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleDisposisiSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            route("tu.surat-masuk.disposisi", suratMasuk.id),
            disposisiForm,
            {
                onSuccess: () => {
                    setShowDisposisiModal(false);
                    router.visit(route("tu.surat-masuk.show", suratMasuk.id));
                },
            },
        );
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatDateTime = (dateStr: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            <Head title="Edit Surat Masuk" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("tu.surat-masuk.index")}
                        className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                        title="Kembali"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Edit Surat Masuk
                        </h1>
                        <p className="text-sm text-gray-500">
                            Perbarui data surat masuk
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-3xl"
                    encType="multipart/form-data"
                >
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label
                                    htmlFor="tanggal_terima"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tanggal Terima{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_terima"
                                    defaultValue={suratMasuk.tanggal_terima}
                                    onChange={(e) =>
                                        form.setData(
                                            "tanggal_terima",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="no_surat"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Nomor Surat{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="no_surat"
                                    defaultValue={suratMasuk.no_surat}
                                    onChange={(e) =>
                                        form.setData("no_surat", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label
                                    htmlFor="tanggal_surat"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tanggal Surat{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_surat"
                                    defaultValue={suratMasuk.tanggal_surat}
                                    onChange={(e) =>
                                        form.setData(
                                            "tanggal_surat",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="asal_surat"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Asal Surat{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="asal_surat"
                                    defaultValue={suratMasuk.asal_surat}
                                    onChange={(e) =>
                                        form.setData(
                                            "asal_surat",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="perihal"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Perihal <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="perihal"
                                defaultValue={suratMasuk.perihal}
                                onChange={(e) =>
                                    form.setData("perihal", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="ringkasan"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Ringkasan Isi
                            </label>
                            <textarea
                                id="ringkasan"
                                rows={4}
                                defaultValue={suratMasuk.ringkasan}
                                onChange={(e) =>
                                    form.setData("ringkasan", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="file_scan"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                File Scan (PDF/JPG/PNG, max 5MB)
                            </label>
                            <input
                                type="file"
                                id="file_scan"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                            {filePreview && (
                                <div className="mt-2 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <Link
                                        href={filePreview}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Lihat File
                                        <ExternalLink className="w-3 h-3 inline ml-1" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                        <Link
                            href={route("tu.surat-masuk.index")}
                            className="px-4 py-2.5 border border-primary/20 rounded-lg text-sm font-medium text-gray-700 hover:bg-accent transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold"
                        >
                            <Save className="w-4 h-4" />
                            Simpan Perubahan
                        </button>
                    </div>
                </form>

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
                                            {stafTu?.map((u: any) => (
                                                <option key={u.id} value={u.id}>
                                                    {u.name}
                                                </option>
                                            ))}
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
