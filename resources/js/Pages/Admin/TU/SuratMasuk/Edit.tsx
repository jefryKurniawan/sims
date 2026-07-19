import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

export default function Edit({ suratMasuk }: { suratMasuk: any }) {
    const form = useForm({
        tanggal_terima: suratMasuk.tanggal_terima,
        no_surat: suratMasuk.no_surat,
        tanggal_surat: suratMasuk.tanggal_surat,
        asal_surat: suratMasuk.asal_surat,
        perihal: suratMasuk.perihal,
        ringkasan: suratMasuk.ringkasan || "",
        file_scan: null as File | null,
        status: suratMasuk.status,
        status_disposisi: suratMasuk.status_disposisi,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("tu.surat-masuk.update", suratMasuk.id), {
            _method: "PUT",
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Surat Masuk" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Edit Surat Masuk
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">{suratMasuk.no_surat}</p>
                    </div>
                    <Link
                        href={route("tu.surat-masuk.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Tanggal Terima</label>
                                <input
                                    type="date"
                                    value={form.data.tanggal_terima}
                                    onChange={(e) => form.setData("tanggal_terima", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                                {form.errors.tanggal_terima && <span className="text-destructive text-xs">{form.errors.tanggal_terima}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Tanggal Surat</label>
                                <input
                                    type="date"
                                    value={form.data.tanggal_surat}
                                    onChange={(e) => form.setData("tanggal_surat", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                                {form.errors.tanggal_surat && <span className="text-destructive text-xs">{form.errors.tanggal_surat}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Nomor Surat</label>
                            <input
                                type="text"
                                value={form.data.no_surat}
                                onChange={(e) => form.setData("no_surat", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.no_surat && <span className="text-destructive text-xs">{form.errors.no_surat}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Asal Surat</label>
                            <input
                                type="text"
                                value={form.data.asal_surat}
                                onChange={(e) => form.setData("asal_surat", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.asal_surat && <span className="text-destructive text-xs">{form.errors.asal_surat}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Perihal</label>
                            <input
                                type="text"
                                value={form.data.perihal}
                                onChange={(e) => form.setData("perihal", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.perihal && <span className="text-destructive text-xs">{form.errors.perihal}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Ringkasan</label>
                            <textarea
                                value={form.data.ringkasan}
                                onChange={(e) => form.setData("ringkasan", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">File Scan (biarkan kosong jika tidak diubah)</label>
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    form.setData("file_scan", file);
                                }}
                                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary"
                            />
                            {form.errors.file_scan && <span className="text-destructive text-xs">{form.errors.file_scan}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Status</label>
                                <select
                                    value={form.data.status}
                                    onChange={(e) => form.setData("status", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                >
                                    <option value="baru">Baru</option>
                                    <option value="diproses">Diproses</option>
                                    <option value="selesai">Selesai</option>
                                    <option value="arsip">Arsip</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Status Disposisi</label>
                                <select
                                    value={form.data.status_disposisi}
                                    onChange={(e) => form.setData("status_disposisi", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                >
                                    <option value="belum">Belum</option>
                                    <option value="dibaca">Dibaca</option>
                                    <option value="dibalas">Dibalas</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route("tu.surat-masuk.index")}
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
