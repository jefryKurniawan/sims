import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

export default function Index() {
    const { dispensasi, siswa, flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [dispensasiId, setDispensasiId] = useState<number | null>(null);

    const form = useForm({
        siswa_id: '',
        jenis: 'potongan',
        nominal: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing && dispensasiId) {
            form.put(route('dispensasi.update', dispensasiId));
        } else {
            form.post(route('dispensasi.store'));
        }
        form.reset();
        setShowForm(false);
        setEditing(false);
        setDispensasiId(null);
    };

    return (
        <>
            <Head title="Dispensasi SPP" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Dispensasi SPP</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setShowForm(true);
                                setEditing(false);
                                form.reset();
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Tambah Dispensasi
                        </button>
                        <a
                            href={route('dispensasi.create')}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Tambah Baru (Halaman Baru)
                        </a>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                        {flash.error}
                    </div>
                )}

                {showForm && (
                    <div className="mb-6 bg-white rounded-lg border p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Siswa</label>
                                <select
                                    value={form.siswa_id}
                                    onChange={e => form.set('siswa_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Pilih Siswa</option>
                                    {siswa.map((s: any) => (
                                        <option key={s.id} value={s.id}>
                                            {s.nama_lengkap} ({s.nisn})
                                        </option>
                                    ))}
                                </select>
                                {!!form.errors.siswa_id && <p className="text-red-500 text-sm mt-1">{form.errors.siswa_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Dispensasi</label>
                                <select
                                    value={form.jenis}
                                    onChange={e => form.set('jenis', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="potongan">Potongan</option>
                                    <option value="penundaan">Penundaan</option>
                                </select>
                                {!!form.errors.jenis && <p className="text-red-500 text-sm mt-1">{form.errors.jenis}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nominal (Rp)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={form.nominal}
                                    onChange={e => form.set('nominal', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nominal dispensasi"
                                />
                                {!!form.errors.nominal && <p className="text-red-500 text-sm mt-1">{form.errors.nominal}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                                    <input
                                        type="date"
                                        value={form.tanggal_mulai}
                                        onChange={e => form.set('tanggal_mulai', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {!!form.errors.tanggal_mulai && <p className="text-red-500 text-sm mt-1">{form.errors.tanggal_mulai}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                                    <input
                                        type="date"
                                        value={form.tanggal_selesai}
                                        onChange={e => form.set('tanggal_selesai', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {!!form.errors.tanggal_selesai && <p className="text-red-500 text-sm mt-1">{form.errors.tanggal_selesai}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                                <textarea
                                    value={form.keterangan}
                                    onChange={e => form.set('keterangan', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                    placeholder="Keterangan tambahan"
                                />
                                {!!form.errors.keterangan && <p className="text-red-500 text-sm mt-1">{form.errors.keterangan}</p>}
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        form.reset();
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                    {editing ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-lg border overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Siswa</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jenis</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nominal</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Periode</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Keterangan</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {dispensasi.map((d: any) => (
                                <tr key={d.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {d.siswa?.nama_lengkap || 'Tidak Diketahui'}
                                        <br />
                                        <span className="text-xs text-gray-500">({d.siswa?.nisn || '-'})</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${d.jenis === 'potongan' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {d.jenis === 'potongan' ? 'Potongan' : 'Penundaan'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">Rp {parseFloat(d.nominal).toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {d.tanggal_mulai ? (
                                            <>
                                                {new Date(d.tanggal_mulai).toLocaleDateString('id-ID')}
                                                {d.tanggal_selesai ? ' - ' : ''}
                                                {d.tanggal_selesai ? (
                                                    new Date(d.tanggal_selesai).toLocaleDateString('id-ID')
                                                ) : ''}
                                            </>
                                        ) : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{d.keterangan || '-'}</td>
                                    <td className="px-4 py-3 text-center whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                setShowForm(true);
                                                setEditing(true);
                                                setDispensasiId(d.id);
                                                form.set('siswa_id', d.siswa_id);
                                                form.set('jenis', d.jenis);
                                                form.set('nominal', d.nominal);
                                                form.set('tanggal_mulai', d.tanggal_mulai);
                                                form.set('tanggal_selesai', d.tanggal_selesai);
                                                form.set('keterangan', d.keterangan);
                                            }}
                                            className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Yakin ingin menghapus dispensasi ini?')) {
                                                    Inertia.delete(route('dispensasi.destroy', d.id));
                                                }
                                            }}
                                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 ml-1"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {dispensasi.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-sm text-gray-500">
                                        Tidak ada data dispensasi
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
