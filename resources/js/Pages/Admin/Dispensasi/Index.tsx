import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import AdminTable from '@/Components/AdminTable';
import type { Column } from '@/Components/AdminTable';
import ConfirmModal from '@/Components/ConfirmModal';

export default function Index() {
  const { dispensasi, siswa, flash } = usePage().props;
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const form = useForm({
    siswa_id: '',
    jenis: 'potongan',
    nominal: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    keterangan: '',
  });

  const openAdd = () => {
    setShowForm(true);
    setEditing(false);
    setEditId(null);
    form.reset();
  };

  const openEdit = (d: any) => {
    form.setData('siswa_id', String(d.siswa_id));
    form.setData('jenis', d.jenis);
    form.setData('nominal', String(d.nominal));
    form.setData('tanggal_mulai', d.tanggal_mulai ? d.tanggal_mulai.split('T')[0] : '');
    form.setData('tanggal_selesai', d.tanggal_selesai ? d.tanggal_selesai.split('T')[0] : '');
    form.setData('keterangan', d.keterangan || '');
    setEditId(d.id);
    setEditing(true);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing && editId) {
      form.put(route('dispensasi.update', editId));
    } else {
      form.post(route('dispensasi.store'));
    }
    setShowForm(false);
    setEditing(false);
    setEditId(null);
    form.reset();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    Inertia.delete(route('dispensasi.destroy', deleteTarget.id));
    setDeleteTarget(null);
  };

  const columns: Column[] = [
    {
      key: 'siswa',
      label: 'Siswa',
      render: (_v: any, row: any) => (
        <div>
          <span className="font-medium">{row.siswa?.nama_lengkap ?? 'Tidak Diketahui'}</span>
          <span className="text-xs text-gray-400 ml-1.5">({row.siswa?.nisn ?? '-'})</span>
        </div>
      ),
    },
    {
      key: 'jenis',
      label: 'Jenis',
      render: (v: string) => (
        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
          v === 'potongan' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {v === 'potongan' ? 'Potongan' : 'Penundaan'}
        </span>
      ),
    },
    {
      key: 'nominal',
      label: 'Nominal',
      render: (v: string) => `Rp ${parseFloat(v).toLocaleString('id-ID')}`,
    },
    {
      key: 'periode',
      label: 'Periode',
      render: (_v: any, row: any) => {
        if (!row.tanggal_mulai) return '-';
        const mulai = new Date(row.tanggal_mulai).toLocaleDateString('id-ID');
        const selesai = row.tanggal_selesai ? new Date(row.tanggal_selesai).toLocaleDateString('id-ID') : null;
        return selesai ? `${mulai} - ${selesai}` : mulai;
      },
    },
    {
      key: 'keterangan',
      label: 'Keterangan',
      render: (v: string) => v || '-',
      wrapClass: 'max-w-[200px] truncate',
    },
  ];

  return (
    <>
      <Head title="Dispensasi SPP" />
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Dispensasi SPP</h1>
            <p className="text-sm text-gray-500 mt-0.5">Kelola potongan & penundaan pembayaran SPP</p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" />
            + Dispensasi Baru
          </button>
        </div>

        {/* Flash */}
        {flash?.success && (
          <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>
        )}
        {flash?.error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{flash.error}</div>
        )}

        {/* Table */}
        <AdminTable
          columns={columns}
          rows={dispensasi?.data || []}
          pagination={{
            current_page: dispensasi?.current_page,
            last_page: dispensasi?.last_page,
            per_page: dispensasi?.per_page,
            from: dispensasi?.from,
            to: dispensasi?.to,
            total: dispensasi?.total,
            links: dispensasi?.links,
          }}
          actions={(row) => [
            { icon: 'eye', onClick: () => Inertia.visit(route('dispensasi.show', row.id)), label: 'Detail' },
            { icon: 'edit', onClick: () => openEdit(row), label: 'Edit' },
            { icon: 'delete', onClick: () => setDeleteTarget(row), label: 'Hapus' },
          ]}
        />

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h2 className="text-xl font-bold text-gray-900 font-heading">
                  {editing ? 'Edit Dispensasi' : 'Tambah Dispensasi'}
                </h2>
                <button
                  onClick={() => { setShowForm(false); form.reset(); }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Siswa</label>
                  <select
                    value={form.data.siswa_id}
                    onChange={e => form.setData('siswa_id', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                  >
                    <option value="">Pilih Siswa</option>
                    {siswa.map((s: any) => (
                      <option key={s.id} value={s.id}>{s.nama_lengkap} ({s.nisn})</option>
                    ))}
                  </select>
                  {form.errors.siswa_id && <span className="text-red-600 text-xs">{form.errors.siswa_id}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Jenis</label>
                  <select
                    value={form.data.jenis}
                    onChange={e => form.setData('jenis', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                  >
                    <option value="potongan">Potongan</option>
                    <option value="penundaan">Penundaan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Nominal (Rp)</label>
                  <input
                    type="number" step="0.01" min="0"
                    value={form.data.nominal}
                    onChange={e => form.setData('nominal', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                    placeholder="Nominal dispensasi"
                  />
                  {form.errors.nominal && <span className="text-red-600 text-xs">{form.errors.nominal}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tanggal Mulai</label>
                    <input
                      type="date"
                      value={form.data.tanggal_mulai}
                      onChange={e => form.setData('tanggal_mulai', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tanggal Selesai</label>
                    <input
                      type="date"
                      value={form.data.tanggal_selesai}
                      onChange={e => form.setData('tanggal_selesai', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Keterangan</label>
                  <textarea
                    value={form.data.keterangan}
                    onChange={e => form.setData('keterangan', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm"
                    rows={3}
                    placeholder="Keterangan tambahan"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => { setShowForm(false); form.reset(); }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Batal
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50" disabled={form.processing}>
                    {form.processing ? 'Menyimpan...' : editing ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        <ConfirmModal
          open={!!deleteTarget}
          title="Hapus Dispensasi"
          message={`Yakin ingin menghapus dispensasi untuk siswa "${deleteTarget?.siswa?.nama_lengkap}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </>
  );
}