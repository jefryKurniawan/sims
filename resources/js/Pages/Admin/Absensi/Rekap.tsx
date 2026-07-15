import { Head } from '@inertiajs/inertia-react';
import { useState, useMemo } from 'react';
import { useForm, Link } from '@inertiajs/inertia-react';
import { ChevronLeft, Download, Filter, Calendar, Users, CheckCircle2, Clock, AlertCircle, XCircle, Calendar as CalendarDays } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/Components/ui/table';

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
        meta: { current_page: number; last_page: number; total: number };
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

    const form = useForm({
        kelas_id: selectedKelas,
        tanggal_from: tanggalFrom,
        tanggal_to: tanggalTo,
        search,
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        form.get('/dashboard/absensi/rekap', {
            preserveScroll: true,
            onBefore: () => {},
        });
    };

    const handleExport = () => {
        setIsExporting(true);
        form.post('/dashboard/absensi/rekap/export', {
            onSuccess: () => setIsExporting(false),
            onError: () => setIsExporting(false),
            onFinish: () => setIsExporting(false),
        });
    };

    // Generate date columns
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

    const statusColors: Record<string, string> = {
        hadir: 'bg-green-100 text-green-800',
        terlambat: 'bg-yellow-100 text-yellow-800',
        izin: 'bg-blue-100 text-blue-800',
        sakit: 'bg-purple-100 text-purple-800',
        alpa: 'bg-red-100 text-red-800',
        pulang_cepat: 'bg-orange-100 text-orange-800',
        '-': 'bg-gray-100 text-gray-500',
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

    return (
        <>
            <Head title="Rekap Absensi" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link href="/dashboard/absensi" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2">
                            <ChevronLeft className="w-4 h-4" />
                            Kembali ke Absensi
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Rekap Absensi</h1>
                        <p className="text-gray-500 mt-1">Rekap kehadiran siswa per kelas & rentang tanggal</p>
                    </div>
                    <Button onClick={handleExport} disabled={isExporting} className="bg-blue-600 hover:bg-blue-700">
                        {isExporting ? <Download className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                        Export CSV
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500">Total Siswa</p>
                            <p className="text-3xl font-bold text-blue-600">{summary.total_siswa}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500">Total Hari</p>
                            <p className="text-3xl font-bold text-gray-900">{summary.total_hari}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-green-200">
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500">Hadir</p>
                            <p className="text-3xl font-bold text-green-600">{summary.hadir + summary.terlambat}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-yellow-200">
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500">Terlambat</p>
                            <p className="text-3xl font-bold text-yellow-600">{summary.terlambat}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-blue-200">
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500">Izin</p>
                            <p className="text-3xl font-bold text-blue-600">{summary.izin}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-purple-200">
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500">Sakit</p>
                            <p className="text-3xl font-bold text-purple-600">{summary.sakit}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-red-200">
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500">Alpa</p>
                            <p className="text-3xl font-bold text-red-600">{summary.alpa}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-emerald-200">
                        <CardContent className="p-4 text-center">
                            <p className="text-sm text-gray-500">% Kehadiran</p>
                            <p className="text-3xl font-bold text-emerald-600">{summary.persentase_kehadiran}%</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            Filter & Pencarian
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div>
                                <Label className="block text-sm font-medium mb-1">Kelas</Label>
                                <Select value={selectedKelas} onValueChange={(v) => { setSelectedKelas(v); form.setData('kelas_id', v); }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Kelas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Kelas</SelectItem>
                                        {kelasList.map((k) => (
                                            <SelectItem key={k.id} value={String(k.id)}>
                                                {k.nama_kelas} (Tingkat {k.tingkat})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-1">Tanggal Mulai</Label>
                                <Input
                                    type="date"
                                    value={tanggalFrom}
                                    onChange={(e) => { setTanggalFrom(e.target.value); form.setData('tanggal_from', e.target.value); }}
                                    max={tanggalTo}
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-1">Tanggal Selesai</Label>
                                <Input
                                    type="date"
                                    value={tanggalTo}
                                    onChange={(e) => { setTanggalTo(e.target.value); form.setData('tanggal_to', e.target.value); }}
                                    min={tanggalFrom}
                                />
                            </div>

                            <div>
                                <Label className="block text-sm font-medium mb-1">Cari Siswa</Label>
                                <Input
                                    type="text"
                                    placeholder="Nama / NISN / NIS"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); form.setData('search', e.target.value); }}
                                />
                            </div>

                            <div className="flex items-end">
                                <Button type="submit" className="w-full">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Terapkan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>
                                <Users className="w-5 h-5 inline mr-2" />
                                Data Kehadiran ({siswa.meta.total} siswa)
                            </span>
                            <span className="text-sm text-gray-500">
                                {tanggalFrom} s/d {tanggalTo} ({dateColumns.length} hari)
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-50 sticky top-0">
                                    <TableRow>
                                        <TableHead className="w-10 text-center">No</TableHead>
                                        <TableHead className="w-30">NISN</TableHead>
                                        <TableHead className="w-28">NIS</TableHead>
                                        <TableHead className="w-48">Nama</TableHead>
                                        <TableHead className="w-40">Kelas</TableHead>
                                        {dateColumns.map((d) => (
                                            <TableHead key={d} className="w-16 text-center">
                                                {new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })}
                                            </TableHead>
                                        ))}
                                        <TableHead className="w-20 text-center">Hadir</TableHead>
                                        <TableHead className="w-20 text-center">Terlambat</TableHead>
                                        <TableHead className="w-20 text-center">Izin</TableHead>
                                        <TableHead className="w-20 text-center">Sakit</TableHead>
                                        <TableHead className="w-20 text-center">Alpa</TableHead>
                                        <TableHead className="w-20 text-center">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {siswa.data.map((s, index) => {
                                        const absensiSiswa = absensiMap[s.id] || [];
                                        const counts = { hadir: 0, terlambat: 0, izin: 0, sakit: 0, alpa: 0 };

                                        return (
                                            <TableRow key={s.id} className="hover:bg-gray-50 border-t">
                                                <TableCell className="text-center text-sm text-gray-500 font-medium">
                                                    {(siswa.meta.current_page - 1) * siswa.meta.per_page + index + 1}
                                                </TableCell>
                                                <TableCell className="text-sm font-medium">{s.nisn}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{s.nis}</TableCell>
                                                <TableCell className="font-medium">{s.nama_lengkap}</TableCell>
                                                <TableCell className="text-sm">
                                                    <Badge variant="secondary">{s.kelasAktif?.kelas?.nama_kelas || '-'}</Badge>
                                                </TableCell>
                                                {dateColumns.map((date) => {
                                                    const a = absensiSiswa.find((ab: any) => ab.tanggal === date);
                                                    const status = a?.status_masuk || '-';
                                                    if (counts[status as keyof typeof counts] !== undefined) {
                                                        counts[status as keyof typeof counts]++;
                                                    }
                                                    return (
                                                        <TableCell key={date} className="text-center">
                                                            <Badge
                                                                variant="secondary"
                                                                className={`${statusColors[status]} font-normal py-1 px-2`}
                                                            >
                                                                {statusIcons[status]}
                                                                <span className="text-xs">{status === '-' ? '-' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
                                                            </Badge>
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell className="text-center font-medium text-green-700">{counts.hadir}</TableCell>
                                                <TableCell className="text-center font-medium text-yellow-700">{counts.terlambat}</TableCell>
                                                <TableCell className="text-center font-medium text-blue-700">{counts.izin}</TableCell>
                                                <TableCell className="text-center font-medium text-purple-700">{counts.sakit}</TableCell>
                                                <TableCell className="text-center font-medium text-red-700">{counts.alpa}</TableCell>
                                                <TableCell className="text-center font-bold">
                                                    {counts.hadir + counts.terlambat + counts.izin + counts.sakit + counts.alpa}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {siswa.links.length > 1 && (
                            <div className="px-4 py-3 border-t flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Menampilkan {((siswa.meta.current_page - 1) * 20) + 1} - {Math.min(siswa.meta.current_page * 20, siswa.meta.total)} dari {siswa.meta.total} siswa
                                </p>
                                <div className="flex gap-1">
                                    {siswa.links.map((link, i) => (
                                        <Button
                                            key={i}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && form.get(link.url, { preserveScroll: true })}
                                        >
                                            {link.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Legend */}
                <Card className="mt-6">
                    <CardContent className="p-4">
                        <h4 className="font-medium mb-3">Keterangan:</h4>
                        <div className="flex flex-wrap gap-3 text-sm">
                            {Object.entries(statusLabels).map(([key, label]) => (
                                <Badge key={key} variant="secondary" className={`gap-1 ${statusColors[key]}`}>
                                    {statusIcons[key]}
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

const statusLabels: Record<string, string> = {
    hadir: 'Hadir',
    terlambat: 'Terlambat',
    izin: 'Izin',
    sakit: 'Sakit',
    alpa: 'Alpa',
    pulang_cepat: 'Pulang Cepat',
};

const statusColors: Record<string, string> = {
    hadir: 'bg-green-100 text-green-800',
    terlambat: 'bg-yellow-100 text-yellow-800',
    izin: 'bg-blue-100 text-blue-800',
    sakit: 'bg-purple-100 text-purple-800',
    alpa: 'bg-red-100 text-red-800',
    pulang_cepat: 'bg-orange-100 text-orange-800',
    '-': 'bg-gray-100 text-gray-500',
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