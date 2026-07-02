import { Head, Link, usePage } from '@inertiajs/inertia-react';
import { Edit, Trash, Eye, Plus } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';

interface SiswaItem {
  id: number;
  nama_lengkap: string;
  nisn: string | null;
  nis: string | null;
  status: string;
  jurusan?: { nama: string } | null;
}

interface PaginatedData {
  data: SiswaItem[];
  current_page: number;
  last_page: number;
  total: number;
  from: number | null;
  to: number | null;
  per_page: number;
  prev_page_url?: string | null;
  next_page_url?: string | null;
}

interface Props {
  siswa: PaginatedData;
}

export default function Index({ siswa }: Props) {
  const { flash } = usePage().props;

  const handleDelete = (id: number) => {
    if (window.confirm('Yakin ingin menghapus data siswa ini?')) {
      Inertia.delete(route('siswa.destroy', id));
    }
  };

  return (
    <>
      <Head title="Data Siswa" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Data Siswa</h1>
          <Link
            href={route('siswa.create')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-school-red text-white rounded-md hover:bg-red-700 transition text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            + Siswa Baru
          </Link>
        </div>

        {flash.success && (
          <div className="mb-4 p-4 bg-green-100 rounded-lg text-green-800">{flash.success}</div>
        )}
        {flash.error && (
          <div className="mb-4 p-4 bg-red-100 rounded-lg text-red-800">{flash.error}</div>
        )}

        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">NISN</th>
                <th className="px-4 py-2">Jurusan</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {siswa.data.length > 0 ? (
                siswa.data.map((item, idx) => {
                  const no = (siswa.current_page - 1) * siswa.per_page + idx + 1;
                  return (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-2">{no}</td>
                      <td className="px-4 py-2">{item.nama_lengkap}</td>
                      <td className="px-4 py-2">{item.nisn ?? '-'}
                      </td>
                      <td className="px-4 py-2">{item.jurusan?.nama ?? '-'}
                      </td>
                      <td className="px-4 py-2">{item.status}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <Link href={route('siswa.show', item.id)} title="Detail">
                          <Eye className="h-5 w-5 text-primary" />
                        </Link>
                        <Link href={route('siswa.edit', item.id)} title="Edit">
                          <Edit className="h-5 w-5 text-primary" />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} title="Hapus" className="text-red-600">
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                    Tidak ada data siswa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {siswa.data.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Menampilkan {siswa.from} - {siswa.to} dari {siswa.total} data
            </div>
            <div className="flex space-x-2">
              {siswa.prev_page_url && (
                <Link href={siswa.prev_page_url} className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
                  Prev
                </Link>
              )}
              <Link href={route('siswa.index', { page: 1 })} className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
                1
              </Link>
              {siswa.next_page_url && (
                <Link href={siswa.next_page_url} className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}