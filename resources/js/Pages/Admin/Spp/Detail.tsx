import { Head, usePage, Link, router } from "@inertiajs/inertia-react";
import { useState } from "react";

interface SiswaData {
    id: number;
    nama_lengkap: string;
    nisn: string | null;
}

interface PembayaranItem {
    id: number;
    nominal: number;
    tanggal_pembayaran: string;
    metode: string;
    status: string;
    keterangan?: string;
    bukti_pembayaran?: string | null;
}

interface TagihanDetail {
    id: number;
    siswa_id: number;
    nominal: number;
    status: string;
    tanggal_jatuh_tempo: string;
    keterangan: string | null;
    siswa: SiswaData | null;
    pembayaran: PembayaranItem[];
}

interface Props {
    tagihan: TagihanDetail;
}

export default function Detail({ tagihan }: Props) {
    const { flash } = usePage().props as any;
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // inline bayar form
    const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
    const [jumlah, setJumlah] = useState(tagihan.nominal - (tagihan.pembayaran?.reduce((s, p) => s + (p.status === "lunas" ? p.nominal : 0), 0) ?? 0));
    const [metode, setMetode] = useState("transfer");
    const [statusPay, setStatusPay] = useState("lunas");
    const [keterangan, setKeterangan] = useState("");
    const [bukti, setBukti] = useState<File | null>(null);
    const [buktiPreview, setBuktiPreview] = useState<string | null>(null);

    const formatRupiah = (num: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num);

    const statusBadge = (status: string) => {
        const map: Record<string, string> = {
            lunas: "bg-emerald-100 text-emerald-700",
            belum_lunas: "bg-destructive/10 text-destructive",
            overdue: "bg-yellow-100 text-yellow-700",
            pending: "bg-yellow-100 text-yellow-700",
            failed: "bg-red-100 text-red-700",
        };
        const label: Record<string, string> = {
            lunas: "Lunas",
            belum_lunas: "Belum Lunas",
            overdue: "Overdue",
            pending: "Pending",
            failed: "Gagal",
        };
        return (
            <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${map[status] || "bg-gray-100 text-gray-700"}`}>
                {label[status] || status}
            </span>
        );
    };

    const handleBuktiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBukti(file);
            setBuktiPreview(URL.createObjectURL(file));
        }
    };

    const handleBayar = (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);

        const formData = new FormData();
        formData.append("tanggal_pembayaran", tanggal);
        formData.append("jumlah", jumlah.toString());
        formData.append("metode", metode);
        formData.append("status", statusPay);
        if (keterangan) formData.append("keterangan", keterangan);
        if (bukti) formData.append("bukti_pembayaran", bukti);

        router.post(
            route("spp.bayar", tagihan.id),
            formData,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowForm(false);
                    setSubmitting(false);
                    setBukti(null);
                    setBuktiPreview(null);
                },
                onError: () => {
                    setSubmitting(false);
                },
            },
        );
    };

    return (
        <>
            <Head title="Detail Tagihan SPP" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Detail Tagihan SPP
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        {tagihan.siswa && (
                            <Link
                                href={route("spp.siswa", tagihan.siswa.id)}
                                className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 text-sm"
                            >
                                Riwayat Siswa
                            </Link>
                        )}
                        <Link
                            href={route("spp.index")}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-destructive/10 text-destructive border-destructive/20 rounded-lg text-sm font-medium">{flash.error}</div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Info Tagihan */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow border p-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Info Tagihan</h2>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="font-medium text-gray-600">Siswa</div>
                                <div>
                                    {tagihan.siswa?.nama_lengkap ?? "-"}{" "}
                                    {tagihan.siswa?.nisn ? `(${tagihan.siswa.nisn})` : ""}
                                </div>
                                <div className="font-medium text-gray-600">Nominal</div>
                                <div>{formatRupiah(tagihan.nominal)}</div>
                                <div className="font-medium text-gray-600">Jatuh Tempo</div>
                                <div>{tagihan.tanggal_jatuh_tempo}</div>
                                <div className="font-medium text-gray-600">Status</div>
                                <div>{statusBadge(tagihan.status)}</div>
                                <div className="font-medium text-gray-600">Keterangan</div>
                                <div>{tagihan.keterangan ?? "-"}</div>
                            </div>
                        </div>

                        {/* Riwayat Pembayaran */}
                        <div className="bg-white rounded-lg shadow border p-6">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Riwayat Pembayaran</h2>
                            {tagihan.pembayaran && tagihan.pembayaran.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2">#</th>
                                                <th className="px-4 py-2">Tanggal</th>
                                                <th className="px-4 py-2 text-right">Nominal</th>
                                                <th className="px-4 py-2">Metode</th>
                                                <th className="px-4 py-2">Status</th>
                                                <th className="px-4 py-2">Keterangan</th>
                                                <th className="px-4 py-2">Bukti</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {tagihan.pembayaran.map((p, idx) => (
                                                <tr key={p.id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                                                    <td className="px-4 py-2">{idx + 1}</td>
                                                    <td className="px-4 py-2">{p.tanggal_pembayaran}</td>
                                                    <td className="px-4 py-2 text-right">{formatRupiah(p.nominal)}</td>
                                                    <td className="px-4 py-2 capitalize">{p.metode}</td>
                                                    <td className="px-4 py-2">{statusBadge(p.status)}</td>
                                                    <td className="px-4 py-2">{p.keterangan ?? "-"}</td>
                                                    <td className="px-4 py-2">
                                                        {p.bukti_pembayaran ? (
                                                            <a
                                                                href={route("storage", { path: p.bukti_pembayaran })}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-primary hover:underline text-sm"
                                                            >
                                                                Lihat
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-400">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">Tidak ada pembayaran tercatat.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Bayar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow border p-6 sticky top-24">
                            <h2 className="text-lg font-semibold mb-4 text-gray-800">Catat Pembayaran</h2>
                            {!showForm ? (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                                >
                                    + Bayar Sekarang
                                </button>
                            ) : (
                                <form onSubmit={handleBayar} className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal</label>
                                        <input
                                            type="date"
                                            value={tanggal}
                                            onChange={(e) => setTanggal(e.target.value)}
                                            className="w-full px-3 py-1.5 border rounded text-sm focus:ring-2 focus:ring-ring focus:border-ring"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Jumlah (Rp)</label>
                                        <input
                                            type="number"
                                            value={jumlah}
                                            onChange={(e) => setJumlah(Number(e.target.value))}
                                            className="w-full px-3 py-1.5 border rounded text-sm focus:ring-2 focus:ring-ring focus:border-ring"
                                            min={0}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Metode</label>
                                        <select
                                            value={metode}
                                            onChange={(e) => setMetode(e.target.value)}
                                            className="w-full px-3 py-1.5 border rounded text-sm focus:ring-2 focus:ring-ring focus:border-ring"
                                        >
                                            <option value="transfer">Transfer</option>
                                            <option value="cash">Cash</option>
                                            <option value="qris">QRIS</option>
                                            <option value="debit">Debit</option>
                                            <option value="kredit">Kredit</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                                        <select
                                            value={statusPay}
                                            onChange={(e) => setStatusPay(e.target.value)}
                                            className="w-full px-3 py-1.5 border rounded text-sm focus:ring-2 focus:ring-ring focus:border-ring"
                                        >
                                            <option value="lunas">Lunas</option>
                                            <option value="pending">Pending</option>
                                            <option value="failed">Gagal</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Keterangan</label>
                                        <input
                                            type="text"
                                            value={keterangan}
                                            onChange={(e) => setKeterangan(e.target.value)}
                                            className="w-full px-3 py-1.5 border rounded text-sm focus:ring-2 focus:ring-ring focus:border-ring"
                                            placeholder="Opsional"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Bukti Pembayaran</label>
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={handleBuktiChange}
                                            className="w-full px-3 py-1.5 border rounded text-sm focus:ring-2 focus:ring-ring focus:border-ring"
                                        />
                                        {buktiPreview && (
                                            <div className="mt-2">
                                                {buktiPreview.startsWith("blob:") && buktiPreview.match(/\.(jpg|jpeg|png)$/i) ? (
                                                    <img src={buktiPreview} alt="Preview" className="max-h-32 rounded border" />
                                                ) : (
                                                    <a href={buktiPreview} target="_blank" rel="noopener noreferrer" className="text-primary text-sm">
                                                        Preview bukti
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 pt-1">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
                                        >
                                            {submitting ? "Menyimpan..." : "Simpan"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForm(false);
                                                setBukti(null);
                                                setBuktiPreview(null);
                                            }}
                                            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
