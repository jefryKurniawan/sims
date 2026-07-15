import { useState } from "react";
import { router, useForm } from "@inertiajs/inertia-react";
import { Filter, Download, Printer, Search, X } from "lucide-react";

interface FilterBarProps {
    filters: {
        periode?: "hari" | "minggu" | "semester" | "tahun" | "angkatan";
        tahun?: number;
        semester?: number;
        angkatan?: string;
        search?: string;
    };
    onExport: (type: "pdf" | "excel") => void;
    onPrint: (mode: "single" | "batch") => void;
    showAngkatan?: boolean;
    showSemester?: boolean;
}

export default function LaporanFilterBar({
    filters,
    onExport,
    onPrint,
    showAngkatan = false,
    showSemester = false,
}: FilterBarProps) {
    const [showFilters, setShowFilters] = useState(false);
    const { data, setData } = useForm({
        periode: (filters.periode as any) || "tahun",
        tahun: filters.tahun || new Date().getFullYear(),
        semester: filters.semester || 1,
        angkatan: filters.angkatan || "",
        search: filters.search || "",
    });

    const handleApplyFilter = () => {
        const params: Record<string, string> = {};
        if (data.periode) params.periode = data.periode;
        if (data.tahun) params.tahun = data.tahun.toString();
        if (data.semester) params.semester = data.semester.toString();
        if (data.angkatan) params.angkatan = data.angkatan;
        if (data.search) params.search = data.search;
        router.get(window.location.pathname, params, { preserveState: true });
    };

    const handleReset = () => {
        setData({
            periode: "tahun",
            tahun: new Date().getFullYear(),
            semester: 1,
            angkatan: "",
            search: "",
        });
        router.get(window.location.pathname, {});
    };

    const tahunOptions = Array.from(
        { length: 5 },
        (_, i) => new Date().getFullYear() - i,
    );
    const semesterOptions = [
        { value: 1, label: "Ganjil (Jul-Des)" },
        { value: 2, label: "Genap (Jan-Jun)" },
    ];
    const angkatanOptions = Array.from({ length: 6 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { value: year.toString(), label: `Angkatan ${year}` };
    });

    return (
        <div className="bg-card border border-border rounded-lg shadow-sm mb-6">
            {/* Top Bar */}
            <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground bg-accent/50 hover:bg-accent rounded-lg transition"
                    >
                        <Filter className="w-4 h-4" />
                        {showFilters ? "Tutup Filter" : "Filter"}
                    </button>
                    {showFilters && (
                        <button
                            onClick={handleReset}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
                        >
                            <X className="w-4 h-4" />
                            Reset
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari data..."
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleApplyFilter()
                            }
                            className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                        />
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                        onClick={handleApplyFilter}
                        className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition"
                    >
                        Terapkan
                    </button>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-accent/30">
                    {/* Periode */}
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                            Periode
                        </label>
                        <select
                            value={data.periode}
                            onChange={(e) =>
                                setData("periode", e.target.value as any)
                            }
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                        >
                            <option value="hari">Harian</option>
                            <option value="minggu">Mingguan</option>
                            <option value="semester">Semester</option>
                            <option value="tahun">Tahunan</option>
                            {showAngkatan && (
                                <option value="angkatan">Angkatan</option>
                            )}
                        </select>
                    </div>

                    {/* Tahun */}
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                            Tahun
                        </label>
                        <select
                            value={data.tahun}
                            onChange={(e) =>
                                setData("tahun", Number(e.target.value))
                            }
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                        >
                            {tahunOptions.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Semester */}
                    {showSemester && (
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                Semester
                            </label>
                            <select
                                value={data.semester}
                                onChange={(e) =>
                                    setData("semester", Number(e.target.value))
                                }
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                            >
                                {semesterOptions.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Angkatan */}
                    {showAngkatan && (
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                Angkatan
                            </label>
                            <select
                                value={data.angkatan}
                                onChange={(e) =>
                                    setData("angkatan", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                            >
                                <option value="">Semua Angkatan</option>
                                {angkatanOptions.map((a) => (
                                    <option key={a.value} value={a.value}>
                                        {a.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            )}

            {/* Export & Print Actions */}
            <div className="p-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground">
                    Filter aktif:{" "}
                    <span className="font-medium text-foreground">
                        {data.periode === "angkatan"
                            ? `Angkatan ${data.angkatan}`
                            : `${data.periode} ${data.tahun}`}
                        {showSemester && data.periode === "semester"
                            ? ` - Semester ${data.semester}`
                            : ""}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground mr-1">
                        Ekspor:
                    </span>
                    <button
                        onClick={() => onExport("pdf")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-md transition"
                    >
                        <Download className="w-3.5 h-3.5" />
                        PDF
                    </button>
                    <button
                        onClick={() => onExport("excel")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-md transition"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Excel
                    </button>
                    <span className="text-xs text-border mx-1">|</span>
                    <span className="text-xs text-muted-foreground mr-1">
                        Cetak:
                    </span>
                    <button
                        onClick={() => onPrint("single")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground bg-accent hover:bg-accent/80 rounded-md transition"
                    >
                        <Printer className="w-3.5 h-3.5" />
                        Satuan
                    </button>
                    <button
                        onClick={() => onPrint("batch")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground bg-accent hover:bg-accent/80 rounded-md transition"
                    >
                        <Printer className="w-3.5 h-3.5" />
                        Group/Batch
                    </button>
                </div>
            </div>
        </div>
    );
}
