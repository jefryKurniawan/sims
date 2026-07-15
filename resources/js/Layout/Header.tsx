import { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";

export default function Header() {
    const { auth } = usePage().props;

    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Beranda" },
        { href: "/profile-sekolah", label: "Profile" },
        { href: "/visi-dan-misi", label: "Visi & Misi" },
        { href: "/berita", label: "Berita" },
        { href: "/event", label: "Event" },
    ];

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-[#003366] font-heading">
                                Sekolahku
                            </span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-[#003366] hover:bg-gray-100 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-3">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="hidden sm:inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-[#003366] hover:bg-[#002244] transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="hidden sm:inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-[#003366] bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Login
                            </Link>
                        )}

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <nav className="md:hidden pb-3 border-t pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-[#003366] hover:bg-gray-100 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-white bg-[#003366] mt-1"
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="block px-3 py-2 rounded-md text-sm font-medium text-[#003366] bg-gray-100 mt-1"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
}
