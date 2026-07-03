import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import AdminTable from '@/Components/AdminTable';
import type { Column } from '@/Components/AdminTable';
import ConfirmModal from '@/Components/ConfirmModal';

export default function Index() {
  const { mapel, flash } = usePage().props as {
    mapel: any;
    flash: { success?: string; error?: string };
  };
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    Inertia.delete(route('rapor-mapel.destroy', deleteTarget.id));
    setDeleteTarget(null);
  };

  const columns: Column[] = [
    { key: 'nama_mapel', label: 'Nama Mapel' },
    { key: 'kkm', label: 'KKM' },
    { key: 'kelompok', label: 'Kelompok' },
    { key: 'kelas', label: 'Kelas', render: (_v: any, row: any) => row.rapor_kelas?.nama_kelas || '-' },
  ];

  return (
    <>
      <Head title="Mata Pelajaran Rapor" />
      <div className="p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Mata Pelajaran Rapor</h1>
            <p className="text-sm text-gray-500 mt-0.5">Kelola mata pelajaran untuk pencetakan rapor</p>
          </div>
          <Link
            href={route('rapor-mapel.create')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm"
          >
            Mapel Baru
          </Link>
        </div>

        {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}
        {flash?.error && <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{flash.error}</div>}

        <AdminTable
          columns={columns}
          rows={mapel?.data || []}
          pagination={{
            current_page: mapel?.current_page,
            last_page: mapel?.last_page,
            per_page: mapel?.per_page,
            from: mapel?.from,
            to: mapel?.to,
            total: mapel?.total,
            links: mapel?.links,
          }}
          actions={(row) => [
            { icon: 'edit', onClick: () => Inertia.visit(route('rapor-mapel.edit', row.id)), label: 'Edit' },
            { icon: 'delete', onClick: () => setDeleteTarget(row), label: 'Hapus' },
          ]}
        />

        <ConfirmModal
          open={!!deleteTarget}
          title="Hapus Mata Pelajaran"
          message={`Yakin ingin menghapus mapel "${deleteTarget?.nama_mapel}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </>
  );
}
