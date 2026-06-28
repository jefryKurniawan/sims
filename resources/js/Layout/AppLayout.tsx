/// <reference types="vite/client" />
import { useEffect, useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Sidebar from './Sidebar';
import { Menu, Bell, LayoutGrid } from 'lucide-react';
import type { PageProps } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
    const { auth, flash } = usePage().props as unknown as PageProps;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1280);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    return (
        <>
            <Head title={title} />

            <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
                {/* Sidebar with responsive behavior */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main content area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top navigation bar */}
                    <nav className="bg-white dark:bg-gray-800 border-b px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            {/* Hamburger menu button - always visible on mobile */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="xl:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                                aria-label="Open menu"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Logo - only visible on desktop (xl screens) */}
                            <Link href="/" className="hidden xl:flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">S</span>
                                </div>
                                <span className="text-lg font-bold text-gray-800 dark:text-white">Sekolahku</span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Notification bell */}
                            <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {auth?.user ? (
                                <div className="flex items-center space-x-3">
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{auth.user.role}</p>
                                    </div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                                            {auth.user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="form"
                                        className="btn btn-sm btn-outline ml-2 hidden sm:inline-flex"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link href="/login" className="btn btn-sm btn-outline">Login</Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Flash messages */}
                    {flash?.success && (
                        <div className="px-4 py-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-b">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {flash.success}
                            </div>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="px-4 py-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-b">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {flash.error}
                            </div>
                        </div>
                    )}

                    {/* Main content */}
                    <main className="flex-1 overflow-auto">
                        <div className="p-4 sm:p-6">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}