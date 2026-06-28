import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Index() {
    const { data } = usePage().props;
    const { dispensasi, siswa, flash } = data;
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
            put(route('dispensasi.update', dispensasiId), form);
        } else {
            post(route('dispensasi.store'), form);
        }
        form.reset();
        setShowForm(false);
        setEditing(false);
        setDispensasiId(null);
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Dispensasi SPP</h1>
                {data.flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                        {data.flash.success}
                    </div>
                )}
                {data.flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
                        {data.flash.error}
                    </div>
                )}
            </div>

            <div className="mb-4">
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditing(false);
                        form.reset();
                    }}
                    className="btn btn-primary"
                >
                    Tambah Dispensasi
                </button>
                <Link
                    href={route('dispensasi.create')}
                    passThroughProps={{ className: 'btn btn-secondary ml-2' }}
                >
                    Tambah Baru (Halaman Baru)
                </Link>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Siswa</label>
                            <select
                                value={form.siswa_id}
                                onChange={e => form.set('siswa_id', e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih Siswa</option>
                                {siswa.map((s: any) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nama} ({s.nisn})
                                    </option>
                                ))}
                            </select>
                            {!!form.errors.siswa_id && <span className="text-error text-sm">{form.errors.siswa_id}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Jenis Dispensasi</label>
                            <select
                                value={form.jenis}
                                onChange={e => form.set('jenis', e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="potongan">Potongan</option>
                                <option value="penundaan">Penundaan</option>
                            </select>
                            {!!form.errors.jenis && <span className="text-error text-sm">{form.errors.jenis}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Nominal (Rp)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.nominal}
                                onChange={e => form.set('nominal', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nominal dispensasi"
                            />
                            {!!form.errors.nominal && <span className="text-error text-sm">{form.errors.nominal}</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Tanggal Mulai</label>
                                <input
                                    type="date"
                                    value={form.tanggal_mulai}
                                    onChange={e => form.set('tanggal_mulai', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {!!form.errors.tanggal_mulai && <span className="text-error text-sm">{form.errors.tanggal_mulai}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Tanggal Selesai</label>
                                <input
                                    type="date"
                                    value={form.tanggal_selesai}
                                    onChange={e => form.set('tanggal_selesai', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {!!form.errors.tanggal_selesai && <span className="text-error text-sm">{form.errors.tanggal_selesai}</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Keterangan</label>
                            <textarea
                                value={form.keterangan}
                                onChange={e => form.set('keterangan', e.target.value)}
                                className="textarea textarea-bordered w-full"
                                rows={3}
                                placeholder="Keterangan tambahan"
                            />
                            {!!form.errors.keterangan && <span className="text-error text-sm">{form.errors.keterihan}</span>}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    form.reset();
                                }}
                                className="btn btn-outline"
                            >
                                Batal
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editing ? 'Update' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Siswa</th>
                            <th>Jenis</th>
                            <th>Nominal</th>
                            <th>Periode</th>
                            <th>Keterangan</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dispensasi.map((d: any) => (
                            <tr key={d.id}>
                                <td>
                                    {d.siswa?.nama || 'Tidak Diketahui'}
                                    <br />
                                    <span className="text-xs text-muted-foreground">({d.siswa?.nisn || '-'})</span>
                                </td>
                                <td>
                                    <span
                                        className={`badge ${d.jenis === 'potongan' ? 'badge-error' : 'badge-warning'}`}
                                    >
                                        {d.jenis === 'potongan' ? 'Potongan' : 'Penundaan'}
                                    </span>
                                </td>
                                <td>Rp {parseFloat(d.nominal).toLocaleString('id-ID')}</td>
                                <td>
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
                                <td>{d.keterangan || '-'}</td>
                                <td className="text-center whitespace-nowrap">
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
                                        className="btn btn-xs btn-outline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Yakin ingin menghapus dispensasi ini?')) {
                                                delete(route('dispensasi.destroy', d.id));
                                            }
                                        }}
                                        className="btn btn-xs btn-error"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {dispensasi.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Tidak ada data dispensasi
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}