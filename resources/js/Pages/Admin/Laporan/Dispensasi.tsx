import { Head } from "@/Layout/Head";
import { Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import AdminTable from "@/Components/AdminTable";
import type { Column } from "@/Components/AdminTable";
import SimpleFilterDropdown from "@/Components/SimpleFilterDropdown";

export default function LaporanDispensasi({
    dispensasi,
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
            `/dashboard/laporan/dispensasi/export?${params.toString()}`,
            "_blank",
        );
    };

    const handlePrint = () => {
        const params = new URLSearchParams(currentFilters);
        window.open(
            `/dashboard/laporan/dispensasi/print?${params.toString()}`,
            "_blank",
        );
    };

    if (error) {
        return (
            <>
                <Head title="Laporan Dispensasi" />
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
        {
            key: "siswa",
            label: "Siswa",
            render: (_: any, row: any) => row.siswa?.nama_lengkap || "-",
        },
        { key: "jenis", label: "Jenis" },
        {
            key: "nominal",
            label: "Nominal",
            render: (v: any) => `Rp ${Number(v || 0).toLocaleString("id-ID")}`,
        },
        {
            key: "keterangan",
            label: "Keterangan",
            render: (v: any) => v || "-",
        },
    ];

    return (
        <>
            <Head title="Laporan Dispensasi" />
            <div className="p-4 lg:p-6">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                        Laporan Dispensasi
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        <Link
                            href={route("laporan.index")}
                            className="text-blue-600 hover:underline"
                        >
                            Laporan
                        </Link>{" "}
                        / Dispensasi
                    </p>
                </motion.div>

                <SimpleFilterDropdown
                    filters={currentFilters}
                    searchPlaceholder="Cari nama/jenis..."
                    onExport={handleExport}
                    onPrint={handlePrint}
                />

                {byJenis?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                    >
                        {byJenis.map((item: any, i: number) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl border border-gray-200 p-4"
                            >
                                <p className="text-sm text-gray-500">
                                    {item.jenis}
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    {item.total}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Rp{" "}
                                    {Number(item.total_nominal).toLocaleString(
                                        "id-ID",
                                    )}
                                </p>
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
                        rows={dispensasi?.data || []}
                        pagination={dispensasi}
                    />
                </motion.div>
            </div>
        </>
    );
}
