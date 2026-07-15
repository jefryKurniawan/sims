import { Head } from '@inertiajs/inertia-react';
import { useState, useCallback } from 'react';
import Link from '@inertiajs/inertia-react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { ChevronLeft, Save, CheckCircle2, AlertCircle, XCircle, Clock, Calendar, UserCheck, UserX, Loader2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/Components/ui/table';
import { Label } from '@/Components/ui/label';

interface Siswa {
    id: number;
    nama_lengkap: string;
    nisn: string;
    nis: string;
    absensi: {
        jam_masuk: string | null;
        jam_pulang: string | null;
        status_masuk: string;
        status_pulang: string;
        metode: string;
        keterangan: string | null;
    } | null;
}

interface Props {
    kelas: {
        id: number;
        nama_kelas: string;
        tingkat: string;
        jurusan: { nama: string } | null;
    };
    tanggal: string;
    siswa: Siswa[];
    statusOptions: string[];
    statusPulangOptions: string[];
    absensiExists: boolean;
}

export default function Kelas({ kelas, tanggal, siswa, statusOptions, statusPulangOptions, absensiExists }: Props) {
    const { flash } = usePage().props;
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm({
        tanggal,
        siswa: siswa.reduce((acc, s) => {
            acc[s.id] = {
                status_masuk: s.absensi?.status_masuk || 'alpa',
                status_pulang: s.absensi?.status_pulang || 'alpa',
                jam_masuk: s.absensi?.jam_masuk || '',
                jam_pulang: s.absensi?.jam_pulang || '',
                keterangan: s.absensi?.keterangan || '',
            };
            return acc;
        }, {} as Record<number, { status_masuk: string; status_pulang: string; jam_masuk: string; jam_pulang: string; keterangan: string }>),
    });

    const handleChange = useCallback((siswaId: number, field: string, value: string) => {
        form.setData('siswa', {
            ...form.data.siswa,
            [siswaId]: {
                ...form.data.siswa[siswaId],
                [field]: value,
            },
        });
    }, [form]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        form.post(`/dashboard/absensi/kelas/${kelas.id}`, {
            onSuccess: () => setIsSaving(false),
            onError: () => setIsSaving(false),
            onFinish: () => setIsSaving(false),
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
        hadir: <CheckCircle2 className="w-4 h-4 text-green-600" />,
        terlambat: <Clock className="w-4 h-4 text-yellow-600" />,
        izin: <Calendar className="w-4 h-4 text-blue-600" />,
        sakit: <AlertCircle className="w-4 h-4 text-purple-600" />,
        alpa: <XCircle className="w-4 h-4 text-red-600" />,
        pulang_cepat: <Clock className="w-4 h-4 text-orange-600" />,
    };

    return (
        <>
            <Head title={`Absensi ${kelas.nama_kelas} - ${new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/absensi" className="p-2 hover:bg-gray-100 rounded-lg transition">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Absensi: {kelas.nama_kelas} {kelas.jurusan && `- ${kelas.jurusan.nama}`}
                            </h1>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                {absensiExists && <span className="ml-2 text-sm font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">Sudah diisi</span>}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.location.href = `/dashboard/absensi/kelas/${kelas.id}/${new Date(tanggal).toISOString().split('T')[0]}`}>
                            <Calendar className="w-4 h-4 mr-2" />
                            Ganti Tanggal
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            <Save className="w-4 h-4 mr-2" />
                            Simpan Semua
                        </Button>
                    </div>
                </div>

                {/* Flash Messages */}
                {(flash.success || flash.error) && (
                    <div className={`p-4 rounded-lg ${flash.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`} role="alert">
                        {flash.success || flash.error}
                    </div>
                )}

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCheck className="w-5 h-5" />
                            Daftar Siswa ({siswa.length}) - Klik status untuk ubah
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-50 sticky top-0">
                                    <TableRow>
                                        <TableHead className="w-12 text-center">No</TableHead>
                                        <TableHead className="w-32">NISN / NIS</TableHead>
                                        <TableHead>Nama Siswa</TableHead>
                                        <TableHead className="w-48 text-center">Status Masuk</TableHead>
                                        <TableHead className="w-36 text-center">Jam Masuk</TableHead>
                                        <TableHead className="w-48 text-center">Status Pulang</TableHead>
                                        <TableHead className="w-36 text-center">Jam Pulang</TableHead>
                                        <TableHead className="w-64">Keterangan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {siswa.map((s, index) => (
                                        <TableRow key={s.id} className="hover:bg-gray-50 border-t">
                                            <TableCell className="text-center text-sm text-gray-500 font-medium">{index + 1}</TableCell>
                                            <TableCell className="text-sm">
                                                <div className="font-medium">{s.nisn}</div>
                                                <div className="text-xs text-gray-500">{s.nis}</div>
                                            </TableCell>
                                            <TableCell className="font-medium">{s.nama_lengkap}</TableCell>

                                            {/* Status Masuk */}
                                            <TableCell className="text-center">
                                                <Select
                                                    value={form.data.siswa[s.id]?.status_masuk || 'alpa'}
                                                    onValueChange={(v) => handleChange(s.id, 'status_masuk', v)}
                                                >
                                                    <SelectTrigger className={`w-full justify-center ${statusColors[form.data.siswa[s.id]?.status_masuk || 'alpa']}`}>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statusOptions.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                <div className="flex items-center gap-2">
                                                                    {statusIcons[opt]}
                                                                    <span>{statusLabels[opt]}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>

                                            {/* Jam Masuk */}
                                            <TableCell className="text-center">
                                                <Input
                                                    type="time"
                                                    value={form.data.siswa[s.id]?.jam_masuk || ''}
                                                    onChange={(e) => handleChange(s.id, 'jam_masuk', e.target.value)}
                                                    className="w-28 mx-auto text-center text-sm"
                                                    disabled={['izin', 'sakit', 'alpa'].includes(form.data.siswa[s.id]?.status_masuk || 'alpa')}
                                                />
                                            </TableCell>

                                            {/* Status Pulang */}
                                            <TableCell className="text-center">
                                                <Select
                                                    value={form.data.siswa[s.id]?.status_pulang || 'alpa'}
                                                    onValueChange={(v) => handleChange(s.id, 'status_pulang', v)}
                                                >
                                                    <SelectTrigger className={`w-full justify-center ${statusColors[form.data.siswa[s.id]?.status_pulang || 'alpa']}`}>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statusPulangOptions.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                <div className="flex items-center gap-2">
                                                                    {statusIcons[opt]}
                                                                    <span>{statusLabels[opt]}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>

                                            {/* Jam Pulang */}
                                            <TableCell className="text-center">
                                                <Input
                                                    type="time"
                                                    value={form.data.siswa[s.id]?.jam_pulang || ''}
                                                    onChange={(e) => handleChange(s.id, 'jam_pulang', e.target.value)}
                                                    className="w-28 mx-auto text-center text-sm"
                                                    disabled={['izin', 'sakit', 'alpa'].includes(form.data.siswa[s.id]?.status_pulang || 'alpa')}
                                                />
                                            </TableCell>

                                            {/* Keterangan */}
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    value={form.data.siswa[s.id]?.keterangan || ''}
                                                    onChange={(e) => handleChange(s.id, 'keterangan', e.target.value)}
                                                    placeholder="Alasan izin/sakit..."
                                                    className="text-sm"
                                                    disabled={!['izin', 'sakit'].includes(form.data.siswa[s.id]?.status_masuk || '') && !['izin', 'sakit'].includes(form.data.siswa[s.id]?.status_pulang || '')}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Link href="/dashboard/absensi" className="btn-secondary">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </Link>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700 px-6">
                        {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        <Save className="w-4 h-4 mr-2" />
                        Simpan Semua Absensi
                    </Button>
                </div>

                {/* Legend */}
                <Card className="mt-6">
                    <CardContent className="p-4">
                        <h4 className="font-medium mb-3">Keterangan Status:</h4>
                        <div className="flex flex-wrap gap-4 text-sm">
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