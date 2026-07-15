import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { useState } from "react";

export default function Create() {
    const form = useForm({
        tanggal_terima: "",
        no_surat: "",
        tanggal_surat: "",
        asal_surat: "",
        perihal: "",
        ringkasan: "",
        file_scan: null as File | null,
    });

    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("tu.surat-masuk.store"), {
            onSuccess: () => form.reset(),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData("file_scan", file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Tambah Surat Masuk" />
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
                            Tambah Surat Masuk
                        </h1>
                        <p className="text-sm text-gray-500">
                            Isi formulir di bawah untuk menambah surat masuk
                            baru
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
                                    defaultValue={
                                        new Date().toISOString().split("T")[0]
                                    }
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
                                    onChange={(e) =>
                                        form.setData("no_surat", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    placeholder="Contoh: 420/123/Sekolah/2025"
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
                                    defaultValue={
                                        new Date().toISOString().split("T")[0]
                                    }
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
                                    onChange={(e) =>
                                        form.setData(
                                            "asal_surat",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    placeholder="Contoh: Dinas Pendidikan Kota"
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
                                onChange={(e) =>
                                    form.setData("perihal", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                placeholder="Contoh: Undangan Rapat Koordinasi"
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
                                onChange={(e) =>
                                    form.setData("ringkasan", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                placeholder="Ringkasan isi surat..."
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
                                    <span className="text-sm text-gray-600">
                                        File dipilih
                                    </span>
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
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
