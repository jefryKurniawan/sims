/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Sidebar from './Sidebar';
import { Menu, Bell, Mail, Search, ChevronRight } from 'lucide-react';
import type { PageProps } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
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
                    {/* Topbar */}
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
                                <div className="relative hidden md:block">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari menu..."
                                        className="pl-9 pr-4 py-2 w-64 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-3">
                                <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-school-red rounded-full ring-2 ring-white" />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
                                    <Mail className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
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
                                </div>
                            </div>
                        </div>

                        {/* Breadcrumb */}
                        {crumbs.length > 0 && (
                            <div className="px-4 lg:px-6 pb-3">
                                <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-label">
                                    <Link href={route('dashboard')} className="hover:text-blue-600 transition-colors">
                                        Dashboard
                                    </Link>
                                    {crumbs.map((crumb, i) => (
                                        <span key={i} className="flex items-center gap-1.5">
                                            <ChevronRight className="w-3 h-3 text-gray-300" />
                                            <span className={i === crumbs.length - 1 ? 'text-gray-800 font-semibold' : ''}>
                                                {crumb.replace(/-/g, ' ')}
                                            </span>
                                        </span>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </header>

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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
