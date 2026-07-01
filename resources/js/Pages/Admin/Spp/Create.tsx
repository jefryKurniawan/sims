import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

interface SiswaOption {
  id: number;
  nama_lengkap: string;
  nisn: string | null;
}

interface Props {
  siswaList: SiswaOption[];
}

export default function Create({ siswaList }: Props) {
  const { errors } = usePage().props;

  const [values, setValues] = useState({
    siswa_id: '',
    nominal: '',
    tanggal_jatuh_tempo: '',
    keterangan: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.post(route('spp.store'), values);
  };

  return (
    <>
      <Head title="Tambah Tagihan SPP" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tambah Tagihan SPP</h1>
          <Link
            href={route('spp.index')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
          >
            Kembali
          </Link>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Form Tagihan Baru</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Siswa */}
              <div>
                <label htmlFor="siswa_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Siswa <span className="text-red-500">*</span>
                </label>
                <select
                  id="siswa_id"
                  name="siswa_id"
                  value={values.siswa_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">-- Pilih Siswa --</option>
                  {siswaList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nama_lengkap} {s.nisn ? `(${s.nisn})` : ''}
                    </option>
                  ))}
                </select>
                {errors.siswa_id && <p className="mt-1 text-sm text-red-600">{errors.siswa_id}</p>}
              </div>

              {/* Nominal */}
              <div>
                <label htmlFor="nominal" className="block text-sm font-medium text-gray-700 mb-1">
                  Nominal (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="nominal"
                  name="nominal"
                  value={values.nominal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
                {errors.nominal && <p className="mt-1 text-sm text-red-600">{errors.nominal}</p>}
              </div>

              {/* Tanggal Jatuh Tempo */}
              <div>
                <label htmlFor="tanggal_jatuh_tempo" className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Jatuh Tempo <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="tanggal_jatuh_tempo"
                  name="tanggal_jatuh_tempo"
                  value={values.tanggal_jatuh_tempo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.tanggal_jatuh_tempo && <p className="mt-1 text-sm text-red-600">{errors.tanggal_jatuh_tempo}</p>}
              </div>

              {/* Keterangan */}
              <div>
                <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-1">
                  Keterangan
                </label>
                <textarea
                  id="keterangan"
                  name="keterangan"
                  value={values.keterangan}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Contoh: SPP Bulan Juli"
                />
                {errors.keterangan && <p className="mt-1 text-sm text-red-600">{errors.keterangan}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark"
                >
                  Simpan
                </button>
                <Link
                  href={route('spp.index')}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                >
                  Batal
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}