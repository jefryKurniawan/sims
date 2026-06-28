/// <reference types="vite/client" />
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layout/AppLayout';

interface P5Projek {
    id: number;
    nama_projek: string;
    tema: string;
    deskripsi: string;
    tingkat: string;
    jurusan: { id: number; nama: string } | null;
    tanggal_mulai: string;
    tanggal_selesai: string;
    nama_guru_pengampu: string;
    p5_nilai_count: number;
}

interface Props {
    projeks: {
        data: P5Projek[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function Index({ projeks }: Props) {
    const dimensiLabels: Record<string, string> = {
        'beriman_bertaqwa': 'Beriman, Bertaqwa',
        'berkebinekaan_global': 'Berkebinekaan Global',
        'bergotong_royong': 'Bergotong Royong',
        'mandiri': 'Mandiri',
        'bernalar_kritis': 'Bernalar Kritis',
        'kreatif': 'Kreatif',
    };

    const temaBadge = (tema: string) => {
        const colors = [
            'bg-blue-100 text-blue-800',
            'bg-green-100 text-green-800',
            'bg-purple-100 text-purple-800',
            'bg-orange-100 text-orange-800',
            'bg-pink-100 text-pink-800',
            'bg-indigo-100 text-indigo-800',
        ];
        const index = Math.abs(tema.length) % colors.length;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[index]}`}>
                {tema}
            </span>
        );
    };

    return (
        <>
            <Head title="Projek P5" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Projek P5 (Projek Penguatan Profil Pelajar Pancasila)
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Kelola projek dan input nilai P5 dengan 6 dimensi
                            </p>
                        </div>
                        <Link
                            href={route('admin.erapor.p5.create')}
                            className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700"
                        >
                            + Tambah Projek
                        </Link>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-4 text-white">
                            <div className="text-sm opacity-90">Dimensi P5</div>
                            <div className="text-2xl font-bold">6 Dimensi</div>
                            <ul className="text-xs mt-2 opacity-80 space-y-1">
                                <li>• Beriman, Bertaqwa</li>
                                <li>• Berkebinekaan Global</li>
                                <li>• Bergotong Royong</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-4 text-white">
                            <div className="text-sm opacity-90">Predikat</div>
                            <div className="text-2xl font-bold">A - D</div>
                            <ul className="text-xs mt-2 opacity-80 space-y-1">
                                <li>• A = Sangat Baik</li>
                                <li>• B = Baik</li>
                                <li>• C = Cukup</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-4 text-white">
                            <div className="text-sm opacity-90">Tema Umum</div>
                            <div className="text-lg font-bold">Kebinekaan Global</div>
                            <ul className="text-xs mt-2 opacity-80 space-y-1">
                                <li>• Gotong Royong</li>
                                <li>• Gaya Hidup Berkelanjutan</li>
                            </ul>
                        </div>
                    </div>

                    {/* Projek List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {projeks.data.map((projek) => (
                            <div
                                key={projek.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {projek.nama_projek}
                                        </h3>
                                        {temaBadge(projek.tema)}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                        {projek.deskripsi}
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Tingkat:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                Kelas {projek.tingkat}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Jurusan:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {projek.jurusan?.nama || 'Semua'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Periode:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {new Date(projek.tanggal_mulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {new Date(projek.tanggal_selesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Guru Pengampu:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {projek.nama_guru_pengampu}
                                            </span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                                            <span className="text-gray-500">Nilai Terinput:</span>
                                            <span className={`font-medium ${
                                                projek.p5_nilai_count > 0
                                                    ? 'text-green-600'
                                                    : 'text-gray-400'
                                            }`}>
                                                {projek.p5_nilai_count} data
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between gap-2">
                                    <Link
                                        href={route('admin.erapor.p5.input-nilai', projek.id)}
                                        className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                    >
                                        Input Nilai
                                    </Link>
                                    <Link
                                        href={route('admin.erapor.p5.edit', projek.id)}
                                        className="px-3 py-1.5 text-sm bg-navy-600 text-white rounded hover:bg-navy-700"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Halaman {projeks.current_page} dari {projeks.last_page}
                            </span>
                            <div className="flex gap-1">
                                {projeks.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded text-sm ${
                                            link.active
                                                ? 'bg-navy-600 text-white'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactElement) => <AppLayout children={page} />