import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ArrowLeft, Save, FileText, FolderTree } from "lucide-react";
import { useState } from "react";

export default function Create({
    penanggungJawab,
    standarList,
}: {
    penanggungJawab: any[];
    standarList: number[];
}) {
    const form = useForm({
        standar: "",
        sub_standar: "",
        butir: "",
        nama_dokumen: "",
        file_path: null as File | null,
        tahun_ajaran: "",
        status: "belum",
        penanggung_jawab: "",
    });

    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("tu.arsip-akreditasi.store"), {
            onSuccess: () => form.reset(),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData("file_path", file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Tambah Dokumen Akreditasi" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("tu.arsip-akreditasi.index")}
                        className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                        title="Kembali"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Tambah Dokumen Akreditasi
                        </h1>
                        <p className="text-sm text-gray-500">
                            Isi formulir di bawah untuk menambah dokumen
                            akreditasi baru
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
                                    htmlFor="standar"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Standar{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="standar"
                                    onChange={(e) =>
                                        form.setData("standar", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                >
                                    <option value="">Pilih Standar</option>
                                    {standarList.map((s) => (
                                        <option key={s} value={s.toString()}>
                                            {s}. Standar {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="sub_standar"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Sub Standar{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="sub_standar"
                                    onChange={(e) =>
                                        form.setData(
                                            "sub_standar",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    placeholder="Contoh: 1.1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label
                                    htmlFor="butir"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Butir{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="butir"
                                    onChange={(e) =>
                                        form.setData("butir", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    placeholder="Contoh: 1.1.1"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="tahun_ajaran"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tahun Ajaran{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="tahun_ajaran"
                                    onChange={(e) =>
                                        form.setData(
                                            "tahun_ajaran",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    placeholder="Contoh: 2024/2025"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="nama_dokumen"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Nama Dokumen{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="nama_dokumen"
                                onChange={(e) =>
                                    form.setData("nama_dokumen", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                placeholder="Contoh: Buku Pedoman Tata Kelola"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="file_path"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                File Dokumen (PDF/JPG/PNG, max 10MB){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                id="file_path"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                required
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Status{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="status"
                                    onChange={(e) =>
                                        form.setData("status", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                >
                                    <option value="belum">Belum</option>
                                    <option value="lengkap">Lengkap</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="penanggung_jawab"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Penanggung Jawab
                                </label>
                                <select
                                    id="penanggung_jawab"
                                    onChange={(e) =>
                                        form.setData(
                                            "penanggung_jawab",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                >
                                    <option value="">Pilih (Opsional)</option>
                                    {penanggungJawab.map((u: any) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                        <Link
                            href={route("tu.arsip-akreditasi.index")}
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
