import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
import {
    Search,
    Mail,
    Menu,
    X,
    Globe,
    Home,
    Settings,
    Users,
    UserPlus,
    CreditCard,
    Shield,
    GraduationCap,
    School,
    Building2,
    BookOpen,
    Award,
    FileText,
    Image as LucideImage,
    BarChart2,
    Cog,
    Library,
    Send,
    Mail as MailInbox,
    FolderTree,
    Archive,
    IdCard,
    Heart,
    AlertTriangle,
    MessageCircle,
    Trophy,
    Bell,
    ChevronDown,
    ClipboardCheck,
    UserCheck,
    Leaf,
    FileSpreadsheet,
    RefreshCw,
} from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    foto_profile?: string;
}

interface PageProps {
    auth: { user: User | null };
    flash: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    setting?: { tema: string; hero_media_type: string; hero_media_url: string };
}

interface SearchItem {
    label: string;
    href: string;
    keywords: string[];
    roles?: string[];
    parent?: string; // for submenu grouping
}

// Simplified Menu Structure for Non-Tech Users (Orang Awam)
// anschauung: Flat structure with clear human labels, minimal nesting
const getNavItems = (): SearchItem[] => [
    // Dashboard
    { label: "Dashboard", href: "/dashboard", keywords: ["dashboard", "home", "utama"] },

    // SPMB / PPDB
    { label: "SPMB", href: "/dashboard/ppdb", keywords: ["ppdb", "spmb", "daftar"], parent: "SPMB" },
    { label: "Konfigurasi SPMB", href: "/dashboard/spmb/config", keywords: ["config", "spmb", "pengaturan"], parent: "SPMB" },

    // DATA SISWA & AKADEMIK (Paling Sering Dipakai)
    { label: "Data Siswa", href: "/dashboard/users/murid", keywords: ["siswa", "murid", "daftar"], parent: "Siswa" },
    { label: "Buku Induk", href: "/dashboard/buku-induk", keywords: ["induk", "profil"], parent: "Siswa" },

    { label: "Kelas & Jadwal", href: "/dashboard/kelas", keywords: ["kelas", "jadwal", "pelajaran"], parent: "Akademik" },
    { label: "Input Nilai", href: "/dashboard/rapor-kelas", keywords: ["nilai", "rapor", "input"], parent: "Akademik", roles: ["Admin", "Guru"] },
    { label: "Kurikulum & SKBM", href: "/dashboard/kurikulum", keywords: ["kurikulum", "skbm", "mapel", "jam mengajar"], parent: "Akademik", roles: ["Admin"] },
    { label: "Kalender Akademik", href: "/dashboard/kalender-akademik", keywords: ["kalender", "akademik", "tanggal"], parent: "Akademik", roles: ["Admin"] },
    { label: "P5 Projek", href: "/dashboard/erapor/p5", keywords: ["p5", "projek", "pancasila", "profil pelajar"], parent: "Akademik", roles: ["Admin", "Guru"] },
    { label: "e-Rapor Nilai", href: "/dashboard/erapor/nilai", keywords: ["nilai", "formatif", "sumatif", "rapor"], parent: "Akademik", roles: ["Admin", "Guru"] },
    { label: "Dapodik Sync", href: "/dashboard/erapor/dapodik-sync", keywords: ["dapodik", "sinkron", "sync", "kemendikbud"], parent: "Akademik", roles: ["Admin"] },

    { label: "BK (Bimbingan)", href: "/dashboard/bk", keywords: ["bk", "konseling", "pelanggaran"], parent: "BK" },
    { label: "Catatan Pelanggaran", href: "/dashboard/bk/pelanggaran", keywords: ["pelanggaran", "poin"], parent: "BK" },
    { label: "Konseling Siswa", href: "/dashboard/bk/konseling", keywords: ["konseling", "bicara"], parent: "BK" },
    { label: "Prestasi Siswa", href: "/dashboard/bk/prestasi", keywords: ["prestasi", "penghargaan"], parent: "BK" },

    // ABSENSI
    { label: "Absensi Siswa", href: "/dashboard/absensi", keywords: ["absensi", "hadir", "checkin", "checkout"], parent: "Absensi" },
    { label: "Rekap Absensi", href: "/dashboard/absensi/rekap", keywords: ["rekap", "laporan", "kehadiran", "cetak"], parent: "Absensi" },
    { label: "Absensi Guru", href: "/dashboard/absensi/guru", keywords: ["guru", "absensi", "checkin guru"], parent: "Absensi" },

    // KEUANGAN
    { label: "Bayar SPP", href: "/dashboard/spp", keywords: ["spp", "bayar", "tagihan"], parent: "Keuangan" },
    { label: "Dispensasi/Potongan", href: "/dashboard/dispensasi", keywords: ["diskon", "potongan"], parent: "Keuangan" },
    { label: "Pembayaran Lain", href: "/dashboard/pembayaran", keywords: ["pembayaran", "uks", "seragam", "ekstrakurikuler", "tagihan"], parent: "Keuangan", roles: ["Admin"] },

    // TATA USAHA (Administrasi)
    { label: "Surat Masuk", href: "/dashboard/tu/surat-masuk", keywords: ["surat masuk", "tu", "admin"], parent: "Tata Usaha", roles: ["Admin", "TU", "Staf"] },
    { label: "Surat Keluar", href: "/dashboard/tu/surat-keluar", keywords: ["surat keluar"], parent: "Tata Usaha", roles: ["Admin", "TU", "Staf"] },
    { label: "Arsip Dokumen", href: "/dashboard/tu/arsip-akreditasi", keywords: ["arsip", "dokumen"], parent: "Tata Usaha", roles: ["Admin", "TU", "Staf"] },

    // LAINNYA
    { label: "Perpustakaan", href: "/dashboard/perpustakaan", keywords: ["buku", "pinjam", "pustaka"] },
    { label: "Alumni", href: "/dashboard/alumni", keywords: ["lulusan", "alumni"] },
    { label: "Berita Sekolah", href: "/dashboard/website/berita", keywords: ["berita", "post", "wow"], parent: "Website", roles: ["Admin"] },

    // Laporan & Settings (Admin Senior)
    { label: "Laporan Semua", href: "/dashboard/laporan", keywords: ["laporan", "export", "cetak pdf"] },
    { label: "Pengaturan", href: "/dashboard/settings", keywords: ["setting", "profil", "user"] },
    { label: "Notifikasi", href: "/dashboard/notifications", keywords: ["notifikasi", "notif", "pemberitahuan"] },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    Dashboard: Home,
    SPMB: Users,
    "Konfigurasi SPMB": Cog,
    "Data Siswa": UserPlus,
    "Buku Induk": Library,
    "Absensi Siswa": ClipboardCheck,
    "Rekap Absensi": BarChart2,
    "Absensi Guru": UserCheck,
    "Kelas & Jadwal": School,
    "Input Nilai": GraduationCap,
    "P5 Projek": Leaf,
    "e-Rapor Nilai": FileSpreadsheet,
    "Dapodik Sync": RefreshCw,
    "BK (Bimbingan)": Heart,
    "Catatan Pelanggaran": AlertTriangle,
    "Konseling Siswa": MessageCircle,
    "Prestasi Siswa": Trophy,
    "Bayar SPP": CreditCard,
    "Dispensasi/Potongan": Shield,
    "Surat Masuk": MailInbox,
    "Surat Keluar": Send,
    "Arsip Dokumen": FolderTree,
    Perpustakaan: BookOpen,
    Alumni: Award,
    "Berita Sekolah": FileText,
    "Laporan Semua": BarChart2,
    Pengaturan: Cog,
    Notifikasi: Bell,
};

