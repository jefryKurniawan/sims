import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { User, Menu, X } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DEFINISI MENU – sesuaikan label / link sesuai kebutuhan            */
/* ------------------------------------------------------------------ */
const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Profil Sekolah', href: '/profile-sekolah' },
  { label: 'Berita', href: '/berita' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Visi Misi', href: '/visi-dan-misi' },
  { label: 'Mapel', href: route('program.index') },
  { label: 'Guru', href: '/guru' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { url } = usePage();
  const currentPath = (url ?? '/').split('?')[0];
  const secondaryColor = '#E31E24';   // tetap menggunakan warna aksen

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-yellow-400/20 shadow-sm transition-shadow duration-300" style={{ '--primary': '#FFD700', '--secondary': secondaryColor }}>
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold" style={{ backgroundColor: secondaryColor }}>
              S
            </div>
            <span className="font-bold text-lg text-gray-900">
              SMAS <span style={{ color: secondaryColor }}>St. Bonaventura</span>
            </span>
          </div>

          {/* Desktop Nav – SATU BAR SAJA, tanpa sub‑nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-xs font-semibold uppercase tracking-wider transition-colors
                  ${currentPath === item.href ? 'text-red-600 font-bold' : 'text-gray-600 hover:text-red-600'}
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side – tombol Daftar Sekarang, ikon user, dan burger menu */}
          <div className="flex items-center gap-4">
            {/* Tombol Daftar Sekarang (tetap terlihat di desktop & mobile) */}
            <Link
              href="/spmb/daftar"
              className="hidden md:flex text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:shadow-lg transition-all"
              style={{ backgroundColor: secondaryColor }}
            >
              Daftar Sekarang
            </Link>

            {/* Ikon user / login */}
            <Link href="/auth/login" className="text-gray-600 hover:text-red-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Burger menu untuk tampilan mobile */}
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay – tetap menggunakan seluruh menuItems */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex justify-between items-center h-20 px-6 border-b">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setMobileOpen(false)}><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex flex-col p-6 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  text-lg font-semibold py-2 border-b
                  ${currentPath === item.href ? 'text-red-600' : 'text-gray-800'}
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}