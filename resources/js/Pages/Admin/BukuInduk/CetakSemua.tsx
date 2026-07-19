import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import {
    Printer,
    ArrowLeft,
    User,
    FileText,
    Users,
    ArrowLeftRight,
} from "lucide-react";

interface SiswaCetak {
    id: number;
    nis: string;
    nisn: string;
    nama_lengkap: string;
    jenis_kelamin: string;
    status: string;
    buku_induk: {
        agama?: string;
        anak_ke?: number;
        jumlah_saudara?: number;
        bahasa_sehari_hari?: string;
        transportasi?: string;
        jarak_rumah_sekolah_km?: number;
        hobi?: string;
        cita_cita?: string;
        berat_badan_kg?: number;
        tinggi_badan_cm?: number;
        kebutuhan_khusus?: string;
    } | null;
    rekam_medis: {
        golongan_darah?: string;
        alergi?: string;
        penyakit_terdahulu?: string;
        obat_rutin?: string;
        nama_dokter?: string;
        rumah_sakit_rujukan?: string;
        kontak_darurat_nama?: string;
        kontak_darurat_hp?: string;
        kontak_darurat_hubungan?: string;
    } | null;
    orang_tua: Array<{
        nama_lengkap: string;
        hubungan: string;
        nik?: string;
        pekerjaan?: string;
        penghasilan_bulanan?: string;
        pendidikan_terakhir?: string;
        no_hp?: string;
        alamat?: string;
    }>;
    mutasi: Array<{
        jenis: string;
        tanggal_mutasi: string;
        asal_sekolah?: string;
        sekolah_tujuan?: string;
        alasan: string;
        no_sk?: string;
    }>;
    kelas_aktif?: {
        kelas?: {
            tingkat: string;
            nama_kelas: string;
        };
    } | null;
}