const HomeIcon = Home;

export default function AppLayout({ children }: { children: ReactNode }) {
    const { auth, flash, setting } = usePage().props as PageProps;
    const { tema, setTema } = useTheme();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchIndex, setSearchIndex] = useState(-1);
    const [toastVisible, setToastVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout>();

    const userRole = auth?.user?.role || "Admin";

    // Get nav items with routes evaluated at render time
    const navItems = getNavItems();

    const filteredItems = navItems
        .filter(
            (item) => !item.roles || item.roles.includes(userRole),
        )
        .filter(
            (item) =>
                item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.keywords.some((k) =>
                    k.toLowerCase().includes(searchQuery.toLowerCase()),
                ),
        )
        .slice(0, 6);

    const handleSearchKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!searchOpen || filteredItems.length === 0) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSearchIndex((i) => (i + 1) % filteredItems.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSearchIndex(
                    (i) =>
                        (i - 1 + filteredItems.length) % filteredItems.length,
                );
            } else if (e.key === "Enter" && filteredItems[searchIndex]) {
                e.preventDefault();
                navigateToItem(filteredItems[searchIndex].href);
            } else if (e.key === "Escape") {
                setSearchOpen(false);
                setSearchQuery("");
            }
        },
        [searchOpen, filteredItems, searchIndex],
    );

    const navigateToItem = (href: string) => {
        window.location.href = href;
        setSearchOpen(false);
        setSearchQuery("");
    };

    const handleLogout = () => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/auth/logout";
        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");
        if (token) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = "_token";
            input.value = token;
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    };

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setToastVisible(true);
            const timer = setTimeout(() => setToastVisible(false), 4000);
            searchTimeoutRef.current = timer;
            return () => clearTimeout(timer);
        }
    }, [flash]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (userMenuOpen && !target.closest("[data-user-menu]"))
                setUserMenuOpen(false);
            if (searchOpen && !target.closest("[data-search]"))
                setSearchOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [userMenuOpen, searchOpen]);

    const renderNavIcon = (label: string) => {
        const Icon = ICON_MAP[label] || HomeIcon;
        return <Icon className="w-5 h-5" aria-hidden="true" />;
    };

    return (
        <>
            <Head>
                <meta name="theme-color" content="#ffffff" />
                <title>Sekolahku Admin</title>
            </Head>

            <div className="flex h-screen bg-background font-sans antialiased">
                {/* Sidebar */}
                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
                        sidebarOpen ? "translate-x-0" : "-translate-x-full",
                    )}
                    aria-label="Sidebar navigation"
                >
                    <div className="flex h-full flex-col">
                        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
                            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                                <Globe className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold text-foreground font-heading">
                                Sekolahku
                            </span>
                        </div>

                        <nav
                            className="flex-1 p-4 space-y-1 overflow-y-auto"
                            role="navigation"
                            aria-label="Main navigation"
                        >
                            {(() => {
                                const visible = navItems.filter(
                                    (item) => !item.roles || item.roles.includes(userRole),
                                );
                                const GROUP_ORDER = ["SPMB", "Siswa", "Akademik", "BK", "Absensi", "Keuangan", "Tata Usaha", "Website"];
                                const GROUP_LABEL: Record<string, string> = {
                                    SPMB: "SPMB / PPDB",
                                    Siswa: "Data Siswa",
                                    Akademik: "Akademik",
                                    BK: "BK & Bimbingan",
                                    Absensi: "Absensi",
                                    Keuangan: "Keuangan",
                                    "Tata Usaha": "Tata Usaha",
                                    Website: "Website",
                                };
                                const ungrouped = visible.filter(i => !i.parent || !GROUP_ORDER.includes(i.parent));
                                const topItems = ungrouped.filter(i => i.label === "Dashboard");
                                const bottomItems = ungrouped.filter(i => i.label !== "Dashboard");
                                const grouped = GROUP_ORDER.map(g => ({
                                    key: g,
                                    label: GROUP_LABEL[g],
                                    items: visible.filter(i => i.parent === g),
                                })).filter(g => g.items.length > 0);

                                const renderLink = (item: typeof visible[0]) => {
                                    const isActive = window.location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-primary/10 text-primary font-semibold"
                                                    : "text-muted-foreground hover:text-primary hover:bg-primary/10",
                                            )}
                                        >
                                            {renderNavIcon(item.label)}
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                };

                                return (
                                    <>
                                        {topItems.map(renderLink)}
                                        {grouped.map((group) => (
                                            <div key={group.key} className="mt-3">
                                                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 select-none">
                                                    {group.label}
                                                </div>
                                                {group.items.map(renderLink)}
                                            </div>
                                        ))}
                                        {bottomItems.length > 0 && (
                                            <div className="mt-3">
                                                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 select-none">
                                                    Lainnya
                                                </div>
                                                {bottomItems.map(renderLink)}
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </nav>

                        <div className="p-4 border-t border-border">
                            <div className="flex items-center gap-3 px-3 py-2">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm font-bold text-primary-foreground font-heading">
                                        {auth?.user?.name
                                            ?.charAt(0)
                                            .toUpperCase() || "A"}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {auth?.user?.name || "Admin"}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {auth?.user?.role || "Administrator"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}

                <div className="flex flex-1 flex-col lg:pl-0">
                    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
                            <button
                                className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors"
                                onClick={() => setSidebarOpen(true)}
                                aria-label="Open navigation menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <div
                                className="relative flex-1 max-w-md lg:max-w-xl"
                                data-search
                            >
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                                    aria-hidden="true"
                                />
                                <input
                                    ref={inputRef}
                                    type="search"
                                    placeholder="Cari menu..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setSearchOpen(true);
                                    }}
                                    onFocus={() => {
                                        if (searchQuery.trim())
                                            setSearchOpen(true);
                                    }}
                                    onKeyDown={handleSearchKeyDown}
                                    className="pl-9 pr-4 py-2 w-full text-sm bg-accent border-border rounded-xl focus:border-ring focus:ring-2 focus:ring-ring/20"
                                    role="combobox"
                                    aria-expanded={searchOpen}
                                    aria-controls="search-results"
                                    aria-activedescendant={
                                        searchIndex >= 0
                                            ? `search-item-${searchIndex}`
                                            : undefined
                                    }
                                    autoComplete="off"
                                />
                                {searchOpen && filteredItems.length > 0 && (
                                    <div
                                        id="search-results"
                                        role="listbox"
                                        className="absolute top-full mt-1.5 left-0 right-0 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                                    >
                                        {filteredItems.map((item, idx) => (
                                            <Link
                                                key={item.href + item.label}
                                                id={`search-item-${idx}`}
                                                role="option"
                                                aria-selected={
                                                    idx === searchIndex
                                                }
                                                href={item.href}
                                                onClick={() =>
                                                    navigateToItem(item.href)
                                                }
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                                                    idx === searchIndex
                                                        ? "bg-accent text-foreground"
                                                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                                                )}
                                            >
                                                <Search
                                                    className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0"
                                                    aria-hidden="true"
                                                />
                                                <span>{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 ml-auto">
                            <Link href={route("notifications.index")} className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all">
                                <Bell className="w-5 h-5" />
                            </Link>

                                <div className="relative" data-user-menu>
                                    <button
                                        onClick={() =>
                                            setUserMenuOpen(!userMenuOpen)
                                        }
                                        className="flex items-center gap-3 pl-3 border-l border-border"
                                    >
                                        <div className="text-right hidden sm:block">
                                            <p className="text-sm font-semibold text-foreground font-body">
                                                {auth?.user?.name || "Admin"}
                                            </p>
                                            <p className="text-xs text-muted-foreground font-label">
                                                {auth?.user?.role ||
                                                    "Administrator"}
                                            </p>
                                        </div>
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm flex-shrink-0">
                                            <span className="text-sm font-bold text-primary-foreground font-heading">
                                                {auth?.user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() || "A"}
                                            </span>
                                        </div>
                                    </button>
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-md shadow-xl z-50">
                                            <div className="py-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent w-full text-left"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    {toastVisible && (flash?.success || flash?.error) && (
                        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
                            <div
                                className={cn(
                                    "px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-sm",
                                    flash?.success
                                        ? "bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20 dark:text-primary/80"
                                        : "bg-destructive/10 text-destructive border border-destructive/20",
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-2 h-2 rounded-full",
                                        flash?.success
                                            ? "bg-primary"
                                            : "bg-destructive",
                                    )}
                                />
                                <span className="text-sm font-semibold font-body">
                                    {flash?.success || flash?.error}
                                </span>
                                <button
                                    onClick={() => setToastVisible(false)}
                                    className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    <main className="flex-1 overflow-auto">
                        <div className="p-4 lg:p-6">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
