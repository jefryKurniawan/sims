import { Head, Link, useForm, usePage, router } from "@inertiajs/inertia-react";
import { useState } from "react";

interface PageProps {
    pembayaran: {
        id: number;
        jenis_pembayaran: string;
        jumlah_tagihan: number;
        jumlah_dibayar: number;
        sisa: number;
        status: string;
        jatuh_tempo: string | null;
        keterangan: string | null;
        siswa: { id: number; nama_lengkap: string; nisn: string } | null;
        details: Array<{
            id: number;
            jumlah: number;
            tanggal_bayar: string;
            metode: string;
            bukti_pembayaran: string | null;
            status_verifikasi: string;
            catatan_verifikasi: string | null;
            diverifikasi_pada: string | null;
            pencatat?: { name: string } | null;
        }>;
    };
    flash: { success?: string; error?: string };
}

const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

const statusColors: Record<string, string> = {
    lunas: "bg-emerald-100 text-emerald-700",
    belum_lunas: "bg-red-100 text-red-700",
    angsuran: "bg-yellow-100 text-yellow-700",
    pending: "bg-yellow-100 text-yellow-700",
    terverifikasi: "bg-emerald-100 text-emerald-700",
    ditolak: "bg-red-100 text-red-700",
};

export default function Show() {
    const { pembayaran, flash } = usePage<PageProps>().props as any;
    const { data, setData, post, processing, errors, reset } = useForm({
        jumlah: "",
        tanggal_bayar: new Date().toISOString().slice(0, 10),
        metode: "tunai",
        bukti_pembayaran: null as File | null,
        catatan: "",
    });
    const [showForm, setShowForm] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("pembayaran.bayar", pembayaran.id), {
            preserveScroll: true,
            onSuccess: () => { reset(); setShowForm(false); },
        });
    };

    const verify = (detailId: number, status: "terverifikasi" | "ditolak") => {
        router.post(route("pembayaran.verify", detailId), { status_verifikasi: status }, { preserveScroll: true });
    };

    return (
        <>
            <Head title={`Pembayaran ${pembayaran.jenis_pembayaran}`} />
            <div className="p-4 lg:p-6 max-w-4xl">
                <div className="mb-4">
                    <Link href={route("pembayaran.index")} className="text-sm text-primary hover:underline">← Kembali</Link>
                </div>

                {flash?.success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded">{flash.success}</div>}
                {flash?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{flash.error}</div>}

                <div className="bg-white p-6 rounded-lg border border-border mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {pembayaran.jenis_pembayaran} — {pembayaran.siswa?.nama_lengkap || "-"}
                    </h1>
                    <p className="text-sm text-gray-600 mb-4">NISN: {pembayaran.siswa?.nisn || "-"}</p>

                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                            <dt className="text-gray-500">Tagihan</dt>
                            <dd className="font-semibold">{formatRupiah(pembayaran.jumlah_tagihan)}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Dibayar</dt>
                            <dd className="font-semibold">{formatRupiah(pembayaran.jumlah_dibayar)}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Sisa</dt>
                            <dd className="font-semibold">{formatRupiah(pembayaran.sisa)}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Status</dt>
                            <dd>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[pembayaran.status]}`}>
                                    {pembayaran.status.replace("_", " ")}
                                </span>
                            </dd>
                        </div>
                    </dl>

                    {pembayaran.jatuh_tempo && <p className="text-sm text-gray-600 mt-3">Jatuh tempo: {pembayaran.jatuh_tempo}</p>}
                    {pembayaran.keterangan && <p className="text-sm text-gray-600 mt-2">Keterangan: {pembayaran.keterangan}</p>}

                    {pembayaran.sisa > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowForm((v) => !v)}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded text-sm hover:opacity-90"
                        >
                            {showForm ? "Tutup Form" : "Catat Pembayaran"}
                        </button>
                    )}
                </div>

                {showForm && (
                    <form onSubmit={submit} className="bg-white p-6 rounded-lg border border-border mb-6 space-y-3">
                        <h2 className="text-lg font-semibold mb-2">Catat Pembayaran</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="jumlah" className="block text-sm text-gray-700 mb-1">Jumlah</label>
                                <input
                                    id="jumlah" type="number" min="0.01" step="0.01"
                                    value={data.jumlah}
                                    onChange={(e) => setData("jumlah", e.target.value)}
                                    className="w-full border border-border px-3 py-2 rounded text-sm"
                                />
                                {errors.jumlah && <p className="text-xs text-destructive mt-1">{errors.jumlah}</p>}
                            </div>
                            <div>
                                <label htmlFor="tanggal_bayar" className="block text-sm text-gray-700 mb-1">Tanggal</label>
                                <input
                                    id="tanggal_bayar" type="date"
                                    value={data.tanggal_bayar}
                                    onChange={(e) => setData("tanggal_bayar", e.target.value)}
                                    className="w-full border border-border px-3 py-2 rounded text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="metode" className="block text-sm text-gray-700 mb-1">Metode</label>
                                <select
                                    id="metode"
                                    value={data.metode}
                                    onChange={(e) => setData("metode", e.target.value)}
                                    className="w-full border border-border px-3 py-2 rounded text-sm"
                                >
                                    <option value="tunai">Tunai</option>
                                    <option value="transfer">Transfer</option>
                                    <option value="qris">QRIS</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bukti" className="block text-sm text-gray-700 mb-1">Bukti (opsional)</label>
                                <input
                                    id="bukti" type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setData("bukti_pembayaran", e.target.files?.[0] || null)}
                                    className="w-full text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="catatan" className="block text-sm text-gray-700 mb-1">Catatan (opsional)</label>
                            <input
                                id="catatan" type="text"
                                value={data.catatan}
                                onChange={(e) => setData("catatan", e.target.value)}
                                className="w-full border border-border px-3 py-2 rounded text-sm"
                            />
                        </div>
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-primary text-white rounded text-sm hover:opacity-90 disabled:opacity-50">
                            {processing ? "Menyimpan..." : "Simpan Pembayaran"}
                        </button>
                    </form>
                )}

                <div className="bg-white p-6 rounded-lg border border-border">
                    <h2 className="text-lg font-semibold mb-3">Riwayat Pembayaran</h2>
                    {pembayaran.details.length === 0 ? (
                        <p className="text-sm text-gray-500">Belum ada pembayaran.</p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="border-b border-border text-left text-gray-600">
                                <tr>
                                    <th className="py-2">Tanggal</th>
                                    <th>Jumlah</th>
                                    <th>Metode</th>
                                    <th>Dicatat</th>
                                    <th>Verifikasi</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pembayaran.details.map((d: any) => (
                                    <tr key={d.id} className="border-b border-border">
                                        <td className="py-2">{d.tanggal_bayar}</td>
                                        <td>{formatRupiah(d.jumlah)}</td>
                                        <td>{d.metode}</td>
                                        <td>{d.pencatat?.name || "-"}</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded text-xs ${statusColors[d.status_verifikasi] || statusColors.pending}`}>
                                                {d.status_verifikasi}
                                            </span>
                                        </td>
                                        <td>
                                            {d.status_verifikasi === "pending" && (
                                                <div className="flex gap-1">
                                                    <button type="button" onClick={() => verify(d.id, "terverifikasi")} className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200">Setujui</button>
                                                    <button type="button" onClick={() => verify(d.id, "ditolak")} className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Tolak</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}
