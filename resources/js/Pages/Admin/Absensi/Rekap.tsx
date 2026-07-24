import { Head } from '@inertiajs/inertia-react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/inertia-react';
import {
    ChevronLeft, Download, Filter, Users,
    CheckCircle2, Clock, AlertCircle, XCircle, CalendarDays, TrendingUp,
    RotateCcw, X, Calendar, Search, HelpCircle,
} from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/Components/ui/table';

// ── Shared constants ──
const statusLabels: Record<string, string> = {
    hadir: 'Hadir',
    terlambat: 'Terlambat',
    izin: 'Izin',
    sakit: 'Sakit',
    alpa: 'Alpa',
    pulang_cepat: 'Pulang Cepat',
};

const statusColors: Record<string, string> = {
    hadir: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    terlambat: 'bg-amber-50 text-amber-700 border-amber-200',
    izin: 'bg-sky-50 text-sky-700 border-sky-200',
    sakit: 'bg-violet-50 text-violet-700 border-violet-200',
    alpa: 'bg-rose-50 text-rose-700 border-rose-200',
    pulang_cepat: 'bg-orange-50 text-orange-700 border-orange-200',
    '-': 'bg-muted/50 text-muted-foreground',
};

const statusIcons: Record<string, React.ReactNode> = {
    hadir: <CheckCircle2 className="w-3 h-3" />,
    terlambat: <Clock className="w-3 h-3" />,
    izin: <CalendarDays className="w-3 h-3" />,
    sakit: <AlertCircle className="w-3 h-3" />,
    alpa: <XCircle className="w-3 h-3" />,
    pulang_cepat: <Clock className="w-3 h-3" />,
    '-': null,
};

