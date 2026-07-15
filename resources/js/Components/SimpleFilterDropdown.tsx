import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Filter, Download, Printer, Search } from "lucide-react";
import gsap from "gsap";

interface FilterOption {
    value: string;
    label: string;
}

interface SimpleFilterDropdownProps {
    filters: {
        periode?: string;
        tahun?: number;
        semester?: number;
        search?: string;
    };
    onExport: (type: "pdf" | "excel") => void;
    onPrint?: (mode: "single" | "batch") => void;
    periodeOptions?: FilterOption[];
    tahunOptions?: number[];
    showSemester?: boolean;
    searchPlaceholder?: string;
}

const defaultPeriodeOptions: FilterOption[] = [
    { value: "hari", label: "Harian" },
    { value: "minggu", label: "Mingguan" },
    { value: "semester", label: "Semester" },
    { value: "tahun", label: "Tahunan" },
];

export default function SimpleFilterDropdown({
    filters,
    onExport,
    onPrint,
    periodeOptions = defaultPeriodeOptions,
    tahunOptions = Array.from(
        { length: 5 },
        (_, i) => new Date().getFullYear() - i,
    ),
    showSemester = false,
    searchPlaceholder = "Cari...",
}: SimpleFilterDropdownProps) {
    const [periode, setPeriode] = useState(filters.periode || "tahun");
    const [tahun, setTahun] = useState(
        filters.tahun || new Date().getFullYear(),
    );
    const [semester, setSemester] = useState(filters.semester || 1);
    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".filter-select", {
                opacity: 0,
                y: -10,
                duration: 0.3,
                stagger: 0.08,
                ease: "power2.out",
            });
            gsap.from(".filter-button", {
                scale: 0.9,
                opacity: 0,
                duration: 0.25,
                stagger: 0.05,
                ease: "back.out(1.7)",
            });
            gsap.from(".filter-divider", {
                opacity: 0,
                duration: 0.2,
                delay: 0.3,
            });
            gsap.from(".filter-search", {
                opacity: 0,
                x: -10,
                duration: 0.3,
                ease: "power2.out",
            });
        });
        return () => ctx.revert();
    }, []);

    const animateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
        });
    };

    const animateHover = (
        e: React.MouseEvent<HTMLButtonElement>,
        enter: boolean,
    ) => {
        gsap.to(e.currentTarget, {
            scale: enter ? 1.02 : 1,
            duration: 0.15,
            ease: "power2.out",
        });
    };

    const handleApply = () => {
        const params: Record<string, string> = {
            periode,
            tahun: tahun.toString(),
        };
        if (showSemester && periode === "semester")
            params.semester = semester.toString();
        if (search) params.search = search;
        Inertia.get(window.location.pathname, params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleApply();
    };

    return (
        <div className="bg-card border border-border rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-56">
                    <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearchKey}
                        className="filter-search w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                    />
                </div>

                <span className="filter-divider text-muted-foreground hidden sm:block">
                    |
                </span>

                {/* Filter Dropdowns */}
                <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Filter className="w-4 h-4" />
                        <span className="font-medium hidden sm:inline">
                            Filter:
                        </span>
                    </div>

                    <select
                        value={periode}
                        onChange={(e) => setPeriode(e.target.value)}
                        className="filter-select px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                    >
                        {periodeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={tahun}
                        onChange={(e) => setTahun(Number(e.target.value))}
                        className="filter-select px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                    >
                        {tahunOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    {showSemester && periode === "semester" && (
                        <select
                            value={semester}
                            onChange={(e) =>
                                setSemester(Number(e.target.value))
                            }
                            className="filter-select px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background"
                        >
                            <option value={1}>Ganjil (Jul-Des)</option>
                            <option value={2}>Genap (Jan-Jun)</option>
                        </select>
                    )}

                    <button
                        onMouseEnter={(e) => animateHover(e, true)}
                        onMouseLeave={(e) => animateHover(e, false)}
                        onClick={(e) => {
                            animateClick(e);
                            handleApply();
                        }}
                        className="filter-button px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition shadow-sm"
                    >
                        Terapkan
                    </button>
                </div>

                {/* Export & Print */}
                <div className="flex items-center gap-2">
                    <button
                        onMouseEnter={(e) => animateHover(e, true)}
                        onMouseLeave={(e) => animateHover(e, false)}
                        onClick={(e) => {
                            animateClick(e);
                            onExport("pdf");
                        }}
                        className="filter-button inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-lg transition shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        PDF
                    </button>
                    <button
                        onMouseEnter={(e) => animateHover(e, true)}
                        onMouseLeave={(e) => animateHover(e, false)}
                        onClick={(e) => {
                            animateClick(e);
                            onExport("excel");
                        }}
                        className="filter-button inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        Excel
                    </button>
                    {onPrint && (
                        <>
                            <span className="filter-divider text-muted-foreground">
                                |
                            </span>
                            <button
                                onMouseEnter={(e) => animateHover(e, true)}
                                onMouseLeave={(e) => animateHover(e, false)}
                                onClick={(e) => {
                                    animateClick(e);
                                    onPrint("single");
                                }}
                                className="filter-button inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground bg-accent hover:bg-accent/80 rounded-lg transition shadow-sm"
                            >
                                <Printer className="w-4 h-4" />
                                Cetak
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
