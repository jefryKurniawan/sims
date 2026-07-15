import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Globe } from "lucide-react";
import { ReactNode } from "react";

export default function FrontendLayout({ children }: { children: ReactNode }) {
    const { setting } = usePage().props as {
        setting: {
            tema: string;
            hero_media_type: string;
            hero_media_url: string;
        };
    };

    return (
        <>
            <Head>
                <title>{"Sekolahku"}</title>
                <meta name="theme-color" content="#ffffff" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ThemeProvider initialTema={setting?.tema ?? "navy"}>
                <div className="min-h-screen bg-background font-sans antialiased">
                    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                            <Link
                                href="/"
                                className="flex items-center gap-2"
                                aria-label="Sekolahku Home"
                            >
                                <Globe className="h-8 w-8 text-primary" />
                                <span className="text-xl font-bold text-foreground font-heading">
                                    Sekolahku
                                </span>
                            </Link>
                            <div className="hidden md:flex md:items-center md:gap-6">
                                <Link
                                    href="#tentang"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Tentang
                                </Link>
                                <Link
                                    href="#berita"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Berita
                                </Link>
                                <Link
                                    href="#prestasi"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Prestasi
                                </Link>
                                <Link
                                    href="#galeri"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Galeri
                                </Link>
                                <Link
                                    href="#kontak"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Kontak
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    Login
                                </Link>
                            </div>
                        </nav>
                    </header>
                    <main>{children}</main>
                    <footer className="border-t border-border bg-card">
                        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                            <p className="text-center text-sm text-muted-foreground">
                                &copy; {new Date().getFullYear()} Sekolahku. All
                                rights reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            </ThemeProvider>
        </>
    );
}
