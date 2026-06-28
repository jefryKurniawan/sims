import { useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import gsap from 'gsap';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';
import { CheckCircle, Download, FileText, AlertTriangle } from 'lucide-react';

interface Props {
    token: string;
    nomor_registrasi: string;
}

export default function Success({ token, nomor_registrasi }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.success-anim',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );
        }, cardRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Head title="Pendaftaran Berhasil - SPMB" />
            <Header footer={null as any} jurusanM={[]} kegiatanM={[]} />

            <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-16">
                <div className="container mx-auto px-4">
                    <div ref={cardRef} className="max-w-2xl mx-auto">
                        <div className="success-anim bg-white rounded-2xl shadow-xl shadow-emerald-500/10 border border-emerald-100 p-8 md:p-12 text-center">
                            <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-emerald-600" />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                Pendaftaran Berhasil!
                            </h1>
                            <p className="text-gray-500 mb-2">
                                Selamat, data pendaftaran Anda telah berhasil disimpan.
                            </p>
                            <p className="text-gray-500 mb-8">
                                Silakan simpan nomor registrasi berikut untuk pengecekan status selanjutnya.
                            </p>

                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 mb-8 text-white">
                                <p className="text-emerald-100 text-sm mb-2">Nomor Registrasi</p>
                                <p className="text-3xl font-bold tracking-wider">{nomor_registrasi}</p>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-amber-800 mb-1">Penting!</p>
                                        <p className="text-sm text-amber-700">
                                            Simpan nomor registrasi Anda dengan baik. Nomor ini diperlukan untuk
                                            mengecek status pendaftaran dan melakukan pendaftaran ulang.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href={`/spmb/cek-status`}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30"
                                >
                                    <FileText className="w-5 h-5" />
                                    Cek Status Pendaftaran
                                </Link>
                                <button
                                    onClick={() => window.print()}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all"
                                >
                                    <Download className="w-5 h-5" />
                                    Simpan / Cetak
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer footer={null as any} />
        </>
    );
}
