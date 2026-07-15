import { Head } from '@inertiajs/inertia-react';
import Link from '@inertiajs/inertia-react';
import { Clock, CheckCircle, AlertCircle, XCircle, Calendar, MapPin, Home, User, LogOut, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

interface AbsensiToday {
    jam_masuk: string | null;
    jam_pulang: string | null;
    status_masuk: string;
    status_pulang: string;
    metode: string;
    keterangan: string | null;
    lat: number | null;
    lng: number | null;
}

interface Props {
    auth: { user: { name: string; email: string; role: string; siswa_id?: number } } | null;
    settings: {
        absensi_gps_radius_km: number;
        sekolah_latitude: number;
        sekolah_longitude: number;
        absensi_jam_masuk: string;
        absensi_jam_pulang: string;
    };
    todayCheckin?: AbsensiToday | null;
    canCheckin: boolean;
    canCheckout: boolean;
}

const statusLabels: Record<string, string> = {
    hadir: 'Hadir',
    terlambat: 'Terlambat',
    izin: 'Izin',
    sakit: 'Sakit',
    alpa: 'Alpa',
    pulang_cepat: 'Pulang Cepat',
    '-': 'Belum Absen',
};

const statusColors: Record<string, string> = {
    hadir: 'bg-green-100 text-green-800 border-green-200',
    terlambat: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    izin: 'bg-blue-100 text-blue-800 border-blue-200',
    sakit: 'bg-purple-100 text-purple-800 border-purple-200',
    alpa: 'bg-red-100 text-red-800 border-red-200',
    pulang_cepat: 'bg-orange-100 text-orange-800 border-orange-200',
    '-': 'bg-gray-100 text-gray-500 border-gray-200',
};

const statusIcons: Record<string, React.ReactNode> = {
    hadir: <CheckCircle className="w-4 h-4" />,
    terlambat: <Clock className="w-4 h-4" />,
    izin: <Calendar className="w-4 h-4" />,
    sakit: <AlertCircle className="w-4 h-4" />,
    alpa: <XCircle className="w-4 h-4" />,
    pulang_cepat: <Clock className="w-4 h-4" />,
    '-': null,
};

export default function Status({ auth, settings, todayCheckin, canCheckin, canCheckout }: Props) {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const currentDate = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const isSiswa = auth?.user?.role === 'Siswa';

    return (
        <>
            <Head title="Status Absensi Hari Ini" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-md mx-auto p-4 pt-8 pb-16">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Status Absensi</h1>
                        <p className="text-gray-500 mt-1">{currentDate}</p>
                        <p className="text-3xl font-mono font-bold text-indigo-600 mt-2">{currentTime}</p>
                        {isSiswa && auth?.user?.siswa_id && (
                            <p className="text-sm text-gray-400 mt-1">NIS: {auth.user.siswa_id}</p>
                        )}
                    </div>

                    {/* Absen Masuk Card */}
                    <Card className="mb-4">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <LogOut className="w-5 h-5 text-blue-600" />
                                Absen Masuk
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className={`p-4 rounded-lg border ${statusColors[todayCheckin?.status_masuk || '-']}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {statusIcons[todayCheckin?.status_masuk || '-']}
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <p className="font-semibold text-lg capitalize">{statusLabels[todayCheckin?.status_masuk || '-']}</p>
                                        </div>
                                    </div>
                                    {todayCheckin?.jam_masuk && (
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Jam Masuk</p>
                                            <p className="font-mono font-bold text-xl">{todayCheckin.jam_masuk}</p>
                                        </div>
                                    )}
                                </div>
                                {todayCheckin?.keterangan && todayCheckin.status_masuk !== 'hadir' && todayCheckin.status_masuk !== 'terlambat' && (
                                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                                        <p className="font-medium">Keterangan:</p>
                                        <p>{todayCheckin.keterangan}</p>
                                    </div>
                                )}
                                {todayCheckin?.metode && (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                        <GPS className="w-4 h-4" />
                                        <span>Metode: {todayCheckin.metode === 'gps' ? 'GPS Check-in' : 'Manual'}</span>
                                    </div>
                                )}
                            </div>

                            {canCheckin && isSiswa && (
                                <Link href="/absensi/checkin" className="block">
                                    <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700">
                                        <GPS className="w-5 h-5 mr-2" />
                                        Absen Masuk Sekarang
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>

                    {/* Absen Pulang Card */}
                    <Card className="mb-4">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Clock className="w-5 h-5 text-orange-600" />
                                Absen Pulang
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className={`p-4 rounded-lg border ${statusColors[todayCheckin?.status_pulang || '-']}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {statusIcons[todayCheckin?.status_pulang || '-']}
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <p className="font-semibold text-lg capitalize">{statusLabels[todayCheckin?.status_pulang || '-']}</p>
                                        </div>
                                    </div>
                                    {todayCheckin?.jam_pulang && (
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Jam Pulang</p>
                                            <p className="font-mono font-bold text-xl">{todayCheckin.jam_pulang}</p>
                                        </div>
                                    )}
                                </div>
                                {todayCheckin?.keterangan && todayCheckin.status_pulang !== 'hadir' && todayCheckin.status_pulang !== 'pulang_cepat' && (
                                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                                        <p className="font-medium">Keterangan:</p>
                                        <p>{todayCheckin.keterangan}</p>
                                    </div>
                                )}
                                {todayCheckin?.metode && (
                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                        <GPS className="w-4 h-4" />
                                        <span>Metode: {todayCheckin.metode === 'gps' ? 'GPS Check-in' : 'Manual'}</span>
                                    </div>
                                )}
                            </div>

                            {canCheckout && isSiswa && todayCheckin?.jam_masuk && (
                                <Link href="/absensi/checkout" className="block">
                                    <Button className="w-full py-3 bg-orange-600 hover:bg-orange-700">
                                        <Clock className="w-5 h-5 mr-2" />
                                        Absen Pulang Sekarang
                                    </Button>
                                </Link>
                            )}

                            {canCheckout && isSiswa && !todayCheckin?.jam_masuk && (
                                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Absen masuk dulu sebelum bisa absen pulang</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Lokasi GPS Info */}
                    {(todayCheckin?.lat && todayCheckin?.lng) && (
                        <Card className="mb-4">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MapPin className="w-5 h-5 text-gray-600" />
                                    Lokasi GPS Terekam
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-gray-500">Latitude</p>
                                        <p className="font-mono font-medium">{todayCheckin.lat.toFixed(6)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Longitude</p>
                                        <p className="font-mono font-medium">{todayCheckin.lng.toFixed(6)}</p>
                                    </div>
                                </div>
                                <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-500">
                                    Koordinat sekolah: {settings.sekolah_latitude}, {settings.sekolah_longitude} | Radius: {settings.absensi_gps_radius_km}km
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    <div className="space-y-2">
                        <Link href="/absensi/checkin" className="block">
                            <Button variant="outline" className="w-full py-3">
                                <GPS className="w-5 h-5 mr-2" />
                                Absen Masuk
                            </Button>
                        </Link>
                        <Link href="/absensi/checkout" className="block">
                            <Button variant="outline" className="w-full py-3">
                                <Clock className="w-5 h-5 mr-2" />
                                Absen Pulang
                            </Button>
                        </Link>
                        {isSiswa && (
                            <Link href="/dashboard/absensi" className="block">
                                <Button variant="ghost" className="w-full py-3">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Kembali ke Dashboard
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Refresh Button */}
                    <div className="mt-6 text-center">
                        <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Refresh Status
                        </Button>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-8">
                        Absensi Digital - Sistem Informasi Sekolah
                    </p>
                </div>
            </div>
        </>
    );
}