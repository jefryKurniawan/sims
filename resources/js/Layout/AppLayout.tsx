/// <reference types="vite/client" />
import { useState, useEffect, useRef, useMemo } from 'react';
import { Head, usePage, Link, useForm } from '@inertiajs/inertia-react';
import Sidebar from './Sidebar';
import { Menu, Bell, Mail, Search, ChevronRight } from 'lucide-react';
import type { PageProps } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
    header?: React.ReactNode;
}

export default function AppLayout({ children, title, header }: AppLayoutProps) {
    const { auth, flash } = usePage().props as unknown as PageProps;
    const component = usePage().component as string | undefined;
    // ponytail: Halaman ini self-contained (punya Header/Footer sendiri) — bypass admin chrome.
    const isLanding = !!component && (
        component.startsWith('Frontend/') ||
        component.startsWith('Spmb/') ||
        component.startsWith('Auth/')
    );
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchIndex, setSearchIndex] = useState(-1);
    const [logoutPending, setLogoutPending] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { post } = useForm({});

    const handleLogout = () => {
        // Prevent multiple simultaneous logout attempts
        if (logoutPending) {
            console.log('[Logout] Logout already in progress, ignoring');
            return;
        }
        setLogoutPending(true);
        console.log('[Logout] handleLogout called');

        // Use Inertia.js form post method for proper CSRF handling and page transition
        post('/auth/logout');
    };

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setToastVisible(true);
            const timer = setTimeout(() => setToastVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success, flash?.error]);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    // ponytail: close search dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // All navigable admin menu items for search
    const menuItems = useMemo(() => [
        { label: 'Dashboard', href: route('dashboard'), keywords: ['dashboard', 'home', 'utama'] },
        { label: 'SPMB', href: route('ppdb.index'), keywords: ['spmb', 'ppdb', 'pendaftaran', 'murid baru'] },
        { label: 'Konfigurasi SPMB', href: route('spmb.config.index'), keywords: ['konfigurasi', 'spmb', 'pengaturan'] },
        { label: 'Data Siswa', href: route('users.murid.index'), keywords: ['siswa', 'murid', 'data'] },
        { label: 'SPP & Pembayaran', href: route('spp.index'), keywords: ['spp', 'pembayaran', 'tagihan', 'keuangan'] },
        { label: 'Dispensasi', href: route('dispensasi.index'), keywords: ['dispensasi', 'potongan', 'beasiswa'] },
        { label: 'GTK', href: route('gtk.index'), keywords: ['gtk', 'guru', 'tenaga', 'kependidikan'] },
        { label: 'Kelas', href: route('kelas.index'), keywords: ['kelas', 'rombongan', 'belajar'] },
        { label: 'Sarana Prasarana', href: route('sarana.index'), keywords: ['sarana', 'prasarana', 'fasilitas', 'infrastruktur'] },
        { label: 'Perpustakaan', href: route('admin.perpustakaan.index'), keywords: ['perpustakaan', 'buku', 'peminjaman'] },
        { label: 'Alumni', href: route('alumni.index'), keywords: ['alumni', 'lulusan'] },
        { label: 'Website / Berita', href: route('berita-admin.index'), keywords: ['website', 'berita', 'konten'] },
        { label: 'Galeri Prestasi', href: route('admin.prestasi.index'), keywords: ['prestasi', 'galeri', 'penghargaan'] },
        { label: 'Laporan', href: '#', keywords: ['laporan', 'export', 'pdf'] },
        { label: 'Settings', href: route('settings'), keywords: ['settings', 'pengaturan', 'profil'] },
    ], []);

    const navigateToItem = (href: string) => {
        setSearchQuery('');
        setSearchOpen(false);
        setSearchIndex(-1);
        // Inertia Link click via programmatic navigation
        window.location.href = href;
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (!searchOpen || filteredItems.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSearchIndex(prev => (prev + 1) % filteredItems.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSearchIndex(prev => (prev <= 0 ? filteredItems.length - 1 : prev - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if (searchIndex >= 0 && searchIndex < filteredItems.length) {
                    navigateToItem(filteredItems[searchIndex].href);
                }
                break;
            case 'Escape':
                setSearchOpen(false);
                setSearchIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        return menuItems.filter(item =>
            item.label.toLowerCase().includes(q) ||
            item.keywords.some(k => k.toLowerCase().includes(q))
        ).slice(0, 6);
    }, [searchQuery, menuItems]);

    // ponytail: reset keyboard index when filtered items change
    useEffect(() => { setSearchIndex(-1); }, [filteredItems]);

    if (isLanding) {
        return <>{children}</>;
    }

    const componentPath = component || '';
    const crumbs = componentPath
        .replace(/^Admin\//, '')
        .split('/')
        .filter(Boolean);

    return (
        <>
            <Head title={title} />
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    {header ? (
                        <>
                            {header}
                        </>
                    ) : (
                        <header className="flex-shrink-0 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                                {/* Left */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="xl:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-all"
                                        aria-label="Open menu"
                                    >
                                        <Menu className="w-5 h-5" />
                                    </button>

                                    {/* Search */}
                                    <div className="relative hidden md:block" ref={searchRef}>
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            placeholder="Cari menu..."
                                            value={searchQuery}
                                            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                                            onKeyDown={handleSearchKeyDown}
                                            onFocus={() => { if (searchQuery.trim()) setSearchOpen(true); }}
                                            className="pl-9 pr-4 py-2 w-64 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition-all"
                                            role="combobox"
                                            aria-expanded={searchOpen}
                                            aria-controls="search-results"
                                            aria-activedescendant={searchIndex >= 0 ? `search-item-${searchIndex}` : undefined}
                                            autoComplete="off"
                                        />
                                        {searchOpen && filteredItems.length > 0 && (
                                            <div
                                                id="search-results"
                                                role="listbox"
                                                className="absolute top-full mt-1.5 left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                                            >
                                                {filteredItems.map((item, idx) => (
                                                    <Link
                                                        key={item.href + item.label}
                                                        id={`search-item-${idx}`}
                                                        role="option"
                                                        aria-selected={idx === searchIndex}
                                                        href={item.href}
                                                        onClick={() => navigateToItem(item.href)}
                                                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                                                            idx === searchIndex
                                                                ? 'bg-yellow-50 text-yellow-800'
                                                                : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-800'
                                                        }`}
                                                    >
                                                        <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex items-center gap-3">
                                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
                                        <Mail className="w-5 h-5" />
                                    </button>

                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                console.log('[UserMenu] toggle menu');
                                                setUserMenuOpen(!userMenuOpen);
                                            }}
                                            className="flex items-center gap-3 pl-3 border-l border-gray-200"
                                        >
                                            <div className="text-right hidden sm:block">
                                                <p className="text-sm font-semibold text-gray-800 font-body">
                                                    {auth?.user?.name || 'Admin'}
                                                </p>
                                                <p className="text-xs text-gray-500 font-label">
                                                    {auth?.user?.role || 'Administrator'}
                                                </p>
                                            </div>
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm flex-shrink-0">
                                                <span className="text-sm font-bold text-white font-heading">
                                                    {auth?.user?.name?.charAt(0).toUpperCase() || 'A'}
                                                </span>
                                            </div>
                                        </button>
                                        {userMenuOpen && (
                                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-xl z-50">
                                                <div className="py-1">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
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
                    )}

                    {/* Toast Notification */}
                    {toastVisible && (flash?.success || flash?.error) && (
                        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
                            <div className={`px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-sm ${
                                flash?.success
                                    ? 'bg-school-emerald/10 text-school-emerald border border-school-emerald/20'
                                    : 'bg-school-red/10 text-school-red border border-school-red/20'
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    flash?.success ? 'bg-school-emerald' : 'bg-school-red'
                                }`} />
                                <span className="text-sm font-semibold font-body">
                                    {flash?.success || flash?.error}
                                </span>
                                <button
                                    onClick={() => setToastVisible(false)}
                                    className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Main content */}
                    <main className="flex-1 overflow-auto">
                        <div className="p-4 lg:p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}