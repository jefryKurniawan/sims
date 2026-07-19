import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

export default function Edit({ arsipAkreditasi, penanggungJawab, standarList }: { arsipAkreditasi: any; penanggungJawab: any[]; standarList: number[] }) {
    const form = useForm({
        standar: String(arsipAkreditasi.standar),
        sub_standar: arsipAkreditasi.sub_standar,
        butir: arsipAkreditasi.butir,
        nama_dokumen: arsipAkreditasi.nama_dokumen,
        file_path: null as File | null,
        tahun_ajaran: arsipAkreditasi.tahun_ajaran,
        status: arsipAkreditasi.status,
        penanggung_jawab: String(arsipAkreditasi.penanggung_jawab || ""),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("tu.arsip-akreditasi.update", arsipAkreditasi.id), {
            _method: "PUT",
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Dokumen Akreditasi" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Edit Dokumen Akreditasi
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">{arsipAkreditasi.nama_dokumen}</p>
                    </div>
                    <Link
                        href={route("tu.arsip-akreditasi.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Standar</label>
                                <select
                                    value={form.data.standar}
                                    onChange={(e) => form.setData("standar", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                >
                                    {standarList.map((s) => (
                                        <option key={s} value={s}>Standar {s}</option>
                                    ))}
                                </select>
                                {form.errors.standar && <span className="text-destructive text-xs">{form.errors.standar}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Sub Standar</label>
                                <input
                                    type="text"
                                    value={form.data.sub_standar}
                                    onChange={(e) => form.setData("sub_standar", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                                {form.errors.sub_standar && <span className="text-destructive text-xs">{form.errors.sub_standar}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Butir</label>
                                <input
                                    type="text"
                                    value={form.data.butir}
                                    onChange={(e) => form.setData("butir", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                                {form.errors.butir && <span className="text-destructive text-xs">{form.errors.butir}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Nama Dokumen</label>
                            <input
                                type="text"
                                value={form.data.nama_dokumen}
                                onChange={(e) => form.setData("nama_dokumen", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.nama_dokumen && <span className="text-destructive text-xs">{form.errors.nama_dokumen}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Tahun Ajaran</label>
                            <input
                                type="text"
                                value={form.data.tahun_ajaran}
                                onChange={(e) => form.setData("tahun_ajaran", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.tahun_ajaran && <span className="text-destructive text-xs">{form.errors.tahun_ajaran}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">File Dokumen (biarkan kosong jika tidak diubah)</label>
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    form.setData("file_path", file);
                                }}
                                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary"
                            />
                            {form.errors.file_path && <span className="text-destructive text-xs">{form.errors.file_path}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Status</label>
                                <select
                                    value={form.data.status}
                                    onChange={(e) => form.setData("status", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                >
                                    <option value="belum">Belum</option>
                                    <option value="lengkap">Lengkap</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Penanggung Jawab</label>
                                <select
                                    value={form.data.penanggung_jawab}
                                    onChange={(e) => form.setData("penanggung_jawab", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                >
                                    <option value="">— Pilih —</option>
                                    {penanggungJawab.map((user: any) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route("tu.arsip-akreditasi.index")}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                disabled={form.processing}
                            >
                                {form.processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
