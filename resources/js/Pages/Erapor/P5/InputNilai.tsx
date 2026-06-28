/// <reference types="vite/client" />
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layout/AppLayout';

interface Dimensi {
    id: number;
    kode_dimensi: string;
    nama_dimensi: string;
}

interface Projek {
    id: number;
    nama_projek: string;
    tema: string;
    tingkat: string;
    jurusan: { id: number; nama: string } | null;
    deskripsi: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    guru: { nama: string };
    dimensi: Dimensi[];
}

interface Siswa {
    id: number;
    nisn: string;
    nama_lengkap: string;
    raporSiswa: { id: number; kelas: string };
}

interface NilaiItem {
    id: number;
    p5_dimensi_id: number;
    p5_projek_id: number;
    rapor_siswa_id: number;
    predikat: string;
}

interface Props {
    projek: Projek;
    siswas: Siswa[];
    dimensiOptions: Dimensi[];
    predikatOptions: string[];
}

export default function InputNilai({ projek, siswas, dimensiOptions, predikatOptions }: Props) {
    const form = useForm({
        nilai: {} as Record<string, Record<string, string>>,
    });

    const handlePredikatChange = (siswaId: number, dimensiId: number, value: string) => {
        form.setData('nilai', {
            ...form.data.nilai,
            [siswaId]: {
                ...(form.data.nilai[siswaId] || {}),
                [dimensiId]: value,
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('admin.erapor.p5.store-nilai', projek.id));
    };

    const dimensiLabels: Record<string, string> = {
        beriman_bertaqwa: 'Beriman, Bertaqwa',
        berkebinekaan_global: 'Berkebinekaan Global',
        bergotong_royong: 'Bergotong Royong',
        mandiri: 'Mandiri',
        bernalar_kritis: 'Bernalar Kritis',
        kreatif: 'Kreatif',
    };

    return (
        <>
            <Head title={`Input Nilai - ${projek.nama_projek}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('admin.erapor.p5.index')}
                            className="text-navy-600 hover:text-navy-800 text-sm"
                        >
                            &larr; Kembali ke Daftar Projek
                        </Link>
                    </div>

                    {/* Projek Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {projek.nama_projek}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    {projek.deskripsi}
                                </p>
                            </div>
                            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                <div>Tema: <span className="font-medium">{projek.tema}</span></div>
                                <div>Kelas {projek.tingkat} {projek.jurusan?.nama || 'Semua'}</div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400">
                            <div>Dimensi: <span className="font-medium text-gray-900 dark:text-white">
                                {projek.dimensi.map((d) => dimensiLabels[d.kode_dimensi] || d.nama_dimensi).join(', ')}
                            </span></div>
                            <div>Guru: <span className="font-medium text-gray-900 dark:text-white">{projek.guru.nama}</span></div>
                            <div>Periode: <span className="font-medium text-gray-900 dark:text-white">
                                {new Date(projek.tanggal_mulai).toLocaleDateString('id-ID')} - {new Date(projek.tanggal_selesai).toLocaleDateString('id-ID')}
                            </span></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 dark:bg-gray-900 z-10">
                                                No
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 dark:bg-gray-900 z-10">
                                                Nama Siswa
                                            </th>
                                            {dimensiOptions.map((d) => (
                                                <th key={d.id} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase min-w-[140px]">
                                                    {d.kode_dimensi.replace(/_/g, ' ')}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {siswas.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={2 + dimensiOptions.length}
                                                    className="px-4 py-12 text-center text-gray-400"
                                                >
                                                    Belum ada siswa untuk projek ini
                                                </td>
                                            </tr>
                                        )}
                                        {siswas.map((siswa, idx) => (
                                            <tr key={siswa.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                    {siswa.nama_lengkap}
                                                </td>
                                                {dimensiOptions.map((d) => (
                                                    <td key={d.id} className="px-3 py-2 text-center">
                                                        <select
                                                            value={form.data.nilai[siswa.id]?.[d.id] || ''}
                                                            onChange={(e) => handlePredikatChange(siswa.id, d.id, e.target.value)}
                                                            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-sm"
                                                        >
                                                            <option value="">-</option>
                                                            {predikatOptions.map((p) => (
                                                                <option key={p} value={p}>{p}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {form.errors.nilai && (
                            <p className="text-red-500 text-sm mt-2">{form.errors.nilai}</p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <Link
                                href={route('admin.erapor.p5.index')}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {form.processing ? 'Menyimpan...' : 'Simpan Nilai'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

InputNilai.layout = (page: React.ReactElement) => <AppLayout children={page} />
