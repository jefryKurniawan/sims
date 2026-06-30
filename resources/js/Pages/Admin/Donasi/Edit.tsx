import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { ArrowLeft, Save } from 'lucide-react';

interface Alumni {
    id: number;
    user: { name: string };
    tahun_lulus: number;
}

interface Donasi {
    id: number;
    alumni_id: number | null;
    nama_pendonor: string;
    email: string | null;
    no_telp: string | null;
    nominal: number;
    metode_pembayaran: string;
    status: 'pending' | 'verified' | 'rejected';
    tanggal_donasi: string;
    keterangan: string | null;
    anonym: boolean;
    alumni: Alumni | null;
}

interface Props {
    donasi: Donasi;
    alumis: Alumni[];
}

export default function Edit({ donasi, alumis }: Props) {
    const { data, setData, put, errors, processing, reset } = useForm({
        alumni_id: donasi.alumni_id?.toString() || '',
        nama_pendonor: donasi.nama_pendonor,
        email: donasi.email || '',
        no_telp: donasi.no_telp || '',
        nominal: donasi.nominal.toString(),
        metode_pembayaran: donasi.metode_pembayaran,
        tanggal_donasi: donasi.tanggal_donasi,
        keterangan: donasi.keterangan || '',
        anonym: donasi.anonym,
        status: donasi.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.donasi.update', donasi.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Edit Donasi" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-4xl mx-auto px-6 py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.donasi.index')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Edit Donasi</h1>
                                <p className="text-gray-600 text-sm mt-1">Perbarui data donasi</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Alumni */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Alumni (Opsional)
                                </label>
                                <select
                                    value={data.alumni_id}
                                    onChange={(e) => setData('alumni_id', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="">-- Tidak terkait alumni --</option>
                                    {alumis.map((al) => (
                                        <option key={al.id} value={al.id}>
                                            {al.user.name} (Angkatan {al.tahun_lulus})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Nama Pendonor */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Pendonor <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_pendonor}
                                    onChange={(e) => setData('nama_pendonor', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Nama lengkap pendonor"
                                />
                                {errors.nama_pendonor && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nama_pendonor}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="email@contoh.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* No Telepon */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    No. Telepon
                                </label>
                                <input
                                    type="text"
                                    value={data.no_telp}
                                    onChange={(e) => setData('no_telp', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="08123456789"
                                />
                                {errors.no_telp && (
                                    <p className="text-red-500 text-sm mt-1">{errors.no_telp}</p>
                                )}
                            </div>

                            {/* Nominal */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nominal Donasi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={data.nominal}
                                    onChange={(e) => setData('nominal', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="100000"
                                    min="0"
                                />
                                {errors.nominal && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nominal}</p>
                                )}
                            </div>

                            {/* Metode Pembayaran */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Metode Pembayaran <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.metode_pembayaran}
                                    onChange={(e) => setData('metode_pembayaran', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="transfer">Transfer Bank</option>
                                    <option value="cash">Cash</option>
                                    <option value="dana">DANA</option>
                                    <option value="ovo">OVO</option>
                                    <option value="gopay">GoPay</option>
                                    <option value="bca">BCA</option>
                                    <option value="bri">BRI</option>
                                    <option value="mandiri">MANDIRI</option>
                                </select>
                                {errors.metode_pembayaran && (
                                    <p className="text-red-500 text-sm mt-1">{errors.metode_pembayaran}</p>
                                )}
                            </div>

                            {/* Tanggal Donasi */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tanggal Donasi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_donasi}
                                    onChange={(e) => setData('tanggal_donasi', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                {errors.tanggal_donasi && (
                                    <p className="text-red-500 text-sm mt-1">{errors.tanggal_donasi}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="verified">Verified</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                )}
                            </div>

                            {/* Anonym */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="anonym"
                                    checked={data.anonym}
                                    onChange={(e) => setData('anonym', e.target.checked)}
                                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="anonym" className="text-sm font-semibold text-gray-700">
                                    Donor Anonym (nama tidak ditampilkan publik)
                                </label>
                            </div>

                            {/* Keterangan */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Keterangan
                                </label>
                                <textarea
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Catatan tambahan tentang donasi..."
                                />
                                {errors.keterangan && (
                                    <p className="text-red-500 text-sm mt-1">{errors.keterangan}</p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
                            <Link
                                href={route('admin.donasi.index')}
                                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition font-semibold disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Menyimpan...' : 'Update Donasi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}