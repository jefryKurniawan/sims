import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layout/AdminLayout';

export default function Create() {
    const { data: pageData } = usePage().props;
    const { siswa } = pageData;
    const { data, setData, post, processing, errors, reset } = useForm({
        siswa_id: '',
        jenis: 'potongan',
        nominal: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        keterangan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('dispensasi.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout title="Dispensasi SPP - Tambah">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Tambah Dispensasi Baru</h1>
                    <Link
                        href={route('dispensasi.index')}
                        className="inline-block px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 mt-2"
                    >
                        Kembali ke Daftar Dispensasi
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Siswa</label>
                        <select
                            value={data.siswa_id}
                            onChange={e => setData('siswa_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="">Pilih Siswa</option>
                            {siswa?.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.nama_lengkap} ({s.nisn})
                                </option>
                            ))}
                        </select>
                        {errors.siswa_id && <span className="text-red-600 text-sm">{errors.siswa_id}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Jenis Dispensasi</label>
                        <select
                            value={data.jenis}
                            onChange={e => setData('jenis', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="potongan">Potongan</option>
                            <option value="penundaan">Penundaan</option>
                        </select>
                        {errors.jenis && <span className="text-red-600 text-sm">{errors.jenis}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Nominal (Rp)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.nominal}
                            onChange={e => setData('nominal', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            placeholder="Nominal dispensasi"
                        />
                        {errors.nominal && <span className="text-red-600 text-sm">{errors.nominal}</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tanggal Mulai</label>
                            <input
                                type="date"
                                value={data.tanggal_mulai}
                                onChange={e => setData('tanggal_mulai', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                            {errors.tanggal_mulai && <span className="text-red-600 text-sm">{errors.tanggal_mulai}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Tanggal Selesai</label>
                            <input
                                type="date"
                                value={data.tanggal_selesai}
                                onChange={e => setData('tanggal_selesai', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                            {errors.tanggal_selesai && <span className="text-red-600 text-sm">{errors.tanggal_selesai}</span>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Keterangan</label>
                        <textarea
                            value={data.keterangan}
                            onChange={e => setData('keterangan', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            rows={3}
                            placeholder="Keterangan tambahan"
                        />
                        {errors.keterangan && <span className="text-red-600 text-sm">{errors.keterangan}</span>}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Batal
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Dispensasi'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
