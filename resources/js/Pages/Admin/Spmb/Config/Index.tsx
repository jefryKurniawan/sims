import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Index() {
    const { data } = usePage().props;
    const { configs, flash } = data;
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [configId, setConfigId] = useState<number | null>(null);

    const form = useForm({
        tahun_ajaran: '',
        tanggal_buka: '',
        tanggal_tutup: '',
        kuota_reguler: '',
        kuota_afirmasi: '',
        kuota_prestasi: '',
        biaya_pendaftaran: '',
        aktif: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing && configId) {
            form.put(route('spmb.config.update', configId), {
                onSuccess: () => {
                    form.reset();
                    setShowForm(false);
                    setEditing(false);
                    setConfigId(null);
                },
            });
        } else {
            form.post(route('spmb.config.store'), {
                onSuccess: () => {
                    form.reset();
                    setShowForm(false);
                },
            });
        }
    };

    const handleEdit = (c: any) => {
        setShowForm(true);
        setEditing(true);
        setConfigId(c.id);
        form.set('tahun_ajaran', c.tahun_ajaran);
        form.set('tanggal_buka', c.tanggal_buka?.substring(0, 10));
        form.set('tanggal_tutup', c.tanggal_tutup?.substring(0, 10));
        form.set('kuota_reguler', c.kuota_reguler);
        form.set('kuota_afirmasi', c.kuota_afirmasi);
        form.set('kuota_prestasi', c.kuota_prestasi);
        form.set('biaya_pendaftaran', c.biaya_pendaftaran);
        form.set('aktif', c.aktif);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Yakin ingin menghapus konfigurasi ini?')) {
            form.delete(route('spmb.config.destroy', id));
        }
    };

    const getStatusBadge = (config: any) => {
        const now = new Date();
        const buka = new Date(config.tanggal_buka);
        const tutup = new Date(config.tanggal_tutup);
        if (!config.aktif) return <span className="badge badge-neutral">Nonaktif</span>;
        if (now < buka) return <span className="badge badge-info">Akan Datang</span>;
        if (now > tutup) return <span className="badge badge-warning">Ditutup</span>;
        return <span className="badge badge-success">Aktif</span>;
    };

    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Konfigurasi SPMB</h1>
                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-lg">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
                        {flash.error}
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
                    Tambah Konfigurasi
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tahun Ajaran</label>
                            <input
                                type="text"
                                value={form.data.tahun_ajaran}
                                onChange={e => form.set('tahun_ajaran', e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="2025/2026"
                            />
                            {form.errors.tahun_ajaran && <span className="text-error text-sm">{form.errors.tahun_ajaran}</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Tanggal Buka</label>
                                <input
                                    type="date"
                                    value={form.data.tanggal_buka}
                                    onChange={e => form.set('tanggal_buka', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {form.errors.tanggal_buka && <span className="text-error text-sm">{form.errors.tanggal_buka}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Tanggal Tutup</label>
                                <input
                                    type="date"
                                    value={form.data.tanggal_tutup}
                                    onChange={e => form.set('tanggal_tutup', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {form.errors.tanggal_tutup && <span className="text-error text-sm">{form.errors.tanggal_tutup}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Kuota Reguler</label>
                                <input
                                    type="number"
                                    value={form.data.kuota_reguler}
                                    onChange={e => form.set('kuota_reguler', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {form.errors.kuota_reguler && <span className="text-error text-sm">{form.errors.kuota_reguler}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Kuota Afirmasi</label>
                                <input
                                    type="number"
                                    value={form.data.kuota_afirmasi}
                                    onChange={e => form.set('kuota_afirmasi', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {form.errors.kuota_afirmasi && <span className="text-error text-sm">{form.errors.kuota_afirmasi}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Kuota Prestasi</label>
                                <input
                                    type="number"
                                    value={form.data.kuota_prestasi}
                                    onChange={e => form.set('kuota_prestasi', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                                {form.errors.kuota_prestasi && <span className="text-error text-sm">{form.errors.kuota_prestasi}</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Biaya Pendaftaran (Rp)</label>
                            <input
                                type="number"
                                value={form.data.biaya_pendaftaran}
                                onChange={e => form.set('biaya_pendaftaran', e.target.value)}
                                className="input input-bordered w-full"
                            />
                            {form.errors.biaya_pendaftaran && <span className="text-error text-sm">{form.errors.biaya_pendaftaran}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="aktif"
                                checked={form.data.aktif}
                                onChange={e => form.set('aktif', e.target.checked)}
                                className="checkbox checkbox-primary"
                            />
                            <label htmlFor="aktif" className="text-sm font-medium">Aktif</label>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => { setShowForm(false); form.reset(); }}
                                className="btn btn-outline"
                            >
                                Batal
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={form.processing}>
                                {editing ? 'Update' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Tahun Ajaran</th>
                            <th>Periode</th>
                            <th>Kuota (R/A/P)</th>
                            <th>Biaya</th>
                            <th>Status</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {configs.map((c: any) => (
                            <tr key={c.id}>
                                <td className="font-semibold">{c.tahun_ajaran}</td>
                                <td>
                                    {new Date(c.tanggal_buka).toLocaleDateString('id-ID')} - {new Date(c.tanggal_tutup).toLocaleDateString('id-ID')}
                                </td>
                                <td>{c.kuota_reguler} / {c.kuota_afirmasi} / {c.kuota_prestasi}</td>
                                <td>Rp {Number(c.biaya_pendaftaran).toLocaleString('id-ID')}</td>
                                <td>{getStatusBadge(c)}</td>
                                <td className="text-center whitespace-nowrap">
                                    <button onClick={() => handleEdit(c)} className="btn btn-xs btn-outline mr-1">Edit</button>
                                    <button onClick={() => handleDelete(c.id)} className="btn btn-xs btn-error">Hapus</button>
                                </td>
                            </tr>
                        ))}
                        {configs.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-4">Tidak ada data konfigurasi</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
