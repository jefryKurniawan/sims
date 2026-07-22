import { useMemo, useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import {
	X,
	LayoutDashboard,
	Users,
	CreditCard,
	BookOpen,
	GraduationCap,
	Globe,
	Settings,
	Cog,
	UserPlus,
	Library,
	Edit,
	FileText,
	ScrollText,
	BarChart3,
	School,
	Trophy,
	CalendarDays,
	Building,
	Mail,
	Send,
	Archive,
	Fingerprint,
	Heart,
  UtensilsCrossed,
  ClipboardCheck,
  AlertTriangle,
  MessageCircle,
  BarChart2,
  ImageIcon,
} from "lucide-react";

interface SidebarProps {
	isOpen?: boolean;
	onClose?: () => void;
	collapsed?: boolean;
}

interface MenuItem {
	title: string;
	href: string;
	icon: React.ReactNode;
	badge?: string;
}

interface MenuCategory {
	name: string;
	items: MenuItem[];
}

export default function Sidebar({
	isOpen = true,
	onClose,
	collapsed = false,
}: SidebarProps) {
	const [isMobile, setIsMobile] = useState(false);
	const { auth } = usePage().props;
	const component = usePage().component as string;

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 1280);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const { url } = usePage();
	const currentPath = new URL(url, window.location.origin).pathname;

	const isActive = (href: string): boolean => {
		if (href === "#") return false;
		try {
			const target = new URL(href, window.location.origin).pathname;
			if (target === "/dashboard") return currentPath === "/dashboard";
			return currentPath === target || currentPath.startsWith(target + "/");
		} catch {
			return false;
		}
	};

	const menuCategories = useMemo<MenuCategory[]>(() => [
		{
			name: "Dashboard Utama",
			items: [
				{
					title: "Dashboard",
					href: route("dashboard"),
					icon: <LayoutDashboard className="w-5 h-5" />,
				},
				{
					title: "SPMB",
					href: route("ppdb.index"),
					icon: <UserPlus className="w-5 h-5" />,
				},
				{
					title: "Konfigurasi SPMB",
					href: route("spmb.config.index"),
					icon: <Cog className="w-5 h-5" />,
				},
			],
		},
		{
			name: "Administrasi Siswa",
			items: [
				{
					title: "Data Siswa",
					href: route("users.murid.index"),
					icon: <Users className="w-5 h-5" />,
				},
				{
					title: "Buku Induk Digital",
					href: route("buku-induk.index"),
					icon: <Library className="w-5 h-5" />,
				},
				{
					title: "SPP & Pembayaran",
					href: route("spp.index"),
					icon: <CreditCard className="w-5 h-5" />,
				},
				{
					title: "Dispensasi",
					href: route("dispensasi.index"),
					icon: <ScrollText className="w-5 h-5" />,
				},
			],
		},
		{
			name: "Tata Usaha",
			items: [
				{
					title: "Surat Masuk",
					href: route("tu.surat-masuk.index"),
					icon: <Mail className="w-5 h-5" />,
				},
				{
					title: "Surat Keluar",
					href: route("tu.surat-keluar.index"),
					icon: <Send className="w-5 h-5" />,
				},
				{
					title: "Arsip Akreditasi",
					href: route("tu.arsip-akreditasi.index"),
					icon: <Archive className="w-5 h-5" />,
				},
				{
					title: "NISN Management",
					href: route("tu.nisn-management.index"),
					icon: <Fingerprint className="w-5 h-5" />,
				},
			],
		},
		{
			name: "Sumber Daya",
			items: [
				{
					title: "GTK",
					href: route("gtk.index"),
					icon: <School className="w-5 h-5" />,
				},
				{
					title: "Kelas",
					href: route("kelas.index"),
					icon: <BookOpen className="w-5 h-5" />,
				},
				{
					title: "BK",
					href: route("bk.index"),
					icon: <Heart className="w-5 h-5" />,
				},
				{
					title: "Sarana Prasarana",
					href: route("sarana.index"),
					icon: <Building className="w-5 h-5" />,
				},
				{
					title: "Perpustakaan",
					href: route("admin.perpustakaan.index"),
					icon: <Library className="w-5 h-5" />,
				},
				{
					title: "Alumni",
					href: route("alumni.index"),
					icon: <GraduationCap className="w-5 h-5" />,
				},
			],
		},
		{
			name: "Akademik",
			items: [
				{
					title: "Rapor Siswa",
					href: route("rapor-siswa.index"),
					icon: <FileText className="w-5 h-5" />,
				},
				{
					title: "Tujuan Pembelajaran",
					href: route("erapor.tujuan-pembelajaran.index"),
					icon: <BookOpen className="w-5 h-5" />,
				},
				{
					title: "Input Nilai Formatif",
					href: route("erapor.nilai.input", {
						jenis_nilai: "formatif",
					}),
					icon: <Edit className="w-5 h-5" />,
				},
				{
					title: "Projek P5",
					href: route("erapor.p5.index"),
					icon: <Trophy className="w-5 h-5" />,
				},
				{
					title: "Jadwal Pelajaran",
					href: route("jadwal.index"),
					icon: <CalendarDays className="w-5 h-5" />,
				},
				{
					title: "Kurikulum",
					href: route("admin.kurikulum.index"),
					icon: <BookOpen className="w-5 h-5" />,
				},
				{
					title: "Kalender Akademik",
					href: route("admin.kurikulum.kalender"),
					icon: <CalendarDays className="w-5 h-5" />,
				},
			],
		},
		{
			name: "Digital Presence",
			items: [
				{
					title: "Website / Berita",
					href: route("admin.berita.index"),
					icon: <Globe className="w-5 h-5" />,
				},
				{
					title: "Galeri Prestasi",
					href: route("admin.prestasi.index"),
					icon: <Trophy className="w-5 h-5" />,
				},
			],
		},
		{
			name: "MBG (Makan Bergizi)",
			items: [
				{
					title: "Dashboard MBG",
					href: route("mbg.dashboard"),
					icon: <LayoutDashboard className="w-5 h-5" />,
				},
				{
					title: "BAST Serah Terima",
					href: route("mbg.basts.index"),
					icon: <ClipboardCheck className="w-5 h-5" />,
				},
				{
					title: "Uji Organoleptik",
					href: route("mbg.organoleptik.index"),
					icon: <ClipboardCheck className="w-5 h-5" />,
				},
				{
					title: "Absensi Makan",
					href: route("mbg.attendances.index"),
					icon: <Users className="w-5 h-5" />,
				},
				{
					title: "Insiden MBG",
					href: route("mbg.incidents.index"),
					icon: <AlertTriangle className="w-5 h-5" />,
				},
				{
					title: "Rapat Evaluasi",
					href: route("mbg.meetings.index"),
					icon: <MessageCircle className="w-5 h-5" />,
				},
				{
					title: "Laporan MBG",
					href: route("mbg.reports.index"),
					icon: <BarChart2 className="w-5 h-5" />,
				},
				{
					title: "Galeri MBG",
					href: route("mbg.galleries.index"),
					icon: <ImageIcon className="w-5 h-5" />,
				},
			],
		},
		{
			name: "Pengaturan",
			items: [
				{
					title: "Laporan",
					href: route("laporan.index"),
					icon: <FileText className="w-5 h-5" />,
				},
				{
					title: "Settings",
					href: route("settings"),
					icon: <Settings className="w-5 h-5" />,
				},
			],
		},
	]);

	const sidebarContent = (
		<>
			{/* Logo / Brand */}
			<div className="flex-shrink-0 flex items-center justify-between h-16 px-5">
				<Link href="/dashboard" className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
						<span className="text-primary-foreground font-extrabold text-sm font-heading">
							S
						</span>
					</div>
					{!collapsed && (
						<div>
							<span className="block text-sm font-bold text-white font-heading tracking-tight">
								SMAK St. Bonaventura
							</span>
							<span className="block text-[10px] text-muted-foreground/70 font-label tracking-wider uppercase">
								Admin Portal
							</span>
						</div>
					)}
				</Link>
				<button
					onClick={onClose}
					className="xl:hidden p-1.5 text-muted-foreground/60 hover:text-foreground hover:bg-accent rounded-lg transition-all"
				>
					<X className="w-4 h-4" />
				</button>
			</div>

			{/* Divider */}
			<div className="mx-5 mb-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

			{/* Navigation */}
			<nav className="flex-1 px-3 overflow-y-auto space-y-2 py-2 scrollbar-none">
				{menuCategories.map((category) => (
					<div key={category.name}>
						{/* Static Category Label */}
						<div className="px-3 py-1.5 text-[10px] font-label tracking-widest text-muted-foreground/40 uppercase">
							{category.name}
						</div>

						{/* Items */}
						<div className="space-y-0.5">
							{category.items.map((item) => {
								const active = isActive(item.href);
								return (
									<Link
										key={item.title}
										href={item.href}
										onClick={() => onClose?.()}
										className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
											active
												? "bg-accent text-foreground shadow-sm"
												: "text-muted-foreground/60 hover:text-foreground hover:bg-accent"
										}`}
									>
										<span
											className={`flex-shrink-0 ${active ? "text-primary" : "text-muted-foreground/40 group-hover:text-muted-foreground/60"}`}
										>
											{item.icon}
										</span>
										{!collapsed && <span className="flex-1">{item.title}</span>}
										{!collapsed && item.badge && (
											<span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-md">
												{item.badge}
											</span>
										)}
									</Link>
								);
							})}
						</div>
					</div>
				))}
			</nav>

			{/* User Footer */}
			<div className="flex-shrink-0 px-4 py-4 border-t border-white/10">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
						<span className="text-sm font-bold text-primary-foreground font-heading">
							{auth?.user?.name?.charAt(0).toUpperCase() || "A"}
						</span>
					</div>
					{!collapsed && (
						<div className="flex-1 min-w-0">
							<p className="text-sm font-semibold text-foreground/90 font-body truncate">
								{auth?.user?.name || "Admin"}
							</p>
							<p className="text-[11px] text-muted-foreground/50 font-label truncate">
								{auth?.user?.role || "Administrator"}
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);

	if (isMobile) {
		return (
			<>
				{isOpen && (
					<div
						className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
						onClick={onClose}
					/>
				)}
				<aside
					className={`fixed inset-y-0 left-0 w-[${collapsed ? "4rem" : "18rem"}] bg-card z-50 transform transition-transform duration-300 ease-out xl:hidden ${
						isOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="flex flex-col h-full">{sidebarContent}</div>
				</aside>
			</>
		);
	}

	return (
		<aside
			className={`hidden xl:flex xl:flex-col xl:w-[${collapsed ? "4rem" : "18rem"}] bg-card overflow-hidden transition-all duration-300`}
		>
			{sidebarContent}
		</aside>
	);
}
