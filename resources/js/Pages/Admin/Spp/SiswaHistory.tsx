import { Head, Link } from "@inertiajs/inertia-react";

interface SiswaData {
    id: number;
    nama_lengkap: string;
    nisn: string | null;
    nis: string | null;
    kelas?: string;
}

interface PembayaranItem {
    id: number;
    nominal: number;
    tanggal_pembayaran: string;
    metode: string;
    status: string;
    keterangan?: string;
    spp_tagihan_id?: number;
    spp_tagihan?: { nominal: number; keterangan: string | null };
}

interface TagihanItem {
    id: number;
    nominal: number;
    status: string;
    tanggal_jatuh_tempo: string;
    keterangan?: string;
    pembayaran?: PembayaranItem[];
}

interface Ringkasan {
    total_tagihan: number;
    total_terbayar: number;
    total_sisa: number;
}

interface Props {
    siswa: SiswaData;
    tagihan: TagihanItem[];
    pembayaran: PembayaranItem[];
    ringkasan: Ringkasan;
}

export default function SiswaHistory({ siswa, tagihan, pembayaran, ringkasan }: Props) {
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
        const labels: Record<string, string> = {
            lunas: "Lunas",
            belum_lunas: "Belum Lunas",
            overdue: "Overdue",
            pending: "Pending",
            failed: "Gagal",
        };
        return (
            <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${map[status] || "bg-gray-100 text-gray-700"}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <>
            <Head title={`Riwayat SPP - ${siswa.nama_lengkap}`} />
            <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                            Riwayat SPP
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {siswa.nama_lengkap} {siswa.nisn ? `(${siswa.nisn})` : ""}
                        </p>
                    </div>
                    <Link
                        href={route("spp.hutang")}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                    >
                        Kembali
                    </Link>
                </div>

                {/* Ringkasan Kartu */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow border p-4">
                        <p className="text-sm text-gray-500">Total Tagihan</p>
                        <p className="text-xl font-bold text-gray-900">{formatRupiah(ringkasan.total_tagihan)}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow border p-4">
                        <p className="text-sm text-gray-500">Total Terbayar</p>
                        <p className="text-xl font-bold text-emerald-600">{formatRupiah(ringkasan.total_terbayar)}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow border p-4">
                        <p className="text-sm text-gray-500">Sisa / Hutang</p>
                        <p className={`text-xl font-bold ${ringkasan.total_sisa > 0 ? "text-destructive" : "text-gray-900"}`}>
                            {formatRupiah(ringkasan.total_sisa)}
                        </p>
                    </div>
                </div>

                {/* Daftar Tagihan */}
                <div className="bg-white rounded-lg shadow border mb-6">
                    <div className="px-4 py-3 border-b">
                        <h2 className="font-semibold text-gray-800">Daftar Tagihan</h2>
                    </div>
                    {tagihan.length === 0 && (
                        <p className="p-4 text-gray-500">Belum ada tagihan.</p>
                    )}
                    {tagihan.length > 0 && (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-4 py-2">Jatuh Tempo</th>
                                    <th className="text-right px-4 py-2">Nominal</th>
                                    <th className="text-center px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {tagihan.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{t.tanggal_jatuh_tempo}</td>
                                        <td className="px-4 py-2 text-right">{formatRupiah(t.nominal)}</td>
                                        <td className="px-4 py-2 text-center">{statusBadge(t.status)}</td>
                                        <td className="px-4 py-2 text-gray-500">{t.keterangan ?? "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Riwayat Pembayaran */}
                <div className="bg-white rounded-lg shadow border">
                    <div className="px-4 py-3 border-b">
                        <h2 className="font-semibold text-gray-800">Riwayat Pembayaran</h2>
                    </div>
                    {pembayaran.length === 0 && (
                        <p className="p-4 text-gray-500">Belum ada pembayaran.</p>
                    )}
                    {pembayaran.length > 0 && (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-4 py-2">Tanggal</th>
                                    <th className="text-right px-4 py-2">Nominal</th>
                                    <th className="text-center px-4 py-2">Metode</th>
                                    <th className="text-center px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Tagihan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {pembayaran.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2">{p.tanggal_pembayaran}</td>
                                        <td className="px-4 py-2 text-right">{formatRupiah(p.nominal)}</td>
                                        <td className="px-4 py-2 text-center capitalize">{p.metode}</td>
                                        <td className="px-4 py-2 text-center">{statusBadge(p.status)}</td>
                                        <td className="px-4 py-2 text-gray-500">
                                            {p.spp_tagihan ? formatRupiah(p.spp_tagihan.nominal) : "-"}
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
