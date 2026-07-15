import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { useState } from "react";

export default function Edit({ suratKeluar }: { suratKeluar: any }) {
    const form = useForm({
        tanggal_kirim: suratKeluar.tanggal_kirim,
        tujuan: suratKeluar.tujuan,
        perihal: suratKeluar.perihal,
        ringkasan: suratKeluar.ringkasan,
        file_scan: null as File | null,
        penandatangan: suratKeluar.penandatangan,
        status: suratKeluar.status,
    });

    const [filePreview, setFilePreview] = useState<string | null>(
        suratKeluar.file_scan ? `/storage/${suratKeluar.file_scan}` : null,
    );
    const [deleteFile, setDeleteFile] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(route("tu.surat-keluar.update", suratKeluar.id), {
            onSuccess: () => setFilePreview(null),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData("file_scan", file);
            setDeleteFile(false);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Edit Surat Keluar" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("tu.surat-keluar.index")}
                        className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                        title="Kembali"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Edit Surat Keluar
                        </h1>
                        <p className="text-sm text-gray-500">
                            Perbarui informasi surat keluar
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
                                    htmlFor="tanggal_kirim"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tanggal Kirim{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_kirim"
                                    defaultValue={form.data.tanggal_kirim}
                                    onChange={(e) =>
                                        form.setData(
                                            "tanggal_kirim",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="penandatangan"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Penandatangan{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="penandatangan"
                                    defaultValue={form.data.penandatangan}
                                    onChange={(e) =>
                                        form.setData(
                                            "penandatangan",
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
                                htmlFor="tujuan"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tujuan Surat{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="tujuan"
                                defaultValue={form.data.tujuan}
                                onChange={(e) =>
                                    form.setData("tujuan", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                required
                            />
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
                                defaultValue={form.data.perihal}
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
                                defaultValue={form.data.ringkasan ?? ""}
                                onChange={(e) =>
                                    form.setData("ringkasan", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                File Scan Saat Ini
                            </label>
                            {filePreview ? (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-700 truncate">
                                            File terlampir
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {suratKeluar.file_scan}
                                        </p>
                                    </div>
                                    <label className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={deleteFile}
                                            onChange={(e) =>
                                                setDeleteFile(e.target.checked)
                                            }
                                            className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                        />
                                        Hapus file
                                    </label>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Tidak ada file
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="file_scan"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Ganti File Scan (PDF/JPG/PNG, max 5MB)
                            </label>
                            <input
                                type="file"
                                id="file_scan"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                        <Link
                            href={route("tu.surat-keluar.index")}
                            className="px-4 py-2.5 border border-primary/20 rounded-lg text-sm font-medium text-gray-700 hover:bg-accent transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-semibold"
                        >
                            <Save className="w-4 h-4" />
                            Perbarui
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
