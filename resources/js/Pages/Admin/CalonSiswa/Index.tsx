import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/inertia';
import { Edit, Trash, Plus } from 'lucide-react';
import AdminTable from '@/Components/AdminTable';
import type { Column } from '@/Components/AdminTable';
import ConfirmModal from '@/Components/ConfirmModal';
import { useState } from 'react';

export default function Index() {
    const { calonSiswa, filters = { search: '', status: '' }, flash = {} } = usePage().props as any;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);

    const handleFilter = (key: string, value: string) => {
        const params: Record<string, string> = { ...(filters || {}) };
        if (value) params[key] = value; else delete params[key];
        delete params.page;
        router.get(route('ppdb.index'), params);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route('ppdb.destroy', deleteTarget.id));
        setDeleteTarget(null);
    };

    const columns: Column[] = [
        {
            key: 'no_urut',
            label: 'No',
            render: (_v: any, row: any, index: number) => (
                (calonSiswa?.current_page - 1) * (calonSiswa?.per_page || 1) + index + 1
            ),
        },
        { key: 'nisn', label: 'NISN' },
        {
            key: 'nama_lengkap',
            label: 'Nama Lengkap',
            render: (_v: any, row: any) => (
                <div>
                    <div className="font-medium">{row.nama_lengkap}</div>
                    <div className="text-xs text-gray-500">{row.no_hp || '-'}</div>
                </div>
            ),
        },
        { key: 'asal_sekolah', label: 'Asal Sekolah' },
        {
            key: 'status',
            label: 'Status',
            render: (v: string) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    v === 'pendaftaran' ? 'bg-yellow-100 text-yellow-700' :
                    v === 'seleksi' ? 'bg-blue-100 text-blue-700' :
                    v === 'lulus' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                }`}>
                    {v === 'pendaftaran' ? 'Pendaftaran' :
                    v === 'seleksi' ? 'Seleksi' :
                    v === 'lulus' ? 'Lulus' :
                    'Tidak Lulus'}
                </span>
            ),
        },
        {
            key: 'keputusan',
            label: 'Keputusan',
            render: (v: string) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    v === 'belum' ? 'bg-gray-100 text-gray-700' :
                    v === 'diterima' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                }`}>
                    {v === 'belum' ? 'Belum' :
                    v === 'diterima' ? 'Diterima' :
                    'Ditolak'}
                </span>
            ),
        },
        {
            key: 'tanggal_daftar',
            label: 'Tanggal Daftar',
            render: (v: any) => v?.format('d M Y') || '-',
        },
    ];

    return (
        <>
            <Head title="SPMB - Calon Siswa" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">SPMB - Calon Siswa</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Kelola daftar calon siswa</p>
                    </div>
                    <Link
                        href={route('ppdb.create')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm"
                    >
                        Calon Siswa Baru
                    </Link>
                </div>

                {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
                            <input
                                type="text"
                                placeholder="Nama, NISN, atau No HP..."
                                defaultValue={filters.search}
                                onBlur={(e) => handleFilter('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-school-red/20 focus:border-school-red"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilter('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-school-red/20 focus:border-school-red"
                            >
                                <option value="">Semua Status</option>
                                <option value="pendaftaran">Pendaftaran</option>
                                <option value="seleksi">Seleksi</option>
                                <option value="lulus">Lulus</option>
                                <option value="tidak_lulus">Tidak Lulus</option>
                            </select>
                        </div>
                        <div className="flex items-end gap-2">
                            <button
                                onClick={() => handleFilter('search', '')}
                                className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700"
                            >
                                Filter
                            </button>
                            <Link
                                href={route('ppdb.index')}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Reset
                            </Link>
                        </div>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={calonSiswa?.data || []}
                    pagination={{
                        current_page: calonSiswa?.current_page,
                        last_page: calonSiswa?.last_page,
                        per_page: calonSiswa?.per_page,
                        from: calonSiswa?.from,
                        to: calonSiswa?.to,
                        total: calonSiswa?.total,
                        links: calonSiswa?.links,
                    }}
                    actions={(row) => [
                        { icon: 'edit', onClick: () => router.visit(route('ppdb.edit', row.id)), label: 'Edit' },
                        { icon: 'delete', onClick: () => setDeleteTarget(row), label: 'Hapus' },
                    ]}
                />

                <ConfirmModal
                    open={!!deleteTarget}
                    title="Hapus Calon Siswa"
                    message={`Yakin ingin menghapus calon siswa "${deleteTarget?.nama_lengkap || ''}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            </div>
        </>
    );
}
