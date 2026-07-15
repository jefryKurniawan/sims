import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';
import Link from '@inertiajs/inertia-react';
import { Calendar, ArrowRight, Users, Clock, CheckCircle, AlertCircle, XCircle, HelpCircle, ChevronDown, Search, Download } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/Components/ui/table';

export default function Index({ kelasList, today }) {
    const [selectedKelas, setSelectedKelas] = useState('');
    const [selectedTanggal, setSelectedTanggal] = useState(today);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedKelas) {
            alert('Pilih kelas terlebih dahulu');
            return;
        }
        window.location.href = `/dashboard/absensi/kelas/${selectedKelas}/${selectedTanggal}`;
    };

    const statusColors = {
        hadir: 'bg-green-100 text-green-800',
        terlambat: 'bg-yellow-100 text-yellow-800',
        izin: 'bg-blue-100 text-blue-800',
        sakit: 'bg-purple-100 text-purple-800',
        alpa: 'bg-red-100 text-red-800',
    };

    return (
        <>
            <Head title="Absensi Digital" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Absensi Digital</h1>
                        <p className="text-gray-500 mt-1">
                            Pencatatan kehadiran siswa manual & GPS check-in
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/dashboard/absensi/rekap" className="btn-secondary">
                            <Download className="w-4 h-4 mr-2" />
                            Rekap & Export
                        </Link>
                        <Link href="/dashboard/absensi/guru" className="btn-secondary">
                            <Users className="w-4 h-4 mr-2" />
                            Absensi Guru
                        </Link>
                    </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Kelas</p>
                                    <p className="text-2xl font-bold">{kelasList.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Tanggal Hari Ini</p>
                                    <p className="text-2xl font-bold">{new Date(today).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Metode Absensi</p>
                                    <p className="text-2xl font-bold">Manual + GPS</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">PWA Ready</p>
                                    <p className="text-2xl font-bold">✓</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Form Pilih Kelas & Tanggal */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Pilih Kelas & Tanggal
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Kelas</label>
                                <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="-- Pilih Kelas --" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kelasList.map((kelas: any) => (
                                            <SelectItem key={kelas.id} value={kelas.id}>
                                                {kelas.nama_kelas} (Tingkat {kelas.tingkat})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                                <Input
                                    type="date"
                                    value={selectedTanggal}
                                    onChange={(e) => setSelectedTanggal(e.target.value)}
                                    max={today}
                                />
                            </div>

                            <div className="flex items-end">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    <ArrowRight className="w-4 h-4 mr-2" />
                                    Buka Form Absensi
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <HelpCircle className="w-5 h-5" />
                            Cara Penggunaan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">1</span>
                            </div>
                            <div>
                                <p className="font-medium">Pilih Kelas & Tanggal</p>
                                <p className="text-sm text-gray-500">Pilih kelas yang akan diabsen dan tanggalnya (default hari ini)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">2</span>
                            </div>
                            <div>
                                <p className="font-medium">Isi Absensi Manual</p>
                                <p className="text-sm text-gray-500">Guru/Wali kelas pilih status per siswa: Hadir, Terlambat, Izin, Sakit, Alpa. Klik "Simpan Semua"</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">3</span>
                            </div>
                            <div>
                                <p className="font-medium">GPS Check-in (Siswa/Guru)</p>
                                <p className="text-sm text-gray-500">Siswa buka web di HP → klik "Absen Masuk" → GPS auto-capture → status otomatis berdasarkan radius & jam</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">4</span>
                            </div>
                            <div>
                                <p className="font-medium">Lihat Rekap</p>
                                <p className="text-sm text-gray-500">Filter per kelas, rentang tanggal, cari nama → export CSV/Excel untuk rapor & BK</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings Hint */}
                <Card className="border-amber-200 bg-amber-50">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-amber-900">Pengaturan Absensi</h4>
                                <p className="text-sm text-amber-800 mt-1">
                                    Atur radius GPS sekolah, koordinat sekolah, jam masuk/pulang di
                                    <Link href="/dashboard/settings/konfigurasi" className="underline hover:text-amber-700 font-medium">
                                        Settings → Konfigurasi Web → Tab Absensi
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}