export default function CetakSemua() {
    const { siswa, filters, namaSekolah, namaKepalaSekolah } = usePage().props as any;

    useEffect(() => {
        // auto-print on load
        window.print();
    }, []);

    const statusBadge = (status: string) => {
        const cls: Record<string, string> = {
            aktif: "bg-emerald-100 text-emerald-800",
            lulus: "bg-blue-100 text-blue-800",
            pindah: "bg-amber-100 text-amber-800",
            keluar: "bg-red-100 text-red-800",
        };
        return (
            <span className={`inline-block px-1.5 py-0.5 text-xs rounded ${cls[status] || "bg-gray-100 text-gray-600"}`}>
                {status}
            </span>
        );
    };

    const renderRow = (s: SiswaCetak) => {
        const k = s.kelas_aktif?.kelas;
        const p = s.buku_induk;
        const m = s.rekam_medis;

        return (
            <div key={s.id} className="page-break-inside-avoid mb-6 border border-gray-200 rounded-lg p-4 print:page-break-inside-avoid">
                {/* Header Siswa */}
                <div className="grid grid-cols-4 gap-4 mb-4 border-b border-gray-200 pb-3">
                    <div>
                        <p className="text-xs text-gray-500">NISN</p>
                        <p className="font-medium">{s.nisn}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">NIS</p>
                        <p className="font-medium">{s.nis}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Kelas</p>
                        <p className="font-medium">{k?.tingkat} {k?.nama_kelas || "-"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Status</p>
                        {statusBadge(s.status)}
                    </div>
                </div>

                {/* Identity */}
                <div className="flex-1 mb-3">
                    <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        {s.nama_lengkap} ({s.jenis_kelamin === "L" ? "L" : "P"})
                    </p>
                </div>

                {/* Profil */}
                <div className="mt-4 border-t pt-3">
                    <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-1">
                        <FileText className="h-4 w-4" /> Profil Tambahan
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <Field label="Agama" value={p?.agama} />
                        <Field label="Anak ke-" value={p?.anak_ke} />
                        <Field label="Jml Saudara" value={p?.jumlah_saudara} />
                        <Field label="Bahasa" value={p?.bahasa_sehari_hari} />
                        <Field label="Transportasi" value={p?.transportasi} />
                        <Field label="Jarak (km)" value={p?.jarak_rumah_sekolah_km} />
                        <Field label="Hobi" value={p?.hobi} />
                        <Field label="Cita-cita" value={p?.cita_cita} />
                        <Field label="Berat (kg)" value={p?.berat_badan_kg} />
                        <Field label="Tinggi (cm)" value={p?.tinggi_badan_cm} />
                        <Field label="Kebutuhan Khusus" value={p?.kebutuhan_khusus} full />
                    </div>
                </div>

                {/* Rekam Medis */}
                <div className="mt-4 border-t pt-3">
                    <h4 className="text-sm font-semibold text-rose-500 mb-2 flex items-center gap-1">
                        <FileText className="h-4 w-4 text-rose-500" /> Rekam Medis
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        <Field label="Gol. Darah" value={m?.golongan_darah} />
                        <Field label="Alergi" value={m?.alergi} />
                        <Field label="Penyakit" value={m?.penyakit_terdahulu} />
                        <Field label="Obat Rutin" value={m?.obat_rutin} />
                        <Field label="Dokter" value={m?.nama_dokter} />
                        <Field label="RS Rujukan" value={m?.rumah_sakit_rujukan} />
                        <Field label="Kontak Darurat" value={m?.kontak_darurat_nama} />
                        <Field label="HP Darurat" value={m?.kontak_darurat_hp} />
                        <Field label="Hubungan" value={m?.kontak_darurat_hubungan} />
                    </div>
                </div>

                {/* Orang Tua */}
                {s.orang_tua && s.orang_tua.length > 0 && (
                    <div className="mt-4 border-t pt-3">
                        <h4 className="text-sm font-semibold text-amber-600 mb-2 flex items-center gap-1">
                            <Users className="h-4 w-4 text-amber-600" /> Orang Tua / Wali
                        </h4>
                        <div className="space-y-2 text-xs">
                            {s.orang_tua.map((o: any, i: number) => (
                                <div key={i} className="border p-2 rounded bg-amber-50">
                                    <p className="font-medium">{o.nama_lengkap} <span className="text-gray-500">({o.hubungan})</span></p>
                                    <p className="text-gray-600">Pekerjaan: {o.pekerjaan || "-"} · Penghasilan: {o.penghasilan_bulanan || "-"}</p>
                                    <p className="text-gray-600">HP: {o.no_hp || "-"} · Alamat: {o.alamat || "-"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mutasi */}
                {s.mutasi && s.mutasi.length > 0 && (
                    <div className="mt-4 border-t pt-3">
                        <h4 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-1">
                            <ArrowLeftRight className="h-4 w-4 text-blue-600" /> Riwayat Mutasi
                        </h4>
                        <div className="space-y-2 text-xs">
                            {s.mutasi.map((m: any, i: number) => (
                                <div key={i} className="border p-2 rounded bg-blue-50">
                                    <p className="font-medium capitalize">
                                        Mutasi {m.jenis} · {m.tanggal_mutasi}
                                    </p>
                                    <p className="text-gray-600">
                                        {m.jenis === "masuk"
                                            ? `Dari: ${m.asal_sekolah || "-"}`
                                            : `Ke: ${m.sekolah_tujuan || "-"}`}
                                    </p>
                                    <p className="text-gray-600">Alasan: {m.alasan} · SK: {m.no_sk || "-"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-4 flex justify-end pt-3 border-t border-gray-100 text-xs text-gray-400">
                    Dicetak otomatis dari Sistem Informasi Sekolahku
                </div>
            </div>
        );
    };

    return (
        <>
            <Head title="Cetak Semua Buku Induk" />
            <div className="p-4 print:p-0">
                {/* Print controls - hidden on print */}
                <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 shadow"
                    >
                        <Printer className="h-4 w-4" />
                        Cetak / Simpan PDF
                    </button>
                    <Link
                        href={route("buku-induk.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                </div>

                <div className="text-center border-b-2 border-primary pb-4 mb-6 print:mb-2">
                    <h1 className="text-2xl font-bold text-primary font-heading">{namaSekolah}</h1>
                    <p className="text-sm text-gray-600 mt-1">Buku Induk Digital - Data Seluruh Siswa</p>
                    <p className="text-xs text-gray-500">Tanggal Cetak: {new Date().toLocaleDateString("id-ID")}</p>
                    {filters?.tingkat && (
                        <p className="text-sm font-medium text-primary mt-1">Filter: Angkatan {filters.tingkat}</p>
                    )}
                </div>

                <div className="space-y-4">
                    {siswa?.length > 0 ? (
                        siswa.map((s: SiswaCetak) => renderRow(s))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            Tidak ada data siswa untuk dicetak.
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 1cm; size: A4; }
                    .page-break-inside-avoid { page-break-inside: avoid; }
                }
            `}</style>
        </>
    );
}

function Field({ label, value, full }: { label: string; value: unknown; full?: boolean }) {
    return (
        <div className={`border p-1.5 rounded ${full ? "md:col-span-4" : ""}`}>
            <p className="text-gray-500">{label}</p>
            <p className="font-medium">{value ?? "-"}</p>
        </div>
    );
}
