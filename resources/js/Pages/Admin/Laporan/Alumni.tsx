import { Head, Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import SimpleFilterDropdown from "@/Components/SimpleFilterDropdown";

export default function LaporanAlumni({ alumni, error, filters }: any) {
    const currentFilters = filters || {
        periode: "tahun",
        tahun: new Date().getFullYear(),
    };

    const handleExport = (type: "pdf" | "excel") => {
        const params = new URLSearchParams({ type, ...currentFilters });
        window.open(
            `/dashboard/laporan/alumni/export?${params.toString()}`,
            "_blank",
        );
    };

    const handlePrint = () => {
        const params = new URLSearchParams(currentFilters);
        window.open(
            `/dashboard/laporan/alumni/print?${params.toString()}`,
            "_blank",
        );
    };

    if (error) {
        return (
            <>
                <Head title="Laporan Alumni" />
                <div className="p-6">
                    <div className="bg-destructive/10 border border-red-200 rounded-lg p-6 text-center">
                        <FileText className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            </>
        );
    }

    const rows = alumni?.data || [];

    return (
        <>
            <Head title="Laporan Alumni" />
            <div className="p-4 lg:p-6">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                        Laporan Alumni
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        <Link
                            href={route("laporan.index")}
                            className="text-blue-600 hover:underline"
                        >
                            Laporan
                        </Link>{" "}
                        / Alumni
                    </p>
                </motion.div>

                <SimpleFilterDropdown
                    filters={currentFilters}
                    searchPlaceholder="Cari nama alumni..."
                    onExport={handleExport}
                    onPrint={handlePrint}
                />

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
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
                                        Nama
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Tahun Lulus
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Keterangan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {rows.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-12 text-center text-sm text-gray-400"
                                        >
                                            Tidak ada data alumni untuk filter
                                            yang dipilih
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
                                                {row.nama_lengkap}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {row.tahun_lulus}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {row.keterangan || "-"}
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                            {alumni?.last_page && (
                                <tfoot>
                                    <tr className="bg-gray-50">
                                        <td
                                            colSpan={4}
                                            className="px-4 py-3 text-xs text-gray-500 text-center"
                                        >
                                            Halaman {alumni.current_page} dari{" "}
                                            {alumni.last_page} - Total{" "}
                                            {alumni.total} data
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
