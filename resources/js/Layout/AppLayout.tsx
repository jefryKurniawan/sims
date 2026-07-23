import { useState, ReactNode, useEffect, useRef } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import { useTheme } from "@/context/ThemeProvider";
import { Bell, Menu, LogOut, User } from "lucide-react";
import Sidebar from "./Sidebar";

interface Flash {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

export default function AppLayout({ children }: { children: ReactNode }) {
    const { auth, flash } = usePage().props as any;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/auth/logout';
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = '_token';
            input.value = token;
            form.appendChild(input);
        }
        document.body.appendChild(form);
        form.submit();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Mobile sidebar overlay */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 bg-card">
                {/* Top bar */}
                <header className="h-16 bg-card border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="xl:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        aria-label="Open sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3 ml-auto">
                        <Link
                            href="/dashboard/notifications"
                            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <Bell className="w-5 h-5 text-gray-500" />
                        </Link>
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Open user menu"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                                    {auth?.user?.name?.charAt(0)?.toUpperCase() || "A"}
                                </div>
                                <span className="text-sm font-medium hidden sm:block">
                                    {auth?.user?.name || "Admin"}
                                </span>
                            </button>
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-1 z-50">
                                    <div className="px-4 py-2 border-b border-border/50">
                                        <p className="text-sm font-medium text-foreground">{auth?.user?.name}</p>
                                        <p className="text-xs text-muted-foreground">{auth?.user?.role}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                       </div>
                   </div>
               </header>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mx-4 mt-4 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-4 mt-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {flash.error}
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
