import { Link, Head, usePage } from '@inertiajs/inertia-react';
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

export default function Show({ guru }: Props) {
  const { flash } = usePage().props;

  return (
    <>
      <Head title="Detail GTK" />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Detail GTK</h1>
            <p className="text-sm text-gray-500 mt-0.5">ID: {guru.id}</p>
          </div>
          <Link href={route('gtk.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />Kembali
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {guru.nama_lengkap}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NUPTK</label>
              <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {guru.nuptk || '-' }
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.tempat_lahir}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.tanggal_lahir}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.agama}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {guru.alamat}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.no_telp}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.email ? (
                    <a href={`mailto:${guru.email}`} className="text-blue-600 hover:underline">
                      {guru.email}
                    </a>
                  ) : (
                    <span className="text-gray-400">Tidak diisi</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.jenis}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bidang Studi</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.bidang_studi || '-' }
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.jabatan}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Kepegawaian</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.status_kepegawaian}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Masuk</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.tanggal_masuk}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {guru.foto ? (
                    <a href={guru.foto} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Lihat Foto
                    </a>
                  ) : (
                    <span className="text-gray-400">Tidak diisi</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href={route('gtk.edit', guru.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700"
            >
              Edit
            </Link>
            <Link
              href={route('gtk.index')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}