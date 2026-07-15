import { Head, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { Printer, Download } from "lucide-react";

export default function PrintView({
    report,
    data,
    schoolName,
    timestamp,
}: any) {
    useEffect(() => {
        window.print();
    }, []);

    const getTitle = () => {
        const titles: Record<string, string> = {
            gtk: "Laporan GTK (Guru & Tenaga Kependidikan)",
            siswa: "Laporan Data Siswa",
            spp: "Laporan Keuangan SPP",
            alumni: "Laporan Alumni",
            prestasi: "Laporan Prestasi Siswa",
            dispensasi: "Laporan Dispensasi SPP",
        };
        return titles[report] || "Laporan";
    };

    const getColumns = () => {
        const columns: Record<string, { key: string; label: string }[]> = {
            gtk: [
                { key: "nama_lengkap", label: "Nama" },
                { key: "nuptk", label: "NUPTK" },
                { key: "jenis", label: "Jenis" },
                { key: "bidang_studi", label: "Bidang Studi" },
                { key: "jabatan", label: "Jabatan" },
            ],
            siswa: [
                { key: "nama_lengkap", label: "Nama Siswa" },
                { key: "nisn", label: "NISN" },
                { key: "kelas", label: "Kelas" },
                { key: "status", label: "Status" },
            ],
            spp: [
                { key: "periode", label: "Periode" },
                { key: "jumlah", label: "Nominal", format: "currency" },
                { key: "status", label: "Status" },
            ],
            alumni: [
                { key: "nama_lengkap", label: "Nama" },
                { key: "tahun_lulus", label: "Tahun Lulus" },
                { key: "pekerjaan", label: "Pekerjaan" },
            ],
            prestasi: [
                { key: "prestasi", label: "Prestasi" },
                { key: "tingkat", label: "Tingkat" },
                { key: "tanggal", label: "Tanggal", format: "date" },
            ],
            dispensasi: [
                { key: "jenis", label: "Jenis" },
                { key: "jumlah", label: "Jumlah", format: "currency" },
                { key: "keterangan", label: "Keterangan" },
            ],
        };
        return columns[report] || [];
    };

    const formatValue = (value: any, format?: string) => {
        if (!value || value === null) return "-";
        if (format === "currency")
            return `Rp ${Number(value).toLocaleString("id-ID")}`;
        if (format === "date")
            return new Date(value).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        return String(value);
    };

    const columns = getColumns();
    const rows = Array.isArray(data) ? data : [];

    return (
        <>
            <Head title={`Print - ${getTitle()}`} />

            {/* Print Button (hidden when printing) */}
            <div className="fixed top-4 right-4 z-50 print:hidden flex gap-2">
                <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg"
                >
                    <Printer className="w-4 h-4" /> Print / Save PDF
                </button>
                <button
                    onClick={() =>
                        (window.location.href = route(`laporan.${report}`))
                    }
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                    Kembali
                </button>
            </div>

            {/* Print Header - Logo, School Name, Title */}
            <div className="min-h-screen bg-white p-8">
                <header className="text-center border-b-4 border-gray-800 pb-6 mb-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <img
                            src="/logo.png"
                            alt="Logo Sekolah"
                            className="h-20 w-20 object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/80x80?text=LOGO";
                            }}
                        />
                    </div>

                    {/* School Name */}
                    <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                        {schoolName}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Jl. Pendidikan No. 123, Kota Contoh
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Telp: (021) 1234-5678 | Email: info@sekolah.sch.id
                    </p>

                    {/* Report Title */}
                    <h2 className="text-xl font-semibold text-gray-800 mt-6 border-t-2 border-primary/20 pt-4">
                        {getTitle()}
                    </h2>

                    {/* Timestamp */}
                    <p className="text-xs text-gray-500 mt-2">
                        Dicetak pada: {timestamp}
                    </p>
                </header>

                {/* Data Table */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className="border border-primary/20 px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="border border-primary/20 px-4 py-8 text-center text-sm text-gray-500"
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            rows.map((row: any, rowIdx: number) => (
                                <tr
                                    key={rowIdx}
                                    className={
                                        rowIdx % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    }
                                >
                                    {columns.map((col, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className="border border-primary/20 px-4 py-2.5 text-sm text-gray-800"
                                        >
                                            {formatValue(
                                                col.key.includes(".")
                                                    ? row[
                                                          col.key.split(".")[0]
                                                      ]?.[col.key.split(".")[1]]
                                                    : row[col.key],
                                                col.format,
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr className="bg-gray-100">
                            <td
                                colSpan={columns.length}
                                className="border border-primary/20 px-4 py-3 text-right text-sm font-semibold text-gray-700"
                            >
                                Total: {rows.length} record
                            </td>
                        </tr>
                    </tfoot>
                </table>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-primary/20 text-center text-xs text-gray-500">
                    <p>
                        Laporan ini dihasilkan secara otomatis oleh Sistem
                        Informasi Manajemen Sekolah
                    </p>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 1.5cm; }
        }
      `}</style>
        </>
    );
}
