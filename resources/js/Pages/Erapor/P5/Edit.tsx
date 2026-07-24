/// <reference types="vite/client" />
import { Head, Link, useForm, router } from '@inertiajs/inertia-react';
import { useState } from 'react';
import {
    ArrowLeft, BookOpen, Globe, Sparkles, Users,
    Calendar, Clock, GraduationCap, Check, ChevronDown,
    X, Layers,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';

const TEMA_ICONS: Record<string, { icon: any; color: string }> = {
    'Kebinekaan Global': { icon: Globe, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
    'Gotong Royong': { icon: Users, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
    'Gaya Hidup Berkelanjutan': { icon: Sparkles, color: 'text-green-500 bg-green-50 dark:bg-green-950/30' },
    'Berekayasa dan Berteknologi': { icon: BookOpen, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' },
    'Kewirausahaan': { icon: BookOpen, color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/30' },
    'Bangunlah Jiwa dan Raganya': { icon: BookOpen, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' },
    'Suara Demokrasi': { icon: BookOpen, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/30' },
    'Kearifan Lokal': { icon: BookOpen, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/30' },
};

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

export default function Edit({
    projek,
    temaOptions,
    tingkatOptions,
    jurusans,
    dimensiOptions,
}: Props) {
    const form = useForm({
        nama_projek: projek.nama_projek,
        tema: projek.tema,
        deskripsi: projek.deskripsi,
        tingkat: projek.tingkat,
        jurusan_id: projek.jurusan_id?.toString() || "",
        dimensi: projek.dimensi.map((d) => d.id) as number[],
        tanggal_mulai: projek.tanggal_mulai,
        tanggal_selesai: projek.tanggal_selesai,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(route("erapor.p5.update", projek.id));
    };

    const toggleDimensi = (id: number) => {
        const current = form.data.dimensi;
        if (current.includes(id)) {
            form.setData("dimensi", current.filter((d) => d !== id));
        } else {
            form.setData("dimensi", [...current, id]);
        }
    };

    return (
        <>
            <Head title="Edit Projek P5" />
            <div className="p-4 lg:p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.get(route('erapor.p5.index'))}
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Kembali
                        </Button>
                    </div>

                    <Card>
                        <CardHeader className="border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center shadow-sm">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <CardTitle>Edit Projek P5</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        Edit projek "{projek.nama_projek}"
                                    </p>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nama Projek */}
                                <div className="space-y-2">
                                    <Label htmlFor="nama_projek" className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                                        Nama Projek
                                        <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="nama_projek"
                                        value={form.data.nama_projek}
                                        onChange={(e) => form.setData('nama_projek', e.target.value)}
                                    />
                                    {form.errors.nama_projek && (
                                        <p className="text-destructive text-xs mt-1">{form.errors.nama_projek}</p>
                                    )}
                                </div>

                                {/* Tema */}
                                <div className="space-y-2">
                                    <Label htmlFor="tema" className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                                        Tema
                                        <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={form.data.tema}
                                        onValueChange={(v) => form.setData('tema', v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Tema" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {temaOptions.map((tema) => {
                                                const themeConfig = TEMA_ICONS[tema];
                                                const Icon = themeConfig?.icon || BookOpen;
                                                return (
                                                    <SelectItem key={tema} value={tema}>
                                                        <div className="flex items-center gap-2">
                                                            <Icon className={`w-4 h-4 ${themeConfig?.color || ''}`} />
                                                            <span>{tema}</span>
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    {form.errors.tema && (
                                        <p className="text-destructive text-xs mt-1">{form.errors.tema}</p>
                                    )}
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2">
                                    <Label htmlFor="deskripsi" className="flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                                        Deskripsi
                                    </Label>
                                    <Textarea
                                        id="deskripsi"
                                        value={form.data.deskripsi}
                                        onChange={(e) => form.setData('deskripsi', e.target.value)}
                                        rows={3}
                                    />
                                    {form.errors.deskripsi && (
                                        <p className="text-destructive text-xs mt-1">{form.errors.deskripsi}</p>
                                    )}
                                </div>

                                {/* Tingkat & Jurusan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tingkat" className="flex items-center gap-1.5">
                                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                                            Tingkat / Kelas
                                            <span className="text-destructive">*</span>
                                        </Label>
                                        <Select
                                            value={form.data.tingkat}
                                            onValueChange={(v) => form.setData('tingkat', v)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Tingkat" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tingkatOptions.map((t) => (
                                                    <SelectItem key={t} value={t.toString()}>
                                                        Kelas {t}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {form.errors.tingkat && (
                                            <p className="text-destructive text-xs mt-1">{form.errors.tingkat}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="jurusan_id" className="flex items-center gap-1.5">
                                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                                            Jurusan (opsional)
                                        </Label>
                                        <Select
                                            value={form.data.jurusan_id}
                                            onValueChange={(v) => form.setData('jurusan_id', v)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Semua Jurusan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Semua Jurusan</SelectItem>
                                                {jurusans.map((j) => (
                                                    <SelectItem key={j.id} value={j.id.toString()}>{j.nama}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {form.errors.jurusan_id && (
                                            <p className="text-destructive text-xs mt-1">{form.errors.jurusan_id}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Tanggal */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tanggal_mulai" className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            Tanggal Mulai
                                            <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="tanggal_mulai"
                                            type="date"
                                            value={form.data.tanggal_mulai}
                                            onChange={(e) => form.setData('tanggal_mulai', e.target.value)}
                                        />
                                        {form.errors.tanggal_mulai && (
                                            <p className="text-destructive text-xs mt-1">{form.errors.tanggal_mulai}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tanggal_selesai" className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            Tanggal Selesai
                                            <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="tanggal_selesai"
                                            type="date"
                                            value={form.data.tanggal_selesai}
                                            onChange={(e) => form.setData('tanggal_selesai', e.target.value)}
                                        />
                                        {form.errors.tanggal_selesai && (
                                            <p className="text-destructive text-xs mt-1">{form.errors.tanggal_selesai}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Dimensi */}
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-1.5">
                                        <Layers className="w-4 h-4 text-muted-foreground" />
                                        Dimensi P5
                                        <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {dimensiOptions.map((d) => {
                                            const isSelected = form.data.dimensi.includes(d.id);
                                            return (
                                                <button
                                                    key={d.id}
                                                    type="button"
                                                    onClick={() => toggleDimensi(d.id)}
                                                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                                                        isSelected
                                                            ? 'border-navy-500 bg-navy-50 dark:bg-navy-950/30 dark:border-navy-400 shadow-sm'
                                                            : 'border-border hover:border-muted-foreground/30 hover:bg-accent/50'
                                                    }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                        isSelected
                                                            ? 'bg-navy-500 text-white'
                                                            : 'bg-muted text-muted-foreground'
                                                    }`}>
                                                        <Check className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium text-foreground">{d.kode_dimensi}</div>
                                                        <div className="text-xs text-muted-foreground truncate">{d.nama_dimensi}</div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {form.errors.dimensi && (
                                        <p className="text-destructive text-xs mt-1">{form.errors.dimensi}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.get(route('erapor.p5.index'))}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={form.processing}>
                                        {form.processing ? 'Menyimpan...' : 'Simpan'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
