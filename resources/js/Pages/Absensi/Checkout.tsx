import { Head } from '@inertiajs/inertia-react';
import { useState, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/inertia-react';
import { Loader2, MapPin, CheckCircle, AlertCircle, XCircle, Home, LogOut, Info, Clock } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

interface Props {
    auth: { user: { name: string; email: string; role: string } } | null;
    settings: {
        absensi_gps_radius_km: number;
        sekolah_latitude: number;
        sekolah_longitude: number;
        absensi_jam_masuk: string;
        absensi_jam_pulang: string;
    };
    todayCheckin?: {
        jam_masuk: string;
        status_masuk: string;
        lat: number;
        lng: number;
    } | null;
}

export default function Checkout({ auth, settings, todayCheckin }: Props) {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [inRadius, setInRadius] = useState<boolean | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);

    const form = useForm({
        lat: '',
        lng: '',
    });

    const jamPulang = settings.absensi_jam_pulang || '14:00';
    const radiusKm = settings.absensi_gps_radius_km || 0.1;
    const sekolahLat = settings.sekolah_latitude || -6.123456;
    const sekolahLng = settings.sekolah_longitude || 106.123456;

    const haversine = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Browser tidak mendukung Geolocation');
            return;
        }

        setIsLocating(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const acc = pos.coords.accuracy;

                setLocation({ lat, lng });
                setAccuracy(acc);
                form.setData('lat', String(lat));
                form.setData('lng', String(lng));

                const dist = haversine(lat, lng, sekolahLat, sekolahLng);
                setDistance(dist);
                setInRadius(dist <= radiusKm);

                setIsLocating(false);
            },
            (err) => {
                setError(err.message === 'User denied Geolocation'
                    ? 'Izin lokasi ditolak. Aktifkan izin lokasi di browser.'
                    : 'Gagal mendapatkan lokasi: ' + err.message);
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) {
            setError('Lokasi belum didapatkan. Klik "Dapatkan Lokasi" dulu.');
            return;
        }
        form.post('/api/absensi/checkout', {
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    setCountdown(3);
                    const timer = setInterval(() => {
                        setCountdown((c) => {
                            if (c <= 1) {
                                clearInterval(timer);
                                window.location.href = '/absensi/status';
                                return 0;
                            }
                            return c - 1;
                        });
                    }, 1000);
                }
            },
            onError: (err) => {
                setError(err.message || 'Absen pulang gagal');
            },
        });
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        const interval = setInterval(getLocation, 30000);
        return () => clearInterval(interval);
    }, []);

    const now = new Date();
    const currentTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const currentDate = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const isEarlyLeave = currentTime < jamPulang;

    if (countdown > 0) {
        return (
            <>
                <Head title="Absen Pulang - Berhasil" />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
                    <Card className="w-full max-w-md text-center">
                        <CardContent className="py-12 px-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-green-800">Absen Pulang Berhasil!</h1>
                            <p className="text-green-600 mt-2">Mengalihkan ke halaman status dalam {countdown} detik...</p>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    if (!todayCheckin) {
        return (
            <>
                <Head title="Absen Pulang - Belum Absen Masuk" />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white p-4">
                    <Card className="w-full max-w-md text-center">
                        <CardContent className="py-12 px-6">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-10 h-10 text-orange-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-orange-800">Belum Absen Masuk</h1>
                            <p className="text-orange-600 mt-2">Anda harus absen masuk terlebih dahulu sebelum bisa absen pulang.</p>
                            <div className="mt-6 space-y-2">
                                <Link href="/absensi/checkin" className="block w-full">
                                    <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700">
                                        <LogOut className="w-5 h-5 mr-2" />
                                        Absen Masuk Dulu
                                    </Button>
                                </Link>
                                <Link href="/absensi/status" className="block w-full">
                                    <Button variant="ghost" className="w-full py-3">
                                        <Home className="w-5 h-5 mr-2" />
                                        Cek Status Absensi
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Absen Pulang - GPS Check-out" />
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
                <div className="max-w-md mx-auto p-4 pt-8 pb-16">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Clock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Absen Pulang</h1>
                        <p className="text-gray-500 mt-1">{currentDate}</p>
                        <p className="text-3xl font-mono font-bold text-orange-600 mt-2">{currentTime}</p>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                            <p className="font-medium text-blue-800">Absen Masuk: {todayCheckin.jam_masuk} ({todayCheckin.status_masuk === 'hadir' ? 'Hadir' : todayCheckin.status_masuk === 'terlambat' ? 'Terlambat' : todayCheckin.status_masuk})</p>
                        </div>
                        {isEarlyLeave && (
                            <Badge className="mt-2 inline-flex bg-yellow-100 text-yellow-800 text-sm" variant="secondary">
                                <Clock className="w-3 h-3 mr-1" />
                                Pulang Cepat (sebelum {jamPulang})
                            </Badge>
                        )}
                    </div>

                    <Card className="mb-6">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MapPin className="w-5 h-5 text-orange-600" />
                                Lokasi GPS
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            <Button
                                onClick={getLocation}
                                disabled={isLocating}
                                className="w-full py-3"
                                variant={isLocating ? 'secondary' : 'default'}
                            >
                                {isLocating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Mendapatkan Lokasi...
                                    </>
                                ) : location ? (
                                    <>
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Update Lokasi
                                    </>
                                ) : (
                                    <>
                                        <GPS className="w-5 h-5 mr-2" />
                                        Dapatkan Lokasi Saya
                                    </>
                                )}
                            </Button>

                            {location && (
                                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Latitude</p>
                                            <p className="font-mono font-medium">{location.lat.toFixed(6)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Longitude</p>
                                            <p className="font-mono font-medium">{location.lng.toFixed(6)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Akurasi</p>
                                            <p className="font-mono font-medium">{accuracy ? `±${Math.round(accuracy)}m` : '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Jarak ke Sekolah</p>
                                            <p className="font-mono font-medium text-lg text-green-600">
                                                {distance !== null ? (distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(3)}km`) : '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-3 p-3 rounded-lg ${
                                        inRadius === true ? 'bg-green-50 border border-green-200'
                                        : inRadius === false ? 'bg-red-50 border border-red-200'
                                        : 'bg-gray-50 border border-gray-200'
                                    }`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            inRadius === true ? 'bg-green-100'
                                            : inRadius === false ? 'bg-red-100'
                                            : 'bg-gray-100'
                                        }`}>
                                            {inRadius === true ? <CheckCircle className="w-5 h-5 text-green-600" />
                                                : inRadius === false ? <XCircle className="w-5 h-5 text-red-600" />
                                                : <Loader2 className="w-5 h-5 text-gray-500" />}
                                        </div>
                                        <div>
                                            <p className={`font-medium ${inRadius === true ? 'text-green-800' : inRadius === false ? 'text-red-800' : 'text-gray-700'}`}>
                                                {inRadius === true ? `Di dalam radius sekolah (${radiusKm}km)`
                                                    : inRadius === false ? `Di luar radius sekolah (${radiusKm}km)`
                                                    : 'Memeriksa...'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Status absen pulang: {inRadius === true ? (isEarlyLeave ? 'PULANG CEPAT' : 'HADIR') : 'ALPA (di luar radius)'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm">
                                <p className="font-medium text-orange-800 flex items-center gap-1">
                                    <Info className="w-4 h-4" />
                                    Radius sekolah: {radiusKm}km | Batas jam pulang: {jamPulang}
                                </p>
                                <p className="text-orange-700 mt-1">Pastikan GPS HP aktif & izin lokasi diberikan ke browser</p>
                            </div>
                        </CardContent>
                    </Card>

                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="lat" value={form.data.lat} />
                        <input type="hidden" name="lng" value={form.data.lng} />
                        <Button
                            type="submit"
                            className="w-full py-4 text-lg font-semibold bg-orange-600 hover:bg-orange-700"
                            disabled={!location || isLocating || form.processing}
                        >
                            {form.processing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Memproses...
                                </>
                            ) : inRadius === true ? (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    {isEarlyLeave ? 'Absen Pulang (PULANG CEPAT)' : 'Absen Pulang (HADIR)'}
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    Absen Pulang (ALPA - di luar radius)
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 space-y-2">
                        <Link href="/absensi/checkin" className="block w-full">
                            <Button variant="outline" className="w-full py-3">
                                <LogOut className="w-5 h-5 mr-2" />
                                Absen Masuk
                            </Button>
                        </Link>
                        <Link href="/absensi/status" className="block w-full">
                            <Button variant="ghost" className="w-full py-3">
                                <Home className="w-5 h-5 mr-2" />
                                Cek Status Absensi Hari Ini
                            </Button>
                        </Link>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-8">
                        Absensi Digital - Sistem Informasi Sekolah
                    </p>
                </div>
            </div>
        </>
    );
}