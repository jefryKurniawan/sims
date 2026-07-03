import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/inertia';
import { Trophy, Eye, Pencil } from 'lucide-react';
import AdminTable from '@/Components/AdminTable';
import type { Column } from '@/Components/AdminTable';
import ConfirmModal from '@/Components/ConfirmModal';
import { useState } from 'react';

export default function Index() {
    const { prestasis, filters = { jenis: '', tingkat: '', search: '' }, jenisList } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleFilter = (key: string, value: string) => {
        const params: Record<string, string> = { ...(filters || {}) };
        if (value) params[key] = value; else delete params[key];
        delete params.page;
        router.get(route('admin.prestasi.index'), params);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route('admin.prestasi.destroy', deleteTarget.id));
        setDeleteTarget(null);
    };

    const getJenisBadge = (jenis: string) => {
        return jenis === 'akademik'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-purple-100 text-purple-700';
    };

    const columns: Column[] = [
        {
            key: 'siswa',
            label: 'Siswa',
            render: (_v: any, row: any) => (
                <div className="font-medium text-gray-900">{row.siswa?.nama_lengkap || '-'}</div>
            ),
        },
        {
            key: 'jenis',
            label: 'Jenis',
            render: (v: string) => (
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getJenisBadge(v)}`}>
                    {v === 'akademik' ? 'Akademik' : 'Non-Akademik'}
                </span>
            ),
        },
        { key: 'prestasi', label: 'Prestasi' },
        { key: 'tingkat', label: 'Tingkat' },
        {
            key: 'tanggal',
            label: 'Tanggal',
            render: (v: string) => new Date(v).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
        },
    ];

    return (
        <>
            <Head title="Kelola Prestasi Siswa" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Kelola Prestasi Siswa</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Data prestasi akademik dan non-akademik siswa</p>
                    </div>
                    <Link
                        href={route('admin.prestasi.create')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm"
                    >
                        Prestasi Baru
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cari Prestasi</label>
                            <input
                                type="text"
                                placeholder="Nama prestasi..."
                                defaultValue={filters.search}
                                onBlur={(e) => handleFilter('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-school-red/20 focus:border-school-red"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
                            <select
                                value={filters.jenis}
                                onChange={(e) => handleFilter('jenis', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-school-red/20 focus:border-school-red"
                            >
                                <option value="">Semua</option>
                                {jenisList.map((jenis: string) => (
                                    <option key={jenis} value={jenis}>
                                        {jenis === 'akademik' ? 'Akademik' : 'Non-Akademik'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
                            <input
                                type="text"
                                placeholder="Contoh: Nasional, Provinsi..."
                                defaultValue={filters.tingkat}
                                onBlur={(e) => handleFilter('tingkat', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-school-red/20 focus:border-school-red"
                            />
                        </div>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={prestasis?.data || []}
                    pagination={{
                        current_page: prestasis?.current_page,
                        last_page: prestasis?.last_page,
                        per_page: prestasis?.per_page,
                        from: prestasis?.from,
                        to: prestasis?.to,
                        total: prestasis?.total,
                        links: prestasis?.links,
                    }}
                    actions={(row) => [
                        { icon: 'edit', onClick: () => router.visit(route('admin.prestasi.edit', row.id)), label: 'Edit' },
                        { icon: 'eye', onClick: () => router.visit(route('admin.prestasi.show', row.id)), label: 'Detail' },
                        { icon: 'delete', onClick: () => setDeleteTarget(row), label: 'Hapus' },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Prestasi"
                    message={`Yakin ingin menghapus prestasi "${deleteTarget?.prestasi || ''}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
