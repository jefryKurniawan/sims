import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

interface PageProps {
    siswaList: Array<{ id: number; nama_lengkap: string; nisn: string }>;
    jenisOptions: string[];
    tagihanType: string | null;
    tagihanList: Array<any>;
}

export default function Create() {
    const { siswaList, jenisOptions, tagihanType } = usePage<PageProps>().props as any;
    const { data, setData, post, processing, errors } = useForm({
        siswa_id: "",
        jenis_pembayaran: jenisOptions[0] || "SPP",
        jumlah_tagihan: "",
        jatuh_tempo: "",
        keterangan: "",
        tagihan_type: tagihanType || "",
        tagihan_id: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("pembayaran.store"));
    };

    const formatNumber = (v: string) => v.replace(/[^\d.]/g, "");

    return (
        <>
            <Head title="Buat Tagihan Pembayaran" />
            <div className="p-4 lg:p-6 max-w-2xl">
                <div className="mb-4">
                    <Link href={route("pembayaran.index")} className="text-sm text-primary hover:underline">← Kembali</Link>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Buat Tagihan Pembayaran</h1>

                <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-lg border border-border">
                    <div>
                        <label htmlFor="siswa_id" className="block text-sm font-medium text-gray-700 mb-1">Siswa</label>
                        <select
                            id="siswa_id"
                            value={data.siswa_id}
                            onChange={(e) => setData("siswa_id", e.target.value)}
                            className="w-full border border-border px-3 py-2 rounded text-sm"
                        >
                            <option value="">Pilih siswa</option>
                            {siswaList.map((s: any) => (
                                <option key={s.id} value={s.id}>{s.nama_lengkap} — {s.nisn}</option>
                            ))}
                        </select>
                        {errors.siswa_id && <p className="text-xs text-destructive mt-1">{errors.siswa_id}</p>}
                    </div>

                    <div>
                        <label htmlFor="jenis_pembayaran" className="block text-sm font-medium text-gray-700 mb-1">Jenis Pembayaran</label>
                        <select
                            id="jenis_pembayaran"
                            value={data.jenis_pembayaran}
                            onChange={(e) => setData("jenis_pembayaran", e.target.value)}
                            className="w-full border border-border px-3 py-2 rounded text-sm"
                        >
                            {jenisOptions.map((j: string) => (
                                <option key={j} value={j}>{j}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="jumlah_tagihan" className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tagihan (Rp)</label>
                        <input
                            id="jumlah_tagihan"
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.jumlah_tagihan}
                            onChange={(e) => setData("jumlah_tagihan", formatNumber(e.target.value))}
                            className="w-full border border-border px-3 py-2 rounded text-sm"
                        />
                        {errors.jumlah_tagihan && <p className="text-xs text-destructive mt-1">{errors.jumlah_tagihan}</p>}
                    </div>

                    <div>
                        <label htmlFor="jatuh_tempo" className="block text-sm font-medium text-gray-700 mb-1">Jatuh Tempo (opsional)</label>
                        <input
                            id="jatuh_tempo"
                            type="date"
                            value={data.jatuh_tempo}
                            onChange={(e) => setData("jatuh_tempo", e.target.value)}
                            className="w-full border border-border px-3 py-2 rounded text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-1">Keterangan (opsional)</label>
                        <textarea
                            id="keterangan"
                            value={data.keterangan}
                            onChange={(e) => setData("keterangan", e.target.value)}
                            rows={2}
                            className="w-full border border-border px-3 py-2 rounded text-sm"
                        />
                    </div>

                    <details className="text-sm">
                        <summary className="cursor-pointer text-gray-600">Link ke tagihan existing (opsional)</summary>
                        <div className="mt-2 space-y-2 p-3 bg-gray-50 rounded">
                            <label htmlFor="tagihan_type" className="block text-xs text-gray-700">Tipe Model (mis. SppTagihan)</label>
                            <input
                                id="tagihan_type"
                                type="text"
                                value={data.tagihan_type}
                                onChange={(e) => setData("tagihan_type", e.target.value)}
                                placeholder="SppTagihan"
                                className="w-full border border-border px-2 py-1 rounded text-sm"
                            />
                            <label htmlFor="tagihan_id" className="block text-xs text-gray-700">ID Tagihan</label>
                            <input
                                id="tagihan_id"
                                type="number"
                                value={data.tagihan_id}
                                onChange={(e) => setData("tagihan_id", e.target.value)}
                                className="w-full border border-border px-2 py-1 rounded text-sm"
                            />
                        </div>
                    </details>

                    <div className="flex gap-2 pt-2">
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-primary text-white rounded text-sm hover:opacity-90 disabled:opacity-50">
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                        <Link href={route("pembayaran.index")} className="px-4 py-2 bg-gray-100 rounded text-sm hover:bg-gray-200">Batal</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
