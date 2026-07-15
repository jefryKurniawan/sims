import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import SimpleFilterDropdown from "@/Components/SimpleFilterDropdown";

export default function LaporanPrestasi({
    prestasi,
    byTingkat,
    byJenis,
    error,
    filters,
}: any) {
    const currentFilters = filters || {
        periode: "tahun",
        tahun: new Date().getFullYear(),
    };

    const handleExport = (type: "pdf" | "excel") => {
        const params = new URLSearchParams({ type, ...currentFilters });
        window.open(
            `/dashboard/laporan/prestasi/export?${params.toString()}`,
            "_blank",
        );
    };

    const handlePrint = () => {
        const params = new URLSearchParams(currentFilters);
        window.open(
            `/dashboard/laporan/prestasi/print?${params.toString()}`,
            "_blank",
        );
    };

    if (error) {
        return (
            <>
                <Head title="Laporan Prestasi" />
                <div className="p-6">
                    <div className="bg-destructive/10 border border-red-200 rounded-lg p-6 text-center">
                        <FileText className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            </>
        );
    }

    const columns: Column[] = [
        { key: "prestasi", label: "Prestasi" },
        { key: "jenis", label: "Jenis", render: (v: any) => v || "-" },
        { key: "tingkat", label: "Tingkat", render: (v: any) => v || "-" },
        {
            key: "tanggal",
            label: "Tanggal",
            render: (v: any) =>
                v ? new Date(v).toLocaleDateString("id-ID") : "-",
        },
    ];

    return (
        <>
            <Head title="Laporan Prestasi" />
            <div className="p-4 lg:p-6">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                        Laporan Prestasi
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        <Link
                            href={route("laporan.index")}
                            className="text-blue-600 hover:underline"
                        >
                            Laporan
                        </Link>{" "}
                        / Prestasi
                    </p>
                </motion.div>

                <SimpleFilterDropdown
                    filters={currentFilters}
                    searchPlaceholder="Cari prestasi..."
                    onExport={handleExport}
                    onPrint={handlePrint}
                />

                {(byTingkat || byJenis) && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                    >
                        {byTingkat &&
                            Object.entries(byTingkat).map(([s, total]: any) => (
                                <div
                                    key={s}
                                    className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between"
                                >
                                    <span className="font-medium text-gray-700">
                                        {s}
                                    </span>
                                    <span className="font-bold text-gray-900">
                                        {total}
                                    </span>
                                </div>
                            ))}
                        {byJenis &&
                            Object.entries(byJenis).map(([s, total]: any) => (
                                <div
                                    key={s}
                                    className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between"
                                >
                                    <span className="font-medium text-gray-700">
                                        {s}
                                    </span>
                                    <span className="font-bold text-gray-900">
                                        {total}
                                    </span>
                                </div>
                            ))}
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <AdminTable
                        columns={columns}
                        rows={prestasi?.data || []}
                        pagination={prestasi}
                    />
                </motion.div>
            </div>
        </>
    );
}
