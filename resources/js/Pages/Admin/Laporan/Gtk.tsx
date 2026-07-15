import { Head, Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import SimpleFilterDropdown from "@/Components/SimpleFilterDropdown";

export default function LaporanGtk({ gtk, error, filters }: any) {
    const currentFilters = filters || {
        periode: "tahun",
        tahun: new Date().getFullYear(),
    };

    const handleExport = (type: "pdf" | "excel") => {
        const params = new URLSearchParams({ type, ...currentFilters });
        window.open(
            `/dashboard/laporan/gtk/export?${params.toString()}`,
            "_blank",
        );
    };

    const handlePrint = () => {
        const params = new URLSearchParams(currentFilters);
        window.open(
            `/dashboard/laporan/gtk/print?${params.toString()}`,
            "_blank",
        );
    };

    if (error) {
        return (
            <>
                <Head title="Laporan GTK" />
                <div className="p-6">
                    <div className="bg-destructive/10 border border-red-200 rounded-lg p-6 text-center">
                        <FileText className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            </>
        );
    }

    const rows = gtk?.data || [];

    return (
        <>
            <Head title="Laporan GTK" />
            <div className="p-4 lg:p-6">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                        Laporan GTK
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        <Link
                            href={route("laporan.index")}
                            className="text-blue-600 hover:underline"
                        >
                            Laporan
                        </Link>{" "}
                        / GTK
                    </p>
                </motion.div>

                <SimpleFilterDropdown
                    filters={currentFilters}
                    searchPlaceholder="Cari nama/NUPTK..."
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
                                        NUPTK
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Jenis
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Bidang Studi
                                    </th>
                                    <th className="text-left p-3 font-semibold">
                                        Jabatan
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
                                            colSpan={7}
                                            className="px-4 py-12 text-center text-sm text-gray-400"
                                        >
                                            Tidak ada data GTK untuk filter yang
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
                                                {row.nama_lengkap}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {row.nuptk || "-"}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                        row.jenis === "Guru"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-purple-100 text-purple-700"
                                                    }`}
                                                >
                                                    {row.jenis}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {row.bidang_studi || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {row.jabatan}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {row.status_kepegawaian}
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                            {gtk?.last_page && (
                                <tfoot>
                                    <tr className="bg-gray-50">
                                        <td
                                            colSpan={7}
                                            className="px-4 py-3 text-xs text-gray-500 text-center"
                                        >
                                            Halaman {gtk.current_page} dari{" "}
                                            {gtk.last_page} - Total {gtk.total}{" "}
                                            data
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
