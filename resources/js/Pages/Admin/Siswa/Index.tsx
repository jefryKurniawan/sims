import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import AdminTable from '@/Components/AdminTable';
import type { Column } from '@/Components/AdminTable';
import ConfirmModal from '@/Components/ConfirmModal';
import ImportModal from '@/Components/ImportModal';

export default function Index() {
    const { siswa, flash, kelasList } = usePage().props;
    const [deleteTarget, setDeleteTarget] = useState<any>(null);
    const [showImport, setShowImport] = useState(false);
    // useRouter is not exported from inertia-react@0.8.1, use Inertia directly

    // Parse current query params for preset values
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const [selectedKelasId, setSelectedKelasId] = useState(params.get('kelas_id') ?? '');
    const [selectedVariant, setSelectedVariant] = useState(params.get('variant') ?? '');

    const handleDelete = () => {
        if (!deleteTarget) return;
        Inertia.delete(route('users.murid.destroy', deleteTarget.id));
        setDeleteTarget(null);
    };

    const handleFilterChange = () => {
        const newParams = new URLSearchParams();
        if (selectedKelasId) newParams.set('kelas_id', selectedKelasId);
        if (selectedVariant) newParams.set('variant', selectedVariant);
        // preserve existing search and status
        const current = new URL(window.location.href);
        const currentParams = new URLSearchParams(current.search);
        if (currentParams.get('search')) newParams.set('search', currentParams.get('search'));
        if (currentParams.get('status')) newParams.set('status', currentParams.get('status'));
        // reset page to 1
        newParams.set('page', '1');
        Inertia.visit(route('users.murid.index', newParams));
    };

    const columns: Column[] = [
        { key: 'nama_lengkap', label: 'Nama' },
        { key: 'nisn', label: 'NISN', render: (v: string) => v || '-' },
        { key: 'nis', label: 'NIS', render: (v: string) => v || '-' },
        { key: 'kelas', label: 'Kelas', render: (_v: any, row: any) => {
            const kelas = row.kelasAktif?.kelas;
            return kelas ? `${kelas.nama_kelas}` : '-';
        }},
        { key: 'variant', label: 'Varianta', render: (_v: any, row: any) => {
            const kelas = row.kelasAktif?.kelas;
            if (!kelas) return '-';
            const nama = kelas.nama_kelas;
            return nama.length > 0 ? nama.slice(-1) : '-';
        }},
        {
            key: 'status',
            label: 'Status',
            render: (v: string) => {
                const colors: Record<string, string> = { Aktif: 'bg-emerald-100 text-emerald-700', Pindah: 'bg-yellow-100 text-yellow-700', Lulus: 'bg-blue-100 text-blue-700', Dropout: 'bg-red-100 text-red-700' };
                return <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${colors[v] || 'bg-gray-100 text-gray-700'}`}>{v}</span>;
            },
        },
    ];

    return (
        <>
            <Head title="Data Siswa" />
            <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Data Siswa</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Kelola data siswa & status akademik</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('users.murid.create')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm">
                            ++Siswa Baru
                        </Link>
                        <button
                            onClick={() => setShowImport(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-semibold shadow-sm"
                        >
                            <Upload className="w-4 h-4" />
                            Import
                        </button>
                    </div>
                    <div className="flex items-center gap-4 sm:flex-row">
                        <div>
                            <label className="block text-sm font-medium mb-1">Kelas</label>
                            <select
                                value={selectedKelasId}
                                onChange={(e) => setSelectedKelasId(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
                            >
                                <option value="">Semua Kelas</option>
                                {kelasList?.map((kelas: any) => (
                                    <option key={kelas.id} value={kelas.id}>
                                        {kelas.nama_kelas} ({kelas.jurusan?.nama})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Varianta</label>
                            <select
                                value={selectedVariant}
                                onChange={(e) => setSelectedVariant(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
                            >
                                <option value="">Semua Variant</option>
                                {[ 'A', 'B', 'C', 'D' ].map((v) => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleFilterChange}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm font-semibold"
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </div>

                {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}
                {flash?.error && <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{flash.error}</div>}

                <AdminTable
                    columns={columns}
                    rows={siswa?.data || []}
                    pagination={{
                        current_page: siswa?.current_page,
                        last_page: siswa?.last_page,
                        per_page: siswa?.per_page,
                        from: siswa?.from,
                        to: siswa?.to,
                        total: siswa?.total,
                        links: siswa?.links,
                    }}
                    actions={(row) => [
                        { icon: 'eye', onClick: () => Inertia.visit(route('users.murid.show', row.id)), label: 'Detail' },
                        { icon: 'edit', onClick: () => Inertia.visit(route('users.murid.edit', row.id)), label: 'Edit' },
                        { icon: 'delete', onClick: () => setDeleteTarget(row), label: 'Hapus' },
                    ]}
                />

                <ConfirmModal open={!!deleteTarget} title="Hapus Siswa" message={`Yakin ingin menghapus \"${deleteTarget?.nama_lengkap}\"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />

                <ImportModal
                    open={showImport}
                    onClose={() => setShowImport(false)}
                    title="Import Siswa"
                    templateRouteXlsx={route("users.murid.template") + "?format=xlsx"}
                    templateRouteCsv={route("users.murid.template") + "?format=csv"}
                    importRoute={route("users.murid.import")}
                />
            </div>
        </>
    );
}