import { Head, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';
import {
    Plus, BookOpen, Award, Sparkles, Layers, Users,
    Calendar, Clock, GraduationCap, ChevronRight, BarChart3,
    Palette, Leaf, Globe, Heart, Lightbulb, Mic,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

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

interface PaginatedLinks {
    data: P5Projek[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
}

interface Props {
    projeks: PaginatedLinks;
}

const DIMENSI = [
    { key: 'Beriman, Bertaqwa', desc: 'Ketaqwaan & Akhlak', icon: Heart, color: 'text-blue-500' },
    { key: 'Berkebinekaan Global', desc: 'Keberagaman & Toleransi', icon: Globe, color: 'text-emerald-500' },
    { key: 'Bergotong Royong', desc: 'Kolaborasi & Kerjasama', icon: Users, color: 'text-amber-500' },
    { key: 'Mandiri', desc: 'Kemandirian & Inisiatif', icon: Sparkles, color: 'text-violet-500' },
    { key: 'Bernalar Kritis', desc: 'Analisis & Pemecahan Masalah', icon: Lightbulb, color: 'text-rose-500' },
    { key: 'Kreatif', desc: 'Inovasi & Daya Cipta', icon: Palette, color: 'text-cyan-500' },
];

const TEMA_COLORS: Record<string, string> = {
    'Kebinekaan Global': 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    'Gotong Royong': 'border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    'Gaya Hidup Berkelanjutan': 'border-green-300 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
    'Suara Demokrasi': 'border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    'Bangunlah Jiwa dan Raganya': 'border-purple-300 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    'Kreativitas': 'border-pink-300 bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
};

function getTemaColor(tema: string): string {
    return TEMA_COLORS[tema] || 'border-gray-300 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export default function Index({ projeks }: Props) {
    const btnClass = (active: boolean) =>
        active
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-muted text-muted-foreground hover:bg-muted/80';

    return (
        <>
            <Head title="P5 – Projek Profil Pelajar Pancasila" />

            <div className="space-y-6">
                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading tracking-tight">
                            Projek P5
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Kelola projek penguatan profil pelajar Pancasila — 6 dimensi, input nilai, dan pelaporan
                        </p>
                    </div>
                    <Link href={route('erapor.p5.create')}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Projek
                        </Button>
                    </Link>
                </div>

                {/* ── Info Cards – Dimensi, Predikat, Tema ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Dimensi */}
                    <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/50 dark:border-blue-800/30">
                        <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                    <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                        6 Dimensi P5
                                    </p>
                                    <p className="text-2xl font-bold text-foreground mt-0.5">Profil Pelajar</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                                        {DIMENSI.slice(0, 3).map((d) => (
                                            <span key={d.key} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100/60 dark:bg-blue-900/30 text-[10px] font-medium text-blue-700 dark:text-blue-300">
                                                <d.icon className="w-2.5 h-2.5" />
                                                {d.desc.split(' &')[0]}
                                            </span>
                                        ))}
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100/60 dark:bg-blue-900/30 text-[10px] font-medium text-blue-700 dark:text-blue-300">
                                            +3 lagi
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Predikat */}
                    <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-200/50 dark:border-emerald-800/30">
                        <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                                    <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                        Predikat
                                    </p>
                                    <p className="text-2xl font-bold text-foreground mt-0.5">A – D</p>
                                    <div className="flex gap-2 mt-2.5">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100/60 dark:bg-emerald-900/30 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                                            A = Sangat Baik
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100/60 dark:bg-amber-900/30 text-[10px] font-medium text-amber-700 dark:text-amber-300">
                                            B = Baik
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100/60 dark:bg-gray-800 text-[10px] font-medium text-muted-foreground">
                                            C = Cukup
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tema */}
                    <Card className="bg-gradient-to-br from-violet-500/10 to-violet-600/5 border-violet-200/50 dark:border-violet-800/30">
                        <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                                    <Palette className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                                        Tema P5
                                    </p>
                                    <p className="text-lg font-bold text-foreground mt-0.5">6 Tema Utama</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                                        <span className="px-2 py-0.5 rounded-md bg-violet-100/60 dark:bg-violet-900/30 text-[10px] font-medium text-violet-700 dark:text-violet-300">
                                            Kewirausahaan
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-violet-100/60 dark:bg-violet-900/30 text-[10px] font-medium text-violet-700 dark:text-violet-300">
                                            Gaya Hidup
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-violet-100/60 dark:bg-violet-900/30 text-[10px] font-medium text-violet-700 dark:text-violet-300">
                                            Kebinekaan
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Projek List ── */}
                {projeks.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                                <BookOpen className="w-8 h-8 text-muted-foreground/40" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">Belum ada projek P5</h3>
                            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                                Mulai dengan menambahkan projek baru. Projek akan muncul di sini setelah dibuat.
                            </p>
                            <Link href={route('erapor.p5.create')}>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Buat Projek Pertama
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projeks.data.map((projek) => (
                            <Card key={projek.id} className="hover:shadow-md transition-shadow duration-200 group">
                                {/* Card Top – Badge + Title */}
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <CardTitle className="text-base font-semibold leading-snug line-clamp-2">
                                            {projek.nama_projek}
                                        </CardTitle>
                                        <Badge className={`shrink-0 border font-normal text-[10px] px-2 py-0.5 ${getTemaColor(projek.tema)}`}>
                                            {projek.tema}
                                        </Badge>
                                    </div>
                                    <p className="text-xs leading-relaxed line-clamp-2 mt-1">
                                        {projek.deskripsi}
                                    </p>
                                </CardHeader>

                                {/* Card Body – Meta */}
                                <CardContent className="pb-4 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                                        <span className="font-medium text-foreground">Kelas {projek.tingkat}</span>
                                        <span className="text-muted-foreground/50">|</span>
                                        <span>{projek.jurusan?.nama || 'Semua Jurusan'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                                        <span>{formatDate(projek.tanggal_mulai)} – {formatDate(projek.tanggal_selesai)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Users className="w-3.5 h-3.5 shrink-0" />
                                        <span>Pengampu: <span className="font-medium text-foreground">{projek.nama_guru_pengampu}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs pt-2 border-t border-border">
                                        <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                                        <span>Nilai terinput: </span>
                                        <span className={`font-semibold ${projek.p5_nilai_count > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                                            {projek.p5_nilai_count} siswa
                                        </span>
                                    </div>
                                </CardContent>

                                {/* Card Footer – Actions */}
                                <div className="pt-0 pb-4 px-4 flex gap-2">
                                    <Link href={route('erapor.p5.input-nilai', projek.id)} className="flex-1">
                                        <Button size="sm" className="w-full gap-1.5">
                                            <ArrowRight className="w-3.5 h-3.5" />
                                            Input Nilai
                                        </Button>
                                    </Link>
                                    <Link href={route('erapor.p5.edit', projek.id)}>
                                        <Button variant="outline" size="sm" className="gap-1.5">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* ── Pagination ── */}
                {projeks.links.length > 1 && (
                    <Card>
                        <CardContent className="px-4 py-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <p className="text-sm text-muted-foreground">
                                    Menampilkan {((projeks.current_page - 1) * 20) + 1} –{' '}
                                    {Math.min(projeks.current_page * 20, projeks.total)} dari {projeks.total} projek
                                </p>
                                <div className="flex gap-1">
                                    {projeks.links.map((link, i) => (
                                        <Link key={i} href={link.url || '#'}>
                                            <Button
                                                size="sm"
                                                disabled={!link.url}
                                                className={`text-xs px-3 h-8 transition-all duration-150 ${btnClass(link.active)}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}
