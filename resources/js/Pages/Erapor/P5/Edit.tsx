/// <reference types="vite/client" />
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layout/AppLayout';

interface DimensiProjek {
    id: number;
    kode_dimensi: string;
    nama_dimensi: string;
    pivot: { p5_projek_id: number; p5_dimensi_id: number };
}

interface Projek {
    id: number;
    nama_projek: string;
    tema: string;
    deskripsi: string;
    tingkat: string;
    jurusan_id: number | null;
    tanggal_mulai: string;
    tanggal_selesai: string;
    dimensi: DimensiProjek[];
}

interface Jurusan {
    id: number;
    nama: string;
}

interface Dimensi {
    id: number;
    kode_dimensi: string;
    nama_dimensi: string;
}

interface Props {
    projek: Projek;
    temaOptions: string[];
    tingkatOptions: number[];
    jurusans: Jurusan[];
    dimensiOptions: Dimensi[];
}

export default function Edit({ projek, temaOptions, tingkatOptions, jurusans, dimensiOptions }: Props) {
    const form = useForm({
        nama_projek: projek.nama_projek,
        tema: projek.tema,
        deskripsi: projek.deskripsi,
        tingkat: projek.tingkat,
        jurusan_id: projek.jurusan_id?.toString() || '',
        dimensi: projek.dimensi.map((d) => d.id) as number[],
        tanggal_mulai: projek.tanggal_mulai,
        tanggal_selesai: projek.tanggal_selesai,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(route('admin.erapor.p5.update', projek.id));
    };

    const toggleDimensi = (id: number) => {
        const current = form.data.dimensi;
        if (current.includes(id)) {
            form.setData('dimensi', current.filter((d) => d !== id));
        } else {
            form.setData('dimensi', [...current, id]);
        }
    };

    return (
        <>
            <Head title="Edit Projek P5" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('admin.erapor.p5.index')}
                            className="text-navy-600 hover:text-navy-800 text-sm"
                        >
                            &larr; Kembali
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Edit Projek P5
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nama Projek <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.data.nama_projek}
                                    onChange={(e) => form.setData('nama_projek', e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                />
                                {form.errors.nama_projek && (
                                    <p className="text-red-500 text-xs mt-1">{form.errors.nama_projek}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Tema <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={form.data.tema}
                                    onChange={(e) => form.setData('tema', e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                >
                                    <option value="">Pilih Tema</option>
                                    {temaOptions.map((tema) => (
                                        <option key={tema} value={tema}>{tema}</option>
                                    ))}
                                </select>
                                {form.errors.tema && (
                                    <p className="text-red-500 text-xs mt-1">{form.errors.tema}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={form.data.deskripsi}
                                    onChange={(e) => form.setData('deskripsi', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                />
                                {form.errors.deskripsi && (
                                    <p className="text-red-500 text-xs mt-1">{form.errors.deskripsi}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tingkat / Kelas <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={form.data.tingkat}
                                        onChange={(e) => form.setData('tingkat', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    >
                                        <option value="">Pilih Tingkat</option>
                                        {tingkatOptions.map((t) => (
                                            <option key={t} value={t}>Kelas {t}</option>
                                        ))}
                                    </select>
                                    {form.errors.tingkat && (
                                        <p className="text-red-500 text-xs mt-1">{form.errors.tingkat}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Jurusan (opsional)
                                    </label>
                                    <select
                                        value={form.data.jurusan_id}
                                        onChange={(e) => form.setData('jurusan_id', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    >
                                        <option value="">Semua Jurusan</option>
                                        {jurusans.map((j) => (
                                            <option key={j.id} value={j.id}>{j.nama}</option>
                                        ))}
                                    </select>
                                    {form.errors.jurusan_id && (
                                        <p className="text-red-500 text-xs mt-1">{form.errors.jurusan_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tanggal Mulai <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={form.data.tanggal_mulai}
                                        onChange={(e) => form.setData('tanggal_mulai', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    />
                                    {form.errors.tanggal_mulai && (
                                        <p className="text-red-500 text-xs mt-1">{form.errors.tanggal_mulai}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tanggal Selesai <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={form.data.tanggal_selesai}
                                        onChange={(e) => form.setData('tanggal_selesai', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                                    />
                                    {form.errors.tanggal_selesai && (
                                        <p className="text-red-500 text-xs mt-1">{form.errors.tanggal_selesai}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Dimensi P5 <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {dimensiOptions.map((d) => (
                                        <label
                                            key={d.id}
                                            className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                                                form.data.dimensi.includes(d.id)
                                                    ? 'border-navy-500 bg-navy-50 dark:bg-navy-900/20 dark:border-navy-400'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.data.dimensi.includes(d.id)}
                                                onChange={() => toggleDimensi(d.id)}
                                                className="rounded border-gray-300 text-navy-600 mr-3"
                                            />
                                            <div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {d.kode_dimensi}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                                    {d.nama_dimensi}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {form.errors.dimensi && (
                                    <p className="text-red-500 text-xs mt-1">{form.errors.dimensi}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href={route('admin.erapor.p5.index')}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 disabled:opacity-50"
                                >
                                    {form.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactElement) => <AppLayout children={page} />
