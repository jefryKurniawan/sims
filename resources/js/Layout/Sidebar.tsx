/// <reference types="vite/client" />
import { useMemo, useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/inertia-react';
import { X, LayoutGrid, Users, CreditCard, BookOpen, GraduationCap, Globe, Settings, Cog, UserPlus, Library, FileText, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
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
    icon: React.ReactNode;
    accentColor: string;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const { auth } = usePage().props;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1280);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.menu-category',
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, delay: 0.2, ease: 'power3.out' }
            );
            gsap.fromTo('.menu-item',
                { opacity: 0, x: -8 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.04, delay: 0.4, ease: 'power2.out' }
            );
        });
        return () => ctx.revert();
    }, []);

    const menuCategories = useMemo<MenuCategory[]>(() => [
        {
            name: 'Overview',
            icon: <LayoutGrid className="w-3.5 h-3.5" />,
            accentColor: 'from-blue-500 to-cyan-500',
            items: [
                {
                    title: 'Dashboard',
                    href: route('dashboard'),
                    icon: <LayoutGrid className="w-4.5 h-4.5" />
                }
            ]
        },
        {
            name: 'Admisi',
            icon: <UserPlus className="w-3.5 h-3.5" />,
            accentColor: 'from-emerald-500 to-teal-500',
            items: [
                {
                    title: 'PPDB',
                    href: route('ppdb.index'),
                    icon: <UserPlus className="w-4.5 h-4.5" />,
                    badge: 'New'
                },
                {
                    title: 'SPP & Pembayaran',
                    href: route('spp.murid.index'),
                    icon: <CreditCard className="w-4.5 h-4.5" />
                },
                {
                    title: 'Dispensasi',
                    href: route('dispensasi.index'),
                    icon: (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                }
            ]
        },
        {
            name: 'Akademik',
            icon: <GraduationCap className="w-3.5 h-3.5" />,
            accentColor: 'from-violet-500 to-purple-500',
            items: [
                {
                    title: 'GTK',
                    href: route('gtk.index'),
                    icon: (
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    )
                },
                {
                    title: 'Alumni',
                    href: route('alumni.index'),
                    icon: <GraduationCap className="w-4.5 h-4.5" />
                }
            ]
        },
        {
            name: 'Resources',
            icon: <Library className="w-3.5 h-3.5" />,
            accentColor: 'from-amber-500 to-orange-500',
            items: [
                {
                    title: 'Perpustakaan',
                    href: '#',
                    icon: <Library className="w-4.5 h-4.5" />
                }
            ]
        },
        {
            name: 'Admin',
            icon: <Cog className="w-3.5 h-3.5" />,
            accentColor: 'from-pink-500 to-rose-500',
            items: [
                {
                    title: 'Website',
                    href: route('berita-admin.index'),
                    icon: <Globe className="w-4.5 h-4.5" />
                },
                {
                    title: 'Pengguna',
                    href: route('users.murid.index'),
                    icon: <Users className="w-4.5 h-4.5" />
                },
                {
                    title: 'Laporan',
                    href: '#',
                    icon: <FileText className="w-4.5 h-4.5" />
                },
                {
                    title: 'Settings',
                    href: route('settings'),
                    icon: <Cog className="w-4.5 h-4.5" />
                }
            ]
        }
    ]);

    const renderMenuItem = (item: MenuItem) => (
        <Link
            key={item.title}
            href={item.href}
            className="menu-item group relative flex items-center px-2.5 py-2 text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden"
            onClick={() => onClose?.()}
        >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Active indicator */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-r-full group-hover:h-4/5 transition-all duration-300"></div>

            {/* Icon container */}
            <div className="relative mr-2.5 w-9 h-9 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 group-hover:bg-white dark:group-hover:bg-gray-700 transition-all duration-300 shadow-sm group-hover:shadow-md">
                <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {item.icon}
                </span>
            </div>

            {/* Text */}
            <span className="flex-1 text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {item.title}
            </span>

            {/* Badge */}
            {item.badge && (
                <span className="relative ml-auto px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-sm">
                    {item.badge}
                </span>
            )}

            {/* Chevron on hover */}
            <X className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300 ml-1" style={{ display: 'none' }} />
        </Link>
    );

    const sidebarContent = (
        <>
            {/* Logo/Brand - Premium design */}
            <div className="flex-shrink-0 flex items-center justify-between h-18 px-4 py-3">
                <Link href="/" className="flex items-center gap-3 group">
                    {/* Logo with gradient ring */}
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 transition-shadow duration-300">
                        <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="text-white font-bold text-base relative z-10">S</span>
                    </div>
                    <div className="hidden lg:block">
                        <span className="block text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Sekolahku
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400 font-medium">
                            Admin Portal
                        </span>
                    </div>
                </Link>

                {/* Close button - mobile */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Premium divider */}
            <div className="mx-4 mb-4 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

            {/* Navigation with Categories - Premium styling */}
            <nav className="flex-1 px-3 space-y-5 py-2 overflow-y-auto">
                {menuCategories.map((category) => (
                    <div key={category.name} className="menu-category">
                        {/* Category Header with icon */}
                        <div className="flex items-center gap-2 px-3 py-1.5 mb-1 cursor-pointer" onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}>
                            <div className={`w-4 h-4 rounded-sm bg-gradient-to-br ${category.accentColor} flex items-center justify-center transition-colors duration-200`}>
                                {category.icon}
                            </div>
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {category.name}
                            </span>
                        </div>

                        {/* Menu Items with indent */}
                        <div className="space-y-1 pl-2 border-l-2 border-gray-100 dark:border-gray-800 ml-3">
                            {category.items.map((item) => renderMenuItem(item))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Premium footer with user info */}
            <div className="flex-shrink-0 p-3 border-t border-gray-100 dark:border-gray-800">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                            {auth?.user?.name || 'Admin'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {auth?.user?.role || 'Administrator'}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

    // Mobile: Slide-over sidebar
    if (isMobile) {
        return (
            <>
                {/* Overlay with blur */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-40 xl:hidden backdrop-blur-md"
                        onClick={onClose}
                    />
                )}

                {/* Slide-over panel with premium styling */}
                <aside
                    className={`fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] xl:hidden ${
                        isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto">
                            {sidebarContent}
                        </div>
                    </div>
                </aside>
            </>
        );
    }

    // Desktop: Static sidebar with premium design
    return (
        <aside className="hidden xl:flex xl:flex-col xl:w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-hidden">
            {sidebarContent}
        </aside>
    );
}