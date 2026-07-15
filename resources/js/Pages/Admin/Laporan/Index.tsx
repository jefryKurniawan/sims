import { Head, Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import {
    Users,
    CreditCard,
    GraduationCap,
    School,
    BookOpen,
    Building,
    UserPlus,
    Trophy,
    Percent,
    FileText,
    FileSpreadsheet,
    FileText as FileTextIcon,
    Printer,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-8 h-8" />,
    CreditCard: <CreditCard className="w-8 h-8" />,
    GraduationCap: <GraduationCap className="w-8 h-8" />,
    School: <School className="w-8 h-8" />,
    BookOpen: <BookOpen className="w-8 h-8" />,
    Building: <Building className="w-8 h-8" />,
    UserPlus: <UserPlus className="w-8 h-8" />,
    Trophy: <Trophy className="w-8 h-8" />,
    Percent: <Percent className="w-8 h-8" />,
    FileText: <FileText className="w-8 h-8" />,
};

const colorMap: Record<string, string> = {
    Users: "bg-blue-50 text-blue-600",
    CreditCard: "bg-emerald-50 text-emerald-600",
    GraduationCap: "bg-purple-50 text-purple-600",
    School: "bg-orange-50 text-orange-600",
    BookOpen: "bg-rose-50 text-rose-600",
    Building: "bg-teal-50 text-teal-600",
    UserPlus: "bg-yellow-50 text-yellow-600",
    Trophy: "bg-amber-50 text-amber-600",
    Percent: "bg-destructive/10 text-destructive",
    FileText: "bg-indigo-50 text-indigo-600",
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function LaporanIndex({ reports }: { reports: any[] }) {
    return (
        <>
            <Head title="Laporan" />
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 lg:p-6 pb-0"
            >
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                        Laporan
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Rekap data & laporan manajemen sekolah
                    </p>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-4 lg:p-6"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reports.map((report) => (
                        <motion.div
                            key={report.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 },
                            }}
                            className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-xl hover:border-primary/30 transition-all duration-200"
                        >
                            <Link href={route(report.route)} className="block">
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[report.icon] || "bg-gray-50 text-gray-600"} group-hover:scale-105 transition-transform duration-200`}
                                    >
                                        {iconMap[report.icon] || (
                                            <FileText className="w-8 h-8" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 font-body group-hover:text-primary transition-colors line-clamp-1">
                                            {report.label}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                                            {report.desc}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1.5 font-medium">
                                            {report.count.toLocaleString(
                                                "id-ID",
                                            )}{" "}
                                            data tersedia
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
}
