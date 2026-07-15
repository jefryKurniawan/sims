import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { User, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DEFINISI MENU – sesuaikan label / link sesuai kebutuhan            */
/* ------------------------------------------------------------------ */
const menuItems = [
    { label: "Home", href: "/" },
    { label: "Profil Sekolah", href: "/profile-sekolah" },
    { label: "Berita", href: "/berita" },
    { label: "Alumni", href: "/alumni" },
    { label: "Visi Misi", href: "/visi-dan-misi" },
    { label: "Mapel", href: route("program.index") },
    { label: "Guru", href: "/guru" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();
    const currentPath = (url ?? "/").split("?")[0];
    const secondaryColor = "#E31E24";

    const headerRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Scroll effect: change background when scrolled
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Initial entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate logo and brand
            gsap.from(headerRef.current?.querySelector(".logo-group"), {
                y: -20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });
            // Stagger nav items
            gsap.from(headerRef.current?.querySelectorAll(".nav-item"), {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
            });
            // Animate CTA button
            gsap.from(headerRef.current?.querySelector(".cta-btn"), {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
            });
            // Animate user icon
            gsap.from(headerRef.current?.querySelector(".user-icon"), {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
            });
            // Animate burger icon
            gsap.from(headerRef.current?.querySelector(".burger-btn"), {
                rotation: 15,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        }, headerRef);
        return () => ctx.revert();
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        if (mobileOpen) {
            // Open: slide in from left
            gsap.to(mobileMenuRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power3.out",
            });
            // Fade in overlay
            gsap.to(mobileMenuRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            });
        } else {
            // Close: slide out to left
            gsap.to(mobileMenuRef.current, {
                x: "-100%",
                duration: 0.4,
                ease: "power3.in",
            });
            gsap.to(mobileMenuRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
            });
        }
    }, [mobileOpen]);

    // Hover animations for nav items (using gsap for smoother feel)
    const handleNavEnter = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            color: secondaryColor,
            duration: 0.3,
        });
    };
    const handleNavLeave = (e) => {
        gsap.to(e.currentTarget, { scale: 1, color: "#6b7280", duration: 0.3 }); // gray-500
    };

    return (
        <>
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
          ${
              scrolled
                  ? "bg-white/95 backdrop-blur-md border-b border-yellow-400/20 shadow-lg"
                  : "bg-white/90 backdrop-blur-sm border-b border-yellow-400/10"
          }`}
            >
                <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="logo-group flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold"
                            style={{ backgroundColor: secondaryColor }}
                        >
                            S
                        </div>
                        <span className="font-bold text-lg text-gray-900">
                            SMAS{" "}
                            <span style={{ color: secondaryColor }}>
                                St. Bonaventura
                            </span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item text-xs font-semibold uppercase tracking-wider transition-colors
                  ${
                      currentPath === item.href
                          ? `text-${secondaryColor} font-bold`
                          : "text-gray-600 hover:text-destructive"
                  }`}
                                onMouseEnter={handleNavEnter}
                                onMouseLeave={handleNavLeave}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* CTA Button */}
                        <Link
                            href="/spmb/daftar"
                            className={`cta-btn hidden md:flex text-white text-xs font-semibold px-6 py-2.5 rounded-full
                hover:shadow-lg transition-all`}
                            style={{ backgroundColor: secondaryColor }}
                        >
                            Daftar Sekarang
                        </Link>

                        {/* User / Login icon */}
                        <Link
                            href="/auth/login"
                            className="user-icon text-gray-600 hover:text-destructive transition-colors"
                        >
                            <User className="w-5 h-5" />
                        </Link>

                        {/* Burger menu */}
                        <button
                            className="lg:hidden p-2 burger-btn"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            {mobileOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md flex flex-col p-6 transform
            -translate-x-full opacity-0 transition-transform transition-opacity duration-500"
                >
                    <div className="flex justify-between items-center h-20 px-6 border-b">
                        <span className="font-bold text-lg">Menu</span>
                        <button onClick={() => setMobileOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="flex flex-col p-6 gap-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-lg font-semibold py-2 border-b
                  ${currentPath === item.href ? "text-destructive" : "text-gray-800"}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {/* Login link in mobile menu */}
                        <Link
                            href="/auth/login"
                            onClick={() => setMobileOpen(false)}
                            className={`text-lg font-semibold py-2 border-b
                ${currentPath === "/auth/login" ? "text-destructive" : "text-gray-800"}`}
                        >
                            Masuk
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
