import { Head, usePage, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

interface JurusanOption {
  id: number;
  nama: string;
}

interface SiswaData {
  id: number;
  nama_lengkap: string;
  nisn: string | null;
  nis: string | null;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  jenis_kelamin: string;
  alamat: string | null;
  no_hp: string | null;
  email: string | null;
  nama_ortu: string | null;
  no_hp_ortu: string | null;
  asal_sekolah: string | null;
  status: string;
  tanggal_masuk: string | null;
  jurusan_id: number | null;
}

interface Props {
  siswa: SiswaData;
  jurusanList: JurusanOption[];
}

export default function Edit({ siswa, jurusanList }: Props) {
  const { errors } = usePage().props;

  const [values, setValues] = useState({
    nama_lengkap: siswa.nama_lengkap ?? '',
    nisn: siswa.nisn ?? '',
    nis: siswa.nis ?? '',
    tempat_lahir: siswa.tempat_lahir ?? '',
    tanggal_lahir: siswa.tanggal_lahir ?? '',
    jenis_kelamin: siswa.jenis_kelamin ?? 'Laki-laki',
    alamat: siswa.alamat ?? '',
    no_hp: siswa.no_hp ?? '',
    email: siswa.email ?? '',
    nama_ortu: siswa.nama_ortu ?? '',
    no_hp_ortu: siswa.no_hp_ortu ?? '',
    asal_sekolah: siswa.asal_sekolah ?? '',
    status: siswa.status ?? 'Aktif',
    tanggal_masuk: siswa.tanggal_masuk ?? '',
    jurusan_id: siswa.jurusan_id ? String(siswa.jurusan_id) : '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.put(route('siswa.update', siswa.id), values);
  };

  return (
    <>
      <Head title="Edit Siswa" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Siswa</h1>
          <Link href={route('siswa.index')} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Kembali
          </Link>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Form Edit Data Siswa</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="nama_lengkap"
                  value={values.nama_lengkap}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.nama_lengkap && <p className="mt-1 text-sm text-red-600">{errors.nama_lengkap}</p>}
              </div>

              {/* NISN & NIS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NISN <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="nisn"
                    value={values.nisn}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.nisn && <p className="mt-1 text-sm text-red-600">{errors.nisn}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIS</label>
                  <input
                    type="text"
                    name="nis"
                    value={values.nis}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.nis && <p className="mt-1 text-sm text-red-600">{errors.nis}</p>}
                </div>
              </div>

              {/* Tempat & Tanggal Lahir */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    name="tempat_lahir"
                    value={values.tempat_lahir}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tanggal_lahir"
                    value={values.tanggal_lahir}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin <span className="text-red-500">*</span></label>
                <select
                  name="jenis_kelamin"
                  value={values.jenis_kelamin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {errors.jenis_kelamin && <p className="mt-1 text-sm text-red-600">{errors.jenis_kelamin}</p>}
              </div>

              {/* Alamat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea
                  name="alamat"
                  value={values.alamat}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Kontak */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
                  <input
                    type="text"
                    name="no_hp"
                    value={values.no_hp}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Orang Tua */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    name="nama_ortu"
                    value={values.nama_ortu}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No HP Orang Tua</label>
                  <input
                    type="text"
                    name="no_hp_ortu"
                    value={values.no_hp_ortu}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Asal Sekolah, Status, Tanggal Masuk */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah</label>
                  <input
                    type="text"
                    name="asal_sekolah"
                    value={values.asal_sekolah}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status <span className="text-red-500">*</span></label>
                  <select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Pindah">Pindah</option>
                    <option value="Lulus">Lulus</option>
                    <option value="Dropout">Dropout</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Masuk</label>
                  <input
                    type="date"
                    name="tanggal_masuk"
                    value={values.tanggal_masuk}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
                  <select
                    name="jurusan_id"
                    value={values.jurusan_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">-- Pilih Jurusan --</option>
                    {jurusanList.map((j) => (
                      <option key={j.id} value={j.id}>{j.nama}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Simpan Perubahan
                </button>
                <Link
                  href={route('siswa.index')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
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