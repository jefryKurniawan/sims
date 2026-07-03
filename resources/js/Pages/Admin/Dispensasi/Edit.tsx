import { Link, Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface DispensasiItem {
  id: number;
  siswa: {
    id: number;
    nama_lengkap: string;
    nisn: string;
  } | null;
  jenis: 'potongan' | 'penundaan';
  nominal: number;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  keterangan: string | null;
}

interface Props {
  dispensasi: DispensasiItem;
  siswa: any[];
}

export default function Edit({ dispensasi, siswa }: Props) {
  const { errors } = usePage().props;

  const [values, setValues] = useState({
    siswa_id: String(dispensasi.siswa?.id || ''),
    jenis: dispensasi.jenis,
    nominal: String(dispensasi.nominal),
    tanggal_mulai: dispensasi.tanggal_mulai ? dispensasi.tanggal_mulai.split('T')[0] : '',
    tanggal_selesai: dispensasi.tanggal_selesai ? dispensasi.tanggal_selesai.split('T')[0] : '',
    keterangan: dispensasi.keterangan || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.put(route('dispensasi.update', dispensasi.id), values);
  };

  return (
    <>
      <Head title="Edit Dispensasi" />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Edit Dispensasi</h1>
            <p className="text-sm text-gray-500 mt-0.5">ID: {dispensasi.id}</p>
          </div>
          <Link href={route('dispensasi.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />Kembali
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Siswa <span className="text-red-500">*</span></label>
                <select
                  name="siswa_id"
                  value={values.siswa_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih Siswa</option>
                  {siswa.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.nama_lengkap} ({s.nisn})
                    </option>
                  ))}
                </select>
                {errors?.siswa_id && <p className="mt-1 text-sm text-red-600">{errors.siswa_id}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis <span className="text-red-500">*</span></label>
                <select
                  name="jenis"
                  value={values.jenis}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="potongan">Potongan</option>
                  <option value="penundaan">Penundaan</option>
                </select>
                {errors?.jenis && <p className="mt-1 text-sm text-red-600">{errors.jenis}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nominal (Rp) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="nominal"
                  value={values.nominal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nominal dispensasi"
                />
                {errors?.nominal && <p className="mt-1 text-sm text-red-600">{errors.nominal}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="tanggal_mulai"
                    value={values.tanggal_mulai}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors?.tanggal_mulai && <p className="mt-1 text-sm text-red-600">{errors.tanggal_mulai}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    name="tanggal_selesai"
                    value={values.tanggal_selesai}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors?.tanggal_selesai && <p className="mt-1 text-sm text-red-600">{errors.tanggal_selesai}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                <textarea
                  name="keterangan"
                  value={values.keterangan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Keterangan tambahan"
                />
                {errors?.keterangan && <p className="mt-1 text-sm text-red-600">{errors.keterangan}</p>}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700"
              >
                Update
              </button>
              <Link
                href={route('dispensasi.index')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}