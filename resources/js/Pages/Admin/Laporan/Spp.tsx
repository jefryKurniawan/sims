import { Head, Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import SimpleFilterDropdown from "@/Components/SimpleFilterDropdown";

export default function LaporanSpp({
    tagihan,
    rekapBulanan,
    error,
    tahun,
    filters,
}: any) {
    const currentFilters = filters || {
        periode: "tahun",
        tahun: tahun || new Date().getFullYear(),
    };

    const handleExport = (type: "pdf" | "excel") => {
        const params = new URLSearchParams({ type, ...currentFilters });
        window.open(
            `/dashboard/laporan/spp/export?${params.toString()}`,
            "_blank",
        );
    };

    const handlePrint = () => {
        const params = new URLSearchParams(currentFilters);
        window.open(
            `/dashboard/laporan/spp/print?${params.toString()}`,
            "_blank",
        );
    };

    if (error) {
        return (
            <>
                <Head title="Laporan SPP" />
                <div className="p-6">
                    <div className="bg-destructive/10 border border-red-200 rounded-lg p-6 text-center">
                        <FileText className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            </>
        );
    }

    const rows = tagihan?.data || [];

    return (
        <>
            <Head title="Laporan SPP" />
            <div className="p-4 lg:p-6">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                        Laporan Keuangan SPP
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        <Link
                            href={route("laporan.index")}
                            className="text-blue-600 hover:underline"
                        >
                            Laporan
                        </Link>{" "}
                        / SPP
                    </p>
                </motion.div>

                <SimpleFilterDropdown
                    filters={currentFilters}
                    searchPlaceholder="Cari nama siswa..."
                    onExport={handleExport}
                    onPrint={handlePrint}
                />

                {rekapBulanan?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6"
                    >
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700">
                                Rekap Bulanan Tahun {tahun}
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr className="text-xs uppercase tracking-wider text-gray-600">
                                        <th className="text-left p-3 font-semibold">
                                            Bulan
                                        </th>
                                        <th className="text-left p-3 font-semibold">
                                            Total Tagihan
                                        </th>
                                        <th className="text-left p-3 font-semibold">
                                            Lunas
                                        </th>
                                        <th className="text-left p-3 font-semibold">
                                            Belum Lunas
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {rekapBulanan.map(
                                        (item: any, i: number) => (
                                            <motion.tr
                                                key={i}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: i * 0.04,
                                                }}
                                            >
                                                <td className="px-4 py-3">
                                                    {new Date(
                                                        0,
                                                        item.bulan - 1,
                                                    ).toLocaleString("id-ID", {
                                                        month: "long",
                                                    })}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {item.total_tagihan}
                                                </td>
                                                <td className="px-4 py-3 text-green-600 font-medium">
                                                    {item.lunas}
                                                </td>
                                                <td className="px-4 py-3 text-destructive font-medium">
                                                    {item.total_tagihan -
                                                        item.lunas}
                                                </td>
                                            </motion.tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr className="text-xs uppercase tracking-wider text-gray-600">
                                    <th className="text-left p-3 font-semibold">
                                        #
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Siswa
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Periode
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Nominal
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {rows.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-12 text-center text-sm text-gray-400"
                                        >
                                            Tidak ada data SPP untuk filter yang
                                            dipilih
                                        </td>
                                    </tr>
                                ) : (
                                    rows.map((row: any, i: number) => (
                                        <motion.tr
                                            key={row.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: i * 0.04,
                                            }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-400">
                                                {i + 1}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                {row.siswa?.nama_lengkap || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {row.periode}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                Rp{" "}
                                                {row.jumlah?.toLocaleString(
                                                    "id-ID",
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                        row.status === "lunas"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-destructive/10 text-destructive"
                                                    }`}
                                                >
                                                    {row.status}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                            {tagihan?.last_page && (
                                <tfoot>
                                    <tr className="bg-gray-50">
                                        <td
                                            colSpan={5}
                                            className="px-4 py-3 text-xs text-gray-500 text-center"
                                        >
                                            Halaman {tagihan.current_page} dari{" "}
                                            {tagihan.last_page} - Total{" "}
                                            {tagihan.total} data
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
