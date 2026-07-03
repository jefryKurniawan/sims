import { Link, Head, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface GuruItem {
  id: number;
  nama_lengkap: string;
  nuptk: string | null;
  jenis_kelamin: 'L' | 'P';
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  alamat: string;
  no_telp: string;
  email: string | null;
  jenis: 'Guru' | 'Tenaga Kependidikan';
  bidang_studi: string | null;
  jabatan: string;
  status_kepegawaian: 'Tetap Yayasan' | 'Kontrak' | 'Honorer';
  tanggal_masuk: string;
  foto: string | null;
}

interface Props {
  guru: GuruItem;
}

export default function Edit({ guru }: Props) {
  const { errors } = usePage().props;

  const [values, setValues] = useState({
    nama_lengkap: guru.nama_lengkap,
    nuptk: guru.nuptk || '',
    jenis_kelamin: guru.jenis_kelamin,
    tempat_lahir: guru.tempat_lahir,
    tanggal_lahir: guru.tanggal_lahir,
    agama: guru.agama,
    alamat: guru.alamat,
    no_telp: guru.no_telp,
    email: guru.email || '',
    jenis: guru.jenis,
    bidang_studi: guru.bidang_studi || '',
    jabatan: guru.jabatan,
    status_kepegawaian: guru.status_kepegawaian,
    tanggal_masuk: guru.tanggal_masuk,
    foto: guru.foto || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.put(route('gtk.update', guru.id), {
      ...values,
      _method: 'PUT',
    });
  };

  return (
    <>
      <Head title="Edit GTK" />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Edit GTK</h1>
            <p className="text-sm text-gray-500 mt-0.5">ID: {guru.id}</p>
          </div>
          <Link href={route('gtk.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />Kembali
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_lengkap"
                  value={values.nama_lengkap}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors?.nama_lengkap && <p className="mt-1 text-sm text-red-600">{errors.nama_lengkap}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NUPTK
                </label>
                <input
                  type="text"
                  name="nuptk"
                  value={values.nuptk}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(opsional)"
                />
                {errors?.nuptk && <p className="mt-1 text-sm text-red-600">{errors.nuptk}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenis_kelamin"
                    value={values.jenis_kelamin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                  {errors?.jenis_kelamin && <p className="mt-1 text-sm text-red-600">{errors.jenis_kelamin}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tempat Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="tempat_lahir"
                    value={values.tempat_lahir}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors?.tempat_lahir && <p className="mt-1 text-sm text-red-600">{errors.tempat_lahir}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_lahir"
                    value={values.tanggal_lahir}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors?.tanggal_lahir && <p className="mt-1 text-sm text-red-600">{errors.tanggal_lahir}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agama <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="agama"
                    value={values.agama}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katholik">Katholik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                  {errors?.agama && <p className="mt-1 text-sm text-red-600">{errors.agama}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="alamat"
                  value={values.alamat}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors?.alamat && <p className="mt-1 text-sm text-red-600">{errors.alamat}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No. Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="no_telp"
                    value={values.no_telp}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors?.no_telp && <p className="mt-1 text-sm text-red-600">{errors.no_telp}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(opsional)"
                  />
                  {errors?.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenis"
                    value={values.jenis}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih</option>
                    <option value="Guru">Guru</option>
                    <option value="Tenaga Kependidikan">Tenaga Kependidikan</option>
                  </select>
                  {errors?.jenis && <p className="mt-1 text-sm text-red-600">{errors.jenis}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bidang Studi
                  </label>
                  <input
                    type="text"
                    name="bidang_studi"
                    value={values.bidang_studi}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(opsional)"
                  />
                  {errors?.bidang_studi && <p className="mt-1 text-sm text-red-600">{errors.bidang_studi}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jabatan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jabatan"
                    value={values.jabatan}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors?.jabatan && <p className="mt-1 text-sm text-red-600">{errors.jabatan}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status Kepegawaian <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status_kepegawaian"
                    value={values.status_kepegawaian}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih</option>
                    <option value="Tetap Yayasan">Tetap Yayasan</option>
                    <option value="Kontrak">Kontrak</option>
                    <option value="Honorer">Honorer</option>
                  </select>
                  {errors?.status_kepegawaian && <p className="mt-1 text-sm text-red-600">{errors.status_kepegawaian}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Masuk <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_masuk"
                    value={values.tanggal_masuk}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors?.tanggal_masuk && <p className="mt-1 text-sm text-red-600">{errors.tanggal_masuk}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foto
                  </label>
                  <input
                    type="text"
                    name="foto"
                    value={values.foto}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="URL gambar (opsional)"
                  />
                  {errors?.foto && <p className="mt-1 text-sm text-red-600">{errors.foto}</p>}
                </div>
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
                href={route('gtk.index')}
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