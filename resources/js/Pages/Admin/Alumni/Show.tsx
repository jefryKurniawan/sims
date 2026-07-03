import { Link, Head, usePage } from '@inertiajs/inertia-react';
import { ChevronLeft } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AlumniItem {
  id: number;
  user_id: number;
  tahun_lulus: number | string;
  pekerjaan: string;
  alamat: string;
  no_telp: string;
  linkedin: string | null;
}

interface Props {
  alumni: AlumniItem;
  users: User[];
}

export default function Show({ alumni, users }: Props) {
  const { flash } = usePage().props;

  if (!alumni) {
    return (
      <>
        <Head title="Detail Alumni" />
        <div className="p-6 text-gray-500">Data alumni tidak ditemukan.</div>
      </>
    );
  }

  const user = users.find(u => u.id === alumni.user_id);

  return (
    <>
      <Head title="Detail Alumni" />
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">Detail Alumni</h1>
            <p className="text-sm text-gray-500 mt-0.5">ID: {alumni.id}</p>
          </div>
          <Link href={route('alumni.index')} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
            <ChevronLeft className="w-4 h-4" />Kembali
          </Link>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm p-6 max-w-3xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
              <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {user?.name} ({user?.email || 'Tidak terdaftar'})
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Lulus</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {alumni.tahun_lulus}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {alumni.no_telp}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
              <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {alumni.pekerjaan}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {alumni.alamat}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <div className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                {alumni.linkedin ? (
                  <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {alumni.linkedin}
                  </a>
                ) : (
                  <span className="text-gray-400">Tidak diisi</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href={route('alumni.edit', alumni.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-school-red rounded-lg hover:bg-red-700"
            >
              Edit
            </Link>
            <Link
              href={route('alumni.index')}
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