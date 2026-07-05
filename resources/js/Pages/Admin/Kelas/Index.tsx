import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { Plus, Upload, X } from 'lucide-react';
import AdminTable from '@/Components/AdminTable';
import type { Column } from '@/Components/AdminTable';
import ConfirmModal from '@/Components/ConfirmModal';
import ImportModal from '@/Components/ImportModal';

export default function Index() {
  const { kelas, guru, jurusan, flash } = usePage().props;
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [showImport, setShowImport] = useState(false);
  const form = useForm({
    nama_kelas: '',
    tingkat: '10',
    jurusan_id: '',
    wali_kelas_id: '',
    ruangan: '',
    kapasitas: '30',
    tahun_ajaran: '',
  });

  const openAdd = () => { setShowForm(true); setEditing(false); setEditId(null); form.reset(); };

  const openEdit = (k: any) => {
    form.setData('nama_kelas', k.nama_kelas);
    form.setData('tingkat', k.tingkat);
    form.setData('jurusan_id', k.jurusan_id ? String(k.jurusan_id) : '');
    form.setData('wali_kelas_id', k.wali_kelas_id ? String(k.wali_kelas_id) : '');
    form.setData('ruangan', k.ruangan || '');
    form.setData('kapasitas', String(k.kapasitas));
    form.setData('tahun_ajaran', k.tahun_ajaran);
    setEditId(k.id);
    setEditing(true);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing && editId) form.put(route('kelas.update', editId));
    else form.post(route('kelas.store'));
    setShowForm(false); setEditing(false); setEditId(null); form.reset();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    Inertia.delete(route('kelas.destroy', deleteTarget.id));
    setDeleteTarget(null);
  };

  const columns: Column[] = [
    { key: 'nama_kelas', label: 'Nama Kelas' },
    {
      key: 'tingkat',
      label: 'Tingkat',
      render: (v: string) => (
        <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">Kelas {v}</span>
      ),
    },
    {
      key: 'jurusan',
      label: 'Jurusan',
      render: (_v: any, row: any) => row.jurusan?.nama || '-',
    },
    {
      key: 'wali_kelas',
      label: 'Wali Kelas',
      render: (_v: any, row: any) => row.wali_kelas?.nama_lengkap || '-',
    },
    { key: 'ruangan', label: 'Ruangan', render: (v: string) => v || '-' },
    { key: 'kapasitas', label: 'Kapasitas' },
    { key: 'tahun_ajaran', label: 'Tahun Ajaran' },
  ];

  return (
    <>
      <Head title="Data Kelas" />
      <div className="p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Data Kelas</h1>
            <p className="text-sm text-gray-500 mt-0.5">Kelola rombongan belajar & wali kelas</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-school-red text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-sm">
              Kelas Baru
            </button>
            <button
              onClick={() => setShowImport(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm font-semibold shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
          </div>
        </div>

        {flash?.success && <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium">{flash.success}</div>}
        {flash?.error && <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{flash.error}</div>}

        <AdminTable
          columns={columns}
          rows={kelas?.data || []}
          pagination={{
            current_page: kelas?.current_page,
            last_page: kelas?.last_page,
            per_page: kelas?.per_page,
            from: kelas?.from,
            to: kelas?.to,
            total: kelas?.total,
            links: kelas?.links,
          }}
          actions={(row) => [
            { icon: 'eye', onClick: () => Inertia.visit(route('kelas.show', row.id)), label: 'Detail' },
            { icon: 'edit', onClick: () => openEdit(row), label: 'Edit' },
            { icon: 'delete', onClick: () => setDeleteTarget(row), label: 'Hapus' },
          ]}
        />

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h2 className="text-xl font-bold text-gray-900 font-heading">{editing ? 'Edit Kelas' : 'Tambah Kelas'}</h2>
                <button onClick={() => { setShowForm(false); form.reset(); }} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Nama Kelas</label>
                  <input type="text" value={form.data.nama_kelas} onChange={e => form.setData('nama_kelas', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm" placeholder="Kelas X MIPA 1" />
                  {form.errors.nama_kelas && <span className="text-red-600 text-xs">{form.errors.nama_kelas}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Tingkat</label>
                  <select value={form.data.tingkat} onChange={e => form.setData('tingkat', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm">
                    <option value="10">10</option><option value="11">11</option><option value="12">12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Jurusan</label>
                  <select value={form.data.jurusan_id} onChange={e => form.setData('jurusan_id', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm">
                    <option value="">Tanpa Jurusan</option>
                    {jurusan?.map((j: any) => <option key={j.id} value={j.id}>{j.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Wali Kelas</label>
                  <select value={form.data.wali_kelas_id} onChange={e => form.setData('wali_kelas_id', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm">
                    <option value="">Belum Ditentukan</option>
                    {guru?.map((g: any) => <option key={g.id} value={g.id}>{g.nama_lengkap}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Ruangan</label>
                    <input type="text" value={form.data.ruangan} onChange={e => form.setData('ruangan', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm" placeholder="Ruang 101" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Kapasitas</label>
                    <input type="number" min="1" value={form.data.kapasitas} onChange={e => form.setData('kapasitas', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Tahun Ajaran</label>
                  <input type="text" value={form.data.tahun_ajaran} onChange={e => form.setData('tahun_ajaran', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm" placeholder="2025/2026" />
                  {form.errors.tahun_ajaran && <span className="text-red-600 text-xs">{form.errors.tahun_ajaran}</span>}
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => { setShowForm(false); form.reset(); }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Batal</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50" disabled={form.processing}>{form.processing ? 'Menyimpan...' : editing ? 'Update' : 'Simpan'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmModal open={!!deleteTarget} title="Hapus Kelas" message={`Yakin ingin menghapus kelas "${deleteTarget?.nama_kelas}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />

        <ImportModal
          open={showImport}
          onClose={() => setShowImport(false)}
          title="Import Kelas"
          templateRouteXlsx={route("kelas.template") + "?format=xlsx"}
          templateRouteCsv={route("kelas.template") + "?format=csv"}
          importRoute={route("kelas.import")}
        />
      </div>
    </>
  );
}