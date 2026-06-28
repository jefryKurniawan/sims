import { Head, Link } from '@inertiajs/inertia-react';
import Header from '@/Components/Frontend/Header';
import Footer from '@/Components/Frontend/Footer';

interface Props {
    calonSiswa: {
        id: number;
        nisn: string;
        nama_lengkap: string;
        tempat_lahir: string;
        tanggal_lahir: string;
        jenis_kelamin: string;
        alamat: string;
        no_hp: string;
        email: string | null;
        nama_ortu: string;
        no_hp_ortu: string;
        asal_sekolah: string;
        prestasi: string | null;
        biaya_pendaftaran: number;
        bukti_bayar: string | null;
        status: string;
        keputusan: string;
        tanggal_daftar: string;
        catatan: string | null;
    };
}

export default function CheckStatus({ calonSiswa }: Props) {
    const statusConfig = {
        submitted: {
            color: 'blue',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-700',
            badge: 'bg-blue-100 text-blue-800',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Menunggu Verifikasi',
            description: 'Berkas Anda sedang diperiksa oleh admin',
        },
        verified: {
            color: 'purple',
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-700',
            badge: 'bg-purple-100 text-purple-800',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Terverifikasi',
            description: 'Berkas Anda telah diverifikasi, menunggu pengumuman',
        },
        lulus: {
            color: 'emerald',
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            text: 'text-emerald-700',
            badge: 'bg-emerald-100 text-emerald-800',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            label: 'LULUS',
            description: 'Selamat! Anda telah diterima sebagai siswa baru',
        },
        tidak_lulus: {
            color: 'red',
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-700',
            badge: 'bg-red-100 text-red-800',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Tidak Lulus',
            description: 'Maaf, Anda belum diterima pada periode ini',
        },
    };

    const currentStatus = statusConfig[calonSiswa.status as keyof typeof statusConfig] || statusConfig.submitted;

    return (
        <>
            <Head title="Cek Status Pendaftaran" />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-[200px] bg-gradient-to-br from-primary via-primary-dark to-blue-900 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="inline-block mb-4">
                                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
                                    📊 Cek Status Pendaftaran
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold">Status Pendaftaran Anda</h1>
                        </div>
                    </div>
                </div>

                {/* Status Content */}
                <section className="py-12 -mt-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Status Card */}
                            <div className={`${currentStatus.bg} ${currentStatus.border} border-2 rounded-2xl p-8 mb-6`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-16 h-16 ${currentStatus.badge} rounded-xl flex items-center justify-center`}>
                                        {currentStatus.icon}
                                    </div>
                                    <div>
                                        <h2 className={`text-2xl font-bold ${currentStatus.text}`}>
                                            {currentStatus.label}
                                        </h2>
                                        <p className={currentStatus.text}>{currentStatus.description}</p>
                                    </div>
                                </div>

                                {/* Progress Steps */}
                                <div className="flex items-center justify-between mt-8">
                                    {[
                                        { step: 'Berkas Dikirim', key: 'submitted' },
                                        { step: 'Verifikasi', key: 'verified' },
                                        { step: 'Pengumuman', key: 'lulus' },
                                    ].map((item, index) => {
                                        const statusOrder = ['submitted', 'verified', 'lulus', 'tidak_lulus'];
                                        const currentIndex = statusOrder.indexOf(calonSiswa.status);
                                        const itemIndex = statusOrder.indexOf(item.key);
                                        const isCompleted = currentIndex >= itemIndex || calonSiswa.status === 'lulus' || calonSiswa.status === 'tidak_lulus';
                                        const isCurrent = calonSiswa.status === item.key;

                                        return (
                                            <div key={item.step} className="flex items-center">
                                                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                                                    isCompleted
                                                        ? currentStatus.color === 'emerald' ? 'bg-emerald-500 text-white' :
                                                          currentStatus.color === 'red' ? 'bg-red-500 text-white' :
                                                          'bg-primary text-white'
                                                        : 'bg-white text-gray-400 border-2 border-gray-300'
                                                }`}>
                                                    {isCompleted ? (
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </div>
                                                <span className={`ml-3 text-sm font-medium hidden sm:block ${
                                                    isCompleted ? currentStatus.text : 'text-gray-400'
                                                }`}>
                                                    {item.step}
                                                </span>
                                                {index < 2 && (
                                                    <div className={`w-16 sm:w-24 h-1 mx-3 rounded ${
                                                        currentIndex > itemIndex ? currentStatus.color === 'emerald' ? 'bg-emerald-500' :
                                                        currentStatus.color === 'red' ? 'bg-red-500' :
                                                        'bg-primary' : 'bg-gray-300'
                                                    }`} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Data Pendaftaran */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Data Pendaftaran
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500">NISN</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.nisn}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Nama Lengkap</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.nama_lengkap}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Tempat, Tanggal Lahir</p>
                                        <p className="font-medium text-gray-900">
                                            {calonSiswa.tempat_lahir},{new Date(calonSiswa.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Jenis Kelamin</p>
                                        <p className="font-medium text-gray-900">
                                            {calonSiswa.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-gray-500">Alamat</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.alamat}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">No. HP</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.no_hp}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.email || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Nama Orang Tua/Wali</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.nama_ortu}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">No. HP Orang Tua</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.no_hp_ortu}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Asal Sekolah</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.asal_sekolah}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Biaya Pendaftaran</p>
                                        <p className="font-medium text-gray-900">
                                            Rp {Number(calonSiswa.biaya_pendaftaran).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                {calonSiswa.prestasi && (
                                    <div className="mt-6 pt-6 border-t">
                                        <p className="text-sm text-gray-500 mb-2">Prestasi</p>
                                        <p className="font-medium text-gray-900">{calonSiswa.prestasi}</p>
                                    </div>
                                )}

                                {calonSiswa.bukti_bayar && (
                                    <div className="mt-6 pt-6 border-t">
                                        <p className="text-sm text-gray-500 mb-2">Bukti Pembayaran</p>
                                        <img
                                            src={`/storage/${calonSiswa.bukti_bayar}`}
                                            alt="Bukti Pembayaran"
                                            className="w-full md:w-64 h-auto rounded-lg shadow"
                                        />
                                    </div>
                                )}

                                {calonSiswa.catatan && (
                                    <div className="mt-6 pt-6 border-t">
                                        <p className="text-sm text-gray-500 mb-2">Catatan dari Admin</p>
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                            <p className="text-amber-800">{calonSiswa.catatan}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 pt-6 border-t">
                                    <p className="text-sm text-gray-500">Tanggal Pendaftaran</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(calonSiswa.tanggal_daftar).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={`/ppdb/edit/${calonSiswa.id}`}
                                    className="flex-1 min-w-[200px] bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all hover:shadow-lg text-center flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Data
                                </a>
                                <a
                                    href="/"
                                    className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Beranda
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}