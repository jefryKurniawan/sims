import { Head, useForm, Link } from '@inertiajs/inertia-react';
import { ChevronLeft } from 'lucide-react';

export default function Edit({ kelas, guru, jurusan }: { kelas: any; guru: any[]; jurusan: any[] }) {
  const form = useForm({
    nama_kelas: kelas.nama_kelas,
    tingkat: kelas.tingkat,
    jurusan_id: kelas.jurusan_id ? String(kelas.jurusan_id) : '',
    wali_kelas_id: kelas.wali_kelas_id ? String(kelas.wali_kelas_id) : '',
    ruangan: kelas.ruangan || '',
    kapasitas: String(kelas.kapasitas),
    tahun_ajaran: kelas.tahun_ajaran,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.put(route('kelas.update', kelas.id));
  };

  return (
    <>
      <Head title={`Edit Kelas - ${kelas.nama_kelas}`} />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Edit Kelas</h1>
            <p className="text-sm text-gray-500 mt-0.5">{kelas.nama_kelas}</p>
          </div>
          <Link href={route('kelas.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />Kembali
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Nama Kelas</label>
              <input type="text" value={form.data.nama_kelas} onChange={e => form.setData('nama_kelas', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm" />
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
                {jurusan?.map((j: any) => <option key={j.id} value={j.id}>{j.nama_jurusan}</option>)}
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
                <input type="text" value={form.data.ruangan} onChange={e => form.setData('ruangan', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Kapasitas</label>
                <input type="number" min="1" value={form.data.kapasitas} onChange={e => form.setData('kapasitas', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Tahun Ajaran</label>
              <input type="text" value={form.data.tahun_ajaran} onChange={e => form.setData('tahun_ajaran', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition text-sm" />
              {form.errors.tahun_ajaran && <span className="text-red-600 text-xs">{form.errors.tahun_ajaran}</span>}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Link href={route('kelas.index')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Batal</Link>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50" disabled={form.processing}>{form.processing ? 'Menyimpan...' : 'Update'}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}