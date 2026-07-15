import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useForm, Link } from '@inertiajs/inertia-react';
import { ChevronLeft, Calendar, Download, Filter, Users, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/Components/ui/table';

interface Props {
    guru: {
        data: Array<{
            id: number;
            nama_lengkap: string;
            nip: string;
            mapel: string | null;
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: { current_page: number; last_page: number; total: number; per_page: number };
    };
    filters: { tanggal: string; search: string };
    absensiMap: Record<number, {
        jam_masuk: string | null;
        jam_pulang: string | null;
        status_masuk: string;
        status_pulang: string;
    }>;
    today: string;
}

export default function GuruIndex({ guru, filters, absensiMap, today }: Props) {
    const [tanggal, setTanggal] = useState(filters.tanggal || today);
    const [search, setSearch] = useState(filters.search || '');
    const [isExporting, setIsExporting] = useState(false);

    const form = useForm({
        tanggal,
        search,
    });

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        form.get('/dashboard/absensi/guru', {
            preserveScroll: true,
        });
    };

    const handleExport = () => {
        setIsExporting(true);
        form.post('/dashboard/absensi/guru/export', {
            onSuccess: () => setIsExporting(false),
            onError: () => setIsExporting(false),
            onFinish: () => setIsExporting(false),
        });
    };

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
    };

    const statusIcons: Record<string, React.ReactNode> = {
        hadir: <CheckCircle className="w-3 h-3" />,
        terlambat: <Clock className="w-3 h-3" />,
        izin: <Calendar className="w-3 h-3" />,
        sakit: <AlertCircle className="w-3 h-3" />,
        alpa: <XCircle className="w-3 h-3" />,
        pulang_cepat: <Clock className="w-3 h-3" />,
    };

    return (
        <>
            <Head title="Absensi Guru" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link href="/dashboard/absensi" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2">
                            <ChevronLeft className="w-4 h-4" />
                            Kembali ke Absensi
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Absensi Guru</h1>
                        <p className="text-gray-500 mt-1">Rekap kehadiran guru per tanggal</p>
                    </div>
                    <Button onClick={handleExport} disabled={isExporting} className="bg-blue-600 hover:bg-blue-700">
                        {isExporting ? <Download className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                        Export CSV
                    </Button>
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
                        <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tanggal</label>
                                <Input
                                    type="date"
                                    value={tanggal}
                                    onChange={(e) => { setTanggal(e.target.value); form.setData('tanggal', e.target.value); }}
                                    max={today}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Cari Guru</label>
                                <Input
                                    type="text"
                                    placeholder="Nama / NIP / Mapel"
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
                                Data Kehadiran Guru ({guru.meta.total} guru)
                            </span>
                            <span className="text-sm text-gray-500">
                                Tanggal: {new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-50 sticky top-0">
                                    <TableRow>
                                        <TableHead className="w-10 text-center">No</TableHead>
                                        <TableHead className="w-24">NIP</TableHead>
                                        <TableHead>Nama Guru</TableHead>
                                        <TableHead className="w-40">Mata Pelajaran</TableHead>
                                        <TableHead className="w-48 text-center">Status Masuk</TableHead>
                                        <TableHead className="w-36 text-center">Jam Masuk</TableHead>
                                        <TableHead className="w-48 text-center">Status Pulang</TableHead>
                                        <TableHead className="w-36 text-center">Jam Pulang</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {guru.data.map((g, index) => {
                                        const absensi = absensiMap[g.id];
                                        return (
                                            <TableRow key={g.id} className="hover:bg-gray-50 border-t">
                                                <TableCell className="text-center text-sm text-gray-500 font-medium">
                                                    {(guru.meta.current_page - 1) * guru.meta.per_page + index + 1}
                                                </TableCell>
                                                <TableCell className="text-sm font-medium">{g.nip}</TableCell>
                                                <TableCell className="font-medium">{g.nama_lengkap}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{g.mapel || '-'}</TableCell>
                                                <TableCell className="text-center">
                                                    {absensi ? (
                                                        <Badge variant="secondary" className={`${statusColors[absensi.status_masuk]} font-normal py-1 px-2`}>
                                                            {statusIcons[absensi.status_masuk]}
                                                            <span className="text-xs">{statusLabels[absensi.status_masuk]}</span>
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                                                            <span className="text-xs">-</span>
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center text-sm text-gray-600 font-mono">
                                                    {absensi?.jam_masuk || '-'}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {absensi ? (
                                                        <Badge variant="secondary" className={`${statusColors[absensi.status_pulang]} font-normal py-1 px-2`}>
                                                            {statusIcons[absensi.status_pulang]}
                                                            <span className="text-xs">{statusLabels[absensi.status_pulang]}</span>
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                                                            <span className="text-xs">-</span>
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center text-sm text-gray-600 font-mono">
                                                    {absensi?.jam_pulang || '-'}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {guru.links.length > 1 && (
                            <div className="px-4 py-3 border-t flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Menampilkan {((guru.meta.current_page - 1) * 20) + 1} - {Math.min(guru.meta.current_page * 20, guru.meta.total)} dari {guru.meta.total} guru
                                </p>
                                <div className="flex gap-1">
                                    {guru.links.map((link, i) => (
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