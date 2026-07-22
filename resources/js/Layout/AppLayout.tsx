import { useState, ReactNode } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import { useTheme } from "@/context/ThemeProvider";
import { Bell, Menu, X, Search } from "lucide-react";
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Mobile sidebar overlay */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Desktop sidebar */}
            <div className="hidden xl:flex xl:flex-col xl:w-72 bg-white dark:bg-gray-800 border-r">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="h-16 bg-white dark:bg-gray-800 border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
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
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                                {auth?.user?.name?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <span className="text-sm font-medium hidden sm:block">
                                {auth?.user?.name || "Admin"}
                            </span>
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
