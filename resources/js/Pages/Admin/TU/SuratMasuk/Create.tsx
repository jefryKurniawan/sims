import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ChevronLeft } from "lucide-react";

export default function Create() {
    const form = useForm({
        tanggal_terima: new Date().toISOString().slice(0, 10),
        no_surat: "",
        tanggal_surat: new Date().toISOString().slice(0, 10),
        asal_surat: "",
        perihal: "",
        ringkasan: "",
        file_scan: null as File | null,
        status: "baru",
        status_disposisi: "belum",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("tu.surat-masuk.store"), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Tambah Surat Masuk" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Tambah Surat Masuk
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Catat surat yang diterima sekolah
                        </p>
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
                                <label className="block text-sm font-medium mb-1.5">
                                    Tanggal Terima <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={form.data.tanggal_terima}
                                    onChange={(e) => form.setData("tanggal_terima", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                                {form.errors.tanggal_terima && (
                                    <span className="text-destructive text-xs">{form.errors.tanggal_terima}</span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    Tanggal Surat <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={form.data.tanggal_surat}
                                    onChange={(e) => form.setData("tanggal_surat", e.target.value)}
                                    className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                />
                                {form.errors.tanggal_surat && (
                                    <span className="text-destructive text-xs">{form.errors.tanggal_surat}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Nomor Surat <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.data.no_surat}
                                onChange={(e) => form.setData("no_surat", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.no_surat && (
                                <span className="text-destructive text-xs">{form.errors.no_surat}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Asal Surat <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.data.asal_surat}
                                onChange={(e) => form.setData("asal_surat", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                placeholder="Nama instansi pengirim"
                            />
                            {form.errors.asal_surat && (
                                <span className="text-destructive text-xs">{form.errors.asal_surat}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Perihal <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.data.perihal}
                                onChange={(e) => form.setData("perihal", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                placeholder="Pokok isi surat"
                            />
                            {form.errors.perihal && (
                                <span className="text-destructive text-xs">{form.errors.perihal}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Ringkasan</label>
                            <textarea
                                value={form.data.ringkasan}
                                onChange={(e) => form.setData("ringkasan", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                rows={3}
                                placeholder="Ringkasan isi surat"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                File Scan
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    form.setData("file_scan", file);
                                }}
                                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                            {form.errors.file_scan && (
                                <span className="text-destructive text-xs">{form.errors.file_scan}</span>
                            )}
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
