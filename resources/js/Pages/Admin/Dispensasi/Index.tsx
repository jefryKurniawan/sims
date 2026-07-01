import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { Edit, Trash, Plus, Eye } from 'lucide-react';

export default function Index() {
  const { dispensasi, siswa, flash } = usePage().props;
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
      form.put(route('dispensasi.update', dispensasiId));
    } else {
      form.post(route('dispensasi.store'));
    }
    form.reset();
    setShowForm(false);
    setEditing(false);
    setDispensasiId(null);
  };

  return (
    <>
      <Head title="Dispensasi SPP" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Dispensasi SPP</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditing(false);
              form.reset();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Tambah Dispensasi
          </button>
        </div>

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

        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Siswa</label>
                <select
                  value={form.siswa_id}
                  onChange={e => form.set('siswa_id', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Pilih Siswa</option>
                  {siswa.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.nama_lengkap} ({s.nisn})
                    </option>
                  ))}
                </select>
                {!!form.errors.siswa_id && <span className="text-red-600 text-sm">{form.errors.siswa_id}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jenis Dispensasi</label>
                <select
                  value={form.jenis}
                  onChange={e => form.set('jenis', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="potongan">Potongan</option>
                  <option value="penundaan">Penundaan</option>
                </select>
                {!!form.errors.jenis && <span className="text-red-600 text-sm">{form.errors.jenis}</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nominal (Rp)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.nominal}
                    onChange={e => form.set('nominal', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Nominal dispensasi"
                  />
                  {!!form.errors.nominal && <span className="text-red-600 text-sm">{form.errors.nominal}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={form.tanggal_mulai}
                    onChange={e => form.set('tanggal_mulai', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {!!form.errors.tanggal_mulai && <span className="text-red-600 text-sm">{form.errors.tanggal_mulai}</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={form.tanggal_selesai}
                    onChange={e => form.set('tanggal_selesai', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {!!form.errors.tanggal_selesai && <span className="text-red-600 text-sm">{form.errors.tanggal_selesai}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Keterangan</label>
                  <textarea
                    value={form.keterangan}
                    onChange={e => form.set('keterangan', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    rows={3}
                    placeholder="Keterangan tambahan"
                  />
                  {!!form.errors.keterangan && <span className="text-red-600 text-sm">{form.errors.keterangan}</span>}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    form.reset();
                  }}
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

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Siswa</th>
                <th scope="col" className="px-4 py-3 font-medium">Jenis</th>
                <th scope="col" className="px-4 py-3 font-medium">Nominal</th>
                <th scope="col" className="px-4 py-3 font-medium">Periode</th>
                <th scope="col" className="px-4 py-3 font-medium">Keterangan</th>
                <th scope="col" className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dispensasi.length > 0 ? (
                dispensasi.map((d: any) => (
                  <tr key={d.id} className="">
                    <td className="px-4 py-3">
                      {d.siswa?.nama_lengkap ?? 'Tidak Diketahui'} <br />
                      <span className="text-xs text-gray-500">({d.siswa?.nisn ?? '-'})</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${d.jenis === 'potongan' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {d.jenis === 'potongan' ? 'Potongan' : 'Penundaan'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      Rp {parseFloat(d.nominal).toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3">
                      {d.keterangan ?? '-'}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <span
                          onClick={() => {
                            // Navigate to detail page
                            Inertia.visit(route('dispensasi.show', d.id));
                          }}
                          className="cursor-pointer hover:text-indigo-600"
                        >
                          <Eye className="h-4 w-4" />
                        </span>
                        <span
                          onClick={() => {
                            setShowForm(true);
                            setEditing(true);
                            setDispensasiId(d.id);
                            form.data.siswa_id = d.siswa_id;
                            form.data.jenis = d.jenis;
                            form.data.nominal = String(d.nominal);
                            form.data.tanggal_mulai = d.tanggal_mulai;
                            form.data.tanggal_selesai = d.tanggal_selesai;
                            form.data.keterangan = d.keterangan;
                          }}
                          className="cursor-pointer hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </span>
                        <span
                          onClick={() => {
                            if (window.confirm('Yakin ingin menghapus dispensasi ini?')) {
                              Inertia.delete(route('dispensasi.destroy', d.id));
                            }
                          }}
                          className="cursor-pointer hover:text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                    Tidak ada data dispensasi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}