import { ReactNode } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark px-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white font-heading">Sekolahku</h1>
                    <p className="text-white/80 mt-2 text-sm">Sistem Manajemen Sekolah Terpadu</p>
                </div>

                {children}

                <p className="text-center mt-6 text-xs text-white/60">
                    &copy; {new Date().getFullYear()} Sekolahku. All rights reserved.
                </p>
            </div>
        </div>
    );
}
