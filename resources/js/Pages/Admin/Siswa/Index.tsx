import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import AdminTable from '@/Components/AdminTable';
import type { Column } from '@/Components/AdminTable';
import ConfirmModal from '@/Components/ConfirmModal';

export default function Index() {
  const { siswa, flash } = usePage().props;
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    Inertia.delete(route('siswa.destroy', deleteTarget.id));
    setDeleteTarget(null);
  };

  const columns: Column[] = [
    { key: 'nama_lengkap', label: 'Nama' },
    { key: 'nisn', label: 'NISN', render: (v: string) => v || '-' },
    { key: 'nis', label: 'NIS', render: (v: string) => v || '-' },
    { key: 'jurusan', label: 'Jurusan', render: (_v: any, row: any) => row.jurusan?.nama || '-' },
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
          <Link href={route('siswa.create')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm">
            ++Siswa Baru
          </Link>
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
            { icon: 'eye', onClick: () => Inertia.visit(route('siswa.show', row.id)), label: 'Detail' },
            { icon: 'edit', onClick: () => Inertia.visit(route('siswa.edit', row.id)), label: 'Edit' },
            { icon: 'delete', onClick: () => setDeleteTarget(row), label: 'Hapus' },
          ]}
        />

        <ConfirmModal open={!!deleteTarget} title="Hapus Siswa" message={`Yakin ingin menghapus "${deleteTarget?.nama_lengkap}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      </div>
    </>
  );
}