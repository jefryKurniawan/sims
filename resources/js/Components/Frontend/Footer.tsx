import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Send } from 'lucide-react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
    footer: {
        logo: string | null;
        desc: string;
        telp: string;
        email: string;
        linkedln: string;
        twitter: string;
        facebook: string;
        instagram: string;
    } | null;
}

export default function Footer({ footer }: FooterProps) {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.footer-col',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-gray-900 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Top Footer */}
            <div className="py-16 relative">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* About Column */}
                        <div className="footer-col lg:col-span-1">
                            <a href="/" className="inline-block mb-6">
                                {footer?.logo ? (
                                    <img
                                        className="h-12 w-auto brightness-0 invert"
                                        src={`/storage/images/logo/${footer.logo}`}
                                        alt="Logo"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">S</span>
                                        </div>
                                        <span className="text-xl font-bold">Sekolahku</span>
                                    </div>
                                )}
                            </a>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {footer?.desc || 'Mewujudkan generasi emas Indonesia melalui pendidikan berkualitas tinggi dengan fasilitas modern dan tenaga pengajar profesional.'}
                            </p>
                            <div className="flex gap-3">
                                {footer?.linkedln && (
                                    <a
                                        href={`https://www.linkedin.com/in/${footer.linkedln}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {footer?.twitter && (
                                    <a
                                        href={`https://www.twitter.com/${footer.twitter}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                        aria-label="Twitter"
                                    >
                                        <FaTwitter className="w-5 h-5" />
                                    </a>
                                )}
                                {footer?.facebook && (
                                    <a
                                        href={`https://www.facebook.com/${footer.facebook}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                        aria-label="Facebook"
                                    >
                                        <FaFacebook className="w-5 h-5" />
                                    </a>
                                )}
                                {footer?.instagram && (
                                    <a
                                        href={`https://www.instagram.com/${footer.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                        aria-label="Instagram"
                                    >
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-col">
                            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                                Tautan Cepat
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/profile-sekolah" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full transform group-hover:scale-150 transition-transform" />
                                        Profile Sekolah
                                    </a>
                                </li>
                                <li>
                                    <a href="/visi-dan-misi" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full transform group-hover:scale-150 transition-transform" />
                                        Visi dan Misi
                                    </a>
                                </li>
                                <li>
                                    <a href="/berita" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full transform group-hover:scale-150 transition-transform" />
                                        Berita
                                    </a>
                                </li>
                                <li>
                                    <a href="/event" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full transform group-hover:scale-150 transition-transform" />
                                        Event
                                    </a>
                                </li>
                                <li>
                                    <a href="/ppdb" target="_blank" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full transform group-hover:scale-150 transition-transform" />
                                        PPDB Online
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div className="footer-col">
                            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                                Kontak
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Telepon</p>
                                        <a href={`tel:${footer?.telp}`} className="text-gray-300 hover:text-emerald-400 transition-colors">
                                            {footer?.telp}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                                        <a href={`mailto:${footer?.email}`} className="text-gray-300 hover:text-emerald-400 transition-colors">
                                            {footer?.email}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="footer-col">
                            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                                Newsletter
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Dapatkan informasi terbaru langsung ke email Anda
                            </p>
                            <form className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Email Anda"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-4 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 py-6 relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            &copy; {new Date().getFullYear()}{' '}
                            <span className="text-emerald-400 font-medium">Sekolahku</span>. All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}