interface Props {
    siswa: {
        data: Array<{
            id: number;
            nama_lengkap: string;
            nisn: string;
            nis: string;
            kelasAktif: { kelas: { nama_kelas: string } } | null;
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: { kelas_id: string; tanggal_from: string; tanggal_to: string; search: string };
    kelasList: Array<{ id: number; nama_kelas: string; tingkat: string }>;
    absensiMap: Record<number, Array<{
        tanggal: string;
        status_masuk: string;
        status_pulang: string;
    }>>;
    tanggalRange: [string, string];
    summary: {
        total_siswa: number;
        total_hari: number;
        expected_records: number;
        actual_records: number;
        hadir: number;
        terlambat: number;
        izin: number;
        sakit: number;
        alpa: number;
        persentase_kehadiran: number;
    };
}

export default function Rekap({ siswa, filters, kelasList, absensiMap, tanggalRange, summary }: Props) {
    const [tanggalFrom, setTanggalFrom] = useState(filters.tanggal_from || tanggalRange[0]);
    const [tanggalTo, setTanggalTo] = useState(filters.tanggal_to || tanggalRange[1]);
    const [selectedKelas, setSelectedKelas] = useState(filters.kelas_id || '');
    const [search, setSearch] = useState(filters.search || '');
    const [isExporting, setIsExporting] = useState(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);

    const form = useForm({
        kelas_id: selectedKelas,
        tanggal_from: tanggalFrom,
        tanggal_to: tanggalTo,
        search,
    });

    // ── Entrance animations ──
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
            }
            gsap.fromTo('.summary-card', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.2)' });
            if (filterRef.current) {
                gsap.fromTo(filterRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.3 });
            }
            if (tableRef.current) {
                gsap.fromTo(tableRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.5 });
            }
            const dataRows = document.querySelectorAll('.data-row');
            if (dataRows.length > 0) {
                gsap.fromTo(dataRows, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25, stagger: 0.03, ease: 'power2.out', delay: 0.65 });
            }
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const dataRows = document.querySelectorAll('.data-row');
            if (dataRows.length > 0) {
                gsap.fromTo(dataRows, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.02, ease: 'power2.out' });
            }
        });
        return () => ctx.revert();
    }, [siswa.data]);

    useEffect(() => {
        const btn = document.querySelector('[data-export-btn]');
        if (isExporting && btn) {
            gsap.to(btn, { scale: 1.03, duration: 0.4, repeat: -1, yoyo: true, ease: 'power1.inOut' });
        } else if (!isExporting && btn) {
            gsap.killTweensOf(btn);
            gsap.set(btn, { scale: 1 });
        }
    }, [isExporting]);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        form.get('/dashboard/absensi/rekap', { preserveScroll: true });
    };

    const handleExport = () => {
        setIsExporting(true);
        form.post('/dashboard/absensi/rekap/export', {
            onSuccess: () => setIsExporting(false),
            onError: () => setIsExporting(false),
            onFinish: () => setIsExporting(false),
        });
    };

    const dateColumns = useMemo(() => {
        const cols: string[] = [];
        const start = new Date(tanggalFrom);
        const end = new Date(tanggalTo);
        const current = new Date(start);
        while (current <= end) {
            cols.push(current.toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
        }
        return cols;
    }, [tanggalFrom, tanggalTo]);

    const summaryCards = [
        { label: 'Total Siswa', value: summary.total_siswa, icon: Users, color: 'from-blue-500/10 to-blue-600/5 text-blue-600' },
        { label: 'Total Hari', value: summary.total_hari, icon: CalendarDays, color: 'from-slate-500/10 to-slate-600/5 text-foreground' },
        { label: 'Hadir', value: summary.hadir + summary.terlambat, icon: CheckCircle2, color: 'from-emerald-500/10 to-emerald-600/5 text-emerald-600' },
        { label: 'Terlambat', value: summary.terlambat, icon: Clock, color: 'from-amber-500/10 to-amber-600/5 text-amber-600' },
        { label: 'Izin', value: summary.izin, icon: CalendarDays, color: 'from-sky-500/10 to-sky-600/5 text-sky-600' },
        { label: 'Sakit', value: summary.sakit, icon: AlertCircle, color: 'from-violet-500/10 to-violet-600/5 text-violet-600' },
        { label: 'Alpa', value: summary.alpa, icon: XCircle, color: 'from-rose-500/10 to-rose-600/5 text-rose-600' },
        { label: '% Kehadiran', value: `${summary.persentase_kehadiran}%`, icon: TrendingUp, color: 'from-teal-500/10 to-teal-600/5 text-teal-600' },
    ];

    // ── Shared cell style for identity columns (sticky left) ──
    const stickyClass = 'sticky bg-card';
    const stickyNoClass = 'sticky left-0 z-10 bg-card';
    const stickyNisnClass = 'sticky left-[40px] z-10 bg-card';
    const stickyNisClass = 'sticky left-[136px] z-10 bg-card';
    const stickyNamaClass = 'sticky left-[216px] z-10 bg-card';
    const stickyKelasClass = 'sticky left-[384px] z-10 bg-card';

    // ── Pagination button style map ──
    const btnClass = (active: boolean) => active
        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
        : 'bg-muted text-foreground hover:bg-muted/80';

    return (
        <>
            <Head title="Rekap Absensi" />

            <div className="space-y-6">
                {/* ── Header ── */}
                <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link
                            href="/dashboard/absensi"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Kembali ke Absensi
                        </Link>
                        <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading tracking-tight">
                            Rekap Absensi
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Rekap kehadiran siswa per kelas &amp; rentang tanggal
                        </p>
                    </div>
                    <Button
                        onClick={handleExport}
                        disabled={isExporting}
                        data-export-btn
                    >
                        {isExporting ? (
                            <Download className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Download className="w-4 h-4 mr-2" />
                        )}
                        Export CSV
                    </Button>
                </div>

                {/* ── Summary Cards ── */}
                <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {summaryCards.map((card, idx) => (
                        <Card
                            key={idx}
                            className={`summary-card bg-gradient-to-br ${card.color.split(' text-')[0]} border-border/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default`}
                        >
                            <CardContent className="p-3.5 text-center">
                                <card.icon className={`w-5 h-5 mx-auto mb-1.5 ${card.color.split(' ').pop()}`} />
                                <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                                    {card.label}
                                </p>
                                <p className={`text-xl font-bold ${card.color.split(' ').pop()} mt-0.5`}>
                                    {card.value}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* ── Filter ── */}
                <div ref={filterRef}>
                    <Card className="bg-card border-border shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Filter className="w-5 h-5 text-muted-foreground" />
                                    Filter & Pencarian
                                </CardTitle>
                                {/* Active filters indicator */}
                                {(selectedKelas || tanggalFrom !== filters.tanggal_from || tanggalTo !== filters.tanggal_to || search) && (
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                                        <span className="font-medium text-foreground">Filter aktif:</span>
                                        {selectedKelas && (
                                            <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-[10px]">
                                                <Users className="w-2.5 h-2.5" /> Kelas
                                            </Badge>
                                        )}
                                        {(tanggalFrom !== filters.tanggal_from || tanggalTo !== filters.tanggal_to) && (
                                            <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-[10px]">
                                                <Calendar className="w-2.5 h-2.5" /> Tanggal
                                            </Badge>
                                        )}
                                        {search && (
                                            <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-[10px]">
                                                <Search className="w-2.5 h-2.5" /> Cari
                                            </Badge>
                                        )}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedKelas('');
                                                setTanggalFrom(filters.tanggal_from || tanggalRange[0]);
                                                setTanggalTo(filters.tanggal_to || tanggalRange[1]);
                                                setSearch('');
                                                form.setData('kelas_id', '');
                                                form.setData('tanggal_from', filters.tanggal_from || tanggalRange[0]);
                                                form.setData('tanggal_to', filters.tanggal_to || tanggalRange[1]);
                                                form.setData('search', '');
                                            }}
                                            className="h-6 px-2 py-0 text-muted-foreground hover:text-foreground"
                                            title="Reset semua filter"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFilter} className="space-y-4">
                                {/* Quick date presets */}
                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-foreground">Cepat:</span>
                                    {[
                                        { label: 'Hari ini', from: new Date().toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] },
                                        { label: 'Minggu ini', from: (() => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); return d.toISOString().split('T')[0]; })(), to: new Date().toISOString().split('T')[0] },
                                        { label: 'Bulan ini', from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], to: new Date().toISOString().split('T')[0] },
                                    ].map((p) => (
                                        <Button
                                            key={p.label}
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setTanggalFrom(p.from);
                                                setTanggalTo(p.to);
                                                form.setData('tanggal_from', p.from);
                                                form.setData('tanggal_to', p.to);
                                            }}
                                            className="h-7 px-2.5 text-[11px] gap-1 border-border/60 hover:border-primary/50 hover:text-primary"
                                        >
                                            {p.label}
                                        </Button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            Kelas
                                        </Label>
                                        <Select value={selectedKelas} onValueChange={(v) => { setSelectedKelas(v); form.setData('kelas_id', v); }}>
                                            <SelectTrigger><SelectValue placeholder="Semua Kelas" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">Semua Kelas</SelectItem>
                                                {kelasList.map((k) => (<SelectItem key={k.id} value={String(k.id)}>{k.nama_kelas} (Tingkat {k.tingkat})</SelectItem>))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            Tanggal Mulai
                                        </Label>
                                        <Input type="date" value={tanggalFrom} onChange={(e) => { setTanggalFrom(e.target.value); form.setData('tanggal_from', e.target.value); }} max={tanggalTo} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            Tanggal Selesai
                                        </Label>
                                        <Input type="date" value={tanggalTo} onChange={(e) => { setTanggalTo(e.target.value); form.setData('tanggal_to', e.target.value); }} min={tanggalFrom} />
                                    </div>
                                    <div className="space-y-1.5 relative">
                                        <Label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                            <Search className="w-4 h-4 text-muted-foreground" />
                                            Cari Siswa
                                        </Label>
                                        <Input
                                            type="text"
                                            placeholder="Nama / NISN / NIS"
                                            value={search}
                                            onChange={(e) => { setSearch(e.target.value); form.setData('search', e.target.value); }}
                                            className="pl-9"
                                        />
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <Button type="submit" className="flex-1 transition-all duration-200">
                                            <Filter className="w-4 h-4 mr-2" />Terapkan
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedKelas('');
                                                setTanggalFrom(filters.tanggal_from || tanggalRange[0]);
                                                setTanggalTo(filters.tanggal_to || tanggalRange[1]);
                                                setSearch('');
                                                form.setData('kelas_id', '');
                                                form.setData('tanggal_from', filters.tanggal_from || tanggalRange[0]);
                                                form.setData('tanggal_to', filters.tanggal_to || tanggalRange[1]);
                                                form.setData('search', '');
                                            }}
                                            className="h-10 px-3"
                                            title="Reset filter"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1.5">
                                    <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span>Pencarian mencocokkan <strong>nama lengkap</strong>, <strong>NISN</strong>, atau <strong>NIS</strong>. Gunakan filter tanggal untuk membatasi rentang rekap.</span>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                {/* ── Data Table ── */}
                <div ref={tableRef}>
                    <Card className="bg-card border-border shadow-sm overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center justify-between text-base">
                                <span className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-muted-foreground" />
                                    Data Kehadiran ({siswa.total} siswa)
                                </span>
                                <span className="text-sm text-muted-foreground font-normal">
                                    {tanggalFrom} s/d {tanggalTo} ({dateColumns.length} hari)
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table className="w-full border-collapse table-fixed">
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            {/* Sticky identity headers */}
                                            <TableHead className="sticky left-0 z-20 bg-muted/30 w-[40px] text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider h-10 border-r border-b border-border">No</TableHead>
                                            <TableHead className="sticky left-[40px] z-20 bg-muted/30 w-[96px] text-[10px] font-semibold text-muted-foreground uppercase tracking-wider h-10 border-r border-b border-border">NISN</TableHead>
                                            <TableHead className="sticky left-[136px] z-20 bg-muted/30 w-[80px] text-[10px] font-semibold text-muted-foreground uppercase tracking-wider h-10 border-r border-b border-border">NIS</TableHead>
                                            <TableHead className="sticky left-[216px] z-20 bg-muted/30 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider h-10 border-r border-b border-border w-[168px]">Nama</TableHead>
                                            <TableHead className="sticky left-[384px] z-20 bg-muted/30 w-[96px] text-[10px] font-semibold text-muted-foreground uppercase tracking-wider h-10 border-r border-b border-border">Kelas</TableHead>
                                            {/* Date column headers */}
                                            {dateColumns.map((d) => (
                                                <TableHead key={d} className="w-[52px] text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider h-10 border-b border-border">
                                                    {new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })}
                                                </TableHead>
                                            ))}
                                            {/* Summary headers — slightly tinted */}
                                            <TableHead className="w-[44px] text-center text-[10px] font-semibold text-emerald-600 border-b border-border">H</TableHead>
                                            <TableHead className="w-[44px] text-center text-[10px] font-semibold text-amber-600 border-b border-border">T</TableHead>
                                            <TableHead className="w-[44px] text-center text-[10px] font-semibold text-sky-600 border-b border-border">I</TableHead>
                                            <TableHead className="w-[44px] text-center text-[10px] font-semibold text-violet-600 border-b border-border">S</TableHead>
                                            <TableHead className="w-[44px] text-center text-[10px] font-semibold text-rose-600 border-b border-border">A</TableHead>
                                            <TableHead className="w-[44px] text-center text-[10px] font-semibold text-foreground border-b border-border">Tot</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {siswa.data.length > 0 ? (
                                            siswa.data.map((s, index) => {
                                                const absensiSiswa = absensiMap[s.id] || [];
                                                const counts = { hadir: 0, terlambat: 0, izin: 0, sakit: 0, alpa: 0 };
                                                const isEven = ((siswa.current_page - 1) * siswa.per_page + index) % 2 === 0;

                                                return (
                                                    <TableRow key={s.id} className={`data-row border-b border-border/60 transition-colors ${isEven ? 'bg-card' : 'bg-muted/15'}`}>
                                                        {/* Sticky identity cells */}
                                                        <TableCell className="sticky left-0 z-10 bg-inherit text-center text-[11px] text-muted-foreground font-medium border-r border-border/60">
                                                            {(siswa.current_page - 1) * siswa.per_page + index + 1}
                                                        </TableCell>
                                                        <TableCell className="sticky left-[40px] z-10 bg-inherit text-xs font-mono tracking-tight border-r border-border/60">{s.nisn}</TableCell>
                                                        <TableCell className="sticky left-[136px] z-10 bg-inherit text-xs text-muted-foreground font-mono border-r border-border/60">{s.nis}</TableCell>
                                                        <TableCell className="sticky left-[216px] z-10 bg-inherit font-medium text-foreground text-xs border-r border-border/60 whitespace-nowrap">{s.nama_lengkap}</TableCell>
                                                        <TableCell className="sticky left-[384px] z-10 bg-inherit text-[11px] border-r border-border/60">
                                                            <Badge className="bg-muted/50 text-muted-foreground border border-border text-[11px]">
                                                                {s.kelasAktif?.kelas?.nama_kelas || '-'}
                                                            </Badge>
                                                        </TableCell>
                                                        {/* Date cells */}
                                                        {dateColumns.map((date) => {
                                                            const a = absensiSiswa.find((ab: any) => ab.tanggal === date);
                                                            const status = a?.status_masuk || '-';
                                                            if (counts[status as keyof typeof counts] !== undefined) counts[status as keyof typeof counts]++;
                                                            return (
                                                                <TableCell key={date} className="text-center p-1">
                                                                    {status === '-' && !a ? (
                                                                        <span className="text-muted-foreground/40 text-[10px]">-</span>
                                                                    ) : (
                                                                        <Badge className={`inline-flex items-center gap-0.5 border ${statusColors[status]} font-normal py-0.5 px-1 text-[10px]`}>
                                                                            {statusIcons[status]}
                                                                            {statusLabels[status] || '-'}
                                                                        </Badge>
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        })}
                                                        {/* Summary cells */}
                                                        <TableCell className="text-center text-[11px] font-semibold text-emerald-600">{counts.hadir || '-'}</TableCell>
                                                        <TableCell className="text-center text-[11px] font-semibold text-amber-600">{counts.terlambat || '-'}</TableCell>
                                                        <TableCell className="text-center text-[11px] font-semibold text-sky-600">{counts.izin || '-'}</TableCell>
                                                        <TableCell className="text-center text-[11px] font-semibold text-violet-600">{counts.sakit || '-'}</TableCell>
                                                        <TableCell className="text-center text-[11px] font-semibold text-rose-600">{counts.alpa || '-'}</TableCell>
                                                        <TableCell className="text-center text-[11px] font-bold">{counts.hadir + counts.terlambat + counts.izin + counts.sakit + counts.alpa || '-'}</TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={dateColumns.length + 11} className="text-center py-16 text-muted-foreground">
                                                    <Users className="w-10 h-10 mx-auto mb-2 text-muted-foreground/30" />
                                                    <p className="text-sm">Belum ada data absensi.</p>
                                                    <p className="text-xs text-muted-foreground/60 mt-1">Silakan pilih kelas dan filter.</p>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* ── Pagination ── */}
                            {siswa.links.length > 1 && (
                                <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Menampilkan {((siswa.current_page - 1) * 20) + 1} - {Math.min(siswa.current_page * 20, siswa.total)} dari {siswa.total} siswa
                                    </p>
                                    <div className="flex gap-1">
                                        {siswa.links.map((link, i) => (
                                            <Button
                                                key={i}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && form.get(link.url, { preserveScroll: true })}
                                                className={`text-xs px-3 h-8 transition-all duration-150 ${btnClass(link.active)}`}
                                            >
                                                {link.label.replace('&laquo;', '\u2039').replace('&raquo;', '\u203A').replace('&amp;', '&')}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* ── Legend ── */}
                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground mb-3 text-sm">Keterangan Status:</h4>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {Object.entries(statusLabels).map(([key, label]) => (
                                <Badge key={key} className={`inline-flex items-center gap-1.5 border ${statusColors[key]} text-xs py-1 px-2`}>
                                    {statusIcons[key]}{label}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
