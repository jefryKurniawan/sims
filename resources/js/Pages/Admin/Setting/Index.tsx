import { Head } from '@/Layout/Head';
import { Link } from '@inertiajs/inertia-react';

export default function Setting({ banks, spp, profileSekolah, setting }: { banks: any[]; spp: any; profileSekolah: any; setting: any }) {
    return (
        <>
            <Head title="Pengaturan Sistem" />
            <div className="pb-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Card Data Instansi */}
                    <Link href={route('settings.data-instansi')} className="group">
                        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <!-- Icon could be added here -->
                                <span className="mr-2">🏫</span> Data Instansi
                            </h2>
                            <p className="text-sm text-gray-600">
                                Nama sekolah, alamat, logo, dan media sosial
                            </p>
                        </div>
                    </Link>

                    {/* Card Legalitas Instansi */}
                    <Link href={route('settings.legalitas')} className="group">
                        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="mr-2">⚖️</span> Legalitas Instansi
                            </h2>
                            <p className="text-sm text-gray-600">
                                NPSN, akreditasi, nama kepsek, dan NIP
                            </p>
                        </div>
                    </Link>

                    {/* Card Konfigurasi Web */}
                    <Link href={route('settings.konfigurasi')} className="group">
                        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="mr-2">🎨</span> Konfigurasi Web
                            </h2>
                            <p className="text-sm text-gray-600">
                                Tema warna dan pengaturan media hero (foto/video)
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}