/// <reference types="vite/client" />
import { Head, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import {
    ArrowLeft, BookOpen, Globe, Sparkles, Users,
    Calendar, Clock, GraduationCap, Check,
    Heart, Lightbulb, Palette, Layers, Download,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';

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

const DIMENSI_ICONS: Record<string, any> = {
    'Beriman, Bertaqwa': Heart,
    'Berkebinekaan Global': Globe,
    'Bergotong Royong': Users,
    'Mandiri': Sparkles,
    'Bernalar Kritis': Lightbulb,
    'Kreatif': Palette,
};

export default function InputNilai({
    projek,
    siswas,
    dimensiOptions,
    predikatOptions,
}: Props) {
    const form = useForm({
        nilai: {} as Record<string, Record<string, string>>,
    });

    const handlePredikatChange = (
        siswaId: number,
        dimensiId: number,
        value: string,
    ) => {
        form.setData("nilai", {
            ...form.data.nilai,
            [siswaId]: {
                ...(form.data.nilai[siswaId] || {}),
                [dimensiId]: value,
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route("erapor.p5.store-nilai", projek.id));
    };

    const getPredikatBadge = (predikat: string) => {
        const colors: Record<string, string> = {
            'A': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
            'B': 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
            'C': 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
            'D': 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
        };
        return colors[predikat] || 'bg-gray-100 text-gray-600';
    };

    return (
        <>
            <Head title={`Input Nilai - ${projek.nama_projek}`} />
            <div className="p-4 lg:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.get(route('erapor.p5.index'))}
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Kembali ke Daftar Projek
                        </Button>
                    </div>

                    {/* Projek Info */}
                    <Card className="mb-6">
                        <CardHeader className="border-b border-border">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center shadow-sm shrink-0">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>{projek.nama_projek}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-0.5">{projek.deskripsi}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                        Kelas {projek.tingkat}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        {projek.jurusan?.nama || 'Semua Jurusan'}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <BookOpen className="w-4 h-4" />
                                    <span>Tema: <span className="font-medium text-foreground">{projek.tema}</span></span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Layers className="w-4 h-4" />
                                    <span>Dimensi: <span className="font-medium text-foreground">
                                        {projek.dimensi.map(d => d.kode_dimensi.replace(/_/g, ' ')).join(', ')}
                                    </span></span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>Guru: <span className="font-medium text-foreground">{projek.guru?.nama || '-'}</span></span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>Periode: <span className="font-medium text-foreground">
                                        {new Date(projek.tanggal_mulai).toLocaleDateString('id-ID')} - {new Date(projek.tanggal_selesai).toLocaleDateString('id-ID')}
                                    </span></span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Input Nilai */}
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader className="border-b border-border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="w-5 h-5 text-muted-foreground" />
                                        <CardTitle className="text-base">Input Nilai Siswa</CardTitle>
                                    </div>
                                    <Badge variant="secondary">{siswas.length} siswa</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="sticky left-0 z-10 bg-card px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">No</th>
                                                <th className="sticky left-12 z-10 bg-card px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[180px]">Nama Siswa</th>
                                                {dimensiOptions.map((d) => (
                                                    <th key={d.id} className="px-3 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[140px]">
                                                        {d.kode_dimensi.replace(/_/g, ' ')}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {siswas.length === 0 && (
                                                <tr>
                                                    <td colSpan={2 + dimensiOptions.length} className="px-4 py-12 text-center text-muted-foreground">
                                                        Belum ada siswa untuk projek ini
                                                    </td>
                                                </tr>
                                            )}
                                            {siswas.map((siswa, idx) => (
                                                <tr key={siswa.id} className="hover:bg-accent/50 transition-colors">
                                                    <td className="sticky left-0 z-10 bg-card px-4 py-2.5 text-sm text-muted-foreground">{idx + 1}</td>
                                                    <td className="sticky left-12 z-10 bg-card px-4 py-2.5 text-sm font-medium text-foreground whitespace-nowrap">
                                                        {siswa.nama_lengkap}
                                                        <div className="text-xs text-muted-foreground">{siswa.nisn}</div>
                                                    </td>
                                                    {dimensiOptions.map((d) => {
                                                        const currentValue = form.data.nilai[siswa.id]?.[d.id] || '';
                                                        return (
                                                            <td key={d.id} className="px-3 py-2.5 text-center">
                                                                <Select
                                                                    value={currentValue}
                                                                    onValueChange={(v) => handlePredikatChange(siswa.id, d.id, v)}
                                                                >
                                                                    <SelectTrigger className={`w-full h-9 text-xs ${currentValue ? getPredikatBadge(currentValue) : ''}`}>
                                                                        <SelectValue placeholder="-" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {predikatOptions.map((p) => (
                                                                            <SelectItem key={p} value={p}>{p}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {form.errors.nilai && (
                            <p className="text-destructive text-sm mt-2">{form.errors.nilai}</p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.get(route('erapor.p5.index'))}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Menyimpan...' : 'Simpan Nilai'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
