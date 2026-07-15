import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    const primaryColor = "#FFD700";
    const secondaryColor = "#E31E24";

    return (
        <>
            {/* ── FOOTER ── */}
            <footer
                className="text-white pt-20 pb-8"
                style={{ backgroundColor: secondaryColor }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold"
                                style={{
                                    backgroundColor: primaryColor,
                                    color: "#1a1a1a",
                                }}
                            >
                                S
                            </div>
                            <span className="font-bold text-lg text-yellow-300">
                                St. Bonaventura
                            </span>
                        </div>
                        <p className="text-white/70 mb-8 text-sm">
                            SMA Katolik St. Bonaventura Madiun: Nurturing faith,
                            building intellect, and embracing technology since
                            1954.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6">
                            Menu Cepat
                        </h4>
                        <ul className="space-y-3 text-white/80 text-sm">
                            <li>
                                <a
                                    href="/berita"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    Berita
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/event"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    Event
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/spmb/daftar"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    SPMB 2026
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/alumni"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    Alumni
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6">
                            Kontak
                        </h4>
                        <ul className="space-y-3 text-white/80 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-300" />
                                Jl. Diponegoro No.45, Madiun
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0 text-yellow-300" />
                                (0351) 454194
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 flex-shrink-0 text-yellow-300" />
                                smabovent@yahoo.co.id
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6">
                            Jam Operasional
                        </h4>
                        <div className="bg-white/10 rounded-xl p-6 border border-white/10 text-sm">
                            <div className="flex justify-between mb-2">
                                <span className="text-white/60">Sen-Jum</span>
                                <span>07:00 - 15:30</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60">Sab</span>
                                <span>07:00 - 12:00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-white/10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 uppercase tracking-widest">
                    <div>
                        &copy; {new Date().getFullYear()} SMAS St. Bonaventura
                        Madiun
                    </div>
                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Kebijakan Privasi
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Ketentuan Layanan
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
