import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { useState } from "react";

export default function Edit({
    arsipAkreditasi,
    penanggungJawab,
    standarList,
}: {
    arsipAkreditasi: any;
    penanggungJawab: any[];
    standarList: number[];
}) {
    const form = useForm({
        standar: arsipAkreditasi.standar,
        sub_standar: arsipAkreditasi.sub_standar,
        butir: arsipAkreditasi.butir,
        nama_dokumen: arsipAkreditasi.nama_dokumen,
        file_path: null as File | null,
        tahun_ajaran: arsipAkreditasi.tahun_ajaran,
        status: arsipAkreditasi.status,
        penanggung_jawab: arsipAkreditasi.penanggung_jawab,
    });

    const [filePreview, setFilePreview] = useState<string | null>(
        arsipAkreditasi.file_path
            ? `/storage/${arsipAkreditasi.file_path}`
            : null,
    );
    const [deleteFile, setDeleteFile] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("tu.arsip-akreditasi.update", arsipAkreditasi.id), {
            method: "put",
            onSuccess: () => setFilePreview(null),
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData("file_path", file);
            setDeleteFile(false);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Edit Dokumen Akreditasi" />
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
                            Edit Dokumen Akreditasi
                        </h1>
                        <p className="text-sm text-gray-500">
                            Perbarui informasi dokumen akreditasi
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
                                    defaultValue={form.data.standar}
                                    onChange={(e) =>
                                        form.setData(
                                            "standar",
                                            parseInt(e.target.value),
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                >
                                    {standarList.map((s) => (
                                        <option key={s} value={s.toString()}>
                                            Standar {s}
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
                                    defaultValue={form.data.sub_standar}
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
                                    defaultValue={form.data.butir}
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
                                    defaultValue={form.data.tahun_ajaran}
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
                                defaultValue={form.data.nama_dokumen}
                                onChange={(e) =>
                                    form.setData("nama_dokumen", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                placeholder="Contoh: Surat Keputusan Visi Misi"
                                required
                            />
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
                                    defaultValue={form.data.status}
                                    onChange={(e) =>
                                        form.setData("status", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                    required
                                >
                                    <option value="belum">Belum Lengkap</option>
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
                                    defaultValue={
                                        form.data.penanggung_jawab ?? ""
                                    }
                                    onChange={(e) =>
                                        form.setData(
                                            "penanggung_jawab",
                                            e.target.value || null,
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
                                >
                                    <option value="">
                                        Pilih penanggung jawab...
                                    </option>
                                    {penanggungJawab.map((u) => (
                                        <option
                                            key={u.id}
                                            value={u.id.toString()}
                                        >
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                File Saat Ini
                            </label>
                            {filePreview ? (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-700 truncate">
                                            File terlampir
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {arsipAkreditasi.file_path}
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
                                htmlFor="file_path"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Ganti File (PDF/JPG/PNG, max 10MB)
                            </label>
                            <input
                                type="file"
                                id="file_path"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
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
                            Perbarui
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
