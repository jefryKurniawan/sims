import { Head, useForm, Link } from "@inertiajs/inertia-react";
import { ChevronLeft, Send } from "lucide-react";

export default function DisposisiModal({ suratMasuk, stafTu }: { suratMasuk: any; stafTu: any[] }) {
    const form = useForm({
        disposisi_kepada: "",
        disposisi_instruksi: "",
        disposisi_batas_waktu: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("tu.surat-masuk.disposisi", suratMasuk.id), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Disposisi Surat" />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Disposisi Surat
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {suratMasuk.no_surat} — {suratMasuk.perihal}
                        </p>
                    </div>
                    <Link
                        href={route("tu.surat-masuk.show", suratMasuk.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Disposisi Kepada <span className="text-destructive">*</span>
                            </label>
                            <select
                                value={form.data.disposisi_kepada}
                                onChange={(e) => form.setData("disposisi_kepada", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            >
                                <option value="">— Pilih Staf —</option>
                                {stafTu.map((user: any) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                            {form.errors.disposisi_kepada && (
                                <span className="text-destructive text-xs">{form.errors.disposisi_kepada}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Instruksi <span className="text-destructive">*</span>
                            </label>
                            <textarea
                                value={form.data.disposisi_instruksi}
                                onChange={(e) => form.setData("disposisi_instruksi", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                                rows={3}
                                placeholder="Harap ditindaklanjuti..."
                            />
                            {form.errors.disposisi_instruksi && (
                                <span className="text-destructive text-xs">{form.errors.disposisi_instruksi}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Batas Waktu <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="date"
                                value={form.data.disposisi_batas_waktu}
                                onChange={(e) => form.setData("disposisi_batas_waktu", e.target.value)}
                                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition text-sm"
                            />
                            {form.errors.disposisi_batas_waktu && (
                                <span className="text-destructive text-xs">{form.errors.disposisi_batas_waktu}</span>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Link
                                href={route("tu.surat-masuk.show", suratMasuk.id)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                                disabled={form.processing}
                            >
                                <Send className="w-4 h-4" />
                                {form.processing ? "Mengirim..." : "Kirim Disposisi"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
