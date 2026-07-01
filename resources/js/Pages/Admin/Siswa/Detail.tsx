import { Head, usePage, Link } from '@inertiajs/inertia-react';

interface Jurusan {
  nama: string;
}

interface SiswaDetail {
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
  jurusan?: Jurusan | null;
}

interface Props {
  siswa: SiswaDetail;
}

export default function Detail({ siswa }: Props) {
  const { flash } = usePage().props;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID');
  };

  return (
    <>
      <Head title="Detail Siswa" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Detail Siswa</h1>
          <Link href={route('siswa.index')} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Kembali ke Daftar
          </Link>
        </div>

        {flash.success && (
          <div className="mb-4 p-4 bg-green-100 rounded-lg text-green-800">{flash.success}</div>
        )}
        {flash.error && (
          <div className="mb-4 p-4 bg-red-100 rounded-lg text-red-800">{flash.error}</div>
        )}

        <div className="bg-white rounded-lg shadow border p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium text-gray-600">Nama Lengkap</div>
            <div>{siswa.nama_lengkap}</div>

            <div className="font-medium text-gray-600">NISN</div>
            <div>{siswa.nisn ?? '-'}
            </div>

            <div className="font-medium text-gray-600">NIS</div>
            <div>{siswa.nis ?? '-'}
            </div>

            <div className="font-medium text-gray-600">Tempat / Tanggal Lahir</div>
            <div>{siswa.tempat_lahir ?? '-'} / {formatDate(siswa.tanggal_lahir)}</div>

            <div className="font-medium text-gray-600">Jenis Kelamin</div>
            <div>{siswa.jenis_kelamin}</div>

            <div className="font-medium text-gray-600">Alamat</div>
            <div>{siswa.alamat ?? '-'}
            </div>

            <div className="font-medium text-gray-600">No HP</div>
            <div>{siswa.no_hp ?? '-'}
            </div>

            <div className="font-medium text-gray-600">Email</div>
            <div>{siswa.email ?? '-'}
            </div>

            <div className="font-medium text-gray-600">Orang Tua / Wali</div>
            <div>{siswa.nama_ortu ?? '-'}
            </div>

            <div className="font-medium text-gray-600">No HP Orang Tua</div>
            <div>{siswa.no_hp_ortu ?? '-'}
            </div>

            <div className="font-medium text-gray-600">Asal Sekolah</div>
            <div>{siswa.asal_sekolah ?? '-'}
            </div>

            <div className="font-medium text-gray-600">Status</div>
            <div>{siswa.status}</div>

            <div className="font-medium text-gray-600">Tanggal Masuk</div>
            <div>{formatDate(siswa.tanggal_masuk)}</div>

            <div className="font-medium text-gray-600">Jurusan</div>
            <div>{siswa.jurusan?.nama ?? '-'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}