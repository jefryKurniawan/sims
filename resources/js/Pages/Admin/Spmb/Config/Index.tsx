import { useForm, usePage, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';

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
        if (!config.aktif) return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Nonaktif</span>;
        if (now < buka) return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Akan Datang</span>;
        if (now > tutup) return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">Ditutup</span>;
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">Aktif</span>;
    };

    return (
        <AdminLayout title="Konfigurasi SPMB">
            <div className="p-6">
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

                <div className="mb-4">
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setEditing(false);
                            form.reset();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                    >
                        Tambah Konfigurasi
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tahun Ajaran</label>
                                <input
                                    type="text"
                                    value={form.data.tahun_ajaran}
                                    onChange={e => form.set('tahun_ajaran', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    placeholder="2025/2026"
                                />
                                {form.errors.tahun_ajaran && <span className="text-red-600 text-sm">{form.errors.tahun_ajaran}</span>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tanggal Buka</label>
                                    <input
                                        type="date"
                                        value={form.data.tanggal_buka}
                                        onChange={e => form.set('tanggal_buka', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    {form.errors.tanggal_buka && <span className="text-red-600 text-sm">{form.errors.tanggal_buka}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tanggal Tutup</label>
                                    <input
                                        type="date"
                                        value={form.data.tanggal_tutup}
                                        onChange={e => form.set('tanggal_tutup', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    {form.errors.tanggal_tutup && <span className="text-red-600 text-sm">{form.errors.tanggal_tutup}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Kuota Reguler</label>
                                    <input
                                        type="number"
                                        value={form.data.kuota_reguler}
                                        onChange={e => form.set('kuota_reguler', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    {form.errors.kuota_reguler && <span className="text-red-600 text-sm">{form.errors.kuota_reguler}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Kuota Afirmasi</label>
                                    <input
                                        type="number"
                                        value={form.data.kuota_afirmasi}
                                        onChange={e => form.set('kuota_afirmasi', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    {form.errors.kuota_afirmasi && <span className="text-red-600 text-sm">{form.errors.kuota_afirmasi}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Kuota Prestasi</label>
                                    <input
                                        type="number"
                                        value={form.data.kuota_prestasi}
                                        onChange={e => form.set('kuota_prestasi', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    {form.errors.kuota_prestasi && <span className="text-red-600 text-sm">{form.errors.kuota_prestasi}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Biaya Pendaftaran (Rp)</label>
                                <input
                                    type="number"
                                    value={form.data.biaya_pendaftaran}
                                    onChange={e => form.set('biaya_pendaftaran', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                                {form.errors.biaya_pendaftaran && <span className="text-red-600 text-sm">{form.errors.biaya_pendaftaran}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="aktif"
                                    checked={form.data.aktif}
                                    onChange={e => form.set('aktif', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="aktif" className="text-sm font-medium">Aktif</label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => { setShowForm(false); form.reset(); }}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
                                >
                                    Batal
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium" disabled={form.processing}>
                                    {editing ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun Ajaran</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kuota (R/A/P)</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biaya</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {configs.map((c: any) => (
                                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3 font-semibold">{c.tahun_ajaran}</td>
                                    <td className="px-4 py-3">
                                        {new Date(c.tanggal_buka).toLocaleDateString('id-ID')} - {new Date(c.tanggal_tutup).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-4 py-3">{c.kuota_reguler} / {c.kuota_afirmasi} / {c.kuota_prestasi}</td>
                                    <td className="px-4 py-3">Rp {Number(c.biaya_pendaftaran).toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-3">{getStatusBadge(c)}</td>
                                    <td className="px-4 py-3 text-center whitespace-nowrap space-x-1">
                                        <button onClick={() => handleEdit(c)} className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50">Edit</button>
                                        <button onClick={() => handleDelete(c.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {configs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-4 text-center text-gray-500">Tidak ada data konfigurasi</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
